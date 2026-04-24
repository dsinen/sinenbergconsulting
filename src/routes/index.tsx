import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Icon } from "@iconify/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navbar } from "@/components/Navbar";
import { CountUp } from "@/components/CountUp";
import { useReveal } from "@/hooks/useReveal";
import heroPhoto from "@/assets/daniel-hero.jpg";
import aboutPhoto from "@/assets/daniel-about.jpg";
import logoDark from "@/assets/logo-dark.png";
import logoLinx from "@/assets/logos/linx.png";
import logoStone from "@/assets/logos/stone.png";
import logoVivo from "@/assets/logos/vivo.png";
import logoIpiranga from "@/assets/logos/ipiranga.png";
import logoBR from "@/assets/logos/br.gif";
import logoOxxo from "@/assets/logos/oxxo.png";
import logoShell from "@/assets/logos/shell.png";
import logoFast from "@/assets/logos/fast.png";

const companies = [
  { name: "Linx", src: logoLinx },
  { name: "Stone", src: logoStone },
  { name: "Vivo", src: logoVivo },
  { name: "Ipiranga", src: logoIpiranga },
  { name: "BR Petrobras", src: logoBR },
  { name: "OXXO", src: logoOxxo },
  { name: "Shell", src: logoShell },
  { name: "Fast Shop", src: logoFast },
];

const CTA = "https://w.app/sinenbergconsulting";

