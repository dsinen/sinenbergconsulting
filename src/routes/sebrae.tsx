import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  CheckCheck,
  ChevronDown,
  Copy,
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

// ─────────────────────────── Conteúdo ───────────────────────────

const testeDoJa = [
  { nao: "Vou crescer muito esse ano.", sim: "Já cresci 15% no ano passado." },
  { nao: "Meu atendimento é excelente.", sim: "Já atendi 200 clientes, e 80 voltaram." },
  {
    nao: "Somos referência na região.",
    sim: "Já atendemos três dos cinco maiores condomínios do bairro.",
  },
  {
    nao: "Tenho muita experiência no mercado.",
    sim: "Já fiz mais de 500 instalações nos últimos oito anos.",
  },
  {
    nao: "Nosso atendimento é personalizado.",
    sim: "Já respondo todo orçamento em até duas horas, inclusive no sábado.",
  },
];

type Chave = "problema" | "solucao" | "ja" | "garantia";
type Pitch = Record<Chave, string>;
const PITCH_VAZIO: Pitch = { problema: "", solucao: "", ja: "", garantia: "" };

const perguntas: {
  chave: Chave;
  n: number;
  pergunta: string;
  regra: string;
  emVez: string;
  fala: string;
  dica: string;
  placeholder: string;
}[] = [
  {
    chave: "problema",
    n: 1,
    pergunta: "Você entendeu o meu problema?",
    regra: "Os primeiros 15 segundos são sobre ele, não sobre você.",
    emVez: "A gente é apaixonado por pet, trata cada bichinho como da família.",
    fala: "Você trabalha a semana inteira, e o banho do cachorro vira a tarefa do sábado de manhã. Fila, uma hora perdida, e o cachorro voltando estressado.",
    dica: "Descreva a situação do seu cliente como ele mesmo contaria. Onde dói, quanto tempo ele perde, o que dá errado.",
    placeholder: "Você... (descreva o problema do seu cliente)",
  },
  {
    chave: "solucao",
    n: 2,
    pergunta: "Como exatamente você resolve?",
    regra: "Se você usou um adjetivo, ainda não respondeu.",
    emVez: "Atendimento diferenciado, produtos de qualidade.",
    fala: "A gente busca na sua casa de manhã, devolve depois do almoço, e você recebe uma foto quando ele fica pronto.",
    dica: "Conte em dois ou três passos o que acontece, de um jeito que dê pra imaginar.",
    placeholder: "A gente... (os passos, na ordem)",
  },
  {
    chave: "ja",
    n: 3,
    pergunta: "Você já resolveu isso pra alguém como eu?",
    regra: "Promessa começa com “vou”. Prova começa com “já”.",
    emVez: "Nossos clientes adoram.",
    fala: "Já atendemos 50 cachorros fixos aqui no bairro. Nota 4,8 no Google, com mais de 100 avaliações.",
    dica: "Ainda não abriu o negócio? Também tem já: “Já conversei com 20 tutores do meu prédio, e 8 pagaram o primeiro banho adiantado.”",
    placeholder: "Já... (um número que alguém pode conferir)",
  },
  {
    chave: "garantia",
    n: 4,
    pergunta: "E se não der certo?",
    regra: "Garantia tira o risco do cliente. Pedido pequeno é mais fácil de ouvir sim.",
    emVez: "Pode confiar, você vai amar.",
    fala: "O primeiro banho tem garantia. Se você não gostar, não paga. Posso passar aí sábado?",
    dica: "O cliente não tem medo de você, tem medo de se arrepender. Diga o que acontece se não der certo e termine com um pedido pequeno.",
    placeholder: "Se não... (a garantia) + um pedido pequeno",
  },
];

const ADJETIVOS = [
  "diferenciado",
  "diferenciada",
  "qualidade",
  "excelente",
  "excelência",
  "personalizado",
  "personalizada",
  "referência",
  "melhor",
  "inovador",
  "inovadora",
  "completo",
  "completa",
  "único",
  "única",
  "premium",
  "incrível",
  "especializado",
  "especializada",
];

function acharAdjetivo(t: string): string | null {
  const baixo = t.toLowerCase();
  return (
    ADJETIVOS.find((a) => new RegExp(`(^|[^\\p{L}])${a}([^\\p{L}]|$)`, "u").test(baixo)) ?? null
  );
}

const construirJa = [
  {
    titulo: "Peça avaliação",
    texto:
      "Todo cliente que saiu satisfeito recebe uma mensagem com o link direto pra avaliar no Google. Cinco por mês viram 30 em seis meses.",
  },
  {
    titulo: "Conte o que você já faz",
    texto:
      "Atendimentos no mês, clientes que voltaram, tempo de entrega. Os números existem, só ninguém anotou. Um caderno resolve.",
  },
  {
    titulo: "Dê garantia pra gerar os primeiros casos",
    texto: "Quem gostou vira o seu primeiro já. Peça autorização pra contar o caso.",
  },
];

type Exemplo = {
  id: "b2c" | "b2b";
  aba: string;
  nome: string;
  usuario: string;
  descricao: string;
  prova: string;
  pitch: [string, string, string, string];
  bio: string;
  bioRede: string;
  cliente: string;
  saudacao: string;
  google: string;
};

