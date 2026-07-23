import { defineMcp } from "@lovable.dev/mcp-js";
import getServicesTool from "./tools/get-services";
import getMethodologyTool from "./tools/get-methodology";
import getContactTool from "./tools/get-contact";

export default defineMcp({
  name: "sinenberg-consulting-mcp",
  title: "Sinenberg Consulting MCP",
  version: "0.1.0",
  instructions:
    "Public read-only tools describing Sinenberg Consulting: services offered, the 'Crescimento Estruturado' methodology, and contact info.",
  tools: [getServicesTool, getMethodologyTool, getContactTool],
});
