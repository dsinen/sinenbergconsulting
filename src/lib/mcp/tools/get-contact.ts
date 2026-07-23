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
      site: "https://sinenbergconsulting.lovable.app",
      diagnostic_quiz: "https://sinenbergconsulting.lovable.app/diagnostico",
      whatsapp: "https://wa.me/5511999999999",
      consultant: "Daniel Sinenberg",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(contact, null, 2) }],
      structuredContent: contact,
    };
  },
});
