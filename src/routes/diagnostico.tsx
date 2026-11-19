import { createFileRoute } from "@tanstack/react-router";
import v3Css from "../v3.css?url";
import { DiagnosticoV3 } from "@/components/v3/DiagnosticoV3";

// Diagnóstico rápido do site (versão nova). O anterior está em /versao-anterior/diagnostico.
export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico rápido | Sinenberg Consulting" },
      {
        name: "description",
        content:
          "São só 8 perguntas. Em menos de 3 minutos você descobre em que estágio está a sua empresa e o que mais trava o crescimento hoje.",
      },
      { property: "og:title", content: "Diagnóstico rápido | Sinenberg Consulting" },
      { property: "og:description", content: "8 perguntas, menos de 3 minutos: descubra em que estágio está a sua empresa e o que mais trava o crescimento hoje." },
      { property: "og:url", content: "https://www.sinenbergconsulting.com.br/diagnostico" },
    ],
    links: [
      { rel: "canonical", href: "https://www.sinenbergconsulting.com.br/diagnostico" },
      { rel: "preload", href: "/fonts/v3/ApfelGrotezk-Fett.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: v3Css },
    ],
  }),
  component: DiagnosticoV3,
});
