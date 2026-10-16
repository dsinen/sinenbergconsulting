import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  Download,
  Instagram,
  Linkedin,
  Loader2,
  MessageCircle,
  Send,
} from "lucide-react";
import logoSemTag from "@/assets/logo-notag-dark.png";
import danielPhoto from "@/assets/daniel-links.jpg";
import { FASES, INTERESSES, registrarContatoSebrae } from "@/lib/leads-sebrae";

export const Route = createFileRoute("/sebrae")({
  head: () => ({
    meta: [
      { title: "Evidência vence carisma | Material da palestra | Daniel Sinenberg" },
      {
        name: "description",
        content:
          "Material da palestra de Daniel Sinenberg na Feira do Empreendedor Sebrae 2026: guia das quatro perguntas para montar o seu pitch, exemplos completos e contatos.",
      },
      { property: "og:title", content: "Evidência vence carisma | Material da palestra" },
      {
        property: "og:description",
        content:
          "Monte o pitch que prova que o seu negócio funciona, com as quatro perguntas que todo cliente faz.",
      },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: SebraePage,
});

const NUMERO = "5511984083610";
const WHATSAPP =
  `https://wa.me/${NUMERO}?text=` +
  encodeURIComponent("Oi Daniel, assisti sua palestra na Feira do Empreendedor do Sebrae.");
const INSTAGRAM = "https://www.instagram.com/danielsinenberg";
const LINKEDIN = "https://www.linkedin.com/in/danielsinenberg/";
const PDF = "/evidencia-vence-carisma.pdf";
const PDF_NOME = "Evidencia-vence-carisma-Daniel-Sinenberg.pdf";

const promessas = [
  "Guia com as quatro perguntas, pra preencher",
  "Exemplos completos pra quem vende pra empresa e pra consumidor final",
  "Meus contatos: WhatsApp, LinkedIn e Instagram",
];

const meusJa = [
  "Já conduzi, pela Stone, mais de R$ 50 milhões em negócios com Shell, Ipiranga, BR e OXXO.",
  "Já estruturei o marketing da Linx: mais de 150 ações com ROI acima de 300%.",
  "Já levei a retenção de clientes PME da Vivo de 55% para 70%.",
  "Já mentorei mais de 50 startups da Estácio e da Wyden.",
];

const estilos = `
  .sb-root { background: #06143A; }
  .sb-aurora { position: fixed; inset: 0; overflow: hidden; pointer-events: none; }
  .sb-blob { position: absolute; border-radius: 9999px; filter: blur(90px); will-change: transform; }
  .sb-b1 { width: 460px; height: 460px; background: #1F6FDB; opacity: .5; top: -160px; left: -140px; animation: sb-drift1 18s ease-in-out infinite alternate; }
  .sb-b2 { width: 420px; height: 420px; background: #2EC4FF; opacity: .28; top: 40%; right: -170px; animation: sb-drift2 22s ease-in-out infinite alternate; }
  .sb-b3 { width: 520px; height: 520px; background: #0B2A5B; opacity: .9; bottom: -220px; left: 5%; animation: sb-drift1 26s ease-in-out infinite alternate-reverse; }
  @keyframes sb-drift1 { to { transform: translate3d(90px, 70px, 0) scale(1.15); } }
  @keyframes sb-drift2 { to { transform: translate3d(-110px, -60px, 0) scale(1.1); } }

  .sb-up { opacity: 0; transform: translateY(14px); animation: sb-up .7s cubic-bezier(.2,.7,.2,1) forwards; }
  @keyframes sb-up { to { opacity: 1; transform: none; } }

  .sb-glass { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
  .sb-social { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.22); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); transition: transform .18s ease, background .18s ease, color .18s ease; }
  .sb-social:hover { transform: translateY(-2px); background: rgba(255,255,255,.18); }
  .sb-social:active { transform: scale(.985); }

  .sb-cta { position: relative; overflow: hidden; background: linear-gradient(135deg, #2EC4FF 0%, #1F9BFF 55%, #1F6FDB 100%); color: #06143A; box-shadow: 0 10px 34px -10px rgba(46,196,255,.75); transition: filter .15s ease, transform .15s ease; }
  .sb-cta:hover { filter: brightness(1.08); }
  .sb-cta:active { transform: scale(.985); }
  .sb-cta.sb-sheen::after { content: ""; position: absolute; inset: 0; background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,.55) 50%, transparent 70%); transform: translateX(-120%); animation: sb-sheen 4.5s ease-in-out 1.4s infinite; }
  @keyframes sb-sheen { 0% { transform: translateX(-120%); } 38%, 100% { transform: translateX(120%); } }

  .sb-ig { background: linear-gradient(120deg, #f58529 0%, #dd2a7b 45%, #8134af 75%, #515bd4 100%); color: #fff; box-shadow: 0 10px 30px -12px rgba(221,42,123,.7); transition: filter .15s ease, transform .15s ease; }
  .sb-ig:hover { filter: brightness(1.07); }
  .sb-ig:active { transform: scale(.985); }

  .sb-check { background: #1F6FDB; box-shadow: 0 0 0 4px rgba(31,111,219,.25); }
  .sb-input { width: 100%; border-radius: 12px; border: 1.5px solid rgba(255,255,255,.22); background: rgba(255,255,255,.07); padding: 11px 14px; font-size: 16px; color: #fff; }
  .sb-input::placeholder { color: rgba(255,255,255,.45); }
  .sb-input:focus { outline: none; border-color: #2EC4FF; box-shadow: 0 0 0 4px rgba(46,196,255,.18); }
  .sb-input option { color: #0B2A5B; }

  @media (prefers-reduced-motion: reduce) {
    .sb-blob, .sb-cta.sb-sheen::after { animation: none; }
    .sb-up { animation: none; opacity: 1; transform: none; }
    .sb-social, .sb-cta, .sb-ig { transition: none; }
  }
`;

function atraso(n: number) {
  return { animationDelay: `${0.1 * n + 0.05}s` };
}

function SebraePage() {
  return (
    <div className="sb-root relative min-h-screen overflow-x-hidden text-white">
      <style>{estilos}</style>
      <div className="sb-aurora" aria-hidden="true">
        <div className="sb-blob sb-b1" />
        <div className="sb-blob sb-b2" />
        <div className="sb-blob sb-b3" />
      </div>

      <main className="relative mx-auto w-full max-w-[520px] px-5 pb-10 pt-7">
        <Topo />
        <Material />
        <Conversa />
        <QuemSou />
        <Rodape />
      </main>
    </div>
  );
}

function Topo() {
  return (
    <header>
      <div className="sb-up flex items-center gap-3.5" style={atraso(0)}>
        <img
          src={danielPhoto}
          alt="Daniel Sinenberg"
          className="h-16 w-16 rounded-full object-cover object-[50%_30%] ring-2 ring-white/25"
          fetchPriority="high"
        />
        <div className="min-w-0">
          <h1 className="font-serif text-[25px] font-semibold leading-tight">Daniel Sinenberg</h1>
          <p className="text-[13px] leading-snug text-white/70">
            Consultor estratégico · Sinenberg Consulting
          </p>
        </div>
      </div>

      <div className="sb-up mt-5 grid gap-2.5" style={atraso(1)}>
        <a
          href={INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="sb-ig flex min-h-[56px] items-center gap-3 rounded-2xl px-4"
        >
          <Instagram size={24} strokeWidth={1.9} />
          <span className="flex-1">
            <span className="block font-serif text-[16.5px] font-semibold leading-tight">
              Me siga no Instagram
            </span>
            <span className="block text-[13px] opacity-85">@danielsinenberg</span>
          </span>
          <ArrowUpRight size={20} className="opacity-80" />
        </a>
        <div className="grid grid-cols-2 gap-2.5">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="sb-social flex min-h-[52px] items-center justify-center gap-2 rounded-2xl px-2 text-[15px] font-semibold"
          >
            <MessageCircle size={20} strokeWidth={1.9} /> WhatsApp
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de Daniel Sinenberg"
            className="sb-social flex min-h-[52px] items-center justify-center gap-2 rounded-2xl px-2 text-[15px] font-semibold"
          >
            <Linkedin size={20} strokeWidth={1.9} /> LinkedIn
          </a>
        </div>
      </div>
    </header>
  );
}

function Material() {
  return (
    <section className="sb-up sb-glass mt-6 rounded-3xl p-5" style={atraso(2)}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2EC4FF]">
        Feira do Empreendedor Sebrae 2026
      </p>
      <h2 className="mt-1.5 font-serif text-[28px] font-semibold leading-[1.05] tracking-tight">
        Evidência vence carisma
      </h2>
      <p className="mt-1.5 text-[14px] leading-snug text-white/75">
        O material da palestra, como prometido:
      </p>

      <ul className="mt-4 space-y-3">
        {promessas.map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span className="sb-check mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              <Check size={14} strokeWidth={3.2} />
            </span>
            <span className="text-[15px] font-medium leading-snug">{p}</span>
          </li>
        ))}
      </ul>

      <a
        href={PDF}
        download={PDF_NOME}
        className="sb-cta sb-sheen mt-5 flex min-h-[56px] items-center justify-center gap-2.5 rounded-2xl px-4 font-serif text-[17px] font-semibold"
      >
        <Download size={21} strokeWidth={2.2} />
        Baixar o material (PDF)
      </a>
      <p className="mt-2 text-center text-[12.5px] text-white/55">
        9 páginas · abre no celular e dá pra imprimir
      </p>
    </section>
  );
}

type Formulario = {
  nome: string;
  whatsapp: string;
  email: string;
  negocio: string;
  pitch: string;
  fase: string;
  interesses: string[];
  consentimento: boolean;
  website: string;
};

const FORM_VAZIO: Formulario = {
  nome: "",
  whatsapp: "",
  email: "",
  negocio: "",
  pitch: "",
  fase: "",
  interesses: [],
  consentimento: false,
  website: "",
};

function Conversa() {
  const [form, setForm] = useState<Formulario>(FORM_VAZIO);
  const [estado, setEstado] = useState<"aberto" | "enviando" | "ok" | "erro">("aberto");

  const valido =
    form.nome.trim().length >= 2 &&
    form.whatsapp.replace(/\D/g, "").length >= 10 &&
    (form.email.trim() === "" || /\S+@\S+\.\S+/.test(form.email)) &&
    form.fase !== "" &&
    form.consentimento;

  function alternar(i: string) {
    setForm((f) => ({
      ...f,
      interesses: f.interesses.includes(i)
        ? f.interesses.filter((x) => x !== i)
        : [...f.interesses, i],
    }));
  }

  async function enviar(e: FormEvent) {
    e.preventDefault();
    if (!valido || estado === "enviando") return;
    setEstado("enviando");
    try {
      const r = await registrarContatoSebrae({
        data: {
          nome: form.nome,
          whatsapp: form.whatsapp,
          email: form.email.trim(),
          negocio: form.negocio,
          pitch: form.pitch,
          fase: form.fase as (typeof FASES)[number],
          interesses: form.interesses as (typeof INTERESSES)[number][],
          consentimento: true as const,
          website: form.website,
        },
      });
      setEstado(r.ok ? "ok" : "erro");
    } catch (err) {
      console.error("Falha ao registrar contato da palestra", err);
      setEstado("erro");
    }
  }

  const whatsComPitch =
    `https://wa.me/${NUMERO}?text=` +
    encodeURIComponent(
      form.pitch.trim()
        ? `Oi Daniel, assisti sua palestra no Sebrae. Esse é o meu pitch:\n\n${form.pitch.trim()}`
        : "Oi Daniel, assisti sua palestra na Feira do Empreendedor do Sebrae.",
    );

  return (
    <section id="conversa" className="mt-12 scroll-mt-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2EC4FF]">
        Vamos continuar a conversa
      </p>
      <h2 className="mt-1.5 font-serif text-[28px] font-semibold leading-[1.08]">
        Quer me mostrar o seu pitch?
      </h2>

      <div className="sb-glass mt-5 rounded-3xl p-5">
        {estado === "ok" ? (
          <div className="py-4 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2EC4FF] text-[#06143A]">
              <Check size={26} strokeWidth={3} />
            </span>
            <p className="mt-4 font-serif text-[22px] font-semibold">
              Recebi, {form.nome.trim().split(" ")[0]}.
            </p>
            <p className="mx-auto mt-2 max-w-[380px] text-[15px] leading-relaxed text-white/80">
              Vou ler com calma e te chamo no WhatsApp. Enquanto isso, já dá pra trocar a sua bio.
            </p>
          </div>
        ) : (
          <form onSubmit={enviar} noValidate>
            <p className="text-[14.5px] leading-relaxed text-white/80">
              Falei no palco e repito: quero ler a sua frase com “já”. Deixa seu contato que eu te
              respondo pelo WhatsApp.
            </p>

            <label className="mt-5 block">
              <span className="mb-1.5 block text-[13.5px] font-semibold text-white/90">
                Seu pitch ou a sua frase com “já”
              </span>
              <textarea
                rows={4}
                className="sb-input resize-y leading-relaxed"
                placeholder="Ex.: Já atendi 40 clientes este ano, e 15 voltaram."
                value={form.pitch}
                onChange={(e) => setForm({ ...form, pitch: e.target.value })}
              />
            </label>

            <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
              <Campo rotulo="Seu nome" obrigatorio>
                <input
                  className="sb-input"
                  autoComplete="name"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                />
              </Campo>
              <Campo rotulo="WhatsApp com DDD" obrigatorio>
                <input
                  className="sb-input"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="(11) 90000-0000"
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                />
              </Campo>
              <Campo rotulo="Nome do negócio">
                <input
                  className="sb-input"
                  autoComplete="organization"
                  value={form.negocio}
                  onChange={(e) => setForm({ ...form, negocio: e.target.value })}
                />
              </Campo>
              <Campo rotulo="E-mail">
                <input
                  className="sb-input"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Opcional"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Campo>
              <div className="sm:col-span-2">
                <Campo rotulo="Em que momento está o negócio" obrigatorio>
                  <select
                    className="sb-input"
                    value={form.fase}
                    onChange={(e) => setForm({ ...form, fase: e.target.value })}
                  >
                    <option value="" disabled>
                      Escolha uma opção
                    </option>
                    {FASES.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                </Campo>
              </div>
            </div>

            <fieldset className="mt-5">
              <legend className="text-[13.5px] font-semibold text-white/90">
                O que te interessa agora?
              </legend>
              <div className="mt-2 grid gap-2">
                {INTERESSES.map((i) => (
                  <label
                    key={i}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/15 bg-white/[.04] px-3.5 py-3 text-[14.5px]"
                  >
                    <input
                      type="checkbox"
                      checked={form.interesses.includes(i)}
                      onChange={() => alternar(i)}
                      className="h-5 w-5 shrink-0 accent-[#2EC4FF]"
                    />
                    {i}
                  </label>
                ))}
              </div>
            </fieldset>

            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Não preencha este campo
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                />
              </label>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={form.consentimento}
                onChange={(e) => setForm({ ...form, consentimento: e.target.checked })}
                className="mt-0.5 h-5 w-5 shrink-0 accent-[#2EC4FF]"
              />
              <span className="text-[13px] leading-snug text-white/70">
                Concordo em compartilhar meus dados com a Sinenberg Consulting para ser contatado
                pelo WhatsApp. Posso pedir a exclusão a qualquer momento. Leia a{" "}
                <Link to="/privacidade" target="_blank" className="underline hover:text-white">
                  política de privacidade
                </Link>
                .
              </span>
            </label>

            <button
              type="submit"
              disabled={!valido || estado === "enviando"}
              className="sb-cta mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl text-[16px] font-semibold disabled:cursor-not-allowed disabled:opacity-40"
            >
              {estado === "enviando" ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Enviando
                </>
              ) : (
                <>
                  Enviar <Send size={17} />
                </>
              )}
            </button>
            {estado === "erro" && (
              <p className="mt-3 text-center text-[13.5px] leading-snug text-[#ffd7a8]">
                Não consegui enviar agora.{" "}
                <a
                  href={whatsComPitch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline"
                >
                  Me manda direto no WhatsApp
                </a>
                .
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}

function Campo({
  rotulo,
  obrigatorio,
  children,
}: {
  rotulo: string;
  obrigatorio?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13.5px] font-semibold text-white/90">
        {rotulo}
        {obrigatorio && <span className="text-[#2EC4FF]"> *</span>}
      </span>
      {children}
    </label>
  );
}

function QuemSou() {
  return (
    <section className="mt-12">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2EC4FF]">
        Quem montou esse material
      </p>
      <ul className="mt-4 space-y-2.5">
        {meusJa.map((j) => (
          <li key={j} className="flex gap-3 text-[14.5px] leading-snug text-white/85">
            <Check size={17} strokeWidth={2.6} className="mt-0.5 shrink-0 text-[#2EC4FF]" />
            {j}
          </li>
        ))}
      </ul>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-[#2EC4FF] underline-offset-4 hover:underline"
      >
        Conheça a Sinenberg Consulting <ArrowUpRight size={16} />
      </Link>
    </section>
  );
}

function Rodape() {
  return (
    <footer className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-8">
      <Link to="/" aria-label="Sinenberg Consulting, início">
        <img src={logoSemTag} alt="Sinenberg Consulting" className="h-16 w-auto opacity-95" />
      </Link>
      <p className="text-center text-[12.5px] text-white/60">Carisma ajuda. Evidência convence.</p>
      <p className="text-[12px] text-white/45">© {new Date().getFullYear()} Sinenberg Consulting</p>
      <Link to="/privacidade" className="text-[12px] text-white/50 underline">
        Política de Privacidade
      </Link>
    </footer>
  );
}
