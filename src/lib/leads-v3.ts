import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { htmlResultado } from "./email-resultado-v3";
import {
  CARGOS,
  ESTAGIOS,
  FATURAMENTOS,
  PERGUNTAS,
  PILARES,
  calcularResultado,
  mensagemWhatsApp,
  primeiroNome,
  type Resultado,
} from "./diagnostico-v3";

// Lead do diagnóstico do site (/diagnostico, versão nova).
// Grava no mesmo CRM do Notion. Usa as propriedades que já existiam (nome, empresa, e-mail,
// cargo, WhatsApp) e os campos "Diagnóstico: ..." criados em 19/11/2026 para estágio,
// pontuação, pilares e faturamento. Se o Notion recusar os campos novos (por exemplo,
// se alguém renomear um deles), o card é criado só com os campos antigos, para não perder o lead.

export const leadV3Schema = z.object({
  nome: z.string().trim().min(2).max(120),
  email: z.string().trim().toLowerCase().email().max(160),
  whatsapp: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v.replace(/\D/g, "").length >= 10, "WhatsApp incompleto"),
  empresa: z.string().trim().min(2).max(160),
  cargo: z.enum(CARGOS),
  faturamento: z.enum(FATURAMENTOS),
  consentimento: z.literal(true),
  respostas: z.array(z.enum(["A", "B", "C"])).length(PERGUNTAS.length),
  // Campo isca para robôs: pessoas reais nunca preenchem
  website: z.string().max(200).optional(),
});

export type LeadV3 = z.infer<typeof leadV3Schema>;

const NOTION_DATA_SOURCE_DEFAULT = "2be33411-76f0-8103-8c7e-000bad402db2";
const TAG_ORIGEM = "Diagnóstico Site";
const STATUS_INICIAL = "Novo lead (site)";
const MARCA_VERSAO = "Diagnóstico do site";

// O CRM usa outras opções de cargo que o formulário do site.
const CARGO_NO_CRM: Record<LeadV3["cargo"], string> = {
  "Fundador / CEO": "Dono/Fundador",
  Sócio: "Dono/Fundador",
  Diretor: "Diretor ou Gerente",
  Gerente: "Diretor ou Gerente",
  Outro: "Outro",
};

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

function hojeEmSaoPaulo(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function texto(content: string) {
  return [{ type: "text", text: { content: content.slice(0, 1900) } }];
}

function linhasDoResultado(lead: LeadV3, r: Resultado): string[] {
  return [
    `Estágio: ${ESTAGIOS[r.estagio].nome}`,
    `Pontuação: ${r.pontuacao} de 16`,
    ...r.pilares.map((p) => `${p.nome}: ${p.etiqueta}`),
    `Pontos de atenção: ${r.pontos.map((p) => p.ponto).join("; ") || "nenhum"}`,
    `Faturamento informado: ${lead.faturamento}`,
    `Cargo: ${lead.cargo}`,
    `WhatsApp: ${lead.whatsapp}`,
  ];
}

function linhasDasRespostas(lead: LeadV3): string[] {
  return PERGUNTAS.map((q, i) => {
    const l = lead.respostas[i];
    const pilar = PILARES.find((p) => p.id === q.pilar)?.nome ?? "";
    return `${q.n}. ${q.texto} (${pilar}) ${l}: ${q.opcoes[l]}`;
  });
}

// Campos que só entram no card quando o Notion aceita: o WhatsApp no campo de telefone e os
// campos próprios do diagnóstico. Os nomes das opções são iguais aos do site.
function camposDoDiagnostico(lead: LeadV3, r: Resultado) {
  const campos: Record<string, unknown> = {
    "Qual seu número de Telefone com DDD (WhatsApp)?": { phone_number: lead.whatsapp },
    "Diagnóstico: Estágio": { select: { name: ESTAGIOS[r.estagio].nome } },
    "Diagnóstico: Pontuação": { number: r.pontuacao },
    "Diagnóstico: Faturamento": { select: { name: lead.faturamento } },
  };
  for (const p of r.pilares) {
    campos[`Diagnóstico: ${p.nome}`] = { select: { name: p.etiqueta } };
  }
  return campos;
}

function paginaNotion(lead: LeadV3, r: Resultado, dataSourceId: string, comCamposDoDiagnostico = true) {
  const bullet = (t: string) => ({
    object: "block",
    type: "bulleted_list_item",
    bulleted_list_item: { rich_text: texto(t) },
  });
  const h3 = (t: string) => ({ object: "block", type: "heading_3", heading_3: { rich_text: texto(t) } });
  return {
    parent: { type: "data_source_id", data_source_id: dataSourceId },
    properties: {
      Nome: { title: texto(lead.nome) },
      Empresa: { rich_text: texto(lead.empresa) },
      "Qual seu e-mail?": { email: lead.email },
      Origem: { multi_select: [{ name: TAG_ORIGEM }] },
      Status: { select: { name: STATUS_INICIAL } },
      // O nome desta propriedade tem um espaço no final no CRM.
      "Qual seu cargo na empresa? ": { multi_select: [{ name: CARGO_NO_CRM[lead.cargo] }] },
      "Primeiro Ctt": { date: { start: hojeEmSaoPaulo() } },
      ...(comCamposDoDiagnostico ? camposDoDiagnostico(lead, r) : {}),
      Histórico: {
        rich_text: texto(
          [MARCA_VERSAO, ...linhasDoResultado(lead, r)].join(" | "),
        ),
      },
    },
    children: [
      h3("Diagnóstico rápido do site"),
      ...linhasDoResultado(lead, r).map(bullet),
      h3("Respostas"),
      ...linhasDasRespostas(lead).map(bullet),
      {
        object: "block",
        type: "paragraph",
        paragraph: { rich_text: texto(`Consentimento LGPD registrado em ${new Date().toISOString()}.`) },
      },
    ],
  };
}

async function criarPaginaNotion(token: string, corpo: unknown): Promise<Response> {
  return fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": "2025-09-03",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(corpo),
  });
}