const exemplos: Exemplo[] = [
  {
    id: "b2c",
    aba: "Vendo pra consumidor final",
    nome: "Pet da Vila",
    usuario: "petdavila",
    descricao: "Banho e tosa de bairro",
    prova:
      "Pra consumidor final, a prova costuma ser cliente que volta, nota no Google e número de avaliações.",
    pitch: [
      "Você trabalha a semana inteira, e o banho do cachorro vira a tarefa do sábado, com fila e uma hora perdida.",
      "A gente busca na sua casa de manhã, devolve depois do almoço, e você recebe uma foto quando ele fica pronto.",
      "Já atendemos 50 cachorros fixos aqui no bairro, nota 4,8 no Google com mais de 100 avaliações.",
      "E o primeiro banho tem garantia: se você não gostar, não paga. Posso passar aí sábado?",
    ],
    bio: "Banho e tosa com busca e entrega no bairro.\n50 cães fixos, nota 4,8.\nPrimeiro banho com garantia.",
    bioRede: "Bio do Instagram",
    cliente: "Oi! Queria saber do banho e tosa",
    saudacao:
      "Oi! Aqui é o Pet da Vila.\nA gente busca seu cachorro de manhã e devolve depois do almoço, com foto quando ele fica pronto.\nJá são 50 cães fixos aqui no bairro, nota 4,8 no Google.\nO primeiro banho tem garantia: não gostou, não paga.\nQuer agendar pra sábado?",
    google:
      "Banho e tosa com busca e entrega no bairro. A gente busca seu cachorro de manhã e devolve depois do almoço, com foto quando ele fica pronto. Já são 50 cães fixos e nota 4,8 com mais de 100 avaliações. Primeiro banho com garantia: se não gostar, não paga.",
  },
  {
    id: "b2b",
    aba: "Vendo pra empresa",
    nome: "Clima Certo",
    usuario: "climacerto.manutencao",
    descricao: "Manutenção de ar-condicionado para clínicas e escritórios",
    prova: "Pra empresa, a prova costuma ser prazo cumprido e problema que deixou de acontecer.",
    pitch: [
      "Quando o ar-condicionado da clínica para em pleno verão, você remarca paciente e ainda espera três dias por um técnico.",
      "A gente faz a manutenção preventiva todo mês, em dia fixo e fora do horário de atendimento, e manda o relatório com fotos no WhatsApp no mesmo dia.",
      "Já cuidamos de 14 clínicas e escritórios aqui na zona norte. No último verão, nenhum deles ficou um dia sem ar.",
      "Se o aparelho parar entre uma visita e outra, a gente vai no mesmo dia, sem cobrar a visita. Posso fazer uma vistoria gratuita aí na terça?",
    ],
    bio: "Manutenção de ar para clínicas e escritórios.\n14 clientes fixos, nenhum dia sem ar no último verão.\nParou? A gente vai no mesmo dia.",
    bioRede: "Bio do Instagram ou título do LinkedIn",
    cliente: "Boa tarde! Vocês fazem contrato de manutenção?",
    saudacao:
      "Oi! Aqui é a Clima Certo.\nA gente cuida do ar-condicionado da sua empresa todo mês, fora do horário de atendimento, com relatório e fotos no mesmo dia.\nJá são 14 clínicas e escritórios na zona norte, e nenhum ficou um dia sem ar no último verão.\nSe parar entre uma visita e outra, a gente vai no mesmo dia sem cobrar.\nQuer agendar uma vistoria gratuita?",
    google:
      "Manutenção preventiva de ar-condicionado para clínicas, consultórios e escritórios da zona norte. Visita todo mês em dia fixo, fora do horário de atendimento, com relatório e fotos no WhatsApp. Já são 14 clientes fixos. Se o aparelho parar entre uma visita e outra, a gente vai no mesmo dia sem cobrar a visita.",
  },
];

const banco = [
  { cliente: "Você entendeu o meu problema?", banco: "Esse problema é de muita gente?" },
  { cliente: "Como exatamente você resolve?", banco: "O dinheiro entra todo mês?" },
  {
    cliente: "Já resolveu pra alguém como eu?",
    banco: "Quantos já compraram, e quantos voltaram?",
  },
  { cliente: "E se não der certo?", banco: "Se o mês for ruim, você consegue pagar?" },
];

const numeros = [
  {
    valor: "3 em 4",
    texto: "empresas com funcionários passam do primeiro ano. Os tais 80% que fecham são mito.",
    fonte: "IBGE, Demografia das Empresas (dez/2024), empresas abertas em 2017",
  },
  {
    valor: "8 em 10",
    texto:
      "consumidores leem avaliações antes de comprar. 7 em 10 deixariam de comprar de quem ignora a opinião do cliente.",
    fonte: "Reclame Aqui, pesquisa com 2,3 mil consumidores, fev/2025",
  },
  {
    valor: "+5% a 9%",
    texto:
      "de faturamento para cada estrela a mais na avaliação. O efeito aparece no negócio independente, não na rede grande.",
    fonte: "Michael Luca, Harvard Business School, estudo com restaurantes",
  },
  {
    valor: "7%",
    texto: "dos donos que achavam que crédito teria salvado o negócio pediram e conseguiram.",
    fonte: "Sebrae, Sobrevivência de Empresas, 2020",
  },
];

const faq = [
  {
    q: "Meu concorrente é mais barato.",
    a: "Quando o cliente não tem prova, só consegue comparar preço. Quando tem, compara o risco. Preço só decide sozinho quando todo o resto parece igual.",
  },
  {
    q: "E se eu não tenho cliente nenhum?",
    a: "O primeiro já vem antes do primeiro cliente. Faça pré-venda, como os 20 tutores do prédio em que 8 pagaram adiantado, ou ofereça garantia pra três ou quatro pessoas. Em um mês você tem o seu já.",
  },
  {
    q: "Como peço avaliação sem ser chato?",
    a: "Peça logo depois do serviço, com o link direto. E pense em volume: a nota pesa muito mais quando o negócio já tem bastante avaliação.",
  },
  {
    q: "E se eu receber uma avaliação ruim?",
    a: "Responda rápido, com educação e sem brigar. Quem lê a avaliação ruim também lê a sua resposta, e 7 em cada 10 pessoas dizem que deixariam de comprar de quem não liga pra opinião do cliente.",
  },
  {
    q: "Garantia não dá prejuízo?",
    a: "Use só no primeiro serviço, e com pedido pequeno. Se alguém usar a garantia, você descobriu cedo o que precisa arrumar.",
  },
];

