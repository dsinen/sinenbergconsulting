import { createFileRoute } from "@tanstack/react-router";
import { Icon } from "@iconify/react";
import { Navbar } from "@/components/Navbar";
import { CountUp } from "@/components/CountUp";
import { useReveal } from "@/hooks/useReveal";
import heroPhoto from "@/assets/daniel-hero.jpg";
import aboutPhoto from "@/assets/daniel-about.jpg";
import logoDark from "@/assets/logo-dark.png";

const CTA = "https://wa.link/qijedd";
const INSTAGRAM = "https://www.instagram.com/dsinen";
const LINKEDIN = "https://www.linkedin.com/in/danielsinenberg";

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

      {/* ───────── DOR ───────── */}
      <section className="py-[120px] bg-white">
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
        className="relative py-[120px] overflow-hidden"
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
      <section id="servicos" className="py-[120px] bg-white">
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
                  href={CTA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[#0B2A5B] text-white font-semibold px-6 py-3 hover:-translate-y-0.5 hover:brightness-110 transition"
                >
                  Quero saber mais
                  <Icon icon="solar:arrow-right-outline" width="18" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── SOBRE ───────── */}
      <section
        id="sobre"
        className="relative py-[120px] overflow-hidden"
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

            <blockquote
              className="mt-10 p-7 rounded-2xl relative"
              style={{ background: "rgba(46,196,255,0.08)", borderLeft: "3px solid #2EC4FF" }}
            >
              <span
                aria-hidden
                className="absolute -top-4 left-5 font-serif text-7xl text-[#2EC4FF]/40 leading-none"
              >
                "
              </span>
              <p
                className="font-serif italic text-white"
                style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)", lineHeight: 1.4 }}
              >
                Ajudar empresas de tecnologia a transformar crescimento desorganizado em
                crescimento estruturado e previsível.
              </p>
              <footer className="mt-3 text-xs uppercase tracking-[0.2em] text-[#2EC4FF]">
                Missão
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ───────── DEPOIMENTOS ───────── */}
      <section id="depoimentos" className="py-[120px] bg-white">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="reveal text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-[#1F6FDB] font-semibold">
              Depoimentos
            </span>
            <h2 className="mt-4 font-serif text-4xl md:text-5xl text-[#0B2A5B] leading-[1.05]">
              O que dizem sobre o meu trabalho
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
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
              Uma conversa de 30 minutos é suficiente para entender se faz sentido trabalharmos
              juntos. Você sai com diagnóstico claro, recomendações práticas — e sem compromisso.
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
        <div className="mx-auto max-w-[1100px] px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <img src={logoDark} alt="Sinenberg Consulting" className="h-16 md:h-20 w-auto" />
          <div className="flex items-center gap-4">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#2EC4FF] hover:text-[#0B2A5B] hover:border-[#2EC4FF] transition"
            >
              <Icon icon="solar:instagram-outline" width="20" />
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#2EC4FF] hover:text-[#0B2A5B] hover:border-[#2EC4FF] transition"
            >
              <Icon icon="ph:linkedin-logo" width="20" />
            </a>
          </div>
          <p className="text-sm text-white/70 text-center md:text-right">
            © 2026 Sinenberg Consulting — Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