async function salvarNoNotion(lead: LeadV3, r: Resultado): Promise<void> {
  const token = env("NOTION_TOKEN");
  if (!token) throw new Error("NOTION_TOKEN não configurado");
  const dataSourceId = env("NOTION_DATA_SOURCE_ID") ?? NOTION_DATA_SOURCE_DEFAULT;
  let res = await criarPaginaNotion(token, paginaNotion(lead, r, dataSourceId));
  if (res.status === 400) {
    // Provável campo novo renomeado ou apagado no CRM. Salva o lead só com os campos antigos.
    console.error("[lead v3] Notion recusou os campos do diagnóstico:", (await res.text()).slice(0, 300));
    res = await criarPaginaNotion(token, paginaNotion(lead, r, dataSourceId, false));
  }
  if (!res.ok) throw new Error(`Notion respondeu ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

async function enviarResend(payload: Record<string, unknown>): Promise<void> {
  const key = env("RESEND_API_KEY");
  if (!key) throw new Error("RESEND_API_KEY não configurado");
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Resend respondeu ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

function remetente(): string {
  return env("LEAD_EMAIL_FROM") ?? "Site Sinenberg <onboarding@resend.dev>";
}

// E-mail para o Daniel, igual ao que o site já manda hoje.
async function avisarDaniel(lead: LeadV3, r: Resultado): Promise<void> {
  const para = env("LEAD_EMAIL_TO") ?? "daniel@sinenberg.com.br";
  await enviarResend({
    from: remetente(),
    to: [para],
    reply_to: lead.email,
    subject: `Diagnóstico do site: ${lead.nome} (${lead.empresa}) · ${ESTAGIOS[r.estagio].nome}`,
    text: [
      `Novo diagnóstico respondido no site.`,
      ``,
      `Nome: ${lead.nome}`,
      `E-mail: ${lead.email}`,
      `Empresa: ${lead.empresa}`,
      ``,
      ...linhasDoResultado(lead, r),
      ``,
      `Respostas:`,
      ...linhasDasRespostas(lead),
      ``,
      `Consentimento LGPD registrado em ${new Date().toISOString()}.`,
    ].join("\n"),
  });
}

// Cópia do resultado para quem fez o diagnóstico. Sai do e-mail do Daniel,
// com o domínio sinenberg.com.br verificado na Resend em 18/11/2026.
// Para desligar sem mexer no código: variável ENVIAR_RESULTADO_AO_LEAD = "nao".
const REMETENTE_RESULTADO = "Daniel Sinenberg <daniel@sinenberg.com.br>";
const RESPONDER_PARA = "daniel@sinenberg.com.br";

function copiaLigada(): boolean {
  return env("ENVIAR_RESULTADO_AO_LEAD") !== "nao";
}

async function enviarCopiaAoLead(lead: LeadV3, r: Resultado): Promise<void> {
  const nome = primeiroNome(lead.nome);
  const e = ESTAGIOS[r.estagio];
  const linhas = [
    `Oi, ${nome}.`,
    ``,
    `Obrigado por fazer o diagnóstico. Segue o seu resultado, para você guardar.`,
    ``,
    `Estágio: ${e.nome}`,
    e.titulo(nome),
    ``,
    `Como estão os seus três pilares`,
    ...r.pilares.map((p) => `${p.nome}: ${p.etiqueta}`),
  ];
  if (r.pontos.length) {
    linhas.push(``, `Seus pontos de atenção e o que fazer primeiro`);
    r.pontos.forEach((p, i) => linhas.push(`${i + 1}. ${p.ponto}: ${p.acao}`));
  }
  linhas.push(
    ``,
    `Se quiser olhar isso junto comigo, é só responder este e-mail ou me chamar no WhatsApp: ${mensagemWhatsApp(r, lead.empresa)}. Em 30 minutos dá para saber por onde começar.`,
    ``,
    `Daniel Sinenberg`,
    `Sinenberg Consulting`,
    `sinenbergconsulting.com.br`,
  );
  await enviarResend({
    from: REMETENTE_RESULTADO,
    to: [lead.email],
    reply_to: RESPONDER_PARA,
    subject: `${nome}, o resultado do seu diagnóstico`,
    html: htmlResultado(nome, lead.empresa, r),
    text: linhas.join("\n"),
  });
}

export const registrarDiagnosticoV3 = createServerFn({ method: "POST" })
  .validator((data: unknown) => leadV3Schema.parse(data))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true, copiaEnviada: false };

    // O servidor recalcula o resultado a partir das respostas.
    const r = calcularResultado(data.respostas, data.faturamento);
    const tarefas = [salvarNoNotion(data, r), avisarDaniel(data, r)];
    const comCopia = copiaLigada();
    if (comCopia) tarefas.push(enviarCopiaAoLead(data, r));

    const [notion, email, copia] = await Promise.allSettled(tarefas);
    if (notion.status === "rejected") console.error("[lead v3] Notion falhou:", notion.reason);
    if (email.status === "rejected") console.error("[lead v3] E-mail falhou:", email.reason);
    if (copia?.status === "rejected") console.error("[lead v3] Cópia ao lead falhou:", copia.reason);

    return {
      ok: notion.status === "fulfilled" || email.status === "fulfilled",
      copiaEnviada: comCopia && copia?.status === "fulfilled",
    };
  });
