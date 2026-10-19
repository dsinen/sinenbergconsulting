import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
  Star,
} from "lucide-react";
import logoSemTag from "@/assets/logo-notag-dark.png";
import danielPhoto from "@/assets/daniel-links.jpg";
import {
  ESTAGIOS,
  FATURAMENTOS,
  INTERESSES,
  INTERESSE_PITCH,
  INTERESSE_SESSAO,
  registrarContatoSebrae,
} from "@/lib/leads-sebrae";
import { registrarNota } from "@/lib/avaliacoes-sebrae";

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
// Links abertos na mesma aba: no iPhone e no Android, é assim que o sistema
// entrega o link ao app instalado (Instagram, LinkedIn, WhatsApp) em vez do site.
const INSTAGRAM = "https://www.instagram.com/danielsinenberg/";
const LINKEDIN = "https://www.linkedin.com/in/danielsinenberg/";
const PDF = "/evidencia-vence-carisma.pdf";
const PDF_NOME = "Evidencia-vence-carisma-Daniel-Sinenberg.pdf";

const promessas = [
  "Guia com as quatro perguntas, pra preencher",
  "Exemplos completos: venda pra empresa e pra consumidor final",
  "As perguntas que sempre aparecem",
  "Meus contatos, nos botões aqui em cima",
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
        <Avaliacao />
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
          className="h-14 w-14 rounded-full object-cover object-[50%_30%] ring-2 ring-white/25"
          fetchPriority="high"
        />
        <div className="min-w-0">
          <h1 className="font-serif text-[24px] font-semibold leading-tight">Daniel Sinenberg</h1>
          <p className="text-[13px] leading-snug text-white/70">Fundador da Sinenberg Consulting</p>
        </div>
      </div>

      <div className="sb-up mt-4 grid gap-2.5" style={atraso(1)}>
        <a href={INSTAGRAM} className="sb-ig flex min-h-[56px] items-center gap-3 rounded-2xl px-4">
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
            className="sb-social flex min-h-[52px] items-center justify-center gap-2 rounded-2xl px-2 text-[15px] font-semibold"
          >
            <MessageCircle size={20} strokeWidth={1.9} /> WhatsApp
          </a>
          <a
            href={LINKEDIN}
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
    <section className="sb-up sb-glass mt-3 rounded-3xl p-4" style={atraso(3)}>
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2EC4FF]">
        Material da palestra · Sebrae 2026
      </p>
      <h2 className="mt-1 font-serif text-[25px] font-semibold leading-[1.05] tracking-tight">
        Evidência vence carisma
      </h2>

      <ul className="mt-3 space-y-2">
        {promessas.map((p) => (
          <li key={p} className="flex items-start gap-2.5">
            <span className="sb-check mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full">
              <Check size={12} strokeWidth={3.4} />
            </span>
            <span className="text-[14px] font-medium leading-snug">{p}</span>
          </li>
        ))}
      </ul>

      <a
        href={PDF}
        download={PDF_NOME}
        className="sb-cta sb-sheen mt-4 flex min-h-[52px] items-center justify-center gap-2.5 rounded-2xl px-4 font-serif text-[17px] font-semibold"
      >
        <Download size={21} strokeWidth={2.2} />
        Baixar o material (PDF)
      </a>
      <p className="mt-1.5 text-center text-[12px] text-white/55">
        10 páginas · abre no celular e dá pra imprimir
      </p>
    </section>
  );
}

type Formulario = {
  nome: string;
  whatsapp: string;
  email: string;
  empresa: string;
  estagio: string;
  faturamento: string;
  interesses: string[];
  pitch: string;
  consentimento: boolean;
  website: string;
};

const FORM_VAZIO: Formulario = {
  nome: "",
  whatsapp: "",
  email: "",
  empresa: "",
  estagio: "",
  faturamento: "",
  interesses: [],
  pitch: "",
  consentimento: false,
  website: "",
};

const AINDA_NAO_ABRI = ESTAGIOS[0];

