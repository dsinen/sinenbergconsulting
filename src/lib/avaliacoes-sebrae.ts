import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Avaliações da palestra na Feira do Empreendedor (Sebrae-SP, 2026).
// Ficam numa base própria no Notion, separada do CRM, para não misturar nota com lead.

const AVALIACOES_DATA_SOURCE_DEFAULT = "b80cf369-f05f-4c82-b74b-a3d0cb556191";

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : undefined;
}

function estrelas(nota: number): string {
  return `${"★".repeat(nota)}${"☆".repeat(5 - nota)} (${nota})`;
}

export const registrarNota = createServerFn({ method: "POST" })
  .validator((data: unknown) => z.object({ nota: z.number().int().min(1).max(5) }).parse(data))
  .handler(async ({ data }) => {
    const token = env("NOTION_TOKEN");
    if (!token) {
      console.error("[avaliacao] NOTION_TOKEN não configurado");
      return { ok: false };
    }
    const res = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Notion-Version": "2025-09-03",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: {
          type: "data_source_id",
          data_source_id: env("NOTION_AVALIACOES_DATA_SOURCE_ID") ?? AVALIACOES_DATA_SOURCE_DEFAULT,
        },
        properties: {
          Avaliação: { title: [{ type: "text", text: { content: estrelas(data.nota) } }] },
          Nota: { number: data.nota },
        },
      }),
    });
    if (!res.ok) {
      console.error(
        `[avaliacao] Notion respondeu ${res.status}: ${(await res.text()).slice(0, 300)}`,
      );
      return { ok: false };
    }
    return { ok: true };
  });
