import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_methodology",
  title: "Get methodology",
  description:
    "Returns the three pillars of the Sinenberg 'Crescimento Estruturado' methodology (Direção, Estrutura, Escala).",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const pillars = [
      { pillar: "Direção", description: "Clareza de rumo, foco de mercado e prioridades executivas." },
      { pillar: "Estrutura", description: "Processos, governança e operação para destravar execução." },
      { pillar: "Escala", description: "Plano de crescimento com metas, indicadores e cadência." },
    ];
    return {
      content: [{ type: "text", text: JSON.stringify(pillars, null, 2) }],
      structuredContent: { pillars },
    };
  },
});
