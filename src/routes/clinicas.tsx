import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  CalendarCheck,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileText,
  Gauge,
  HeartPulse,
  MessageCircle,
  Route as RouteIcon,
  Stethoscope,
  TrendingDown,
  UsersRound,
} from "lucide-react";
import logoClaro from "@/assets/logo-notag-light.png";
import logoEscuro from "@/assets/logo-notag-dark.png";
import danielPhoto from "@/assets/daniel-links.jpg";

export const Route = createFileRoute("/clinicas")({
  head: () => ({
    meta: [
      { title: "Clínica Estruturada | Sinenberg Consulting" },
      {
        name: "description",
        content:
          "Consultoria estratégica para clínicas que giram em torno do médico-fundador. Projeto de 90 dias para estruturar a operação e sustentar o crescimento sem depender da agenda de uma pessoa.",
      },
      { property: "og:title", content: "Clínica Estruturada | Sinenberg Consulting" },
      {
        property: "og:description",
        content: "A clínica funcionando como empresa, sem depender do médico para tudo girar.",
      },
    ],
  }),
  component: ClinicasPage,
});

const WHATSAPP =
  "https://wa.me/5511984083610?text=" +
  encodeURIComponent(
    "Olá Daniel, vi a página da Clínica Estruturada e gostaria de agendar uma conversa de 30 minutos.",
  );

const desafios = [
  {
    titulo: "Empresa sem dono da gestão",
    texto: "Cada sócio puxa para o seu lado. A decisão coletiva trava.",
    Icone: UsersRound,
  },
  {
    titulo: "Processo que não sai do papel",
    texto: "Desenhado em reunião, esquecido na semana seguinte.",
    Icone: FileText,
  },
  {
    titulo: "Receita vazando sem ninguém ver",
    texto: "Lead que não converte, paciente no médico errado.",
    Icone: TrendingDown,
  },
];

const pilares = [
  {
    n: "01",
    titulo: "Direção e Clareza",
    resumo: "A clínica passa a enxergar os próprios números e a decidir com base em dado.",
    Icone: Gauge,
    itens: [
      "Mapa da operação, ponta a ponta",
      "Painel de indicadores: conversão, no-show, retorno e mix",
      "Leitura separada entre o ganho do médico e o valor da clínica",
    ],
  },
  {
    n: "02",
    titulo: "Jornada do Paciente",
    resumo:
      "A experiência é organizada do primeiro contato ao retorno, recuperando a conversão que se perde no caminho.",
    Icone: RouteIcon,
    itens: [
      "Mapa da jornada, do lead à consulta e à cirurgia, com cada ponto de perda marcado",
      "Roteiro de recepção e triagem que leva o paciente certo ao médico certo",
      "Rotina de retorno, follow-up e avaliação",
    ],
  },
  {
    n: "03",
    titulo: "Rotina que se Sustenta",
    resumo: "O processo é instalado de verdade, a equipe é treinada e a rotina roda sem o consultor.",
    Icone: ClipboardCheck,
    itens: [
      "Processos-âncora e checklists dentro da operação",
      "Ponto focal interno definido e preparado",
      "Cadência de gestão e painel para os sócios lerem resultado",
    ],
  },
];

const etapas = [
  { titulo: "Kick-off", texto: "Alinhamento e prioridades com os sócios." },
  { titulo: "Diagnóstico", texto: "Imersão e leitura da operação e da jornada." },
  { titulo: "Plano", texto: "Mapa, indicadores-base e plano validado." },
  { titulo: "Implantação", texto: "Processos instalados e equipe treinada." },
  { titulo: "Rotina", texto: "Ponto focal, cadência e painel rodando." },
];

