import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@iconify/react";
import logoDark from "@/assets/logo-dark.png";

export const Route = createFileRoute("/diagnostico")({
  head: () => ({
    meta: [
      { title: "Diagnóstico Rápido — Sinenberg Consulting" },
      {
        name: "description",
        content:
          "7 perguntas, 3 minutos. Descubra o estágio de maturidade da sua operação tech e o que precisa antes de escalar.",
      },
      { property: "og:title", content: "Diagnóstico Rápido — Sinenberg Consulting" },
      {
        property: "og:description",
        content:
          "Responda 7 perguntas e receba um diagnóstico personalizado da maturidade da sua operação.",
      },
    ],
  }),
  component: DiagnosticoPage,
});

// ─────────────────────────── Constantes ───────────────────────────

const WHATSAPP_NUMBER = "5511984083610";
const WHATSAPP_GENERIC = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Olá Daniel, fiz o Diagnóstico Rápido no site e gostaria de conversar.",
)}`;

const FATURAMENTO_OPTIONS = [
  "Abaixo de R$1M",
  "R$1M a R$5M",
  "R$5M a R$15M",
  "R$15M a R$50M",
  "Acima de R$50M",
] as const;

const PAPEL_OPTIONS = [
  "Fundador / CEO",
  "C-level (CFO, CRO, COO, etc.)",
  "Diretor",
  "Gerente",
  "Outro",
] as const;

type Choice = "A" | "B" | "C";

interface QuestionDef {
  n: number;
  categoria: string;
  categoriaTitulo: string;
  pergunta: string;
  opcoes: { letra: Choice; texto: string; pontos: number }[];
}

const QUESTIONS: QuestionDef[] = [
  {
    n: 1,
    categoria: "Direção de Crescimento",
    categoriaTitulo: "Definição de cliente ideal",
    pergunta:
      "Sua empresa tem clareza sobre qual é o cliente ideal — aquele que compra mais rápido, paga melhor e dá menos trabalho?",
    opcoes: [
      { letra: "A", texto: "Vendemos para qualquer cliente que aparece — não temos esse filtro definido.", pontos: 0 },
      { letra: "B", texto: "Temos uma ideia, mas o time comercial nem sempre segue.", pontos: 1 },
      { letra: "C", texto: "ICP claro, documentado, e o time prioriza com base nele.", pontos: 3 },
    ],
  },
  {
    n: 2,
    categoria: "Direção de Crescimento",
    categoriaTitulo: "Hierarquia de portfólio",
    pergunta:
      "Sua oferta tem uma frente principal que puxa o crescimento — ou o time vende um pouco de cada coisa?",
    opcoes: [
      { letra: "A", texto: "Vendemos várias soluções e cada vendedor tem sua preferência.", pontos: 0 },
      { letra: "B", texto: "Existe uma oferta principal, mas a régua de prioridade não é seguida.", pontos: 1 },
      { letra: "C", texto: "Portfólio com hierarquia clara — todo mundo sabe qual oferta puxa o resultado.", pontos: 3 },
    ],
  },
  {
    n: 3,
    categoria: "Estrutura de Receita",
    categoriaTitulo: "Dependência do fundador no comercial",
    pergunta:
      "Pensando no último trimestre: que percentual dos fechamentos passou diretamente por você (fundador/CEO)?",
    opcoes: [
      { letra: "A", texto: "Mais de 70%. Sou eu quem fecha quase tudo.", pontos: 0 },
      { letra: "B", texto: "Entre 30% e 70%. Participo dos negócios maiores ou estratégicos.", pontos: 2 },
      { letra: "C", texto: "Menos de 30%. O time fecha sozinho — eu entro só em decisões muito específicas.", pontos: 3 },
    ],
  },
  {
    n: 4,
    categoria: "Estrutura de Receita",
    categoriaTitulo: "Previsibilidade de pipeline",
    pergunta:
      "Você consegue projetar a receita dos próximos 90 dias com margem de erro inferior a 20%?",
    opcoes: [
      { letra: "A", texto: "Não. A previsão é mais 'feeling' do que dado.", pontos: 0 },
      { letra: "B", texto: "Tenho uma estimativa, mas o desvio costuma ser grande no fechamento do mês.", pontos: 1 },
      { letra: "C", texto: "Sim. Tenho pipeline estruturado e meu forecast bate consistentemente.", pontos: 3 },
    ],
  },
  {
    n: 5,
    categoria: "Estrutura de Receita",
    categoriaTitulo: "Método e documentação comercial",
    pergunta:
      "Se um vendedor importante sair amanhã, o conhecimento e os processos ficam — ou saem com ele?",
    opcoes: [
      { letra: "A", texto: "Sairia junto. Cada um tem o seu jeito de vender.", pontos: 0 },
      { letra: "B", texto: "Parte fica documentada, parte está na cabeça das pessoas.", pontos: 2 },
      { letra: "C", texto: "Tudo está em playbook, CRM e processos. A pessoa sai, o método continua.", pontos: 3 },
    ],
  },
  {
    n: 6,
    categoria: "Escala com Previsibilidade",
    categoriaTitulo: "Saúde operacional do crescimento",
    pergunta:
      "Nos últimos 12 meses, mais clientes significaram mais margem — ou mais retrabalho e fricção?",
    opcoes: [
      { letra: "A", texto: "Mais retrabalho. A operação está rangendo com o crescimento.", pontos: 0 },
      { letra: "B", texto: "Margem estável, mas a complexidade aumentou bastante.", pontos: 1 },
      { letra: "C", texto: "Mais margem. A operação acompanha o crescimento sem colapsar.", pontos: 3 },
    ],
  },
  {
    n: 7,
    categoria: "Escala com Previsibilidade",
    categoriaTitulo: "Gestão por indicadores",
    pergunta:
      "Quando você toma uma decisão comercial importante, olha mais para indicadores ou para o sentimento do time?",
    opcoes: [
      { letra: "A", texto: "Sentimento do time. Não temos indicadores comerciais consolidados.", pontos: 0 },
      { letra: "B", texto: "Misturo os dois. Olho dados, mas o sentimento ainda pesa muito.", pontos: 2 },
      { letra: "C", texto: "Indicadores. Tenho KPIs que dizem para onde olhar.", pontos: 3 },
    ],
  },
];

interface FormData {
  nome: string;
  email: string;
  empresa: string;
  faturamento: string;
  papel: string;
}

type Step = "intro" | "question" | "loading" | "result";

type ResultKey = "A" | "B" | "C" | "D";

// ─────────────────────────── Componente principal ───────────────────────────

function DiagnosticoPage() {
  const [step, setStep] = useState<Step>("intro");
  const [questionIdx, setQuestionIdx] = useState(0);
  const [form, setForm] = useState<FormData>({
    nome: "",
    email: "",
    empresa: "",
    faturamento: "",
    papel: "",
  });
  const [answers, setAnswers] = useState<(Choice | null)[]>(
    Array(QUESTIONS.length).fill(null),
  );

  const formValid =
    form.nome.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
    form.empresa.trim().length > 1 &&
    !!form.faturamento &&
    !!form.papel;

  const totalScore = useMemo(
    () =>
      answers.reduce((sum, a, i) => {
        if (!a) return sum;
        const opt = QUESTIONS[i].opcoes.find((o) => o.letra === a);
        return sum + (opt?.pontos ?? 0);
      }, 0),
    [answers],
  );

  const resultKey: ResultKey = useMemo(() => {
    if (form.faturamento === "Abaixo de R$1M") return "A";
    if (totalScore <= 9) return "B";
    if (totalScore <= 15) return "C";
    return "D";
  }, [form.faturamento, totalScore]);

  const pontosCriticos = useMemo(() => {
    const arr = answers.map((a, i) => {
      const opt = a ? QUESTIONS[i].opcoes.find((o) => o.letra === a) : null;
      return {
        idx: i,
        titulo: QUESTIONS[i].categoriaTitulo,
        pontos: opt?.pontos ?? 0,
      };
    });
    arr.sort((a, b) => a.pontos - b.pontos);
    return arr.slice(0, 3).map((x) => x.titulo);
  }, [answers]);

  // Loading -> result transition (cosmético)
  useEffect(() => {
    if (step !== "loading") return;
    const t = setTimeout(() => {
      setStep("result");
    }, 2000);
    return () => clearTimeout(t);
  }, [step]);

  const progress =
    step === "intro"
      ? 0
      : step === "question"
      ? ((questionIdx + 1) / QUESTIONS.length) * 100
      : 100;

  function handleStart() {
    if (!formValid) return;
    setStep("question");
    setQuestionIdx(0);
  }

  function handleAdvance() {
    if (!answers[questionIdx]) return;
    if (questionIdx < QUESTIONS.length - 1) {
      setQuestionIdx((i) => i + 1);
    } else {
      setStep("loading");
    }
  }

  function handleBack() {
    if (step === "question") {
      if (questionIdx === 0) {
        setStep("intro");
      } else {
        setQuestionIdx((i) => i - 1);
      }
    }
  }

  function handleSelect(letra: Choice) {
    setAnswers((arr) => {
      const next = [...arr];
      next[questionIdx] = letra;
      return next;
    });
  }

  function handleRestart() {
    setStep("intro");
    setQuestionIdx(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F9FE] text-[#0B2A5B]">
      {/* Header simplificado */}
      <header className="relative w-full border-b border-[#0B2A5B]/10 bg-white">
        <div className="mx-auto max-w-[1100px] px-4 md:px-6 h-16 md:h-20 flex items-center justify-center">
          <Link
            to="/"
            className="absolute left-3 md:left-6 inline-flex items-center gap-1.5 text-xs md:text-sm text-[#0B2A5B]/70 hover:text-[#0B2A5B] transition-colors"
          >
            <Icon icon="solar:arrow-left-outline" />
            <span className="hidden sm:inline">Voltar para o site</span>
            <span className="sm:hidden">Voltar</span>
          </Link>
          <Link to="/" aria-label="Sinenberg Consulting — Início">
            <img src={logoDark} alt="Sinenberg Consulting" className="h-10 md:h-12 w-auto" />
          </Link>
        </div>

        {/* Barra de progresso */}
        {step !== "intro" && (
          <div className="h-1 w-full bg-[#0B2A5B]/10">
            <div
              className="h-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                backgroundColor: "#2EC4FF",
              }}
            />
          </div>
        )}
      </header>

      {/* Conteúdo */}
      <main className="flex-1 w-full">
        <div className="mx-auto max-w-[760px] px-4 sm:px-6 py-10 md:py-16">
          {step === "intro" && (
            <IntroScreen
              form={form}
              setForm={setForm}
              valid={formValid}
              onStart={handleStart}
            />
          )}

          {step === "question" && (
            <QuestionScreen
              question={QUESTIONS[questionIdx]}
              selected={answers[questionIdx]}
              onSelect={handleSelect}
              onBack={handleBack}
              onAdvance={handleAdvance}
              isLast={questionIdx === QUESTIONS.length - 1}
            />
          )}

          {step === "loading" && <LoadingScreen />}

          {step === "result" && (
            <ResultScreen
              resultKey={resultKey}
              score={totalScore}
              pontosCriticos={pontosCriticos}
              form={form}
              onRestart={handleRestart}
            />
          )}
        </div>
      </main>

      {/* Footer minimalista */}
      <footer className="border-t border-[#0B2A5B]/10 bg-white">
        <div className="mx-auto max-w-[1100px] px-4 md:px-6 h-12 flex items-center justify-center">
          <p className="text-[11px] md:text-xs text-[#0B2A5B]/55">
            © {new Date().getFullYear()} Sinenberg Consulting. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────── Tela 1 — Intro ───────────────────────────

function IntroScreen({
  form,
  setForm,
  valid,
  onStart,
}: {
  form: FormData;
  setForm: (f: FormData) => void;
  valid: boolean;
  onStart: () => void;
}) {
  return (
    <div className="animate-in fade-in duration-300">
      <span
        className="inline-block text-[11px] uppercase tracking-[0.22em] font-semibold px-3 py-1 rounded-full"
        style={{
          color: "#2EC4FF",
          backgroundColor: "rgba(46,196,255,0.1)",
        }}
      >
        Diagnóstico Rápido
      </span>
      <h1 className="mt-4 font-serif text-3xl md:text-[2.6rem] leading-[1.1] text-[#0B2A5B]">
        Sua empresa tech está pronta para escalar com previsibilidade?
      </h1>
      <p className="mt-4 text-base md:text-lg text-[#1f2a3d]/75 leading-relaxed">
        7 perguntas, 3 minutos. No final, você recebe um diagnóstico personalizado do estágio
        atual da sua operação — e o que precisa antes de crescer mais.
      </p>

      <form
        className="mt-8 space-y-4 bg-white rounded-2xl border border-[#0B2A5B]/10 p-5 md:p-7 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          onStart();
        }}
      >
        <Field label="Nome completo">
          <input
            type="text"
            required
            maxLength={120}
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            className="w-full h-12 rounded-xl px-4 text-[15px] bg-[#F5F9FE] border border-[#0B2A5B]/15 focus:outline-none focus:border-[#2EC4FF] transition-colors"
            placeholder="Seu nome"
          />
        </Field>
        <Field label="E-mail corporativo">
          <input
            type="email"
            required
            maxLength={255}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full h-12 rounded-xl px-4 text-[15px] bg-[#F5F9FE] border border-[#0B2A5B]/15 focus:outline-none focus:border-[#2EC4FF] transition-colors"
            placeholder="voce@empresa.com"
          />
        </Field>
        <Field label="Empresa">
          <input
            type="text"
            required
            maxLength={150}
            value={form.empresa}
            onChange={(e) => setForm({ ...form, empresa: e.target.value })}
            className="w-full h-12 rounded-xl px-4 text-[15px] bg-[#F5F9FE] border border-[#0B2A5B]/15 focus:outline-none focus:border-[#2EC4FF] transition-colors"
            placeholder="Nome da empresa"
          />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Faturamento anual aproximado">
            <select
              required
              value={form.faturamento}
              onChange={(e) => setForm({ ...form, faturamento: e.target.value })}
              className="w-full h-12 rounded-xl px-3 text-[15px] bg-[#F5F9FE] border border-[#0B2A5B]/15 focus:outline-none focus:border-[#2EC4FF] transition-colors"
            >
              <option value="">Selecione…</option>
              {FATURAMENTO_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Seu papel na empresa">
            <select
              required
              value={form.papel}
              onChange={(e) => setForm({ ...form, papel: e.target.value })}
              className="w-full h-12 rounded-xl px-3 text-[15px] bg-[#F5F9FE] border border-[#0B2A5B]/15 focus:outline-none focus:border-[#2EC4FF] transition-colors"
            >
              <option value="">Selecione…</option>
              {PAPEL_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <button
          type="submit"
          disabled={!valid}
          className="mt-2 w-full min-h-12 rounded-xl font-semibold text-base text-[#0B2A5B] transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
          style={{ backgroundColor: "#2EC4FF" }}
        >
          Começar diagnóstico
          <Icon icon="solar:arrow-right-outline" />
        </button>

        <p className="text-xs text-[#0B2A5B]/55 text-center pt-1">
          Suas respostas são confidenciais. Não compartilhamos com terceiros.
        </p>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-[#0B2A5B]/80">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

// ─────────────────────────── Tela de pergunta ───────────────────────────

function QuestionScreen({
  question,
  selected,
  onSelect,
  onBack,
  onAdvance,
  isLast,
}: {
  question: QuestionDef;
  selected: Choice | null;
  onSelect: (l: Choice) => void;
  onBack: () => void;
  onAdvance: () => void;
  isLast: boolean;
}) {
  return (
    <div key={question.n} className="animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-xs font-medium text-[#0B2A5B]/55 uppercase tracking-[0.18em]">
        Pergunta {question.n} de {QUESTIONS.length}
      </div>

      <span
        className="inline-block mt-4 text-[11px] uppercase tracking-[0.22em] font-semibold px-3 py-1 rounded-full"
        style={{
          color: "#2EC4FF",
          backgroundColor: "rgba(46,196,255,0.1)",
        }}
      >
        {question.categoria}
      </span>

      <h2 className="mt-4 font-serif text-2xl md:text-[2rem] leading-[1.2] text-[#0B2A5B]">
        {question.pergunta}
      </h2>

      <div className="mt-7 space-y-3">
        {question.opcoes.map((opt) => {
          const active = selected === opt.letra;
          return (
            <button
              key={opt.letra}
              type="button"
              onClick={() => onSelect(opt.letra)}
              className={`w-full text-left min-h-12 rounded-2xl px-5 py-4 border-2 transition-all bg-white ${
                active
                  ? "border-[#2EC4FF] shadow-[0_0_0_4px_rgba(46,196,255,0.15)]"
                  : "border-[#0B2A5B]/10 hover:border-[#0B2A5B]/30"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-[11px] font-semibold transition-colors ${
                    active
                      ? "border-[#2EC4FF] bg-[#2EC4FF] text-[#0B2A5B]"
                      : "border-[#0B2A5B]/25 text-[#0B2A5B]/55"
                  }`}
                >
                  {opt.letra}
                </span>
                <span className="text-[15px] md:text-base text-[#1f2a3d] leading-relaxed">
                  {opt.texto}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="min-h-12 px-4 md:px-5 rounded-xl text-[#0B2A5B]/70 hover:text-[#0B2A5B] hover:bg-[#0B2A5B]/5 inline-flex items-center gap-1.5 transition-colors text-sm font-medium"
        >
          <Icon icon="solar:arrow-left-outline" />
          Voltar
        </button>
        <button
          type="button"
          onClick={onAdvance}
          disabled={!selected}
          className="min-h-12 px-6 md:px-7 rounded-xl font-semibold text-[#0B2A5B] transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2"
          style={{ backgroundColor: "#2EC4FF" }}
        >
          {isLast ? "Ver meu resultado" : "Avançar"}
          <Icon icon="solar:arrow-right-outline" />
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────── Tela de loading ───────────────────────────

function LoadingScreen() {
  return (
    <div className="py-16 md:py-24 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
      <div className="relative">
        <div
          className="w-16 h-16 rounded-full border-4 border-[#0B2A5B]/10"
          style={{ borderTopColor: "#2EC4FF" }}
        >
          <div className="w-full h-full rounded-full animate-spin" />
        </div>
        <div
          className="absolute inset-0 w-16 h-16 rounded-full border-4 border-transparent animate-spin"
          style={{ borderTopColor: "#2EC4FF" }}
        />
      </div>
      <p className="mt-6 text-lg font-medium text-[#0B2A5B]">Analisando suas respostas...</p>
      <p className="mt-2 text-sm text-[#0B2A5B]/60">Isso leva apenas alguns segundos.</p>
    </div>
  );
}

// ─────────────────────────── Telas de resultado ───────────────────────────

interface ResultMeta {
  selo: string;
  seloBg: string;
  seloColor: string;
  categoriaShort: string;
  titulo: string;
  mensagem: string[];
  blocoLabel?: string;
  scoreVisivel?: boolean;
}

function metaFor(key: ResultKey): ResultMeta {
  switch (key) {
    case "A":
      return {
        selo: "🚫 AINDA NÃO É O MOMENTO",
        seloBg: "rgba(80,80,90,0.12)",
        seloColor: "#3a3a45",
        categoriaShort: "Ainda não é o momento",
        titulo: "O momento ainda não é esse — e tudo bem.",
        mensagem: [
          "Sua empresa ainda está em uma fase onde o foco precisa ser provar o modelo de negócio e validar o produto no mercado. Estruturar uma operação para escalar antes de ter tração consistente costuma ser caro e prematuro.",
          "Minha recomendação para esse momento: foque em vendas diretas, ouça intensamente os clientes, ajuste o produto. Quando o faturamento começar a se aproximar dos R$1M de forma recorrente, a conversa sobre estrutura faz muito mais sentido.",
          "Salvei seu contato. Daqui a alguns meses, posso te procurar para entender se chegou o momento.",
        ],
        scoreVisivel: false,
      };
    case "B":
      return {
        selo: "🔴 CRESCIMENTO FRÁGIL",
        seloBg: "rgba(239,68,68,0.12)",
        seloColor: "#c83232",
        categoriaShort: "Crescimento Frágil",
        titulo: "Você está crescendo no improviso — e o limite chega rápido.",
        mensagem: [
          "Sua pontuação indica que a operação ainda funciona muito por esforço pessoal e heroísmo, não por método. Isso não é um julgamento — é o estágio natural de toda empresa que cresceu pela qualidade do produto, não pela máquina comercial.",
          "O risco: o teto desse modelo é a sua agenda. E quanto mais a empresa cresce, mais essa conta aperta — em margem, em time, em previsibilidade.",
          "A boa notícia: você ainda tem tempo. Estruturar agora é muito mais barato do que estruturar em crise.",
        ],
        blocoLabel: "Pontos críticos da sua operação",
      };
    case "C":
      return {
        selo: "🟡 CRESCIMENTO EM RISCO",
        seloBg: "rgba(245,158,11,0.14)",
        seloColor: "#a86b09",
        categoriaShort: "Crescimento em Risco",
        titulo: "Você está no ponto de virada — onde muitas tech travam.",
        mensagem: [
          "Sua empresa já tem algumas peças no lugar, mas a próxima fase de crescimento exige mudanças que não acontecem sozinhas. É justamente nessa faixa de maturidade que vejo as empresas mais ricas em potencial e mais frágeis em execução.",
          "O que costuma travar aqui: o fundador percebe que precisa sair do meio, mas o time ainda não está preparado. O pipeline existe, mas o forecast falha. Tem indicadores, mas as decisões importantes ainda passam pelo 'feeling'.",
          "Esse é o momento mais estratégico para profissionalizar a estrutura — antes que o crescimento te empurre para uma decisão sob pressão.",
        ],
        blocoLabel: "Onde sua operação ainda precisa amadurecer",
      };
    case "D":
      return {
        selo: "🟢 PRONTO PARA ESCALAR",
        seloBg: "rgba(34,197,94,0.14)",
        seloColor: "#1e7a3a",
        categoriaShort: "Pronto para Escalar",
        titulo: "Sua base é sólida — agora o jogo é aceleração.",
        mensagem: [
          "Sua pontuação coloca sua empresa acima da média do mercado tech B2B brasileiro em maturidade comercial. Você tem ICP definido, o fundador já saiu do meio das vendas, há previsibilidade e gestão por dados.",
          "O ganho aqui não é estrutural — é otimização e aceleração. Empresas nesse estágio costumam buscar consultoria por 3 motivos: entrar em novos mercados, aumentar margem em mercados maduros, ou preparar a operação para um movimento de M&A ou captação.",
        ],
        blocoLabel: "Pontos com maior potencial de melhoria",
      };
  }
}

function buildWhatsAppUrl(
  resultKey: ResultKey,
  meta: ResultMeta,
  score: number,
  pontosCriticos: string[],
  form: FormData,
): string {
  let msg: string;
  if (resultKey === "A") {
    msg = `Olá Daniel, fiz o Diagnóstico Rápido no site.

📊 Meu resultado: Ainda não é o momento (faturamento abaixo de R$1M)

🏢 Empresa: ${form.empresa}
👤 Papel: ${form.papel}
📧 E-mail: ${form.email}

Mesmo assim, gostaria de conversar.`;
  } else {
    const pontosFmt = pontosCriticos.map((p) => `- ${p}`).join("\n");
    msg = `Olá Daniel, fiz o Diagnóstico Rápido no site.

📊 Meu resultado: ${meta.categoriaShort} (${score}/21 pts)

🏢 Empresa: ${form.empresa}
💰 Faturamento: ${form.faturamento}
👤 Papel: ${form.papel}
📧 E-mail: ${form.email}

Pontos críticos da minha operação:
${pontosFmt}

Gostaria de agendar uma sessão estratégica.`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

async function downloadResultPdf(
  resultKey: ResultKey,
  meta: ResultMeta,
  score: number,
  pontosCriticos: string[],
  form: FormData,
) {
  const { jsPDF } = await import("jspdf");
  const logoModule = await import("@/assets/logo-dark.png");
  const logoSrc: string = (logoModule as { default: string }).default;

  // Carrega logo como dataURL
  const logoDataUrl = await new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("canvas context"));
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = logoSrc;
  }).catch(() => "");

  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  let y = margin;

  // Logo
  if (logoDataUrl) {
    const logoH = 36;
    const ratio = 4; // aproximação largura/altura do logo horizontal
    const logoW = logoH * ratio;
    doc.addImage(logoDataUrl, "PNG", margin, y, logoW, logoH, undefined, "FAST");
  }
  y += 56;

  // Título
  doc.setTextColor("#0B2A5B");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("Seu Diagnóstico Rápido", margin, y);
  y += 26;

  // Nome / empresa
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor("#1f2a3d");
  const nomeLinha = `${form.nome}${form.empresa ? " — " + form.empresa : ""}`;
  doc.text(nomeLinha, margin, y);
  y += 24;

  // Selo da categoria
  const seloTxt = meta.categoriaShort.toUpperCase();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  const seloPadX = 10;
  const seloPadY = 7;
  const seloW = doc.getTextWidth(seloTxt) + seloPadX * 2;
  const seloH = 22;
  doc.setFillColor(meta.seloPdfHex);
  doc.roundedRect(margin, y, seloW, seloH, 11, 11, "F");
  doc.setTextColor("#ffffff");
  doc.text(seloTxt, margin + seloPadX, y + seloH - seloPadY);
  y += seloH + 18;

  // Pontuação
  if (resultKey !== "A") {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor("#0B2A5B");
    doc.text(`${score} de 21 pontos`, margin, y);
    y += 24;
  }

  // Mensagem
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor("#1f2a3d");
  for (const p of meta.mensagem) {
    const lines = doc.splitTextToSize(p, pageW - margin * 2) as string[];
    doc.text(lines, margin, y);
    y += lines.length * 14 + 8;
  }
  y += 6;

  // Bloco pontos críticos
  if (resultKey !== "A" && pontosCriticos.length > 0) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor("#0B2A5B");
    doc.text(meta.blocoLabel ?? "Pontos críticos da sua operação", margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    doc.setTextColor("#1f2a3d");
    for (const ponto of pontosCriticos) {
      const lines = doc.splitTextToSize(`• ${ponto}`, pageW - margin * 2 - 12) as string[];
      doc.text(lines, margin + 4, y);
      y += lines.length * 14 + 4;
    }
    y += 8;
  }

  // CTA + rodapé
  const footerY = pageH - margin - 56;
  doc.setDrawColor("#0B2A5B");
  doc.setLineWidth(0.5);
  doc.line(margin, footerY, pageW - margin, footerY);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor("#0B2A5B");
  doc.text("Pronto para conversar?", margin, footerY + 18);
  doc.setFont("helvetica", "normal");
  doc.setTextColor("#2EC4FF");
  doc.textWithLink(
    `wa.me/${WHATSAPP_NUMBER}`,
    margin + doc.getTextWidth("Pronto para conversar? ") + 4,
    footerY + 18,
    { url: WHATSAPP_GENERIC },
  );

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor("#0B2A5B");
  const dataStr = new Date().toLocaleDateString("pt-BR");
  doc.text(`Diagnóstico gerado em ${dataStr}`, margin, footerY + 36);
  doc.setTextColor("#5b6675");
  doc.text(
    "dsinen@gmail.com  |  LinkedIn /danielsinenberg",
    margin,
    footerY + 50,
  );

  const safeName = (form.nome || "lead").trim().replace(/\s+/g, "-").replace(/[^\w\-]/g, "");
  doc.save(`Diagnostico-Sinenberg-${safeName}.pdf`);
}

function ResultScreen({
  resultKey,
  score,
  pontosCriticos,
  form,
  onRestart,
}: {
  resultKey: ResultKey;
  score: number;
  pontosCriticos: string[];
  form: FormData;
  onRestart: () => void;
}) {
  const meta = metaFor(resultKey);
  const showScore = meta.scoreVisivel !== false;
  const firstName = form.nome.trim().split(/\s+/)[0] || "";

  const whatsappCtaUrl = useMemo(
    () => buildWhatsAppUrl(resultKey, meta, score, pontosCriticos, form),
    [resultKey, meta, score, pontosCriticos, form],
  );

  const shareText = encodeURIComponent(
    `Acabei de fazer o Diagnóstico Rápido da Sinenberg Consulting e descobri o estágio de maturidade da minha operação. Vale o teste!`,
  );
  const shareUrl = encodeURIComponent(
    typeof window !== "undefined"
      ? window.location.origin + "/diagnostico"
      : "https://sinenbergconsulting.lovable.app/diagnostico",
  );
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
  const whatsappShare = `https://wa.me/?text=${shareText}%20${shareUrl}`;

  const [downloading, setDownloading] = useState(false);
  async function handleDownload() {
    if (downloading) return;
    setDownloading(true);
    try {
      await downloadResultPdf(resultKey, meta, score, pontosCriticos, form);
    } catch (e) {
      console.error("Falha ao gerar PDF", e);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="animate-in fade-in duration-300">
      <div
        className="inline-block text-[12px] md:text-sm uppercase tracking-[0.18em] font-bold px-4 py-2 rounded-full"
        style={{ backgroundColor: meta.seloBg, color: meta.seloColor }}
      >
        {meta.selo}
      </div>

      {showScore && (
        <p className="mt-5 text-sm md:text-base text-[#0B2A5B]/65">
          {firstName ? `${firstName}, sua pontuação: ` : "Sua pontuação: "}
          <span className="font-bold text-[#0B2A5B] text-base md:text-lg">{score} de 21</span>
        </p>
      )}

      <h1 className="mt-4 font-serif text-3xl md:text-[2.4rem] leading-[1.1] text-[#0B2A5B]">
        {meta.titulo}
      </h1>

      <div className="mt-6 space-y-4">
        {meta.mensagem.map((p, i) => (
          <p key={i} className="text-base md:text-lg text-[#1f2a3d]/80 leading-relaxed">
            {p}
          </p>
        ))}
      </div>

      {meta.blocoLabel && pontosCriticos.length > 0 && (
        <div className="mt-8 rounded-2xl bg-white border border-[#0B2A5B]/10 p-5 md:p-6 shadow-sm">
          <h3 className="text-sm font-semibold text-[#0B2A5B]/70 uppercase tracking-wide">
            {meta.blocoLabel}
          </h3>
          <ul className="mt-3 space-y-2">
            {pontosCriticos.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[15px] text-[#1f2a3d]">
                <Icon
                  icon="solar:alert-circle-bold"
                  style={{ color: "#2EC4FF", flexShrink: 0, marginTop: 2 }}
                />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTAs */}
      <div className="mt-8 flex flex-col sm:flex-row gap-3">
        <a
          href={whatsappCtaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 min-h-12 rounded-xl font-semibold text-base text-[#0B2A5B] transition-all hover:brightness-110 inline-flex items-center justify-center gap-2 px-5"
          style={{ backgroundColor: "#2EC4FF" }}
        >
          Quero conversar com o Daniel
          <Icon icon="solar:arrow-right-outline" />
        </a>
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="flex-1 min-h-12 rounded-xl font-semibold text-base text-[#0B2A5B] border-2 border-[#0B2A5B]/20 hover:border-[#0B2A5B]/40 transition-colors inline-flex items-center justify-center gap-2 px-5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Icon icon="solar:download-outline" />
          {downloading ? "Gerando PDF..." : "Baixar meu resultado em PDF"}
        </button>
      </div>

      {/* Compartilhar + refazer */}
      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[#0B2A5B]/60">
        <span>Compartilhar:</span>
        <a
          href={linkedinShare}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-[#0B2A5B] transition-colors"
        >
          <Icon icon="mdi:linkedin" />
          LinkedIn
        </a>
        <a
          href={whatsappShare}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:text-[#0B2A5B] transition-colors"
        >
          <Icon icon="mdi:whatsapp" />
          WhatsApp
        </a>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 hover:text-[#0B2A5B] transition-colors"
        >
          <Icon icon="solar:home-2-outline" />
          Voltar para o site
        </Link>
        <button
          type="button"
          onClick={onRestart}
          className="ml-auto inline-flex items-center gap-1.5 hover:text-[#0B2A5B] transition-colors"
        >
          <Icon icon="solar:refresh-outline" />
          Refazer o quiz
        </button>
      </div>
    </div>
  );
}
