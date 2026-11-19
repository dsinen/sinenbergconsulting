import { createFileRoute } from "@tanstack/react-router";
import v3Css from "../v3.css?url";
import { DiagnosticoV3 } from "@/components/v3/DiagnosticoV3";

// Diagnóstico da versão nova do site. Fora do Google (noindex).
export const Route = createFileRoute("/versao-nova/diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico rápido | Sinenberg Consulting" },
      {
        name: "description",
        content:
          "São só 8 perguntas. Em menos de 3 minutos você descobre em que estágio está a sua empresa e o que mais trava o crescimento hoje.",
      },
      { name: "robots", content: "noindex,nofollow" },
    ],
    links: [
      { rel: "canonical", href: "https://www.sinenbergconsulting.com.br/versao-nova/diagnostico" },
      { rel: "preload", href: "/fonts/v3/ApfelGrotezk-Fett.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: v3Css },
    ],
  }),
  component: DiagnosticoV3,
});
