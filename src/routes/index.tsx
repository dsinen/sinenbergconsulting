import { createFileRoute } from "@tanstack/react-router";
import v3Css from "../v3.css?url";
import { schemaHomeNova } from "@/lib/seo";
import { HomeV3 } from "@/components/v3/HomeV3";

// Home do site (versão nova, no ar desde 19/11/2026). A home anterior está em /versao-anterior.
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sinenberg Consulting | Crescimento para empresas de tecnologia" },
      {
        name: "description",
        content:
          "Sua empresa de tech cresceu, mas ainda depende demais de você, especialmente em vendas. Consultoria estratégica para crescer com previsibilidade.",
      },
      { property: "og:title", content: "Sinenberg Consulting | Crescimento para empresas de tecnologia" },
      { property: "og:description", content: "Sua empresa de tech cresceu, mas ainda depende demais de você, especialmente em vendas. Consultoria estratégica para crescer com previsibilidade." },
      { property: "og:url", content: "https://www.sinenbergconsulting.com.br/" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:title", content: "Sinenberg Consulting | Crescimento para empresas de tecnologia" },
      { name: "twitter:description", content: "Sua empresa de tech cresceu, mas ainda depende demais de você, especialmente em vendas. Consultoria estratégica para crescer com previsibilidade." },
      { "script:ld+json": schemaHomeNova },
    ],
    links: [
      { rel: "canonical", href: "https://www.sinenbergconsulting.com.br/" },
      { rel: "preload", href: "/fonts/v3/ApfelGrotezk-Fett.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/v3/Ronzino-Regular.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: v3Css },
    ],
  }),
  component: HomeV3,
});
