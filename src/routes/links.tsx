import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@iconify/react";
import logoDark from "@/assets/logo-dark.png";
import danielPhoto from "@/assets/daniel-about.jpg";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "Daniel Sinenberg | Sinenberg Consulting" },
      {
        name: "description",
        content:
          "Estruturo o crescimento de empresas que ainda dependem do dono para tudo. Diagnóstico gratuito, consultoria e contato direto.",
      },
      { property: "og:title", content: "Daniel Sinenberg | Sinenberg Consulting" },
      {
        property: "og:description",
        content: "Estruturo o crescimento de empresas que ainda dependem do dono para tudo.",
      },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: LinksPage,
});

const WHATSAPP =
  "https://wa.me/5511984083610?text=" +
  encodeURIComponent(
    "Olá Daniel, vi seu link e gostaria de agendar uma conversa de 30 minutos.",
  );
const INSTAGRAM = "https://www.instagram.com/danielsinenberg";
const LINKEDIN = "https://www.linkedin.com/in/danielsinenberg/";

type Botao = {
  titulo: string;
  detalhe: string;
  icone: string;
  destaque?: boolean;
} & ({ to: "/diagnostico" | "/" | "/clinicas" } | { href: string });

const botoes: Botao[] = [
  {
    titulo: "Descubra em 3 minutos em que estágio sua empresa está",
    detalhe: "Diagnóstico Rápido, gratuito",
    icone: "solar:chart-2-outline",
    to: "/diagnostico",
    destaque: true,
  },
  {
    titulo: "Converse comigo no WhatsApp",
    detalhe: "Conversa inicial de 30 minutos",
    icone: "ic:baseline-whatsapp",
    href: WHATSAPP,
  },
  {
    titulo: "Conheça a consultoria",
    detalhe: "Para empresas tech B2B que dependem do fundador em vendas",
    icone: "solar:compass-outline",
    to: "/",
  },
  {
    titulo: "Para clínicas",
    detalhe: "Clínica Estruturada, a clínica que não depende do médico para tudo girar",
    icone: "solar:stethoscope-outline",
    to: "/clinicas",
  },
];

function LinksPage() {
  return (
    <div className="min-h-screen bg-[#0B2A5B] text-white flex flex-col items-center px-4 py-10 md:py-14">
      <main className="w-full max-w-[460px] flex flex-col items-center">
        <img
          src={danielPhoto}
          alt="Daniel Sinenberg"
          className="h-28 w-28 rounded-full object-cover object-top ring-2 ring-[#2EC4FF]/70"
        />
        <h1 className="mt-5 font-serif text-3xl font-medium">Daniel Sinenberg</h1>
        <p className="mt-1 text-sm text-[#2EC4FF]">Sinenberg Consulting</p>
        <p className="mt-4 text-center text-[15px] leading-relaxed text-white/85">
          Estruturo o crescimento de empresas que ainda dependem do dono para tudo.
        </p>

        <ul className="mt-8 w-full space-y-3">
          {botoes.map((b) => {
            const classe = `group flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left transition-transform duration-150 hover:-translate-y-0.5 ${
              b.destaque
                ? "bg-[#2EC4FF] text-[#0B2A5B]"
                : "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15"
            }`;
            const conteudo = (
              <>
                <Icon icon={b.icone} className="shrink-0 text-2xl" />
                <span className="flex flex-col">
                  <span className="font-serif text-[17px] font-medium leading-snug">{b.titulo}</span>
                  <span
                    className={`mt-0.5 text-[13px] leading-snug ${
                      b.destaque ? "text-[#0B2A5B]/75" : "text-white/65"
                    }`}
                  >
                    {b.detalhe}
                  </span>
                </span>
              </>
            );
            return (
              <li key={b.titulo}>
                {"to" in b ? (
                  <Link to={b.to} className={classe}>
                    {conteudo}
                  </Link>
                ) : (
                  <a href={b.href} target="_blank" rel="noopener noreferrer" className={classe}>
                    {conteudo}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex items-center gap-5 text-white/80">
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de Daniel Sinenberg" className="hover:text-[#2EC4FF]">
            <Icon icon="ri:linkedin-fill" className="text-2xl" />
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram @danielsinenberg" className="hover:text-[#2EC4FF]">
            <Icon icon="ri:instagram-line" className="text-2xl" />
          </a>
          <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-[#2EC4FF]">
            <Icon icon="ic:baseline-whatsapp" className="text-2xl" />
          </a>
        </div>

        <Link to="/" aria-label="Sinenberg Consulting, início" className="mt-10">
          <img src={logoDark} alt="Sinenberg Consulting" className="h-20 w-auto opacity-90" />
        </Link>
        <Link to="/privacidade" className="mt-2 text-xs text-white/50 hover:text-white/80 underline">
          Política de Privacidade
        </Link>
      </main>
    </div>
  );
}
