import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const LeadSchema = z.object({
  nome: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  empresa: z.string().trim().min(2).max(150),
  faturamento: z.string().trim().max(60),
  papel: z.string().trim().max(80),
  score: z.number().int().min(0).max(21),
  resultado: z.string().trim().max(120),
  pontosCriticos: z.array(z.string().trim().max(150)).max(7),
});

function mapCargo(papel: string): string {
  if (papel.startsWith("Fundador")) return "Dono/Fundador";
  if (papel.startsWith("C-level")) return "CEO/COO Presidente ou Gerente Geral";
  if (papel === "Diretor" || papel === "Gerente" || papel.startsWith("Diretor ou Gerente"))
    return "Diretor ou Gerente";
  return "Outro";
}

function mapFaturamento(f: string): string | null {
  switch (f) {
    case "Abaixo de R$1M":
    case "R$1M a R$5M":
      return "Até R$5MM/ano";
    case "R$5M a R$15M":
      return "De 5 a R$20MM/ano";
    case "R$15M a R$50M":
      return "De 20 a R$50MM/ano";
    case "Acima de R$50M":
      return "De 50 a R$100MM/ano";
    default:
      return null;
  }
}

const text = (content: string) => [{ type: "text", text: { content: content.slice(0, 1900) } }];

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
        }
        const parsed = LeadSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ ok: false, error: "invalid_input" }, { status: 400 });
        }
        const lead = parsed.data;

        const token = process.env["NOTION_TOKEN"];
        const dataSourceId = process.env["NOTION_DATA_SOURCE_ID"];
        if (!token || !dataSourceId) {
          console.error("[lead] NOTION_TOKEN ou NOTION_DATA_SOURCE_ID não configurados");
          return Response.json({ ok: false, error: "not_configured" }, { status: 500 });
        }

        const dataEnvio = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });
        const historico = [
          `Data do envio: ${dataEnvio}`,
          `Faturamento informado: ${lead.faturamento}`,
          `Pontuação: ${lead.score}/21`,
          `Resultado: ${lead.resultado}`,
          `Pontos críticos: ${lead.pontosCriticos.join("; ") || "-"}`,
        ].join("\n");

        const faturamentoTag = mapFaturamento(lead.faturamento);
        const properties: Record<string, unknown> = {
          Nome: { title: text(lead.nome) },
          Empresa: { rich_text: text(lead.empresa) },
          "Qual seu e-mail?": { email: lead.email },
          "Qual seu cargo na empresa? ": { multi_select: [{ name: mapCargo(lead.papel) }] },
          Origem: { multi_select: [{ name: "Diagnóstico Site" }] },
          "Histórico": { rich_text: text(historico) },
        };
        if (faturamentoTag) {
          properties["Qual seu faturamento anual?"] = { multi_select: [{ name: faturamentoTag }] };
        }

        try {
          const res = await fetch("https://api.notion.com/v1/pages", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Notion-Version": "2025-09-03",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              parent: { type: "data_source_id", data_source_id: dataSourceId },
              properties,
            }),
          });
          if (!res.ok) {
            const errText = await res.text();
            console.error(`[lead] Notion falhou [${res.status}]: ${errText}`);
            return Response.json({ ok: false, error: "notion_error" }, { status: 502 });
          }
          return Response.json({ ok: true });
        } catch (err) {
          console.error("[lead] Erro ao chamar Notion:", err);
          return Response.json({ ok: false, error: "notion_unreachable" }, { status: 502 });
        }
      },
    },
  },
});
