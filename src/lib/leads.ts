import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// ─────────────────────────── Tipos e validação ───────────────────────────

const answerSchema = z.object({
  n: z.number().int().min(1).max(20),
  titulo: z.string().max(120),
  letra: z.enum(["A", "B", "C"]),
  texto: z.string().max(400),
  pontos: z.number().int().min(0).max(10),
});

export const leadSchema = z.object({
  nome: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(160),
  empresa: z.string().trim().min(2).max(160),
  faturamento: z.string().trim().min(1).max(60),
  papel: z.string().trim().min(1).max(80),
  consentimento: z.literal(true),
  // Resultado do diagnóstico
  estagio: z.enum(["A", "B", "C", "D"]),
  pontuacao: z.number().int().min(0).max(40),
  pontosCriticos: z.array(z.string().max(120)).max(5),
  respostas: z.array(answerSchema).max(20),
  // Campo isca para robôs: pessoas reais nunca preenchem
  website: z.string().max(200).optional(),
});

export type LeadInput = z.infer<typeof leadSchema>;

// Mesmos nomes que a pessoa vê na tela de resultado do diagnóstico.
const ESTAGIOS: Record<LeadInput["estagio"], string> = {
  A: "A · Ainda não é o momento (abaixo de R$1M)",
  B: "B · Crescimento frágil",
  C: "C · Crescimento em risco",
  D: "D · Pronto para escalar",
};

// O CRM usa outras opções de cargo que o formulário do site.
const CARGO_NO_CRM: Record<string, string> = {
  "Fundador / CEO": "Dono/Fundador",
  "C-level (CFO, CRO, COO, etc.)": "CEO/COO Presidente ou Gerente Geral",
  Diretor: "Diretor ou Gerente",
  Gerente: "Diretor ou Gerente",
  Outro: "Outro",
};

const NOTION_DATA_SOURCE_DEFAULT = "2be33411-76f0-8103-8c7e-000bad402db2";
const TAG_ORIGEM = "Diagnóstico Site";
const STATUS_INICIAL = "Novo lead (site)";

// ─────────────────────────── Montagem dos textos ───────────────────────────

function hojeEmSaoPaulo(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

export function resumoDoLead(lead: LeadInput): string {
  const criticos = lead.pontosCriticos.length ? lead.pontosCriticos.join("; ") : "não identificado";
  return [
    `Estágio ${ESTAGIOS[lead.estagio]}`,
    `Pontuação ${lead.pontuacao} de 21`,
    `Faturamento informado: ${lead.faturamento}`,
    `Papel: ${lead.papel}`,
    `Pontos críticos: ${criticos}`,
  ].join(" | ");
}

export function textoDoEmail(lead: LeadInput): string {
  const linhas = [
    `Novo diagnóstico respondido no site.`,
    ``,
    `Nome: ${lead.nome}`,
    `E-mail: ${lead.email}`,
    `Empresa: ${lead.empresa}`,
    `Papel: ${lead.papel}`,
    `Faturamento: ${lead.faturamento}`,
    ``,
    `Estágio: ${ESTAGIOS[lead.estagio]}`,
    `Pontuação: ${lead.pontuacao} de 21`,
    `Pontos críticos: ${lead.pontosCriticos.join("; ") || "não identificado"}`,
    ``,
    `Respostas:`,
    ...lead.respostas.map((r) => `${r.n}. ${r.titulo}: ${r.letra} (${r.pontos} pts) ${r.texto}`),
    ``,
    `Consentimento LGPD registrado em ${new Date().toISOString()}.`,
  ];
  return linhas.join("\n");
}

function texto(content: string) {
  // A API do Notion limita cada trecho de texto a 2000 caracteres.
  return [{ type: "text", text: { content: content.slice(0, 1900) } }];
}

export function paginaNotion(lead: LeadInput, dataSourceId: string) {
  return {
    parent: { type: "data_source_id", data_source_id: dataSourceId },
    properties: {
      Nome: { title: texto(lead.nome) },
      Empresa: { rich_text: texto(lead.empresa) },
      "Qual seu e-mail?": { email: lead.email },
      Origem: { multi_select: [{ name: TAG_ORIGEM }] },
      // Se a opção ainda não existir no CRM, o Notion a cria no primeiro lead.
      Status: { select: { name: STATUS_INICIAL } },
      // O nome desta propriedade tem um espaço no final no CRM.
      "Qual seu cargo na empresa? ": {
        multi_select: [{ name: CARGO_NO_CRM[lead.papel] ?? "Outro" }],
      },
      "Primeiro Ctt": { date: { start: hojeEmSaoPaulo() } },
      Histórico: { rich_text: texto(resumoDoLead(lead)) },
    },
    children: [
      {
        object: "block",
        type: "heading_3",
        heading_3: { rich_text: texto("Diagnóstico Rápido (site)") },
      },
      ...[
        `Estágio: ${ESTAGIOS[lead.estagio]}`,
        `Pontuação: ${lead.pontuacao} de 21`,
        `Faturamento informado: ${lead.faturamento}`,
        `Pontos críticos: ${lead.pontosCriticos.join("; ") || "não identificado"}`,
      ].map((t) => ({
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: { rich_text: texto(t) },
      })),
      {
        object: "block",
        type: "heading_3",
        heading_3: { rich_text: texto("Respostas") },
      },
      ...lead.respostas.map((r) => ({
        object: "block",
        type: "bulleted_list_item",
        bulleted_list_item: {
          rich_text: texto(`${r.n}. ${r.titulo}: ${r.letra} (${r.pontos} pts). ${r.texto}`),
        },
      })),
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

// ─────────────────────────── Envios ───────────────────────────

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

async function salvarNoNotion(lead: LeadInput): Promise<void> {
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
    body: JSON.stringify(paginaNotion(lead, dataSourceId)),
  });
  if (!res.ok) {
    throw new Error(`Notion respondeu ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

async function enviarEmail(lead: LeadInput): Promise<void> {
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
      reply_to: lead.email,
      subject: `Diagnóstico no site: ${lead.nome} (${lead.empresa}) · estágio ${lead.estagio}`,
      text: textoDoEmail(lead),
    }),
  });
  if (!res.ok) {
    throw new Error(`Resend respondeu ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

// ─────────────────────────── Função chamada pelo site ───────────────────────────

export const registrarDiagnostico = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    // Robô preencheu o campo isca: finge que deu certo e não grava nada.
    if (data.website) return { ok: true };

    const [notion, email] = await Promise.allSettled([salvarNoNotion(data), enviarEmail(data)]);
    if (notion.status === "rejected") console.error("[lead] Notion falhou:", notion.reason);
    if (email.status === "rejected") console.error("[lead] E-mail falhou:", email.reason);

    // Só consideramos perdido se os dois falharem. Nesse caso o log acima
    // é o único registro, então o site não esconde o erro de quem opera.
    const salvo = notion.status === "fulfilled" || email.status === "fulfilled";
    return { ok: salvo };
  });