const faqs = [
  {
    q: "Para que tipo de empresa essa consultoria faz sentido?",
    a: "Empresas de tecnologia B2B entre R$1M e R$50M de faturamento, pós-product market fit, que cresceram bem mas começam a sentir que o modelo atual não escala. Se a empresa ainda está validando produto ou se o fundador não está disposto a mudar processos, este não é o trabalho certo.",
  },
  {
    q: "Atende empresas que não são de tecnologia?",
    a: "Meu foco é tech B2B porque é onde tenho mais de 20 anos de experiência aplicada — Stone, Linx, Telefônica e Fast Shop. Empresas de outros setores podem entrar em contato, mas o método foi desenhado para a dinâmica de receita recorrente, ciclos consultivos e produto digital.",
  },
  {
    q: "Atende remotamente ou só presencial?",
    a: "Trabalho em modelo híbrido. A maior parte das interações é remota (reuniões com ponto focal, sessões executivas mensais), com visitas presenciais pontuais quando o projeto pede — sobretudo no diagnóstico e em momentos críticos da implementação. Atendo Brasil inteiro.",
  },
  {
    q: "Qual a diferença entre o Diagnóstico e a Consultoria Completa?",
    a: "O Diagnóstico é uma sprint curta para fundadores que precisam de um raio-X claro antes de tomar decisões — entrega gargalos mapeados, oportunidades de receita identificadas e um roadmap priorizado. A Consultoria Completa é o programa de transformação: pega o diagnóstico e leva à execução, com acompanhamento executivo recorrente até a operação rodar sem o fundador no meio.",
  },
  {
    q: "Quanto tempo dura o projeto?",
    a: "A Consultoria Completa segue um ciclo padrão de 6 meses: Mês 1 dedicado a diagnóstico, imersão e plano; Meses 2 a 5 em execução; Mês 6 em acompanhamento e sustentação. Esse prazo, no entanto, é flexível — projetos com maior complexidade, mais frentes simultâneas ou desafios específicos podem exigir ciclos mais longos. O escopo final é definido após a sessão estratégica inicial. O Diagnóstico é executado em poucas semanas.",
  },
  {
    q: "Como é o envolvimento do fundador no processo?",
    a: "Alta no início (diagnóstico, definição de prioridades, alinhamento estratégico) e progressivamente menor à medida que a estrutura assume. Para isso, é essencial a indicação de um ponto focal pelo fundador — uma pessoa interna que acompanha o projeto de perto, viabiliza a execução do plano de ação e funciona como multiplicador, disseminando o conhecimento e os novos processos dentro da empresa. O objetivo é justamente sair de um modelo onde tudo passa pelo fundador para um modelo onde a operação funciona sem ele no meio de cada decisão.",
  },
  {
    q: "Que tipo de resultado posso esperar?",
    a: "Os padrões observados em projetos similares apontam para 25% menos dispersão (CAC e LTV), 20% mais conversão (taxa e ciclo de vendas) e 15% mais margem (operacional e churn). Mas cada empresa recebe metas personalizadas a partir do diagnóstico inicial — não trabalho com promessas genéricas.",
  },
  {
    q: "Você assume o comercial da empresa ou orienta o time?",
    a: "Atuo como consultor, não como interino. Isso significa orientar, estruturar processos, capacitar o time e acompanhar resultados — sempre transferindo conhecimento para que a operação se sustente quando o projeto encerrar. Você não cria dependência de mim.",
  },
];
const INSTAGRAM = "https://www.instagram.com/dsinen";
const LINKEDIN = "https://www.linkedin.com/in/danielsinenberg/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sinenberg Consulting — Consultoria Estratégica para Empresas Tech" },
      {
        name: "description",
        content:
          "Ajudo empresas de tecnologia que cresceram, mas ainda dependem do fundador em vendas, a estruturar o crescimento e ganhar previsibilidade sem quebrar na escala.",
      },
      { property: "og:title", content: "Sinenberg Consulting — Consultoria Estratégica para Empresas Tech" },
      {
        property: "og:description",
        content: "Transforme crescimento desorganizado em crescimento estruturado e previsível.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

const pains = [
  {
    icon: "solar:routing-2-outline",
    title: "Crescimento sem direção clara?",
    text: "A empresa cresce, mas faltam prioridades e alinhamento entre as áreas — cada time puxa para um lado.",
  },
  {
    icon: "solar:user-id-outline",
    title: "Tudo ainda passa pelo fundador?",
    text: "Decisões, vendas e problemas continuam dependendo de você. A escala emperra na sua agenda.",
  },
  {
    icon: "solar:graph-down-outline",
    title: "Receita imprevisível mês a mês?",
    text: "O comercial funciona por esforço individual e heroísmo, não por um processo estruturado.",
  },
  {
    icon: "solar:settings-outline",
    title: "Operação improvisada virou gargalo?",
    text: "Mais clientes e equipe aumentam a complexidade, mas papéis e processos continuam no improviso.",
  },
];

const pillars = [
  {
    n: "01",
    icon: "solar:compass-outline",
    title: "Direção de Crescimento",
    text: "Clareza estratégica, prioridades definidas e alinhamento entre estratégia, produto, comercial e operação.",
  },
  {
    n: "02",
    icon: "solar:chart-square-outline",
    title: "Estrutura de Receita",
    text: "Processo comercial sólido, geração de demanda consistente e pipeline previsível mês a mês.",
  },
  {
    n: "03",
    icon: "solar:rocket-2-outline",
    title: "Escala com Previsibilidade",
    text: "Operação organizada, indicadores vivos e rotinas de gestão que sustentam o próximo patamar.",
  },
];

const services = [
  {
    name: "Consultoria — Modelo Completo",
    audience: "Para empresas tech B2B (R$1M–R$50M) prontas para profissionalizar a operação de ponta a ponta.",
    duration: "Programa robusto de transformação",
    deliverables: [
      "Diagnóstico estratégico completo",
      "Plano de crescimento com prioridades trimestrais",
      "Reestruturação comercial e de processos",
      "Acompanhamento executivo recorrente",
    ],
    ctaLabel: "Falar sobre a Consultoria Completa",
    ctaLink:
      "https://wa.me/5511984083610?text=Ol%C3%A1%20Daniel%2C%20tenho%20interesse%20na%20Consultoria%20Completa%20da%20Sinenberg%20Consulting.",
  },
  {
    name: "Diagnóstico Estratégico",
    audience: "Para fundadores que precisam de um raio-X claro antes de decidir os próximos passos.",
    duration: "Sprint de curto prazo",
    deliverables: [
      "Mapeamento de gargalos de crescimento",
      "Análise de dependências do fundador",
      "Identificação de oportunidades de receita",
      "Roadmap priorizado de ações",
    ],
    ctaLabel: "Quero o Diagnóstico Estratégico",
    ctaLink:
      "https://wa.me/5511984083610?text=Ol%C3%A1%20Daniel%2C%20tenho%20interesse%20no%20Diagn%C3%B3stico%20Estrat%C3%A9gico.",
  },
];

const testimonials = [
  {
    name: "Alexandre Fernandes",
    role: "Gerente de Negócios · Vibra Energia/BR Mania",
    text: "Daniel é o tipo de profissional que faz a diferença: propositivo e honesto nas relações comerciais. Contar com um parceiro como ele é sinônimo de confiança, agilidade e construção de valor mútuo.",
  },
  {
    name: "Maurício Tripodoro",
    role: "IT & Project Management · Linx/Stone",
    text: "Daniel liderou a gestão de relacionamento com stakeholders-chave em distribuidoras de combustíveis, conectando demandas de clientes a toda a cadeia de produtos. Demonstra entendimento estratégico, antecipação de movimentos de mercado e habilidade para articular acordos entre múltiplas partes.",
  },
  {
    name: "Rodrigo Oliveira",
    role: "Product Marketing Manager · Linx",
    text: "Daniel participou ativamente de grandes projetos na Linx, como a chegada da OXXO ao Brasil. Seu olhar atento aos movimentos do mercado fez com que se antecipasse em diversas frentes. Atuou muito além das especificações do seu cargo — extremamente competente e comprometido.",
  },
  {
    name: "Fabiana Guiachetto",
    role: "Head de Growth & Canais na Totvs",
    text: "É um profissional focado, dedicado a sua carteira de clientes, preocupado em criar uma relação ganha-ganha e com ótima relação interpessoal. Trabalhar com pessoas que acreditam no poder do time é essencial hoje em dia.",
  },
];

function HomePage() {
  useReveal();

  // Lead capture (checklist gratuito) — TROCAR `LEAD_FORM_ENDPOINT` pelo endpoint do Formspree/Lovable Forms
  const LEAD_FORM_ENDPOINT = ""; // ex: "https://formspree.io/f/xxxxx"
  const [leadEmail, setLeadEmail] = useState("");
  const [leadStatus, setLeadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleLeadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = leadEmail.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      setLeadStatus("error");
      return;
    }
    setLeadStatus("loading");
    try {
      if (LEAD_FORM_ENDPOINT) {
        const res = await fetch(LEAD_FORM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, source: "checklist-7-sinais" }),
        });
        if (!res.ok) throw new Error("send failed");
      }
      setLeadStatus("success");
      setLeadEmail("");
    } catch {
      setLeadStatus("error");
    }
  }

  return (
    <div id="top" className="bg-background text-foreground">
      <Navbar />

      {/* ───────── HERO ───────── */}
      <section
        className="relative pt-[120px] md:pt-[160px] pb-[120px] overflow-hidden"
        style={{ backgroundColor: "#0B2A5B", color: "#fff" }}
      >
        <div className="absolute inset-0 dot-grid opacity-100" />
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full float"
          style={{
            background:
              "radial-gradient(circle, rgba(46,196,255,0.25) 0%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-[1100px] px-6 grid md:grid-cols-[55fr_45fr] gap-12 items-center">
          <div className="reveal order-2 md:order-1">
            <h1
              className="font-serif font-medium leading-[1.05]"
              style={{ fontSize: "clamp(24px, 2.8vw, 44px)", color: "#fff" }}
            >
              Daniel Sinenberg
            </h1>
            <h2 className="mt-2 font-sans font-light text-[#2EC4FF] text-base md:text-lg tracking-wide">
              Consultor Estratégico para Empresas de Tecnologia B2B
            </h2>

            <p className="mt-8 font-serif text-3xl md:text-5xl leading-[1.1] text-white">
              Crescimento estruturado. Receita previsível.
            </p>
            <p className="mt-6 text-white/85 text-base md:text-lg leading-relaxed max-w-xl">
              Ajudo empresas tech que cresceram bem, mas ainda dependem do fundador em vendas,
              a escalar com previsibilidade — sem quebrar na operação.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 items-center">
              <div>
                <div className="font-serif text-5xl md:text-6xl text-[#2EC4FF] leading-none">
                  <CountUp end={22} suffix="+" />
                </div>
                <div className="mt-2 text-sm text-white/75 max-w-[180px]">
                  anos atuando em crescimento de empresas
                </div>
              </div>

              <div className="sm:justify-self-end">
                <a
                  href={CTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2EC4FF] text-[#0B2A5B] font-semibold px-7 py-4 hover:-translate-y-0.5 hover:brightness-110 transition shadow-[0_10px_40px_-10px_rgba(46,196,255,0.6)]"
                >
                  Agendar Sessão Estratégica
                  <Icon icon="solar:arrow-right-outline" width="20" />
                </a>
              </div>
            </div>
          </div>

          <div className="reveal order-1 md:order-2">
            <div className="hero-photo-wrap aspect-[4/5] rounded-2xl overflow-hidden">
              <img src={heroPhoto} alt="Daniel Sinenberg" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── EMPRESAS ───────── */}
      <section className="py-20 md:py-24 bg-[#f5f8fc] border-y border-[#e3ebf4]">
        <div className="mx-auto max-w-[1200px] px-6">
          <p className="reveal text-center text-sm md:text-base text-[#4a5b73] tracking-wide">
            Mais de 20 anos construindo crescimento em empresas como
          </p>
          <div className="reveal mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-x-6 gap-y-10 items-center">
            {companies.map((c) => (
              <div
                key={c.name}
                className="flex items-center justify-center h-12"
              >
                <img
                  src={c.src}
                  alt={c.name}
                  loading="lazy"
                  className="max-h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── DOR ───────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="reveal text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#1F6FDB] font-semibold">
              O cenário
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-[#0B2A5B] leading-tight">
              Você se reconhece nesse cenário?
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {pains.map((p, i) => (
              <div
                key={p.title}
                className="reveal flex gap-5 p-7 rounded-2xl border border-[#d9e3ef] bg-[#f5f8fc] hover:border-[#1F6FDB] transition-colors"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#0B2A5B] text-[#2EC4FF] flex items-center justify-center">
                  <Icon icon={p.icon} width="26" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#0B2A5B]">{p.title}</h3>
                  <p className="mt-2 text-[#1a1a1a]/75 leading-relaxed">{p.text}</p>
                </div>
              </div>
            ))}
          </div>

          <p
            className="reveal mt-16 text-center font-serif italic text-[#0B2A5B] max-w-3xl mx-auto"
            style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
          >
            Crescer não é o problema. O problema é crescer sem estrutura — e existe um caminho para mudar isso.
          </p>
        </div>
      </section>

      {/* ───────── MÉTODO ───────── */}
      <section
        id="metodo"
        className="relative py-16 md:py-24 overflow-hidden"
        style={{ backgroundColor: "#0B2A5B", color: "#fff" }}
      >
        <div className="absolute inset-0 dot-grid" />
        <div className="relative mx-auto max-w-[1100px] px-6">
          <div className="reveal text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#2EC4FF] font-semibold">
              O Método
            </span>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl text-white leading-[1.05]">
              Três pilares para escalar com previsibilidade
            </h2>
            <p className="mt-6 text-white/80 text-lg">
              Um caminho estruturado que conecta estratégia, receita e operação — para que o
              crescimento deixe de depender do esforço heroico do fundador.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <div
                key={p.n}
                className="reveal p-8 rounded-2xl"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#2EC4FF] text-[#0B2A5B] flex items-center justify-center">
                    <Icon icon={p.icon} width="26" />
                  </div>
                  <span className="font-serif text-4xl text-white/25">{p.n}</span>
                </div>
                <h3 className="mt-6 font-serif text-2xl text-[#2EC4FF]">{p.title}</h3>
                <p className="mt-3 text-white/80 leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>

          <p className="reveal mt-14 text-center text-white/75 max-w-2xl mx-auto">
            Clareza estratégica, compromisso com resultados e parceria executiva — sem fórmulas
            mágicas, com simplicidade estruturada.
          </p>
        </div>
      </section>

      {/* ───────── SERVIÇOS ───────── */}
      <section id="servicos" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="reveal text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#1F6FDB] font-semibold">
              Serviços
            </span>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl text-[#0B2A5B] leading-[1.05]">
              Como posso te ajudar
            </h2>
            <p className="mt-6 text-[#1a1a1a]/75 text-lg">
              Dois caminhos diferentes, o mesmo objetivo: transformar crescimento em estrutura.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-8">
            {services.map((s, i) => (
              <div
                key={s.name}
                className="reveal flex flex-col p-8 rounded-2xl bg-white border border-[#1F6FDB]/30"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  boxShadow: "0 4px 24px rgba(11,42,91,0.08)",
                }}
              >
                <h3 className="font-serif text-2xl md:text-3xl text-[#0B2A5B]">{s.name}</h3>
                <p className="mt-3 text-[#1a1a1a]/75">{s.audience}</p>

                <div className="mt-6 flex items-center gap-2 text-sm text-[#1F6FDB] font-semibold">
                  <Icon icon="solar:clock-circle-outline" width="18" />
                  {s.duration}
                </div>

                <ul className="mt-6 space-y-3 flex-1">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 text-[#1a1a1a]/85">
                      <Icon
                        icon="solar:check-circle-outline"
                        width="20"
                        className="shrink-0 mt-0.5 text-[#2EC4FF]"
                      />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={s.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#0B2A5B] text-white font-semibold px-6 py-3 hover:-translate-y-0.5 hover:brightness-110 transition"
                >
                  {s.ctaLabel}
                  <Icon icon="solar:arrow-right-outline" width="18" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FIT / NO-FIT ───────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="reveal text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#1F6FDB] font-semibold">
              Fit
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-[#0B2A5B] leading-tight">
              Esse trabalho é para você se...
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {/* Faz sentido */}
            <div className="reveal p-8 md:p-10 rounded-2xl bg-[#f5f8fc] border border-[#d9e3ef]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#16a34a]/10 text-[#16a34a] flex items-center justify-center">
                  <Icon icon="solar:check-circle-bold" width="24" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-[#0B2A5B]">
                  Faz sentido se...
                </h3>
              </div>
              <ul className="mt-6 space-y-4">
                {[
                  "Sua empresa de tecnologia B2B fatura entre R$1M e R$50M",
                  "Você já passou do product-market fit e cresceu por demanda",
                  "Vendas e decisões importantes ainda passam por você",
                  "A operação está começando a ranger com o crescimento",
                  "Você está pronto para profissionalizar a estrutura",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[#1f2a3d] leading-relaxed">
                    <Icon
                      icon="solar:check-circle-outline"
                      width="22"
                      className="shrink-0 mt-0.5 text-[#16a34a]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Não é o momento */}
            <div className="reveal p-8 md:p-10 rounded-2xl bg-[#f7f8fa] border border-[#e3e6eb]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#94a3b8]/15 text-[#64748b] flex items-center justify-center">
                  <Icon icon="solar:close-circle-bold" width="24" />
                </div>
                <h3 className="font-serif text-xl md:text-2xl text-[#0B2A5B]">
                  Não é o momento se...
                </h3>
              </div>
              <ul className="mt-6 space-y-4">
                {[
                  "A empresa ainda está validando produto ou modelo de negócio",
                  "Faturamento ainda abaixo de R$1M",
                  "Não há disposição para revisar processos e papéis",
                  "A expectativa é por uma solução pronta em poucas semanas",
                  "O fundador busca um interino para “tocar o comercial”",
                ].map((item) => (
                  <li key={item} className="flex gap-3 text-[#4a5b73] leading-relaxed">
                    <Icon
                      icon="solar:close-circle-outline"
                      width="22"
                      className="shrink-0 mt-0.5 text-[#94a3b8]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── COMO O PROJETO ACONTECE ───────── */}
      <section className="py-16 md:py-24 bg-[#f5f8fc]">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="reveal text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#1F6FDB] font-semibold">
              Metodologia
            </span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-[#0B2A5B] leading-tight">
              Como o projeto acontece
            </h2>
            <p className="mt-4 text-[#4a5b73] text-base md:text-lg">
              Um ciclo estruturado de 6 meses, com cadência clara desde o primeiro dia.
            </p>
          </div>

          {/* Timeline */}
          <div className="reveal mt-16 relative">
            {/* connector line - desktop horizontal */}
            <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-[#2EC4FF]/20 via-[#1F6FDB]/40 to-[#2EC4FF]/20" />
            {/* connector line - mobile vertical */}
            <div className="lg:hidden absolute top-0 bottom-0 left-7 w-[2px] bg-gradient-to-b from-[#2EC4FF]/20 via-[#1F6FDB]/40 to-[#2EC4FF]/20" />

            <div className="grid lg:grid-cols-5 gap-8 lg:gap-4 relative">
              {[
                { icon: "solar:flag-2-outline", step: "Kick-off", when: "Mês 1", text: "Briefing executivo, alinhamento de prazos e prioridades." },
                { icon: "solar:magnifer-outline", step: "Diagnóstico", when: "Mês 1", text: "Entrevistas com lideranças, análise de dados e visita." },
                { icon: "solar:clipboard-list-outline", step: "Plano de Ação", when: "Mês 1", text: "Apresentação e validação do plano com cronograma de implementação." },
                { icon: "solar:settings-outline", step: "Implementação", when: "Meses 2 a 5", text: "Execução com ponto focal do cliente e reuniões mensais de resultados." },
                { icon: "solar:chart-2-outline", step: "Acompanhamento", when: "Mês 6", text: "Monitoramento de KPIs, ajustes finais e sustentação." },
              ].map((s, i) => (
                <div key={s.step} className="relative flex lg:flex-col gap-5 lg:gap-0 lg:text-center pl-0 lg:pl-0">
                  <div className="shrink-0 relative z-10 w-14 h-14 rounded-full bg-[#0B2A5B] text-[#2EC4FF] flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(11,42,91,0.4)] ring-4 ring-[#f5f8fc] lg:mx-auto">
                    <Icon icon={s.icon} width="26" />
                  </div>
                  <div className="lg:mt-5 flex-1">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-[#1F6FDB] font-semibold">
                      Etapa 0{i + 1} · {s.when}
                    </div>
                    <h3 className="mt-1 font-serif text-lg md:text-xl text-[#0B2A5B]">
                      {s.step}
                    </h3>
                    <p className="mt-2 text-sm text-[#4a5b73] leading-relaxed">
                      {s.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cadência cards */}
          <div className="reveal mt-16 grid md:grid-cols-2 gap-6">
            {[
              { icon: "solar:calendar-outline", title: "Cadência semanal/quinzenal", text: "Reuniões de orientação com o ponto focal." },
              { icon: "solar:chart-square-outline", title: "Reunião mensal", text: "Apresentação formal de resultados, indicadores e próximos passos." },
            ].map((c) => (
              <div
                key={c.title}
                className="flex gap-5 p-7 rounded-2xl bg-white border border-[#d9e3ef] hover:border-[#1F6FDB] transition-colors"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-[#0B2A5B] text-[#2EC4FF] flex items-center justify-center">
                  <Icon icon={c.icon} width="26" />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-[#0B2A5B]">{c.title}</h4>
                  <p className="mt-1 text-sm text-[#4a5b73] leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── SOBRE ───────── */}
      <section
        id="sobre"
        className="relative py-16 md:py-24 overflow-hidden"
        style={{ backgroundColor: "#0B2A5B", color: "#fff" }}
      >
        <div className="absolute inset-0 dot-grid" />
        <div className="relative mx-auto max-w-[1100px] px-6 grid md:grid-cols-[40fr_60fr] gap-12 items-center">
          <div className="reveal">
            <div className="about-photo-wrap aspect-[4/5]">
              <img src={aboutPhoto} alt="Daniel Sinenberg" />
            </div>
          </div>

          <div className="reveal">
            <span className="text-xs uppercase tracking-[0.2em] text-[#2EC4FF] font-semibold">
              Quem sou eu
            </span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl text-white leading-[1.05]">
              22+ anos transformando crescimento em estrutura
            </h2>

            <div className="mt-8 space-y-5 text-white/85 leading-relaxed">
              <p>
                Sou Daniel Sinenberg, consultor estratégico focado em empresas de tecnologia B2B em fase
                de crescimento. Trabalho com fundadores que precisam organizar o que cresceu rápido — e
                ainda depende deles para girar.
              </p>
              <p>
                Atendo empresas tech entre R$1M e R$50M de faturamento, pós-product market fit, que
                enfrentam gargalos de estrutura, vendas e organização. Entrego clareza estratégica,
                receita previsível e uma operação que funciona sem o fundador no meio de tudo.
              </p>
              <p>
                Mais de duas décadas dentro de grandes empresas que me ajudaram a construir a base do meu
                método: visão estratégica, articulação entre áreas e execução com indicadores vivos. É o
                que aplico hoje na Sinenberg Consulting, com cada cliente.
              </p>
            </div>

          </div>
        </div>

        {/* Missão card */}
        <div className="relative mx-auto max-w-[860px] px-6 mt-20">
          <div
            className="reveal rounded-3xl p-10 md:p-14 text-center border border-white/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]"
            style={{
              background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(46,196,255,0.06) 100%)",
              backgroundColor: "#082248",
            }}
          >
            <span className="inline-block text-[10px] uppercase tracking-[0.28em] text-[#2EC4FF] font-semibold px-3 py-1 rounded-full border border-[#2EC4FF]/40">
              Missão
            </span>
            <p className="mt-6 font-serif font-semibold text-white text-xl md:text-2xl lg:text-3xl leading-snug">
              Ajudar empresas de tecnologia a transformar crescimento desorganizado em crescimento estruturado e previsível.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── DEPOIMENTOS ───────── */}
      <section id="depoimentos" className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="reveal text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#1F6FDB] font-semibold">
              Depoimentos
            </span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl text-[#0B2A5B] leading-[1.05]">
              O que dizem sobre o meu trabalho
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className="reveal p-7 rounded-2xl bg-[#f5f8fc] flex flex-col"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  borderLeft: "4px solid #0B2A5B",
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#0B2A5B] text-[#2EC4FF] flex items-center justify-center font-serif text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0B2A5B] leading-tight">{t.name}</div>
                    <div className="text-xs text-[#1a1a1a]/70">{t.role}</div>
                  </div>
                </div>
                <p className="mt-5 text-[#1a1a1a]/80 text-sm leading-relaxed flex-1">
                  <span className="font-serif text-2xl text-[#1F6FDB] leading-none mr-1">"</span>
                  {t.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── LEAD MAGNET — CHECKLIST GRATUITO ───────── */}
      <section className="py-16 md:py-24 bg-[#F5F8FC]">
        <div className="mx-auto max-w-[1100px] px-6">
          <div
            className="reveal relative overflow-hidden rounded-3xl px-8 md:px-14 py-12 md:py-16"
            style={{ backgroundColor: "#0B2A5B" }}
          >
            {/* glow decoração */}
            <div
              className="pointer-events-none absolute -top-20 -right-20 w-[320px] h-[320px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(46,196,255,0.25) 0%, transparent 65%)",
              }}
            />
            <div
              className="pointer-events-none absolute -bottom-24 -left-16 w-[260px] h-[260px] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(31,111,219,0.25) 0%, transparent 65%)",
              }}
            />

            <div className="relative grid md:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-center">
              {/* Coluna esquerda — texto */}
              <div>
                <span
                  className="inline-block text-[11px] uppercase tracking-[0.22em] font-semibold px-3 py-1 rounded-full border"
                  style={{
                    color: "#2EC4FF",
                    borderColor: "rgba(46,196,255,0.45)",
                    backgroundColor: "rgba(46,196,255,0.08)",
                  }}
                >
                  Material Gratuito
                </span>

                <h2 className="mt-5 font-serif text-3xl md:text-4xl lg:text-[2.6rem] leading-[1.1] text-white">
                  Diagnóstico Rápido:{" "}
                  <span style={{ color: "#2EC4FF" }}>
                    7 sinais
                  </span>{" "}
                  de que sua empresa tech está pronta para escalar com previsibilidade
                </h2>

                <p className="mt-5 text-base md:text-lg text-white/75 leading-relaxed max-w-xl">
                  Um checklist objetivo para você avaliar sozinho onde sua operação
                  está hoje — e o que precisa antes de crescer mais.
                </p>
              </div>

              {/* Coluna direita — formulário */}
              <div className="md:pl-4">
                {leadStatus === "success" ? (
                  <div
                    className="rounded-2xl p-6 border text-center"
                    style={{
                      borderColor: "rgba(46,196,255,0.4)",
                      backgroundColor: "rgba(46,196,255,0.08)",
                    }}
                  >
                    <Icon
                      icon="solar:check-circle-bold"
                      className="mx-auto"
                      style={{ color: "#2EC4FF", fontSize: 40 }}
                    />
                    <p className="mt-3 text-white font-semibold text-lg">
                      Pronto! Em instantes você recebe o checklist no seu e-mail.
                    </p>
                    <p className="mt-2 text-sm text-white/65">
                      Caso não chegue, verifique a caixa de spam ou promoções.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <label htmlFor="lead-email" className="sr-only">
                      Seu melhor e-mail
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      required
                      maxLength={255}
                      autoComplete="email"
                      placeholder="seu melhor e-mail"
                      value={leadEmail}
                      onChange={(e) => {
                        setLeadEmail(e.target.value);
                        if (leadStatus === "error") setLeadStatus("idle");
                      }}
                      className="w-full h-12 rounded-xl px-4 text-[15px] text-white placeholder:text-white/45 bg-white/[0.06] border border-white/15 focus:outline-none focus:border-[#2EC4FF] focus:bg-white/[0.09] transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={leadStatus === "loading"}
                      className="w-full h-12 rounded-xl font-semibold text-[15px] text-[#0B2A5B] transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                      style={{ backgroundColor: "#2EC4FF" }}
                    >
                      {leadStatus === "loading" ? (
                        <>
                          <Icon icon="solar:refresh-outline" className="animate-spin" />
                          Enviando...
                        </>
                      ) : (
                        <>
                          Receber checklist gratuito
                          <Icon icon="solar:arrow-right-outline" />
                        </>
                      )}
                    </button>
                    {leadStatus === "error" && (
                      <p className="text-sm text-[#FFB4B4]">
                        Não conseguimos enviar agora. Verifique o e-mail e tente novamente.
                      </p>
                    )}
                    <p className="text-xs text-white/50 pt-1">
                      Sem spam. Você pode descadastrar a qualquer momento.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-[860px] px-6">
          <div className="reveal text-center mb-14">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#1F6FDB]">
              FAQ
            </span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl text-[#0B2A5B] leading-[1.1]">
              Perguntas frequentes
            </h2>
            <p className="mt-5 text-[#4a5a6e] text-lg leading-relaxed max-w-xl mx-auto">
              Reuni as dúvidas mais comuns de fundadores antes de iniciar uma conversa.
            </p>
          </div>

          <div className="reveal">
            <Accordion
              type="single"
              collapsible
              defaultValue="faq-0"
              className="w-full"
            >
              {faqs.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border-b border-[#e3e8f0] last:border-b-0"
                >
                  <AccordionTrigger className="text-left text-[#0B2A5B] font-semibold text-base md:text-lg py-6 hover:no-underline hover:text-[#1F6FDB] transition-colors">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[#4a5a6e] text-base leading-relaxed pb-6 pr-2">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ───────── CTA FINAL ───────── */}
      <section
        className="relative py-[140px] overflow-hidden"
        style={{ backgroundColor: "#0B2A5B" }}
      >
        <div className="absolute inset-0 dot-grid" />
        <div
          className="absolute top-1/2 -left-40 -translate-y-1/2 w-[400px] h-[400px] rounded-full float"
          style={{
            background:
              "radial-gradient(circle, rgba(31,111,219,0.3) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute top-10 right-10 w-[280px] h-[280px] rounded-full float"
          style={{
            animationDelay: "2s",
            background:
              "radial-gradient(circle, rgba(46,196,255,0.22) 0%, transparent 65%)",
          }}
        />
        <div className="relative mx-auto max-w-[900px] px-6 text-center">
          <div className="reveal">
            <h2 className="font-serif text-4xl md:text-6xl text-white leading-[1.05]">
              Imagine sua empresa crescendo com clareza, processo e previsibilidade.
            </h2>
            <p className="mt-8 text-white/85 text-lg max-w-2xl mx-auto leading-relaxed">
              Uma conversa de 20 minutos é suficiente para entender se faz sentido trabalharmos
              juntos. Você sai com pré diagnóstico claro, recomendações práticas — e sem compromisso.
            </p>
            <a
              href={CTA}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-3 rounded-full bg-[#2EC4FF] text-[#0B2A5B] font-semibold text-lg px-9 py-5 hover:-translate-y-0.5 hover:brightness-110 transition shadow-[0_20px_60px_-15px_rgba(46,196,255,0.6)]"
            >
              Agendar Sessão Estratégica
              <Icon icon="solar:arrow-right-outline" width="22" />
            </a>
          </div>
        </div>
      </section>

      {/* ───────── FOOTER ───────── */}
      <footer className="py-12" style={{ backgroundColor: "#06173A", color: "#fff" }}>
        <div className="mx-auto max-w-[1100px] px-6 grid grid-cols-1 md:grid-cols-3 items-center gap-8">
          <p className="text-xs text-white/60 text-center md:text-left order-2 md:order-1 leading-relaxed">
            © 2026 Sinenberg Consulting
            <br />
            Todos os direitos reservados.
          </p>
          <div className="flex items-center justify-center gap-5 order-1 md:order-2">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-14 h-14 rounded-full text-white flex items-center justify-center hover:-translate-y-1 hover:brightness-110 transition shadow-[0_10px_30px_-10px_rgba(225,48,108,0.6)]"
              style={{
                background:
                  "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              <Icon icon="ph:instagram-logo-fill" width="28" />
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-14 h-14 rounded-full text-white flex items-center justify-center hover:-translate-y-1 hover:brightness-110 transition shadow-[0_10px_30px_-10px_rgba(10,102,194,0.6)]"
              style={{ backgroundColor: "#0A66C2" }}
            >
              <Icon icon="ph:linkedin-logo-fill" width="28" />
            </a>
          </div>
          <div className="flex justify-center md:justify-end order-3">
            <img src={logoDark} alt="Sinenberg Consulting" className="h-16 md:h-20 w-auto" />
          </div>
        </div>
      </footer>
    </div>
  );
}