const faq = [
  {
    q: "Você vai interferir no atendimento clínico?",
    a: "Não. Tudo que é clínico passa pelo médico. Eu trabalho a operação ao redor do atendimento: agenda, recepção, indicadores, rotina de gestão e a forma como os sócios decidem.",
  },
  {
    q: "Você traz pacientes para a clínica?",
    a: "Não. Não faço marketing nem tráfego. O foco é parar de perder os pacientes que já chegam e organizar a operação para sustentar o crescimento.",
  },
  {
    q: "O trabalho é presencial ou remoto?",
    a: "Misto. Imersão e momentos-chave presenciais, com o acompanhamento do dia a dia feito de forma remota.",
  },
  {
    q: "Quanto custa e como começa?",
    a: "É um projeto fechado, com escopo e prazo definidos. O começo é uma conversa de 30 minutos, em que entendo o momento da clínica. O investimento é apresentado depois dela.",
  },
];

const estilos = `
  .cl-root { --cl-navy: #0B2A5B; --cl-blue: #1F6FDB; --cl-cyan: #2EC4FF; --cl-teal: #12B5A6; --cl-mint: #EAF7F5; --cl-sky: #EEF5FD; }
  .cl-cross-bg { background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Cpath d='M28 22v12M22 28h12' stroke='%2312B5A6' stroke-opacity='.22' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E"); }
  .cl-hero { background: linear-gradient(180deg, #F4FBFA 0%, #EEF5FD 70%, #FFFFFF 100%); }
  .cl-ecg { stroke-dasharray: 1600; stroke-dashoffset: 1600; animation: cl-draw 3.2s ease-out .3s forwards, cl-pulse 6s ease-in-out 3.6s infinite; }
  @keyframes cl-draw { to { stroke-dashoffset: 0; } }
  @keyframes cl-pulse { 0%, 100% { opacity: 1; } 50% { opacity: .55; } }
  .cl-float { animation: cl-float 6s ease-in-out infinite; }
  .cl-float2 { animation: cl-float 7.5s ease-in-out -2s infinite; }
  @keyframes cl-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-9px); } }
  .cl-beat { animation: cl-beat 1.6s ease-in-out infinite; transform-origin: center; }
  @keyframes cl-beat { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.18); } 28% { transform: scale(1); } 42% { transform: scale(1.12); } 56% { transform: scale(1); } }
  .cl-bar { transform-origin: left; animation: cl-grow 1.2s cubic-bezier(.2,.7,.2,1) both; }
  @keyframes cl-grow { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  .cl-card { transition: transform .2s ease, box-shadow .2s ease; }
  .cl-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -18px rgba(11,42,91,.35); }
  @media (prefers-reduced-motion: reduce) {
    .cl-ecg { animation: none; stroke-dashoffset: 0; }
    .cl-float, .cl-float2, .cl-beat, .cl-bar { animation: none; }
    .cl-card { transition: none; }
  }
`;

const ECG =
  "M0 60 H150 L175 60 L195 22 L225 98 L250 40 L268 60 H470 L495 60 L515 22 L545 98 L570 40 L588 60 H790 L815 60 L835 22 L865 98 L890 40 L908 60 H1200";

function Pulso({ className = "", stroke = "#12B5A6", animar = true }: { className?: string; stroke?: string; animar?: boolean }) {
  return (
    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d={ECG}
        fill="none"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animar ? "cl-ecg" : undefined}
      />
    </svg>
  );
}

function Cruz({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" fill="currentColor" />
    </svg>
  );
}

