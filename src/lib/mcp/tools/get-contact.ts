import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contact",
  title: "Get contact info",
  description:
    "Returns public contact information and URLs for Sinenberg Consulting, including WhatsApp link and free diagnostic quiz.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const contact = {
      site: "https://www.sinenbergconsulting.com.br",
      diagnostic_quiz: "https://www.sinenbergconsulting.com.br/diagnostico",
      whatsapp: "https://wa.me/5511984083610",
      consultant: "Daniel Sinenberg",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
      structuredContent: contact,
    };
  },
});
