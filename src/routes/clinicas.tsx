import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@iconify/react";
import logoDark from "@/assets/logo-dark.png";
import danielPhoto from "@/assets/daniel-about.jpg";

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
        content:
          "A clínica funcionando como empresa, sem depender do médico para tudo girar.",
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
    icone: "solar:users-group-rounded-outline",
  },
  {
    titulo: "Processo que não sai do papel",
    texto: "Desenhado em reunião, esquecido na semana seguinte.",
    icone: "solar:document-text-outline",
  },
  {
    titulo: "Receita vazando sem ninguém ver",
    texto: "Lead que não converte, paciente no médico errado.",
    icone: "solar:graph-down-outline",
  },
];

const pilares = [
  {
    n: "01",
    titulo: "Direção e Clareza",
    resumo: "A clínica passa a enxergar os próprios números e a decidir com base em dado.",
    itens: [
      "Mapa da operação, ponta a ponta",
      "Painel de indicadores: conversão, no-show, retorno e mix",
      "Leitura separada entre o ganho do médico e o valor da clínica",
    ],
  },
  {
    n: "02",
    titulo: "Jornada do Paciente",
    resumo: "A experiência é organizada do primeiro contato ao retorno, recuperando a conversão que se perde no caminho.",
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

function Botao({ className = "" }: { className?: string }) {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#2EC4FF] px-6 py-3.5 font-serif text-base font-medium text-[#0B2A5B] transition-transform duration-150 hover:-translate-y-0.5 ${className}`}
    >
      <Icon icon="ic:baseline-whatsapp" className="text-xl" />
      Conversar por 30 minutos
    </a>
  );
}

function ClinicasPage() {
  return (
    <div className="min-h-screen bg-white text-[#0f1729]">
      <header className="bg-[#0B2A5B]">
        <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-4 md:h-20 md:px-6">
          <Link to="/" aria-label="Sinenberg Consulting, início">
            <img src={logoDark} alt="Sinenberg Consulting" className="h-14 w-auto md:h-16" />
          </Link>
          <Link to="/diagnostico" className="text-sm text-white/85 hover:text-[#2EC4FF]">
            Diagnóstico Rápido
          </Link>
        </div>
      </header>

      <section className="bg-[#0B2A5B] pb-16 pt-10 text-white md:pb-24 md:pt-16">
        <div className="mx-auto max-w-[900px] px-4 md:px-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#2EC4FF]">
            Clínica Estruturada
          </p>
          <h1 className="mt-4 font-serif text-4xl font-medium leading-[1.08] md:text-6xl">
            A clínica funcionando como empresa, sem depender do médico para tudo girar.
          </h1>
          <p className="mt-6 max-w-[680px] text-base leading-relaxed text-white/85 md:text-lg">
            Ajudo clínicas que giram em torno do médico-fundador, na cadeira e na gestão, a
            estruturar a operação para que o crescimento pare de depender da agenda dele.
          </p>
          <div className="mt-8">
            <Botao />
            <p className="mt-3 text-sm text-white/60">
              Projeto fechado de 90 dias, com escopo e prazo definidos.
            </p>
          </div>
        </div>
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
              <div key={d.titulo} className="rounded-2xl bg-[#F5F9FE] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B2A5B] text-xl text-[#2EC4FF]">
                  <Icon icon={d.icone} />
                </div>
                <h3 className="mt-4 font-serif text-xl text-[#0B2A5B]">{d.titulo}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#1f2a3d]/80">{d.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F5F9FE] py-16 md:py-20">
        <div className="mx-auto max-w-[900px] px-4 md:px-6">
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
              <div key={p.n} className="flex flex-col rounded-2xl border border-[#0B2A5B]/10 p-6">
                <span className="font-serif text-4xl text-[#2EC4FF]">{p.n}</span>
                <h3 className="mt-2 font-serif text-2xl text-[#0B2A5B]">{p.titulo}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[#1f2a3d]/80">{p.resumo}</p>
                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-[#0B2A5B]/60">
                  O que você recebe
                </p>
                <ul className="mt-3 space-y-2.5 text-[15px] leading-snug text-[#1f2a3d]/90">
                  {p.itens.map((i) => (
                    <li key={i} className="flex gap-2.5">
                      <Icon icon="solar:check-circle-bold" className="mt-0.5 shrink-0 text-[#1F6FDB]" />
                      <span>{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2A5B] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1100px] px-4 md:px-6">
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">Como o projeto acontece</h2>
          <p className="mt-3 text-white/70">Da imersão inicial até a rotina que opera sozinha.</p>
          <ol className="mt-10 grid gap-4 md:grid-cols-5">
            {etapas.map((e, i) => (
              <li key={e.titulo} className="rounded-2xl bg-white/10 p-5 ring-1 ring-white/15">
                <span className="text-sm text-[#2EC4FF]">{i + 1}</span>
                <h3 className="mt-1 font-serif text-lg">{e.titulo}</h3>
                <p className="mt-1.5 text-sm leading-snug text-white/75">{e.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto grid max-w-[1100px] gap-10 px-4 md:grid-cols-2 md:px-6">
          <div>
            <h2 className="font-serif text-3xl leading-tight text-[#0B2A5B] md:text-4xl">
              Para quem é
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-[#1f2a3d]/85">
              Para clínicas particulares com operação já instalada, onde o crescimento parou de
              caber na cabeça das pessoas e a estrutura precisa assumir o lugar da improvisação.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-[#1f2a3d]/85">
              Não é para quem atende sozinho e quer, antes de tudo, gerar demanda. É para a
              clínica que já tem volume e equipe, e precisa transformar esforço individual em
              operação que se sustenta.
            </p>
          </div>
          <div className="flex items-start gap-5 rounded-2xl bg-[#F5F9FE] p-6">
            <img
              src={danielPhoto}
              alt="Daniel Sinenberg"
              className="h-24 w-24 shrink-0 rounded-full object-cover object-top"
            />
            <div>
              <h3 className="font-serif text-xl text-[#0B2A5B]">Quem conduz</h3>
              <p className="mt-1 text-sm font-medium text-[#1F6FDB]">Daniel Sinenberg</p>
              <p className="mt-2 text-[15px] leading-relaxed text-[#1f2a3d]/85">
                Mais de 20 anos estruturando crescimento e operação em empresas e multinacionais,
                em tecnologia, varejo e serviços financeiros. O rigor de gestão, processo e
                indicador de operações grandes, aplicado a um setor que não tem esse olhar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F5F9FE] py-16 md:py-20">
        <div className="mx-auto max-w-[800px] px-4 md:px-6">
          <h2 className="font-serif text-3xl text-[#0B2A5B] md:text-4xl">Perguntas frequentes</h2>
          <div className="mt-8 divide-y divide-[#0B2A5B]/10 rounded-2xl bg-white">
            {faq.map((f) => (
              <details key={f.q} className="group px-6 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-[#0B2A5B]">
                  {f.q}
                  <Icon icon="solar:alt-arrow-down-outline" className="shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p className="mt-3 text-[15px] leading-relaxed text-[#1f2a3d]/85">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0B2A5B] py-16 text-center text-white md:py-20">
        <div className="mx-auto max-w-[700px] px-4 md:px-6">
          <h2 className="font-serif text-3xl leading-tight md:text-4xl">
            Vamos estruturar sua clínica?
          </h2>
          <p className="mt-4 text-white/80">
            Uma conversa de 30 minutos para entender o momento da clínica e ver se faz sentido
            trabalharmos juntos.
          </p>
          <div className="mt-8">
            <Botao />
          </div>
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
