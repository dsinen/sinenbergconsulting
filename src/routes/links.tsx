import { createFileRoute, Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  ChartNoAxesColumn,
  Compass,
  Instagram,
  Linkedin,
  MessageCircle,
  Stethoscope,
} from "lucide-react";
import logoSemTag from "@/assets/logo-notag-dark.png";
import danielPhoto from "@/assets/daniel-links.jpg";

export const Route = createFileRoute("/links")({
  head: () => ({
    meta: [
      { title: "Daniel Sinenberg | Sinenberg Consulting" },
      {
        name: "description",
        content:
          "Estruturo o crescimento de empresas que ainda dependem do dono para tudo. Diagnóstico gratuito, consultoria para empresas tech e para clínicas médicas.",
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
  encodeURIComponent("Olá Daniel, vi seu link e gostaria de agendar uma conversa.");
const INSTAGRAM = "https://www.instagram.com/danielsinenberg";
const LINKEDIN = "https://www.linkedin.com/in/danielsinenberg/";

type Botao = {
  titulo: string;
  detalhe?: string;
  Icone: LucideIcon;
  destaque?: boolean;
} & ({ to: "/diagnostico" | "/" | "/clinicas" } | { href: string });

const botoes: Botao[] = [
  {
    titulo: "Descubra em 3 minutos em que estágio de maturidade está sua empresa",
    Icone: ChartNoAxesColumn,
    to: "/diagnostico",
    destaque: true,
  },
  {
    titulo: "Converse comigo no WhatsApp",
    Icone: MessageCircle,
    href: WHATSAPP,
  },
  {
    titulo: "Conheça a consultoria para empresas de Tecnologia",
    detalhe: "Crescimento estruturado, receita previsível",
    Icone: Compass,
    to: "/",
  },
  {
    titulo: "Conheça a consultoria para clínicas médicas",
    detalhe: "A clínica funcionando como empresa, sem depender do médico para tudo girar",
    Icone: Stethoscope,
    to: "/clinicas",
  },
];

const estilos = `
  .lk-root { background: #06143A; }
  .lk-aurora { position: fixed; inset: 0; overflow: hidden; pointer-events: none; }
  .lk-blob { position: absolute; border-radius: 9999px; filter: blur(90px); opacity: .55; will-change: transform; }
  .lk-b1 { width: 460px; height: 460px; background: #1F6FDB; top: -140px; left: -120px; animation: lk-drift1 18s ease-in-out infinite alternate; }
  .lk-b2 { width: 420px; height: 420px; background: #2EC4FF; top: 38%; right: -160px; opacity: .35; animation: lk-drift2 22s ease-in-out infinite alternate; }
  .lk-b3 { width: 520px; height: 520px; background: #0B2A5B; bottom: -200px; left: 10%; opacity: .9; animation: lk-drift1 26s ease-in-out infinite alternate-reverse; }
  @keyframes lk-drift1 { to { transform: translate3d(90px, 70px, 0) scale(1.15); } }
  @keyframes lk-drift2 { to { transform: translate3d(-110px, -60px, 0) scale(1.1); } }

  .lk-hero-img { -webkit-mask-image: linear-gradient(to bottom, #000 68%, transparent 100%), linear-gradient(to right, transparent 0, #000 14%, #000 86%, transparent 100%); -webkit-mask-composite: source-in; mask-image: linear-gradient(to bottom, #000 68%, transparent 100%), linear-gradient(to right, transparent 0, #000 14%, #000 86%, transparent 100%); mask-composite: intersect; }

  @media (min-width: 520px) {
    .lk-hero-img { -webkit-mask-image: linear-gradient(to bottom, #000 52%, transparent 98%), linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%); -webkit-mask-composite: source-in; mask-image: linear-gradient(to bottom, #000 52%, transparent 98%), linear-gradient(to right, transparent 0, #000 12%, #000 88%, transparent 100%); mask-composite: intersect; }
  }

  .lk-up { opacity: 0; transform: translateY(16px); animation: lk-up .7s cubic-bezier(.2,.7,.2,1) forwards; }
  @keyframes lk-up { to { opacity: 1; transform: none; } }

  .lk-card { position: relative; overflow: hidden; background: rgba(255,255,255,.09); border: 1px solid rgba(255,255,255,.22); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); transition: transform .18s ease, background .18s ease, border-color .18s ease; }
  .lk-card:hover { transform: translateY(-3px); background: rgba(255,255,255,.15); border-color: rgba(255,255,255,.4); }
  .lk-card:active { transform: scale(.985); }
  .lk-card .lk-arrow { transition: transform .18s ease; }
  .lk-card:hover .lk-arrow { transform: translate(3px, -3px); }

  .lk-main { background: linear-gradient(135deg, #2EC4FF 0%, #1F9BFF 55%, #1F6FDB 100%); border-color: rgba(255,255,255,.5); box-shadow: 0 10px 40px -8px rgba(46,196,255,.65); color: #06143A; }
  .lk-main:hover { background: linear-gradient(135deg, #5ad2ff 0%, #35a8ff 55%, #2c7ee6 100%); border-color: rgba(255,255,255,.7); }
  .lk-main::after { content: ""; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.55) 50%, transparent 70%); transform: translateX(-120%); animation: lk-sheen 4.5s ease-in-out 1.6s infinite; }
  @keyframes lk-sheen { 0% { transform: translateX(-120%); } 38%, 100% { transform: translateX(120%); } }

  .lk-ico { background: rgba(255,255,255,.14); }
  .lk-main .lk-ico { background: rgba(6,20,58,.16); }

  .lk-social { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.22); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); transition: transform .18s ease, background .18s ease, color .18s ease; }
  .lk-social:hover { transform: translateY(-3px); background: #2EC4FF; color: #06143A; }

  @media (prefers-reduced-motion: reduce) {
    .lk-blob, .lk-main::after { animation: none; }
    .lk-up { animation: none; opacity: 1; transform: none; }
    .lk-card, .lk-social { transition: none; }
  }
`;

function Atraso(n: number) {
  return { animationDelay: `${0.12 * n + 0.1}s` };
}

function LinksPage() {
  return (
    <div className="lk-root relative min-h-screen overflow-x-hidden text-white">
      <style>{estilos}</style>
      <div className="lk-aurora" aria-hidden="true">
        <div className="lk-blob lk-b1" />
        <div className="lk-blob lk-b2" />
        <div className="lk-blob lk-b3" />
      </div>

      <main className="relative mx-auto flex w-full max-w-[480px] flex-col items-center pb-12">
        <div className="relative mx-auto w-[80%]">
          <img
            src={danielPhoto}
            alt="Daniel Sinenberg"
            className="lk-hero-img block aspect-[1/0.74] w-full object-cover object-[50%_8%]"
            fetchPriority="high"
          />
        </div>

        <div className="relative -mt-10 flex w-full flex-col items-center px-6 text-center">
          <p className="lk-up text-[11px] font-medium uppercase tracking-[0.3em] text-[#2EC4FF]" style={Atraso(0)}>
            Sinenberg Consulting
          </p>
          <h1
            className="lk-up mt-1.5 font-serif text-[38px] font-medium leading-[1.05] tracking-tight"
            style={{ ...Atraso(1), textShadow: "0 2px 24px rgba(6,20,58,.6)" }}
          >
            Daniel Sinenberg
          </h1>
          <p className="lk-up mt-2.5 max-w-[340px] text-[15px] leading-snug text-white/90" style={Atraso(2)}>
            Estruturo o crescimento de empresas que ainda dependem do dono para tudo.
          </p>

          <div className="lk-up mt-5 w-full" style={Atraso(3)}>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/70">Me siga nas redes</p>
            <div className="mt-2.5 grid grid-cols-2 gap-3">
              <a
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn de Daniel Sinenberg"
                className="lk-social flex h-12 items-center justify-center gap-2 rounded-full text-[15px] font-medium"
              >
                <Linkedin size={20} strokeWidth={1.9} />
                LinkedIn
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram @danielsinenberg"
                className="lk-social flex h-12 items-center justify-center gap-2 rounded-full text-[15px] font-medium"
              >
                <Instagram size={20} strokeWidth={1.9} />
                Instagram
              </a>
            </div>
          </div>
        </div>

        <ul className="mt-5 w-full space-y-3 px-5">
          {botoes.map((b, i) => {
            const classe = `lk-card ${b.destaque ? "lk-main" : "text-white"} flex w-full items-center gap-3.5 rounded-[20px] px-4 py-3 text-left`;
            const conteudo = (
              <>
                <span className="lk-ico flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl">
                  <b.Icone size={24} strokeWidth={1.8} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-serif text-[16px] font-medium leading-snug">{b.titulo}</span>
                  {b.detalhe && (
                    <span className={`mt-0.5 text-[12.5px] leading-snug ${b.destaque ? "opacity-75" : "text-white/70"}`}>
                      {b.detalhe}
                    </span>
                  )}
                </span>
                <ArrowUpRight className="lk-arrow shrink-0 opacity-70" size={20} strokeWidth={1.9} />
              </>
            );
            return (
              <li key={b.titulo} className="lk-up" style={Atraso(4 + i)}>
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

        <div className="lk-up mt-8 flex flex-col items-center" style={Atraso(9)}>
          <Link to="/" aria-label="Sinenberg Consulting, início">
            <img src={logoSemTag} alt="Sinenberg Consulting" className="h-20 w-auto opacity-95" />
          </Link>
        </div>
      </main>
    </div>
  );
}