function Botao({ className = "", escuro = false }: { className?: string; escuro?: boolean }) {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 font-serif text-base font-medium transition-transform duration-150 hover:-translate-y-0.5 ${
        escuro
          ? "bg-[#2EC4FF] text-[#0B2A5B] shadow-[0_14px_40px_-12px_rgba(46,196,255,.7)]"
          : "bg-[#0B2A5B] text-white shadow-[0_14px_40px_-14px_rgba(11,42,91,.6)]"
      } ${className}`}
    >
      <MessageCircle size={20} strokeWidth={1.9} />
      Conversar por 30 minutos
    </a>
  );
}

const indicadores = [
  { nome: "Conversão do lead à consulta", largura: "78%", cor: "#12B5A6" },
  { nome: "Pacientes que faltam (no-show)", largura: "42%", cor: "#1F6FDB" },
  { nome: "Retorno e recorrência", largura: "64%", cor: "#2EC4FF" },
  { nome: "Mix de procedimentos", largura: "55%", cor: "#12B5A6" },
];

function ClinicasPage() {
  return (
    <div className="cl-root min-h-screen bg-white text-[#0f1729]">
      <style>{estilos}</style>

      <header className="sticky top-0 z-40 border-b border-[#0B2A5B]/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1100px] items-center justify-between px-4 md:px-6">
          <Link to="/" aria-label="Sinenberg Consulting, início" className="flex items-center gap-4">
            <img src={logoClaro} alt="Sinenberg Consulting" className="h-14 w-auto" />
            <span className="hidden h-8 w-px bg-[#0B2A5B]/15 sm:block" />
            <span className="hidden items-center gap-2 text-sm font-medium text-[#12B5A6] sm:flex">
              <HeartPulse size={18} strokeWidth={2} />
              Clínica Estruturada
            </span>
          </Link>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#0B2A5B]/20 px-4 py-2 text-sm font-medium text-[#0B2A5B] hover:border-[#0B2A5B]/50"
          >
            <MessageCircle size={16} strokeWidth={2} />
            Conversar
          </a>
        </div>
      </header>

      <section className="cl-hero cl-cross-bg relative overflow-hidden">
        <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-4 pb-24 pt-12 md:grid-cols-[1.1fr_.9fr] md:px-6 md:pb-32 md:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#12B5A6]/12 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-[#0C8F83]">
              <Stethoscope size={15} strokeWidth={2} />
              Clínica Estruturada
            </span>
            <h1 className="mt-5 font-serif text-[38px] font-medium leading-[1.06] text-[#0B2A5B] md:text-[58px]">
              A clínica funcionando como empresa, sem depender do médico para tudo girar.
            </h1>
            <p className="mt-6 max-w-[560px] text-base leading-relaxed text-[#1f2a3d]/85 md:text-lg">
              Ajudo clínicas que giram em torno do médico-fundador, na cadeira e na gestão, a
              estruturar a operação para que o crescimento pare de depender da agenda dele.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <Botao />
              <p className="flex items-center gap-2 text-sm text-[#0B2A5B]/70">
                <CalendarCheck size={16} strokeWidth={2} className="text-[#12B5A6]" />
                Projeto fechado de 90 dias, com escopo e prazo definidos.
              </p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[420px]">
            <div className="cl-float absolute -right-3 -top-6 z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#12B5A6] shadow-lg ring-1 ring-[#0B2A5B]/10">
              <HeartPulse className="cl-beat" size={28} strokeWidth={2} />
            </div>
            <div className="cl-float2 absolute -bottom-5 -left-3 z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B2A5B] text-[#2EC4FF] shadow-lg">
              <Stethoscope size={27} strokeWidth={1.9} />
            </div>
            <div className="rounded-[28px] bg-white p-6 shadow-[0_30px_70px_-30px_rgba(11,42,91,.45)] ring-1 ring-[#0B2A5B]/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[#0B2A5B]/55">Painel da clínica</p>
                  <p className="mt-0.5 font-serif text-lg text-[#0B2A5B]">O que passa a ser visto</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF7F5] text-[#12B5A6]">
                  <Activity size={20} strokeWidth={2} />
                </span>
              </div>
              <ul className="mt-6 space-y-5">
                {indicadores.map((i, idx) => (
                  <li key={i.nome}>
                    <p className="text-sm text-[#1f2a3d]/85">{i.nome}</p>
                    <div className="mt-2 h-2.5 w-full rounded-full bg-[#0B2A5B]/8">
                      <div
                        className="cl-bar h-full rounded-full"
                        style={{ width: i.largura, background: i.cor, animationDelay: `${0.3 + idx * 0.15}s` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[11px] leading-snug text-[#0B2A5B]/50">
                Ilustração dos indicadores acompanhados. Cada clínica recebe metas próprias a partir do diagnóstico.
              </p>
            </div>
          </div>
        </div>
        <Pulso className="pointer-events-none absolute inset-x-0 bottom-0 h-16 w-full opacity-80 md:h-20" />
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1100px] px-4 md:px-6">
          <h2 className="font-serif text-3xl leading-tight text-[#0B2A5B] md:text-4xl">
            O desafio da clínica que cresceu
          </h2>
          <p className="mt-3 max-w-[640px] text-[#1f2a3d]/80">
            Cresceu no nome e na indicação. Virou empresa, mas não passou a ser administrada como uma.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {desafios.map((d) => (
              <div key={d.titulo} className="cl-card rounded-3xl bg-[#F3FAF9] p-6 ring-1 ring-[#12B5A6]/15">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#12B5A6] shadow-sm ring-1 ring-[#12B5A6]/20">
                  <d.Icone size={24} strokeWidth={1.8} />
                </div>
                <h3 className="mt-4 font-serif text-xl text-[#0B2A5B]">{d.titulo}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#1f2a3d]/80">{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#EEF5FD] py-16 md:py-20">
        <Cruz className="absolute -right-8 top-6 h-44 w-44 text-[#12B5A6]/10" />
        <div className="relative mx-auto max-w-[900px] px-4 md:px-6">
          <h2 className="font-serif text-3xl leading-tight text-[#0B2A5B] md:text-4xl">
            O paciente já chega. O dinheiro se perde depois que ele entra.
          </h2>
          <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-[#1f2a3d]/85">
            <p>
              O problema raramente está no topo do funil. Está no que se perde depois: o lead que
              não vira consulta, o paciente que vai para o médico errado, o retorno que ninguém
              cobra, o sócio que decide sem ver os próprios números.
            </p>
            <p>
              Antes de trazer mais paciente, a clínica precisa parar de perder os que já tem. É
              mais rápido, é mais barato, e o resultado aparece sobre uma receita que já existe.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-[1100px] px-4 md:px-6">
          <h2 className="font-serif text-3xl leading-tight text-[#0B2A5B] md:text-4xl">
            Método em três pilares, ao longo de 90 dias
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pilares.map((p) => (
              <div key={p.n} className="cl-card flex flex-col rounded-3xl bg-white p-6 ring-1 ring-[#0B2A5B]/12">
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B2A5B] text-[#2EC4FF]">
                    <p.Icone size={24} strokeWidth={1.8} />
                  </span>
                  <span className="font-serif text-4xl text-[#12B5A6]/70">{p.n}</span>
                </div>
                <h3 className="mt-4 font-serif text-2xl text-[#0B2A5B]">{p.titulo}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#1f2a3d]/80">{p.resumo}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-[#0B2A5B]/55">O que você recebe</p>
                <ul className="mt-3 space-y-2.5 text-[15px] leading-snug text-[#1f2a3d]/90">
                  {p.itens.map((i) => (
                    <li key={i} className="flex gap-2.5">
                      <Check size={18} strokeWidth={2.4} className="mt-0.5 shrink-0 text-[#12B5A6]" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0B2A5B] py-16 text-white md:py-20">
        <Pulso className="pointer-events-none absolute inset-x-0 top-1/2 h-24 w-full -translate-y-1/2 opacity-[.14]" stroke="#2EC4FF" animar={false} />
        <div className="relative mx-auto max-w-[1100px] px-4 md:px-6">
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">Como o projeto acontece</h2>
          <p className="mt-3 text-white/70">Da imersão inicial até a rotina que opera sozinha.</p>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {etapas.map((e, i) => (
              <li key={e.titulo} className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/15 backdrop-blur-sm">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#12B5A6] text-sm font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-serif text-lg">{e.titulo}</h3>
                <p className="mt-1.5 text-sm leading-snug text-white/75">{e.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-[1100px] items-center gap-10 px-4 md:grid-cols-5 md:gap-14 md:px-6">
          <div className="relative md:col-span-2">
            <div className="absolute -inset-3 -z-0 rounded-[36px] bg-gradient-to-br from-[#12B5A6]/25 to-[#2EC4FF]/20" />
            <img
              src={danielPhoto}
              alt="Daniel Sinenberg, consultor estratégico"
              className="relative aspect-[4/5] w-full rounded-[30px] object-cover object-[50%_20%] shadow-[0_30px_60px_-30px_rgba(11,42,91,.5)]"
              loading="lazy"
            />
            <div className="absolute -bottom-4 left-4 right-4 rounded-2xl bg-white px-5 py-3 shadow-lg ring-1 ring-[#0B2A5B]/10">
              <p className="font-serif text-lg text-[#0B2A5B]">Daniel Sinenberg</p>
              <p className="text-sm text-[#12B5A6]">Consultor estratégico</p>
            </div>
          </div>
          <div className="md:col-span-3">
            <h2 className="font-serif text-3xl leading-tight text-[#0B2A5B] md:text-4xl">Quem conduz</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[#1f2a3d]/85">
              Mais de 20 anos estruturando crescimento e operação em empresas e multinacionais, em
              tecnologia, varejo e serviços financeiros. O rigor de gestão, processo e indicador de
              operações grandes, aplicado a um setor que não tem esse olhar.
            </p>
            <h3 className="mt-8 font-serif text-2xl text-[#0B2A5B]">Para quem é</h3>
            <p className="mt-3 text-[16px] leading-relaxed text-[#1f2a3d]/85">
              Para clínicas particulares com operação já instalada, onde o crescimento parou de
              caber na cabeça das pessoas e a estrutura precisa assumir o lugar da improvisação.
            </p>
            <p className="mt-3 text-[16px] leading-relaxed text-[#1f2a3d]/85">
              Não é para quem atende sozinho e quer, antes de tudo, gerar demanda. É para a clínica
              que já tem volume e equipe, e precisa transformar esforço individual em operação que
              se sustenta.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#F3FAF9] py-16 md:py-20">
        <div className="mx-auto max-w-[800px] px-4 md:px-6">
          <h2 className="font-serif text-3xl text-[#0B2A5B] md:text-4xl">Perguntas frequentes</h2>
          <div className="mt-8 divide-y divide-[#0B2A5B]/10 rounded-3xl bg-white ring-1 ring-[#12B5A6]/15">
            {faq.map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-[#0B2A5B]">
                  {f.q}
                  <ChevronDown size={20} className="shrink-0 text-[#12B5A6] transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#1f2a3d]/85">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#0B2A5B] py-20 text-center text-white md:py-24">
        <Pulso className="pointer-events-none absolute inset-x-0 bottom-6 h-20 w-full opacity-[.2]" stroke="#2EC4FF" animar={false} />
        <div className="relative mx-auto max-w-[700px] px-4 md:px-6">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#2EC4FF] ring-1 ring-white/20">
            <HeartPulse size={28} strokeWidth={1.9} />
          </span>
          <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">Vamos estruturar sua clínica?</h2>
          <p className="mt-4 text-white/80">
            Uma conversa de 30 minutos para entender o momento da clínica e ver se faz sentido
            trabalharmos juntos.
          </p>
          <div className="mt-8">
            <Botao escuro />
          </div>
          <img src={logoEscuro} alt="Sinenberg Consulting" className="mx-auto mt-14 h-20 w-auto opacity-90" />
        </div>
      </section>

      <footer className="border-t border-[#0B2A5B]/10 bg-white">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-3 px-4 py-8 md:px-6">
          <p className="text-xs text-[#0B2A5B]/60">
            © {new Date().getFullYear()} Sinenberg Consulting. Todos os direitos reservados.
          </p>
          <Link to="/privacidade" className="text-xs text-[#0B2A5B]/60 underline">
            Política de Privacidade
          </Link>
        </div>
      </footer>
    </div>
  );
}
