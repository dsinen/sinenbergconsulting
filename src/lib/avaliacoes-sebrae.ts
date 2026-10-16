import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Avaliações da palestra na Feira do Empreendedor (Sebrae-SP, 2026).
// Ficam numa base própria no Notion, separada do CRM, para não misturar nota com lead.
// A nota é gravada no primeiro toque; o comentário, se vier, completa a mesma linha.

const AVALIACOES_DATA_SOURCE_DEFAULT = "b80cf369-f05f-4c82-b74b-a3d0cb556191";
const NOTION_VERSION = "2025-09-03";

const notaSchema = z.number().int().min(1).max(5);

const completarSchema = z.object({
  id: z.string().max(64).optional(),
  nota: notaSchema,
  comentario: z.string().trim().max(600),
  nome: z.string().trim().max(160),
  publicar: z.boolean(),
});

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

function dataSourceId(): string {
  return env("NOTION_AVALIACOES_DATA_SOURCE_ID") ?? AVALIACOES_DATA_SOURCE_DEFAULT;
}

function texto(content: string) {
  return [{ type: "text", text: { content: content.slice(0, 1900) } }];
}

function estrelas(nota: number): string {
  return `${"★".repeat(nota)}${"☆".repeat(5 - nota)} (${nota})`;
}

function propriedades(dados: {
  nota: number;
  comentario?: string;
  nome?: string;
  publicar?: boolean;
}) {
  const p: Record<string, unknown> = {
    Avaliação: { title: texto(estrelas(dados.nota)) },
    Nota: { number: dados.nota },
  };
  if (dados.comentario !== undefined) p.Comentário = { rich_text: texto(dados.comentario) };
  if (dados.nome !== undefined) p["Nome e negócio"] = { rich_text: texto(dados.nome) };
  if (dados.publicar !== undefined) p["Pode publicar"] = { checkbox: dados.publicar };
  return p;
}

async function notion(caminho: string, metodo: "GET" | "POST" | "PATCH", corpo?: unknown) {
  const token = env("NOTION_TOKEN");
  if (!token) throw new Error("NOTION_TOKEN não configurado");
  const res = await fetch(`https://api.notion.com/v1/${caminho}`, {
    method: metodo,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: corpo ? JSON.stringify(corpo) : undefined,
  });
  if (!res.ok) {
    throw new Error(`Notion respondeu ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
  return (await res.json()) as { id: string; parent?: { data_source_id?: string } };
}

async function criarLinha(propriedadesDaLinha: Record<string, unknown>): Promise<string> {
  const pagina = await notion("pages", "POST", {
    parent: { type: "data_source_id", data_source_id: dataSourceId() },
    properties: propriedadesDaLinha,
  });
  return pagina.id;
}

// Só aceita completar uma linha que pertence à base de avaliações.
async function linhaEhDaBase(id: string): Promise<boolean> {
  const pagina = await notion(`pages/${id}`, "GET");
  const pai = pagina.parent?.data_source_id?.replace(/-/g, "");
  return pai === dataSourceId().replace(/-/g, "");
}

async function avisarPorEmail(d: z.infer<typeof completarSchema>): Promise<void> {
  const key = env("RESEND_API_KEY");
  if (!key) throw new Error("RESEND_API_KEY não configurado");
  const para = env("LEAD_EMAIL_TO") ?? "daniel@sinenberg.com.br";
  const de = env("LEAD_EMAIL_FROM") ?? "Site Sinenberg <onboarding@resend.dev>";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: de,
      to: [para],
      subject: `Avaliação da palestra: ${estrelas(d.nota)}`,
      text: [
        `Nota: ${d.nota} de 5`,
        `Comentário: ${d.comentario || "(sem comentário)"}`,
        `Nome e negócio: ${d.nome || "(não informou)"}`,
        `Pode publicar com o nome: ${d.publicar ? "sim" : "não"}`,
      ].join("\n"),
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend respondeu ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

/** Primeiro toque: grava só a nota e devolve o id da linha para completar depois. */
export const registrarNota = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ nota: notaSchema }).parse(data))
  .handler(async ({ data }) => {
    try {
      const id = await criarLinha(propriedades({ nota: data.nota }));
      return { ok: true, id };
    } catch (err) {
      console.error("[avaliacao] Notion falhou na nota:", err);
      return { ok: false, id: undefined };
    }
  });

/** Comentário opcional: completa a linha criada no toque ou cria uma nova. */
export const completarAvaliacao = createServerFn({ method: "POST" })
  .validator((data: unknown) => completarSchema.parse(data))
  .handler(async ({ data }) => {
    const props = propriedades({
      nota: data.nota,
      comentario: data.comentario,
      nome: data.nome,
      publicar: data.publicar && Boolean(data.nome),
    });
    try {
      if (data.id && (await linhaEhDaBase(data.id))) {
        await notion(`pages/${data.id}`, "PATCH", { properties: props });
      } else {
        await criarLinha(props);
      }
      return { ok: true };
    } catch (err) {
      console.error("[avaliacao] Notion falhou no comentário:", err);
      // Sem Notion, o comentário não pode se perder: vai por e-mail.
      if (data.comentario) {
        try {
          await avisarPorEmail(data);
          return { ok: true };
        } catch (e) {
          console.error("[avaliacao] E-mail também falhou:", e);
        }
      }
      return { ok: false };
    }
  });