function Conversa() {
  const [form, setForm] = useState<Formulario>(FORM_VAZIO);
  const [estado, setEstado] = useState<"aberto" | "enviando" | "ok" | "erro">("aberto");

  const querPitch = form.interesses.includes(INTERESSE_PITCH);
  const querSessao = form.interesses.includes(INTERESSE_SESSAO);
  const empresaObrigatoria = form.estagio !== AINDA_NAO_ABRI;
  // As duas últimas faixas ficam no corte do diagnóstico do site (a partir de R$ 1 milhão).
  const faturaUmMilhaoOuMais =
    FATURAMENTOS.indexOf(form.faturamento as (typeof FATURAMENTOS)[number]) >= 3;

  const valido =
    form.nome.trim().split(/\s+/).length >= 2 &&
    form.whatsapp.replace(/\D/g, "").length >= 10 &&
    /^\S+@\S+\.\S+$/.test(form.email.trim()) &&
    (!empresaObrigatoria || form.empresa.trim().length >= 2) &&
    form.estagio !== "" &&
    form.faturamento !== "" &&
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
          empresa: form.empresa,
          estagio: form.estagio as (typeof ESTAGIOS)[number],
          faturamento: form.faturamento as (typeof FATURAMENTOS)[number],
          interesses: form.interesses as (typeof INTERESSES)[number][],
          pitch: querPitch ? form.pitch : "",
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
      querPitch && form.pitch.trim()
        ? `Oi Daniel, assisti sua palestra no Sebrae. Esse é o meu pitch:\n\n${form.pitch.trim()}`
        : "Oi Daniel, assisti sua palestra na Feira do Empreendedor do Sebrae.",
    );

  const retorno = querSessao
    ? "As vagas da sessão são poucas. Vou olhar o momento do seu negócio e te chamo no WhatsApp."
    : querPitch
      ? "Vou ler o seu pitch com calma e te respondo no WhatsApp."
      : "Vou ler com calma e te chamo no WhatsApp.";

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
              {retorno}
            </p>
            {faturaUmMilhaoOuMais && (
              <Link
                to="/diagnostico"
                className="sb-cta mx-auto mt-6 flex min-h-12 max-w-[380px] items-center justify-center gap-2 rounded-xl px-4 text-[15px] font-semibold"
              >
                Enquanto isso, descubra em 3 minutos o estágio de maturidade da sua empresa
                <ArrowUpRight size={18} className="shrink-0" />
              </Link>
            )}
          </div>
        ) : (
          <form onSubmit={enviar} noValidate>
            <p className="text-[14.5px] leading-relaxed text-white/80">
              Falei no palco e repito: quero ler a sua frase com “já”. Me conta também em que
              momento está o seu negócio, e eu te respondo pelo WhatsApp.
            </p>

            <div className="mt-5 grid gap-3.5">
              <Campo rotulo="Nome completo" obrigatorio>
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
              <Campo rotulo="E-mail" obrigatorio>
                <input
                  className="sb-input"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Campo>
              <Campo rotulo="Em que momento está o negócio" obrigatorio>
                <select
                  className="sb-input"
                  value={form.estagio}
                  onChange={(e) => setForm({ ...form, estagio: e.target.value })}
                >
                  <option value="" disabled>
                    Escolha uma opção
                  </option>
                  {ESTAGIOS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </Campo>
              <Campo rotulo="Nome da empresa" obrigatorio={empresaObrigatoria}>
                <input
                  className="sb-input"
                  autoComplete="organization"
                  placeholder={empresaObrigatoria ? "" : "Se já tiver um nome em mente"}
                  value={form.empresa}
                  onChange={(e) => setForm({ ...form, empresa: e.target.value })}
                />
              </Campo>
              <Campo rotulo="Faturamento aproximado" obrigatorio>
                <select
                  className="sb-input"
                  value={form.faturamento}
                  onChange={(e) => setForm({ ...form, faturamento: e.target.value })}
                >
                  <option value="" disabled>
                    Escolha uma faixa
                  </option>
                  {FATURAMENTOS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </Campo>
            </div>

            <fieldset className="mt-5">
              <legend className="text-[13.5px] font-semibold text-white/90">
                O que te interessa agora?
              </legend>
              <div className="mt-2 grid gap-2">
                {INTERESSES.map((i) => (
                  <div key={i}>
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/15 bg-white/[.04] px-3.5 py-3 text-[14.5px] leading-snug">
                      <input
                        type="checkbox"
                        checked={form.interesses.includes(i)}
                        onChange={() => alternar(i)}
                        className="h-5 w-5 shrink-0 accent-[#2EC4FF]"
                      />
                      <span className="flex-1">
                        {i}
                        {i === INTERESSE_SESSAO && (
                          <span className="ml-2 inline-block rounded-full bg-[#2EC4FF]/15 px-2 py-0.5 align-middle text-[11px] font-semibold text-[#2EC4FF]">
                            vagas limitadas
                          </span>
                        )}
                      </span>
                    </label>
                    {i === INTERESSE_PITCH && querPitch && (
                      <textarea
                        rows={4}
                        aria-label="Seu pitch ou a sua frase com já"
                        className="sb-input mt-2 resize-y leading-relaxed"
                        placeholder="Cola aqui o seu pitch ou a sua frase com “já”"
                        value={form.pitch}
                        onChange={(e) => setForm({ ...form, pitch: e.target.value })}
                      />
                    )}
                  </div>
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
                pelo WhatsApp e por e-mail. Posso pedir a exclusão a qualquer momento. Leia a{" "}
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

const ROTULOS = ["Fraca", "Regular", "Boa", "Muito boa", "Excelente"];
const CHAVE_AVALIOU = "sc_sebrae_avaliou";

function Avaliacao() {
  const [nota, setNota] = useState(0);
  const [etapa, setEtapa] = useState<"nota" | "fim">("nota");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(CHAVE_AVALIOU)) setEtapa("fim");
    } catch {
      /* navegação privada: segue normal */
    }
  }, []);

  async function enviar() {
    if (!nota || enviando) return;
    setEnviando(true);
    try {
      await registrarNota({ data: { nota } });
      try {
        localStorage.setItem(CHAVE_AVALIOU, "1");
      } catch {
        /* ignora */
      }
    } catch (err) {
      console.error("Falha ao registrar a nota", err);
    } finally {
      setEnviando(false);
      setEtapa("fim");
    }
  }

  return (
    <section
      className="sb-up sb-glass mt-3 rounded-2xl px-4 py-3"
      style={atraso(2)}
      id="avaliacao"
      aria-label="Avaliação da palestra"
    >
      {etapa === "fim" ? (
        <p className="flex min-h-10 items-center justify-center gap-2 text-[14.5px] font-medium text-white/85">
          <Check size={18} strokeWidth={2.6} className="text-[#2EC4FF]" />
          Valeu pela avaliação!
        </p>
      ) : (
        <>
          <div className="flex items-center justify-between gap-2">
            <p className="font-serif text-[15.5px] font-semibold leading-tight">
              Avalie a palestra
            </p>
            <div className="flex" role="radiogroup" aria-label="Nota da palestra">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={nota === n}
                  aria-label={`${n} de 5, ${ROTULOS[n - 1]}`}
                  onClick={() => setNota(n)}
                  className="flex h-10 w-9 items-center justify-center transition-transform active:scale-90"
                >
                  <Star
                    size={27}
                    strokeWidth={1.7}
                    className={n <= nota ? "fill-[#FFC94D] text-[#FFC94D]" : "text-white/50"}
                  />
                </button>
              ))}
            </div>
          </div>
          {nota > 0 && (
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-[13.5px] text-white/70">{ROTULOS[nota - 1]}</span>
              <button
                type="button"
                disabled={enviando}
                onClick={enviar}
                className="sb-cta inline-flex h-10 items-center justify-center gap-2 rounded-xl px-6 text-[15px] font-semibold"
              >
                {enviando ? <Loader2 size={16} className="animate-spin" /> : null}
                Enviar
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