const meusJa = [
  "Já conduzi, pela Stone, mais de R$ 50 milhões em negócios com Shell, Ipiranga, BR e OXXO.",
  "Já estruturei o marketing da Linx: mais de 150 ações com ROI acima de 300%.",
  "Já levei a retenção de clientes PME da Vivo de 55% para 70%.",
  "Já mentorei mais de 50 startups da Estácio e da Wyden.",
];

// ─────────────────────────── Estilos ───────────────────────────

const estilos = `
  .sb-root { --sb-ink: #06143A; --sb-navy: #0B2A5B; --sb-blue: #1F6FDB; --sb-cyan: #2EC4FF; }
  .sb-hero { background: radial-gradient(120% 80% at 0% 0%, #13408a 0%, rgba(11,42,91,0) 55%), radial-gradient(90% 70% at 100% 30%, rgba(46,196,255,.22) 0%, rgba(46,196,255,0) 60%), #06143A; }
  .sb-dots { background-image: radial-gradient(rgba(255,255,255,.07) 1px, transparent 1px); background-size: 22px 22px; }
  .sb-up { opacity: 0; transform: translateY(14px); animation: sb-up .7s cubic-bezier(.2,.7,.2,1) forwards; }
  @keyframes sb-up { to { opacity: 1; transform: none; } }
  .sb-promessa { background: rgba(255,255,255,.08); border: 1px solid rgba(255,255,255,.18); transition: transform .18s ease, background .18s ease, border-color .18s ease; }
  .sb-promessa:hover { transform: translateY(-2px); background: rgba(255,255,255,.13); border-color: rgba(46,196,255,.6); }
  .sb-check { background: #1F6FDB; box-shadow: 0 0 0 4px rgba(31,111,219,.25); }
  .sb-card { background: #fff; border: 1px solid #d9e3ef; box-shadow: 0 1px 2px rgba(11,42,91,.04), 0 8px 24px -12px rgba(11,42,91,.12); }
  .sb-area { border: 1.5px solid #c9d7ea; background: #fbfdff; transition: border-color .15s ease, box-shadow .15s ease; }
  .sb-area:focus { outline: none; border-color: #1F6FDB; box-shadow: 0 0 0 4px rgba(31,111,219,.14); }
  .sb-tab[aria-selected="true"] { background: #0B2A5B; color: #fff; }
  .sb-bubble-in { background: #fff; border-radius: 4px 14px 14px 14px; }
  .sb-bubble-out { background: #d9fdd3; border-radius: 14px 4px 14px 14px; }
  .sb-wa-bg { background-color: #efeae2; background-image: radial-gradient(rgba(11,42,91,.05) 1px, transparent 1px); background-size: 16px 16px; }
  .sb-details summary::-webkit-details-marker { display: none; }
  .sb-details[open] .sb-chev { transform: rotate(180deg); }
  .sb-social { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.22); transition: transform .18s ease, background .18s ease, color .18s ease; }
  .sb-social:hover { transform: translateY(-2px); background: #2EC4FF; color: #06143A; }
  .sb-cta { background: linear-gradient(135deg, #2EC4FF 0%, #1F9BFF 55%, #1F6FDB 100%); color: #06143A; box-shadow: 0 10px 34px -10px rgba(46,196,255,.7); transition: filter .15s ease, transform .15s ease; }
  .sb-cta:hover { filter: brightness(1.08); }
  .sb-cta:active { transform: scale(.985); }
  .sb-input { width: 100%; border-radius: 12px; border: 1.5px solid rgba(255,255,255,.22); background: rgba(255,255,255,.07); padding: 11px 14px; font-size: 16px; color: #fff; }
  .sb-input::placeholder { color: rgba(255,255,255,.45); }
  .sb-input:focus { outline: none; border-color: #2EC4FF; box-shadow: 0 0 0 4px rgba(46,196,255,.18); }
  .sb-input option { color: #0B2A5B; }
  @media (prefers-reduced-motion: reduce) {
    .sb-up { animation: none; opacity: 1; transform: none; }
    .sb-promessa, .sb-social, .sb-cta { transition: none; }
  }
`;

function atraso(n: number) {
  return { animationDelay: `${0.1 * n + 0.05}s` };
}

const CHAVE_PITCH = "sc_sebrae_pitch";

function lerPitchSalvo(): Pitch {
  try {
    const bruto = localStorage.getItem(CHAVE_PITCH);
    if (!bruto) return PITCH_VAZIO;
    const obj = JSON.parse(bruto) as Partial<Pitch>;
    return {
      problema: typeof obj.problema === "string" ? obj.problema : "",
      solucao: typeof obj.solucao === "string" ? obj.solucao : "",
      ja: typeof obj.ja === "string" ? obj.ja : "",
      garantia: typeof obj.garantia === "string" ? obj.garantia : "",
    };
  } catch {
    return PITCH_VAZIO;
  }
}

function textoDoPitch(p: Pitch): string {
  return [p.problema, p.solucao, p.ja, p.garantia]
    .map((t) => t.trim())
    .filter(Boolean)
    .join(" ");
}

// ─────────────────────────── Página ───────────────────────────

