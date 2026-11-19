import { createFileRoute } from "@tanstack/react-router";
import v3Css from "../v3.css?url";
import { schemaHomeNova } from "@/lib/seo";
import { HomeV3 } from "@/components/v3/HomeV3";

// Versão nova da home, publicada em endereço próprio para teste antes de trocar a home.
// Fora do Google (noindex) e sem link em nenhuma página do site.
export const Route = createFileRoute("/versao-nova/")({
  head: () => ({
    meta: [
      { title: "Sinenberg Consulting | Crescimento para empresas de tecnologia" },
      {
        name: "description",
        content:
          "Sua empresa de tech cresceu, mas ainda depende demais de você, especialmente em vendas. Consultoria estratégica para crescer com previsibilidade.",
      },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Sinenberg Consulting | Crescimento para empresas de tecnologia" },
      { property: "og:description", content: "Sua empresa de tech cresceu, mas ainda depende demais de você, especialmente em vendas. Consultoria estratégica para crescer com previsibilidade." },
      { property: "og:url", content: "https://www.sinenbergconsulting.com.br/versao-nova" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:title", content: "Sinenberg Consulting | Crescimento para empresas de tecnologia" },
      { name: "twitter:description", content: "Sua empresa de tech cresceu, mas ainda depende demais de você, especialmente em vendas. Consultoria estratégica para crescer com previsibilidade." },
      { "script:ld+json": schemaHomeNova },
    ],
    links: [
      { rel: "canonical", href: "https://www.sinenbergconsulting.com.br/versao-nova" },
      { rel: "preload", href: "/fonts/v3/ApfelGrotezk-Fett.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "preload", href: "/fonts/v3/Ronzino-Regular.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: v3Css },
    ],
  }),
  component: HomeV3,
});
