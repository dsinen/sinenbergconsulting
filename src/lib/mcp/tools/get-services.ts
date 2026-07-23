import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_services",
  title: "Get services",
  description:
    "Returns the list of consulting services offered by Sinenberg Consulting, with a short description of each.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const services = [
      {
        name: "Direção estratégica",
        summary:
          "Diagnóstico e definição de rumo para o negócio: posicionamento, foco de mercado e prioridades executivas.",
      },
      {
        name: "Estrutura operacional",
        summary:
          "Desenho da operação, processos e governança para reduzir a dependência do fundador e destravar execução.",
      },
      {
        name: "Escala e crescimento",
        summary:
          "Plano de crescimento estruturado com metas, indicadores e cadência de execução para escalar receita e margem.",
      },
    ];
    return {
      content: [{ type: "text", text: JSON.stringify(services, null, 2) }],
      structuredContent: { services },
    };
  },
});
