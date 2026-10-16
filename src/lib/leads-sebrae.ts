import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Contatos que chegam pela página da palestra na Feira do Empreendedor (Sebrae-SP, 2026).
// Mesmo destino do diagnóstico: CRM no Notion e aviso por e-mail.

export const ESTAGIOS = [
  "Ainda não abri o negócio",
  "Começando: menos de 1 ano vendendo",
  "Validado: tenho clientes, mas faço quase tudo sozinho",
  "Crescendo: tenho equipe, mas as vendas ainda dependem de mim",
  "Estruturado: tenho equipe e processo, quero escalar",
] as const;

export const FATURAMENTOS = [
  "Ainda não faturo",
  "Até R$ 360 mil por ano (até R$ 30 mil por mês)",
  "De R$ 360 mil a R$ 1 milhão por ano (R$ 30 a 80 mil por mês)",
  "De R$ 1 a 5 milhões por ano (R$ 80 a 400 mil por mês)",
  "Acima de R$ 5 milhões por ano",
] as const;

export const INTERESSE_PITCH = "Que você leia o meu pitch";
export const INTERESSE_SESSAO = "Uma sessão de clareza estratégica, sem custo";

export const INTERESSES = [
  INTERESSE_PITCH,
  "Organizar as vendas do meu negócio",
  "Organizar a estratégia da empresa",
  INTERESSE_SESSAO,
] as const;

export const leadSebraeSchema = z.object({
  nome: z.string().trim().min(3).max(120),
  whatsapp: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v.replace(/\D/g, "").length >= 10, "WhatsApp com DDD"),
  email: z.string().trim().toLowerCase().email().max(160),
  empresa: z.string().trim().max(160),
  estagio: z.enum(ESTAGIOS),
  faturamento: z.enum(FATURAMENTOS),
  interesses: z.array(z.enum(INTERESSES)).max(4),
  pitch: z.string().trim().max(1800),
  consentimento: z.literal(true),
  // Campo isca para robôs: pessoas reais nunca preenchem
  website: z.string().max(200).optional(),
});

export type LeadSebrae = z.infer<typeof leadSebraeSchema>;

const NOTION_DATA_SOURCE_DEFAULT = "2be33411-76f0-8103-8c7e-000bad402db2";
const ORIGENS = ["Evento", "Sebrae FE26"];
const STATUS_INICIAL = "Novo lead (site)";

// Só preenche a faixa do CRM quando ela é fiel ao que a pessoa respondeu.
const FATURAMENTO_NO_CRM: Partial<Record<LeadSebrae["faturamento"], string>> = {
  "De R$ 1 a 5 milhões por ano (R$ 80 a 400 mil por mês)": "Até R$5MM/ano",
};

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

function querSessao(lead: LeadSebrae): boolean {
  return lead.interesses.includes(INTERESSE_SESSAO);
}

export function resumoDoLeadSebrae(lead: LeadSebrae): string {
  return [
    querSessao(lead) ? "QUER SESSÃO DE CLAREZA" : "",
    "Palestra Sebrae FE26 (20/10/2026)",
    `Estágio: ${lead.estagio}`,
    `Faturamento: ${lead.faturamento}`,
    `Interesse: ${lead.interesses.join("; ") || "não marcou"}`,
    `Pitch: ${temPitch(lead) ? "enviado, ver corpo da página" : "não mandou"}`,
  ]
    .filter(Boolean)
    .join(" | ");
}

export function textoDoEmailSebrae(lead: LeadSebrae): string {
  return [
    "Novo contato pela página da palestra do Sebrae.",
    querSessao(lead) ? "Pediu sessão de clareza estratégica." : "",
    "",
    `Nome: ${lead.nome}`,
    `WhatsApp: ${lead.whatsapp}`,
    `E-mail: ${lead.email}`,
    `Empresa: ${lead.empresa || "não informada"}`,
    `Estágio: ${lead.estagio}`,
    `Faturamento: ${lead.faturamento}`,
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
    "Qual seu e-mail?": { email: lead.email },
    Origem: { multi_select: ORIGENS.map((name) => ({ name })) },
    // Se a opção ainda não existir no CRM, o Notion a cria no primeiro lead.
    Status: { select: { name: STATUS_INICIAL } },
    "Primeiro Ctt": { date: { start: hojeEmSaoPaulo() } },
    Histórico: { rich_text: texto(resumoDoLeadSebrae(lead)) },
  };
  if (lead.empresa) properties.Empresa = { rich_text: texto(lead.empresa) };
  const faixa = FATURAMENTO_NO_CRM[lead.faturamento];
  if (faixa) properties["Qual seu faturamento anual?"] = { multi_select: [{ name: faixa }] };

  return {
    parent: { type: "data_source_id", data_source_id: dataSourceId },
    properties,
    children: [
      {
        object: "block",
        type: "heading_3",
        heading_3: { rich_text: texto("Palestra Sebrae FE26 (página /sebrae)") },
      },
      ...(querSessao(lead) ? [item("Pediu sessão de clareza estratégica, sem custo.")] : []),
      item(`Estágio: ${lead.estagio}`),
      item(`Faturamento: ${lead.faturamento}`),
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
  const prefixo = querSessao(lead) ? "[Sessão] " : "";
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: de,
      to: [para],
      reply_to: lead.email,
      subject: `${prefixo}Palestra Sebrae: ${lead.nome}${lead.empresa ? ` (${lead.empresa})` : ""}`,
      text: textoDoEmailSebrae(lead),
    }),
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
