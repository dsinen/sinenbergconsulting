import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Contatos que chegam pela página da palestra na Feira do Empreendedor (Sebrae-SP, 2026).
// Mesmo destino do diagnóstico: CRM no Notion e aviso por e-mail.

export const FASES = [
  "Ainda não abri o negócio",
  "Faturo até R$ 1 milhão por ano",
  "Faturo de R$ 1 a 5 milhões por ano",
  "Faturo mais de R$ 5 milhões por ano",
] as const;

export const INTERESSES = [
  "Que você leia o meu pitch",
  "Organizar as vendas do meu negócio",
  "Receber conteúdos como esse",
] as const;

export const leadSebraeSchema = z.object({
  nome: z.string().trim().min(2).max(120),
  whatsapp: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v.replace(/\D/g, "").length >= 10, "WhatsApp com DDD"),
  email: z.union([z.literal(""), z.string().trim().toLowerCase().email().max(160)]),
  negocio: z.string().trim().max(160),
  fase: z.enum(FASES),
  interesses: z.array(z.enum(INTERESSES)).max(3),
  pitch: z.string().trim().max(1800),
  consentimento: z.literal(true),
  // Campo isca para robôs: pessoas reais nunca preenchem
  website: z.string().max(200).optional(),
});

export type LeadSebrae = z.infer<typeof leadSebraeSchema>;

const NOTION_DATA_SOURCE_DEFAULT = "2be33411-76f0-8103-8c7e-000bad402db2";
const ORIGENS = ["Evento", "Sebrae FE26"];
const STATUS_INICIAL = "Novo lead (site)";

function hojeEmSaoPaulo(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function temPitch(lead: LeadSebrae): boolean {
  return lead.pitch.trim().length > 0;
}

export function resumoDoLeadSebrae(lead: LeadSebrae): string {
  return [
    "Palestra Sebrae FE26 (20/10/2026)",
    `Fase: ${lead.fase}`,
    `Interesse: ${lead.interesses.join("; ") || "não marcou"}`,
    `Pitch: ${temPitch(lead) ? "enviado, ver corpo da página" : "não mandou"}`,
  ].join(" | ");
}

export function textoDoEmailSebrae(lead: LeadSebrae): string {
  return [
    "Novo contato pela página da palestra do Sebrae.",
    "",
    `Nome: ${lead.nome}`,
    `WhatsApp: ${lead.whatsapp}`,
    `E-mail: ${lead.email || "não informado"}`,
    `Negócio: ${lead.negocio || "não informado"}`,
    `Fase: ${lead.fase}`,
    `Interesse: ${lead.interesses.join("; ") || "não marcou"}`,
    "",
    "Pitch:",
    temPitch(lead) ? lead.pitch : "não mandou",
    "",
    `Consentimento LGPD registrado em ${new Date().toISOString()}.`,
  ].join("\n");
}

function texto(content: string) {
  // A API do Notion limita cada trecho de texto a 2000 caracteres.
  return [{ type: "text", text: { content: content.slice(0, 1900) } }];
}

function item(t: string) {
  return {
    object: "block",
    type: "bulleted_list_item",
    bulleted_list_item: { rich_text: texto(t) },
  };
}

export function paginaNotionSebrae(lead: LeadSebrae, dataSourceId: string) {
  const digitos = lead.whatsapp.replace(/\D/g, "");
  const telefone = digitos.startsWith("55") ? `+${digitos}` : `+55${digitos}`;
  const properties: Record<string, unknown> = {
    Nome: { title: texto(lead.nome) },
    "Qual seu número de Telefone com DDD (WhatsApp)?": { phone_number: telefone },
    Origem: { multi_select: ORIGENS.map((name) => ({ name })) },
    // Se a opção ainda não existir no CRM, o Notion a cria no primeiro lead.
    Status: { select: { name: STATUS_INICIAL } },
    "Primeiro Ctt": { date: { start: hojeEmSaoPaulo() } },
    Histórico: { rich_text: texto(resumoDoLeadSebrae(lead)) },
  };
  if (lead.negocio) properties.Empresa = { rich_text: texto(lead.negocio) };
  if (lead.email) properties["Qual seu e-mail?"] = { email: lead.email };

  return {
    parent: { type: "data_source_id", data_source_id: dataSourceId },
    properties,
    children: [
      {
        object: "block",
        type: "heading_3",
        heading_3: { rich_text: texto("Palestra Sebrae FE26 (página /sebrae)") },
      },
      item(`Fase: ${lead.fase}`),
      item(`Interesse: ${lead.interesses.join("; ") || "não marcou"}`),
      {
        object: "block",
        type: "heading_3",
        heading_3: { rich_text: texto("Pitch que a pessoa mandou") },
      },
      {
        object: "block",
        type: "quote",
        quote: { rich_text: texto(temPitch(lead) ? lead.pitch : "Não mandou pitch.") },
      },
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: texto(`Consentimento LGPD registrado em ${new Date().toISOString()}.`),
        },
      },
    ],
  };
}

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

async function salvarNoNotion(lead: LeadSebrae): Promise<void> {
  const token = env("NOTION_TOKEN");
  if (!token) throw new Error("NOTION_TOKEN não configurado");
  const dataSourceId = env("NOTION_DATA_SOURCE_ID") ?? NOTION_DATA_SOURCE_DEFAULT;
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2025-09-03",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paginaNotionSebrae(lead, dataSourceId)),
  });
  if (!res.ok) {
    throw new Error(`Notion respondeu ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

async function enviarEmail(lead: LeadSebrae): Promise<void> {
  const key = env("RESEND_API_KEY");
  if (!key) throw new Error("RESEND_API_KEY não configurado");
  const para = env("LEAD_EMAIL_TO") ?? "daniel@sinenberg.com.br";
  const de = env("LEAD_EMAIL_FROM") ?? "Site Sinenberg <onboarding@resend.dev>";
  const corpo: Record<string, unknown> = {
    from: de,
    to: [para],
    subject: `Palestra Sebrae: ${lead.nome}${lead.negocio ? ` (${lead.negocio})` : ""}`,
    text: textoDoEmailSebrae(lead),
  };
  if (lead.email) corpo.reply_to = lead.email;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  });
  if (!res.ok) {
    throw new Error(`Resend respondeu ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

export const registrarContatoSebrae = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadSebraeSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true };

    const [notion, email] = await Promise.allSettled([salvarNoNotion(data), enviarEmail(data)]);
    if (notion.status === "rejected") console.error("[sebrae] Notion falhou:", notion.reason);
    if (email.status === "rejected") console.error("[sebrae] E-mail falhou:", email.reason);

    return { ok: notion.status === "fulfilled" || email.status === "fulfilled" };
  });