function SebraePage() {
  const [pitch, setPitch] = useState<Pitch>(PITCH_VAZIO);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setPitch(lerPitchSalvo());
    setCarregado(true);
  }, []);

  useEffect(() => {
    if (!carregado) return;
    try {
      localStorage.setItem(CHAVE_PITCH, JSON.stringify(pitch));
    } catch {
      /* navegação privada: o guia funciona, só não fica salvo */
    }
  }, [pitch, carregado]);

  return (
    <div className="sb-root min-h-screen overflow-x-hidden bg-white text-[#0f1729]">
      <style>{estilos}</style>
      <Hero />
      <Regra />
      <Guia pitch={pitch} setPitch={setPitch} />
      <Exemplos />
      <Banco />
      <Numeros />
      <Perguntas />
      <Contatos pitch={pitch} />
      <Rodape />
    </div>
  );
}

// ─────────────────────────── Seções ───────────────────────────

function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[720px] px-5 ${className}`}>{children}</div>;
}

function Etiqueta({ children, claro = false }: { children: ReactNode; claro?: boolean }) {
  return (
    <p
      className={`text-[11.5px] font-semibold uppercase tracking-[0.22em] ${claro ? "text-[#2EC4FF]" : "text-[#1F6FDB]"}`}
    >
      {children}
    </p>
  );
}

function Hero() {
  const promessas = [
    {
      href: "#guia",
      titulo: "Guia com as quatro perguntas",
      texto: "Pra preencher aqui mesmo e sair com o seu pitch pronto",
    },
    {
      href: "#exemplos",
      titulo: "Exemplos completos",
      texto: "Pra quem vende pra empresa e pra quem vende pra consumidor final",
    },
    {
      href: "#contatos",
      titulo: "Meus contatos",
      texto: "WhatsApp, LinkedIn e Instagram",
    },
  ];
  return (
    <header className="sb-hero relative text-white">
      <div className="sb-dots pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative pb-12 pt-9 md:pb-16 md:pt-14">
        <div className="sb-up flex items-center gap-3" style={atraso(0)}>
          <img
            src={danielPhoto}
            alt="Daniel Sinenberg"
            className="h-11 w-11 rounded-full object-cover object-[50%_30%] ring-2 ring-white/25"
          />
          <p className="text-[13px] leading-tight text-white/80">
            <span className="block font-medium text-white">Daniel Sinenberg</span>
            Feira do Empreendedor Sebrae 2026 · Arena Clique & Venda
          </p>
        </div>

        <h1
          className="sb-up mt-7 font-serif text-[40px] font-semibold leading-[1.02] tracking-tight md:text-[56px]"
          style={atraso(1)}
        >
          Evidência
          <br />
          vence carisma
        </h1>
        <p
          className="sb-up mt-3 max-w-[520px] text-[16px] leading-relaxed text-white/85"
          style={atraso(2)}
        >
          Como montar um pitch que prova que seu negócio funciona. Aqui está o material que eu
          prometi no palco.
        </p>

        <p
          className="sb-up mt-8 text-[11.5px] font-semibold uppercase tracking-[0.22em] text-[#2EC4FF]"
          style={atraso(3)}
        >
          O que você leva daqui
        </p>
        <ul className="mt-3 space-y-2.5">
          {promessas.map((p, i) => (
            <li key={p.href} className="sb-up" style={atraso(4 + i)}>
              <a
                href={p.href}
                className="sb-promessa flex items-center gap-3.5 rounded-2xl px-4 py-3.5"
              >
                <span className="sb-check flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                  <Check size={18} strokeWidth={3} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col">
                  <span className="font-serif text-[16.5px] font-semibold leading-snug">
                    {p.titulo}
                  </span>
                  <span className="mt-0.5 text-[13px] leading-snug text-white/70">{p.texto}</span>
                </span>
                <ArrowDown size={18} className="shrink-0 opacity-60" />
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </header>
  );
}

function Regra() {
  return (
    <section className="py-14 md:py-20">
      <Container>
        <div className="sb-wa-bg mx-auto max-w-[360px] rounded-2xl p-4">
          <div className="sb-bubble-in ml-0 mr-10 px-3.5 py-2.5 text-[15px] text-[#111b21] shadow-sm">
            Muito obrigado! Vou pensar e te falo.
            <span className="ml-2 align-bottom text-[11px] text-[#667781]">18:47</span>
          </div>
        </div>
        <p className="mx-auto mt-5 max-w-[460px] text-center text-[17px] leading-relaxed text-[#4a5b73]">
          Essa mensagem aparece quando uma das quatro perguntas ficou sem resposta.{" "}
          <strong className="font-semibold text-[#0B2A5B]">
            Todo “vou pensar” esconde uma prova que faltou.
          </strong>
        </p>

        <div className="mt-12 rounded-3xl bg-[#0B2A5B] px-6 py-8 text-center text-white md:px-10">
          <Etiqueta claro>A regra pra levar</Etiqueta>
          <p className="mt-3 font-serif text-[27px] font-semibold leading-[1.15] md:text-[34px]">
            Promessa começa com “vou”.
            <br />
            <span className="text-[#2EC4FF]">Prova começa com “já”.</span>
          </p>
        </div>

        <h2 className="mt-12 font-serif text-[26px] font-semibold leading-tight text-[#0B2A5B]">
          O teste do já
        </h2>
        <p className="mt-2 text-[15.5px] leading-relaxed text-[#4a5b73]">
          Pega qualquer frase que você fala sobre o seu negócio e tenta começar com “já”. Se não
          cabe, é promessa. E promessa o seu concorrente também faz, com as mesmas palavras.
        </p>
        <ul className="mt-6 space-y-3">
          {testeDoJa.map((t) => (
            <li key={t.nao} className="sb-card overflow-hidden rounded-2xl">
              <div className="flex items-start gap-3 px-4 py-3">
                <span className="mt-0.5 shrink-0 rounded-md bg-[#fdecea] px-1.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-[#c0392b]">
                  Não cabe
                </span>
                <span className="text-[15px] text-[#4a5b73] line-through decoration-[#c0392b]/40">
                  {t.nao}
                </span>
              </div>
              <div className="flex items-start gap-3 border-t border-[#eaf1f9] bg-[#f5f8fc] px-4 py-3">
                <span className="mt-0.5 shrink-0 rounded-md bg-[#dff3e8] px-1.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wider text-[#14804a]">
                  Cabe
                </span>
                <span className="text-[15px] font-medium text-[#0B2A5B]">{t.sim}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Guia({ pitch, setPitch }: { pitch: Pitch; setPitch: (p: Pitch) => void }) {
  const preenchidas = (Object.keys(pitch) as Chave[]).filter((k) => pitch[k].trim()).length;
  return (
    <section id="guia" className="scroll-mt-4 bg-[#f5f8fc] py-14 md:py-20">
      <Container>
        <Etiqueta>Promessa 1 · Guia</Etiqueta>
        <h2 className="mt-2 font-serif text-[30px] font-semibold leading-tight text-[#0B2A5B]">
          As quatro perguntas silenciosas
        </h2>
        <p className="mt-3 text-[15.5px] leading-relaxed text-[#4a5b73]">
          Toda pessoa que vai te pagar faz essas quatro perguntas na cabeça, nunca em voz alta. Se o
          seu pitch responde as quatro, você não precisa ser carismático.
        </p>
        <div className="mt-5 rounded-2xl border border-[#1F6FDB]/25 bg-white px-4 py-3.5 text-[14.5px] leading-relaxed text-[#0B2A5B]">
          <strong className="font-semibold">Dever de casa:</strong> pega a frase com “já” que você
          escreveu no celular durante a palestra, cola na pergunta 3 e responde as outras três. O
          que você escrever fica salvo neste celular.
        </div>

        <ol className="mt-8 space-y-5">
          {perguntas.map((p) => (
            <li key={p.chave}>
              <Pergunta
                p={p}
                valor={pitch[p.chave]}
                onChange={(v) => setPitch({ ...pitch, [p.chave]: v })}
              />
            </li>
          ))}
        </ol>

        <SeuPitch pitch={pitch} preenchidas={preenchidas} onLimpar={() => setPitch(PITCH_VAZIO)} />
      </Container>
    </section>
  );
}

function Pergunta({
  p,
  valor,
  onChange,
}: {
  p: (typeof perguntas)[number];
  valor: string;
  onChange: (v: string) => void;
}) {
  const id = `pergunta-${p.chave}`;
  const adjetivo = p.chave === "solucao" ? acharAdjetivo(valor) : null;
  const passouNoJa = p.chave === "ja" && /(^|[^\p{L}])j[áa]([^\p{L}]|$)/iu.test(valor);

  return (
    <div className="sb-card rounded-3xl p-5 md:p-6">
      <div className="flex items-start gap-3.5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0B2A5B] font-serif text-[18px] font-semibold text-white">
          {p.n}
        </span>
        <div className="min-w-0">
          <h3 className="font-serif text-[20px] font-semibold leading-snug text-[#0B2A5B]">
            {p.pergunta}
          </h3>
          <p className="mt-1 text-[14px] font-medium leading-snug text-[#1F6FDB]">{p.regra}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2.5 md:grid-cols-2">
        <div className="rounded-2xl bg-[#f5f8fc] px-4 py-3">
          <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#4a5b73]/80">
            O que a gente costuma falar
          </p>
          <p className="mt-1 text-[14.5px] italic leading-snug text-[#4a5b73]">“{p.emVez}”</p>
        </div>
        <div className="rounded-2xl bg-[#e8f3ff] px-4 py-3">
          <p className="text-[10.5px] font-bold uppercase tracking-wider text-[#1F6FDB]">
            O que resolve
          </p>
          <p className="mt-1 text-[14.5px] leading-snug text-[#0B2A5B]">“{p.fala}”</p>
        </div>
      </div>

      <label htmlFor={id} className="mt-5 block text-[14px] font-semibold text-[#0B2A5B]">
        A sua resposta
      </label>
      <p className="mt-0.5 text-[13.5px] leading-snug text-[#4a5b73]">{p.dica}</p>
      <textarea
        id={id}
        rows={3}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder={p.placeholder}
        className="sb-area mt-2.5 w-full resize-y rounded-2xl px-4 py-3 text-[16px] leading-relaxed text-[#0f1729] placeholder:text-[#4a5b73]/50"
      />

      {adjetivo && (
        <p className="mt-2 text-[13.5px] leading-snug text-[#b45309]">
          Achei um adjetivo: “{adjetivo}”. Dá pra trocar por um passo que o cliente consiga
          imaginar?
        </p>
      )}
      {p.chave === "ja" && valor.trim() !== "" && (
        <p
          className={`mt-2 text-[13.5px] leading-snug ${passouNoJa ? "text-[#14804a]" : "text-[#b45309]"}`}
        >
          {passouNoJa
            ? "Passou no teste do já. Se tiver um número que alguém pode conferir, melhor ainda."
            : "Ainda não tem “já” aqui. Se não cabe, é promessa."}
        </p>
      )}
      {p.chave === "ja" && (
        <details className="sb-details mt-4 rounded-2xl border border-[#d9e3ef] bg-[#fbfdff]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[14.5px] font-semibold text-[#0B2A5B]">
            Travou no já? Três jeitos de construir
            <ChevronDown size={18} className="sb-chev shrink-0 transition-transform" />
          </summary>
          <ol className="space-y-3 px-4 pb-4">
            {construirJa.map((c, i) => (
              <li key={c.titulo} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e8f3ff] text-[12.5px] font-bold text-[#1F6FDB]">
                  {i + 1}
                </span>
                <span className="text-[14px] leading-snug text-[#4a5b73]">
                  <strong className="font-semibold text-[#0B2A5B]">{c.titulo}.</strong> {c.texto}
                </span>
              </li>
            ))}
            <li className="pt-1 text-[13.5px] font-medium leading-snug text-[#0B2A5B]">
              Nenhum desses precisa de carisma. Precisa de estratégia certa e constância.
            </li>
          </ol>
        </details>
      )}
    </div>
  );
}

function SeuPitch({
  pitch,
  preenchidas,
  onLimpar,
}: {
  pitch: Pitch;
  preenchidas: number;
  onLimpar: () => void;
}) {
  const [copiado, setCopiado] = useState(false);
  const texto = textoDoPitch(pitch);
  const pronto = preenchidas === 4;

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2200);
    } catch {
      /* sem permissão: a pessoa ainda pode selecionar o texto */
    }
  }

  const paraMim = "https://wa.me/?text=" + encodeURIComponent(`Meu pitch:\n\n${texto}`);

  return (
    <div className="mt-8 overflow-hidden rounded-3xl bg-[#0B2A5B] text-white shadow-[0_20px_50px_-20px_rgba(11,42,91,.6)]">
      <div className="px-5 pb-5 pt-6 md:px-7">
        <div className="flex items-center justify-between gap-3">
          <Etiqueta claro>Seu pitch de 40 segundos</Etiqueta>
          <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[12px] font-semibold text-white/80">
            {preenchidas} de 4
          </span>
        </div>
        {texto ? (
          <p className="mt-3 whitespace-pre-line text-[16.5px] leading-relaxed">{texto}</p>
        ) : (
          <p className="mt-3 text-[15.5px] leading-relaxed text-white/60">
            Responde as quatro perguntas acima e o seu pitch aparece aqui, montado na ordem certa.
          </p>
        )}
        {texto && !pronto && (
          <p className="mt-3 text-[13.5px] leading-snug text-[#2EC4FF]">
            Falta responder{" "}
            {4 - preenchidas === 1 ? "uma pergunta" : `${4 - preenchidas} perguntas`}. Pergunta sem
            resposta vira “vou pensar e te falo”.
          </p>
        )}
      </div>
      {texto && (
        <div className="grid grid-cols-2 gap-2.5 border-t border-white/10 bg-white/[.04] px-5 py-4 md:px-7">
          <button
            type="button"
            onClick={copiar}
            className="sb-social inline-flex h-11 items-center justify-center gap-2 rounded-full text-[14.5px] font-semibold"
          >
            {copiado ? <CheckCheck size={18} /> : <Copy size={18} />}
            {copiado ? "Copiado" : "Copiar"}
          </button>
          <a
            href={paraMim}
            target="_blank"
            rel="noopener noreferrer"
            className="sb-social inline-flex h-11 items-center justify-center gap-2 rounded-full text-[14.5px] font-semibold"
          >
            <Send size={17} />
            Mandar pra mim
          </a>
          <a
            href="#exemplos"
            className="sb-cta col-span-2 inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-4 text-center text-[14.5px] font-semibold"
          >
            Último passo: levar o pitch pra bio e pro WhatsApp
            <ArrowDown size={17} />
          </a>
          <button
            type="button"
            onClick={onLimpar}
            className="col-span-2 mt-1 text-[12.5px] text-white/50 underline underline-offset-2 hover:text-white/80"
          >
            Apagar e começar de novo
          </button>
        </div>
      )}
    </div>
  );
}

function Exemplos() {
  const [ativo, setAtivo] = useState<Exemplo["id"]>("b2c");
  const ex = exemplos.find((e) => e.id === ativo) ?? exemplos[0];
  return (
    <section id="exemplos" className="scroll-mt-4 py-14 md:py-20">
      <Container>
        <Etiqueta>Promessa 2 · Exemplos completos</Etiqueta>
        <h2 className="mt-2 font-serif text-[30px] font-semibold leading-tight text-[#0B2A5B]">
          O pitch inteiro, e onde ele mora
        </h2>
        <p className="mt-3 text-[15.5px] leading-relaxed text-[#4a5b73]">
          A pessoa vai te pesquisar antes de fechar. Então o pitch não pode morar só na sua boca:
          ele precisa estar na bio, na mensagem automática do WhatsApp Business e no seu perfil do
          Google. Os dois negócios abaixo são inventados. Troca pelo seu.
        </p>

        <div
          role="tablist"
          aria-label="Tipo de cliente"
          className="mt-6 grid grid-cols-2 gap-1.5 rounded-2xl bg-[#eaf1f9] p-1.5"
        >
          {exemplos.map((e) => (
            <button
              key={e.id}
              type="button"
              role="tab"
              aria-selected={ativo === e.id}
              aria-controls={`painel-${e.id}`}
              onClick={() => setAtivo(e.id)}
              className="sb-tab min-h-11 rounded-xl px-2 text-[14px] font-semibold leading-tight text-[#0B2A5B] transition-colors"
            >
              {e.aba}
            </button>
          ))}
        </div>

        <div id={`painel-${ex.id}`} role="tabpanel" className="mt-6">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="font-serif text-[23px] font-semibold text-[#0B2A5B]">{ex.nome}</h3>
            <span className="text-right text-[13px] text-[#4a5b73]">{ex.descricao}</span>
          </div>
          <p className="mt-2 rounded-xl bg-[#e8f3ff] px-3.5 py-2.5 text-[14px] leading-snug text-[#0B2A5B]">
            {ex.prova}
          </p>

          <ol className="sb-card mt-4 divide-y divide-[#eaf1f9] rounded-3xl">
            {ex.pitch.map((linha, i) => (
              <li key={i} className="flex gap-3.5 px-5 py-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0B2A5B] text-[13px] font-semibold text-white">
                  {i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-bold uppercase tracking-wider text-[#1F6FDB]">
                    {perguntas[i].pergunta}
                  </span>
                  <span className="mt-1 block text-[15.5px] leading-relaxed text-[#0f1729]">
                    {linha}
                  </span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Lugar titulo={ex.bioRede}>
              <div className="rounded-2xl border border-[#d9e3ef] bg-white p-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1F6FDB] to-[#2EC4FF] font-serif text-[18px] font-bold text-white">
                    {ex.nome.charAt(0)}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[14px] font-semibold text-[#0f1729]">
                      {ex.usuario}
                    </span>
                    <span className="block text-[13px] text-[#4a5b73]">{ex.nome}</span>
                  </span>
                </div>
                <p className="mt-3 whitespace-pre-line text-[14px] leading-snug text-[#0f1729]">
                  {ex.bio}
                </p>
              </div>
            </Lugar>

            <Lugar titulo="Mensagem de saudação do WhatsApp Business">
              <div className="sb-wa-bg space-y-2 rounded-2xl p-3">
                <div className="sb-bubble-out ml-10 px-3 py-2 text-[13.5px] text-[#111b21] shadow-sm">
                  {ex.cliente}
                </div>
                <div className="sb-bubble-in mr-6 whitespace-pre-line px-3 py-2 text-[13.5px] leading-snug text-[#111b21] shadow-sm">
                  {ex.saudacao}
                </div>
              </div>
            </Lugar>

            <div className="md:col-span-2">
              <Lugar titulo="Descrição do perfil no Google">
                <div className="rounded-2xl border border-[#d9e3ef] bg-white p-4">
                  <p className="text-[14px] leading-relaxed text-[#0f1729]">{ex.google}</p>
                  <p className="mt-3 text-[12.5px] leading-snug text-[#4a5b73]">
                    Aquele quadro que aparece quando alguém busca o seu negócio no Google ou no
                    Maps. Coloque ali o seu já, fotos do serviço pronto e responda as avaliações. É
                    de graça.
                  </p>
                </div>
              </Lugar>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Lugar({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-[#4a5b73]">{titulo}</p>
      {children}
    </div>
  );
}

function Banco() {
  return (
    <section className="bg-[#f5f8fc] py-14 md:py-20">
      <Container>
        <Etiqueta>Bônus</Etiqueta>
        <h2 className="mt-2 font-serif text-[26px] font-semibold leading-tight text-[#0B2A5B]">
          E se quem você precisa convencer é o banco?
        </h2>
        <p className="mt-3 text-[15.5px] leading-relaxed text-[#4a5b73]">
          Gerente de banco, sócio ou quem vai colocar dinheiro faz as mesmas quatro perguntas, só
          que do lado de quem empresta. Por isso o pitch pro banco começa no seu cliente: o sim de
          quem comprou é a melhor prova.
        </p>
        <div className="sb-card mt-6 overflow-hidden rounded-3xl">
          <div className="grid grid-cols-2 bg-[#0B2A5B] text-[11px] font-bold uppercase tracking-wider text-white">
            <span className="px-4 py-3">O cliente pergunta</span>
            <span className="border-l border-white/15 px-4 py-3 text-[#2EC4FF]">
              O banco pergunta
            </span>
          </div>
          {banco.map((b, i) => (
            <div
              key={i}
              className="grid grid-cols-2 border-t border-[#eaf1f9] text-[14px] leading-snug"
            >
              <span className="px-4 py-3.5 text-[#4a5b73]">
                <strong className="mr-1 text-[#0B2A5B]">{i + 1}</strong> {b.cliente}
              </span>
              <span className="border-l border-[#eaf1f9] bg-[#fbfdff] px-4 py-3.5 font-medium text-[#0B2A5B]">
                {b.banco}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[15px] leading-relaxed text-[#0B2A5B]">
          Quando o banco nega, normalmente não é porque não foi com a sua cara.{" "}
          <strong className="font-semibold">É porque não tinha o que olhar.</strong>
        </p>
      </Container>
    </section>
  );
}

function Numeros() {
  return (
    <section className="py-14 md:py-20">
      <Container>
        <Etiqueta>Os números da palestra</Etiqueta>
        <h2 className="mt-2 font-serif text-[26px] font-semibold leading-tight text-[#0B2A5B]">
          Evidência não precisa convencer. Ela encerra a conversa.
        </h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {numeros.map((n) => (
            <li key={n.valor} className="sb-card flex flex-col rounded-3xl p-5">
              <span className="font-serif text-[34px] font-semibold leading-none text-[#1F6FDB]">
                {n.valor}
              </span>
              <span className="mt-2.5 text-[14.5px] leading-snug text-[#0f1729]">{n.texto}</span>
              <span className="mt-3 text-[12px] leading-snug text-[#4a5b73]">Fonte: {n.fonte}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Perguntas() {
  return (
    <section className="bg-[#f5f8fc] py-14 md:py-20">
      <Container>
        <Etiqueta>Antes de fechar</Etiqueta>
        <h2 className="mt-2 font-serif text-[26px] font-semibold leading-tight text-[#0B2A5B]">
          As perguntas que sempre aparecem
        </h2>
        <div className="mt-6 space-y-2.5">
          {faq.map((f) => (
            <details key={f.q} className="sb-details sb-card rounded-2xl">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 text-[15.5px] font-semibold text-[#0B2A5B]">
                {f.q}
                <ChevronDown size={19} className="sb-chev shrink-0 transition-transform" />
              </summary>
              <p className="px-5 pb-5 text-[15px] leading-relaxed text-[#4a5b73]">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

type Formulario = {
  nome: string;
  whatsapp: string;
  email: string;
  negocio: string;
  ramo: string;
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
  ramo: "",
  fase: "",
  interesses: [],
  consentimento: false,
  website: "",
};

function Contatos({ pitch }: { pitch: Pitch }) {
  const [form, setForm] = useState<Formulario>(FORM_VAZIO);
  const [estado, setEstado] = useState<"aberto" | "enviando" | "ok" | "erro">("aberto");
  const temPitch = useMemo(() => Boolean(textoDoPitch(pitch)), [pitch]);

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
          ramo: form.ramo,
          fase: form.fase as (typeof FASES)[number],
          interesses: form.interesses as (typeof INTERESSES)[number][],
          pitch,
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
      temPitch
        ? `Oi Daniel, assisti sua palestra no Sebrae. Esse é o meu pitch:\n\n${textoDoPitch(pitch)}`
        : "Oi Daniel, assisti sua palestra na Feira do Empreendedor do Sebrae.",
    );

  return (
    <section id="contatos" className="sb-hero relative scroll-mt-0 py-14 text-white md:py-20">
      <div className="sb-dots pointer-events-none absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <Etiqueta claro>Promessa 3 · Meus contatos</Etiqueta>
        <h2 className="mt-2 font-serif text-[30px] font-semibold leading-tight">
          Vamos continuar a conversa
        </h2>

        <div className="mt-6 grid gap-2.5">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="sb-cta flex min-h-14 items-center gap-3 rounded-2xl px-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#06143A]/15">
              <MessageCircle size={22} strokeWidth={1.9} />
            </span>
            <span className="flex-1">
              <span className="block font-serif text-[16.5px] font-semibold leading-tight">
                WhatsApp
              </span>
              <span className="block text-[13px] opacity-75">(11) 98408-3610</span>
            </span>
            <ArrowUpRight size={20} className="opacity-70" />
          </a>
          <div className="grid grid-cols-2 gap-2.5">
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Daniel Sinenberg"
              className="sb-social flex min-h-14 flex-col items-center justify-center rounded-2xl px-2 py-2.5"
            >
              <span className="flex items-center gap-2 text-[15.5px] font-semibold">
                <Linkedin size={20} strokeWidth={1.9} /> LinkedIn
              </span>
              <span className="mt-0.5 text-[12px] opacity-70">danielsinenberg</span>
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @danielsinenberg"
              className="sb-social flex min-h-14 flex-col items-center justify-center rounded-2xl px-2 py-2.5"
            >
              <span className="flex items-center gap-2 text-[15.5px] font-semibold">
                <Instagram size={20} strokeWidth={1.9} /> Instagram
              </span>
              <span className="mt-0.5 text-[12px] opacity-70">@danielsinenberg</span>
            </a>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/15 bg-white/[.06] p-5 md:p-7">
          {estado === "ok" ? (
            <div className="py-4 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#2EC4FF] text-[#06143A]">
                <Check size={26} strokeWidth={3} />
              </span>
              <p className="mt-4 font-serif text-[22px] font-semibold">
                Recebi, {form.nome.split(" ")[0]}.
              </p>
              <p className="mx-auto mt-2 max-w-[380px] text-[15px] leading-relaxed text-white/80">
                Vou ler com calma e te chamo no WhatsApp. Enquanto isso, já dá pra trocar a sua bio.
              </p>
            </div>
          ) : (
            <form onSubmit={enviar} noValidate>
              <h3 className="font-serif text-[22px] font-semibold leading-snug">
                Quer me mostrar o seu pitch?
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-white/80">
                Falei no palco e repito: quero ler a sua frase com “já”. Deixa seu contato que eu te
                respondo pelo WhatsApp.{" "}
                {temPitch
                  ? "O pitch que você montou no guia vai junto."
                  : "Se você preencher o guia lá em cima, o seu pitch vai junto."}
              </p>

              <div className="mt-5 grid gap-3.5 md:grid-cols-2">
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
                <Campo rotulo="O que você vende">
                  <input
                    className="sb-input"
                    placeholder="Ex.: banho e tosa"
                    value={form.ramo}
                    onChange={(e) => setForm({ ...form, ramo: e.target.value })}
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

        <div className="mt-12">
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.22em] text-[#2EC4FF]">
            Quem montou esse material
          </p>
          <div className="mt-4 flex items-center gap-4">
            <img
              src={danielPhoto}
              alt="Daniel Sinenberg"
              className="h-16 w-16 rounded-full object-cover object-[50%_30%] ring-2 ring-white/25"
              loading="lazy"
            />
            <div>
              <p className="font-serif text-[20px] font-semibold leading-tight">Daniel Sinenberg</p>
              <p className="text-[13.5px] text-white/70">
                Fundador e consultor estratégico da Sinenberg Consulting
              </p>
            </div>
          </div>
          <ul className="mt-5 space-y-2.5">
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
        </div>
      </Container>
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

function Rodape() {
  return (
    <footer className="bg-[#06143A] text-white">
      <Container className="flex flex-col items-center gap-3 border-t border-white/10 py-9">
        <Link to="/" aria-label="Sinenberg Consulting, início">
          <img src={logoSemTag} alt="Sinenberg Consulting" className="h-16 w-auto opacity-95" />
        </Link>
        <p className="text-center text-[12.5px] text-white/60">
          Carisma ajuda. Evidência convence.
        </p>
        <p className="text-[12px] text-white/45">
          © {new Date().getFullYear()} Sinenberg Consulting
        </p>
        <Link to="/privacidade" className="text-[12px] text-white/50 underline">
          Política de Privacidade
        </Link>
      </Container>
    </footer>
  );
}
