// Conteúdo e regras do Diagnóstico rápido da versão nova do site.
// Fonte: Site/copy-site-v2.md, seção 3. Usado na tela e no servidor.

export type Letra = "A" | "B" | "C";
export type PilarId = "direcao" | "receita" | "escala";
export type EstagioId = "cedo" | "improviso" | "virada" | "pronto";
export type Etiqueta = "Ponto fraco" | "Em construção" | "Bem encaminhado";

export const PILARES: { id: PilarId; nome: string }[] = [
  { id: "direcao", nome: "Direção de Crescimento" },
  { id: "receita", nome: "Estrutura de Receita" },
  { id: "escala", nome: "Escala com Previsibilidade" },
];

export type Pergunta = {
  n: number;
  pilar: PilarId;
  texto: string;
  opcoes: Record<Letra, string>;
  ponto: string;
  acao: string;
};

export const PERGUNTAS: Pergunta[] = [
  {
    n: 1,
    pilar: "direcao",
    texto: "Você e o seu time sabem dizer, sem pensar muito, qual é o cliente que mais vale a pena para a empresa?",
    opcoes: {
      A: "Não. A gente vende para quem aparece.",
      B: "Eu sei, mas o time nem sempre vai atrás dele.",
      C: "Sim. Todo mundo sabe e dá prioridade a esse cliente.",
    },
    ponto: "Cliente ideal",
    acao: "Pegue os seus 10 melhores clientes de hoje e anote o que eles têm em comum: setor, tamanho, quem decide e por que compraram. Esse é o rascunho do seu cliente ideal.",
  },
  {
    n: 2,
    pilar: "direcao",
    texto: "Na hora de vender, está claro qual é o carro-chefe da empresa?",
    opcoes: {
      A: "Cada um vende o que acha melhor.",
      B: "Existe um carro-chefe, mas nem sempre é ele que vai para a mesa.",
      C: "Sim. Todo mundo sabe o que puxa o resultado.",
    },
    ponto: "Carro-chefe",
    acao: "Escolha uma oferta para puxar o resultado nos próximos seis meses, a que vende mais fácil e dá melhor margem, e combine com o time que ela vai primeiro para a mesa.",
  },
  {
    n: 3,
    pilar: "direcao",
    texto: "Quando aparece uma oportunidade nova, como a empresa decide se vai atrás dela?",
    opcoes: {
      A: "Vai atrás de quase tudo, e depois falta braço.",
      B: "A gente discute, mas no fim decide no feeling.",
      C: "Temos prioridades claras para o ano, e a novidade é comparada com elas.",
    },
    ponto: "Prioridades",
    acao: "Escreva três prioridades para o ano em uma folha só. Toda oportunidade nova passa por uma pergunta: ela ajuda alguma dessas três? Se não ajudar, espera.",
  },
  {
    n: 4,
    pilar: "receita",
    texto: "Nos últimos três meses, quantas vendas fecharam sem você precisar entrar na conversa?",
    opcoes: {
      A: "Quase nenhuma. Eu fecho quase tudo.",
      B: "Algumas, mas as maiores ainda dependem de mim.",
      C: "A maioria. Só entro em casos bem específicos.",
    },
    ponto: "Vendas que dependem de você",
    acao: "Na próxima venda que você fechar, anote o que disse, o que mostrou e qual objeção derrubou. É o primeiro passo para o time conseguir repetir sem você.",
  },
  {
    n: 5,
    pilar: "receita",
    texto: "Hoje você consegue dizer quanto vai vender nos próximos três meses, errando pouco?",
    opcoes: {
      A: "Não. É mais torcida do que conta.",
      B: "Tenho uma ideia, mas costumo errar bastante.",
      C: "Sim, e o número costuma bater.",
    },
    ponto: "Previsão de vendas",
    acao: "Liste as negociações abertas, com valor e chance real de fechar. Revisar essa lista toda semana, sempre no mesmo dia, já melhora muito a sua previsão de vendas.",
  },
  {
    n: 6,
    pilar: "receita",
    texto: "Se o seu melhor vendedor sair amanhã, o jeito de vender fica na empresa?",
    opcoes: {
      A: "Vai embora junto com ele.",
      B: "Uma parte está anotada, o resto está na cabeça das pessoas.",
      C: "Fica. Está tudo no CRM e em um passo a passo que o time usa.",
    },
    ponto: "Jeito de vender",
    acao: "Peça ao seu melhor vendedor para escrever ou gravar como conduz uma venda do começo ao fim. Esse material vira a base do passo a passo do time.",
  },
  {
    n: 7,
    pilar: "escala",
    texto: "Quando precisa tomar uma decisão importante, você olha os números ou vai pelo sentimento?",
    opcoes: {
      A: "Vou pelo sentimento. Não temos números confiáveis.",
      B: "Olho alguns números, mas o sentimento ainda pesa muito.",
      C: "Olho os números. Sei quais acompanhar.",
    },
    ponto: "Números",
    acao: "Escolha no máximo cinco números para olhar toda semana, como propostas enviadas, vendas fechadas e clientes perdidos. Poucos e confiáveis valem mais do que muitos.",
  },
  {
    n: 8,
    pilar: "escala",
    texto: "Se você tirasse 15 dias de férias sem celular, o que aconteceria com a empresa?",
    opcoes: {
      A: "Nem pensar. Muita coisa ia parar.",
      B: "Seguiria andando, mas eu voltaria com uma fila de decisões.",
      C: "Seguiria normal. O time sabe decidir sem mim.",
    },
    ponto: "Decisões que só você toma",
    acao: "Liste as decisões que hoje passam só por você e marque quais poderiam ser de outra pessoa, seguindo uma regra clara. Comece passando duas delas.",
  },
];

export const PONTOS: Record<Letra, number> = { A: 0, B: 1, C: 2 };

export const CARGOS = ["Fundador / CEO", "Sócio", "Diretor", "Gerente", "Outro"] as const;
export const FATURAMENTOS = [
  "Menos de R$ 1 milhão",
  "R$ 1 a 5 milhões",
  "R$ 5 a 15 milhões",
  "R$ 15 a 50 milhões",
  "Mais de R$ 50 milhões",
] as const;

export const ESTAGIOS: Record<EstagioId, { nome: string; titulo: (nome: string) => string; textos: string[] }> = {
  cedo: {
    nome: "Ainda é cedo",
    titulo: (n) => `${n}, por enquanto o foco é outro, e tudo bem.`,
    textos: [
      "Com menos de R$ 1 milhão por ano, a prioridade costuma ser vender, ouvir muito o cliente e ajustar o produto até a venda ficar mais previsível. Montar uma estrutura grande agora tende a custar caro e chegar antes da hora.",
    ],
  },
  improviso: {
    nome: "Crescendo no improviso",
    titulo: (n) => `${n}, a sua empresa cresce na força de vontade, e isso tem limite.`,
    textos: [
      "Pelas suas respostas, muita coisa ainda depende de você e do esforço de algumas pessoas. É normal em empresa que cresceu pela qualidade do produto, antes de ter um jeito organizado de vender e de decidir.",
      "O risco é o teto: a empresa cresce até onde a sua agenda aguenta. Quanto antes a estrutura entrar, mais barato e menos doloroso fica montar.",
    ],
  },
  virada: {
    nome: "No ponto de virada",
    titulo: (n) => `${n}, você está no ponto em que muitas empresas travam.`,
    textos: [
      "Algumas peças já estão no lugar, mas ainda não conversam entre si. É comum nessa fase: você sabe que precisa sair do meio de tudo, mas o time ainda não está pronto para assumir. Existe algum controle, mas as decisões importantes ainda vão muito pelo feeling.",
      "É o melhor momento para organizar a casa, antes que o próprio crescimento te obrigue a decidir na pressão.",
    ],
  },
  pronto: {
    nome: "Pronto para acelerar",
    titulo: (n) => `${n}, a base está de pé. Agora a conversa é sobre acelerar.`,
    textos: [
      "Suas respostas mostram cliente ideal claro, um time que vende sem depender só de você e decisões apoiadas em números. Nessa fase o trabalho muda: sai a arrumação da casa e entra a escolha do próximo passo, como abrir um mercado novo, lançar uma oferta ou ganhar margem no que já funciona.",
    ],
  },
};

export type Resultado = {
  pontuacao: number;
  estagio: EstagioId;
  pilares: { id: PilarId; nome: string; etiqueta: Etiqueta; fracao: number }[];
  pontos: { n: number; ponto: string; acao: string }[];
};

export function etiquetaDe(fracao: number): Etiqueta {
  if (fracao < 0.4) return "Ponto fraco";
  if (fracao < 0.7) return "Em construção";
  return "Bem encaminhado";
}

export function calcularResultado(letras: Letra[], faturamento: string): Resultado {
  const pts = letras.map((l) => PONTOS[l]);
  const pontuacao = pts.reduce((a, b) => a + b, 0);
  let estagio: EstagioId;
  if (faturamento === FATURAMENTOS[0]) estagio = "cedo";
  else if (pontuacao <= 6) estagio = "improviso";
  else if (pontuacao <= 11) estagio = "virada";
  else estagio = "pronto";

  const pilares = PILARES.map((p) => {
    const idx = PERGUNTAS.map((q, i) => (q.pilar === p.id ? i : -1)).filter((i) => i >= 0);
    const soma = idx.reduce((a, i) => a + pts[i], 0);
    const fracao = soma / (idx.length * 2);
    return { id: p.id, nome: p.nome, etiqueta: etiquetaDe(fracao), fracao };
  });

  // Pontos de atenção: só respostas A ou B, da menor pontuação para a maior.
  // Se a pergunta 4 ou a 8 tiver resposta A, ela vem primeiro. Empate: ordem das perguntas.
  const prioridade = (i: number) => ((i === 3 || i === 7) && letras[i] === "A" ? 0 : 1);
  const candidatas = PERGUNTAS.map((_, i) => i).filter((i) => letras[i] !== "C");
  candidatas.sort((a, b) => prioridade(a) - prioridade(b) || pts[a] - pts[b] || a - b);
  const pontos = candidatas.slice(0, 3).map((i) => ({
    n: PERGUNTAS[i].n,
    ponto: PERGUNTAS[i].ponto,
    acao: PERGUNTAS[i].acao,
  }));

  return { pontuacao, estagio, pilares, pontos };
}

export const WHATSAPP_NUMERO = "5511984083610";

export function listaEmPortugues(itens: string[]): string {
  if (itens.length <= 1) return itens.join("");
  return `${itens.slice(0, -1).join(", ")} e ${itens[itens.length - 1]}`;
}

export function mensagemWhatsApp(r: Resultado, empresa: string): string {
  const pontos = r.pontos.map((p) => p.ponto.toLowerCase());
  const trechoPontos = pontos.length
    ? `, e os pontos de atenção foram ${listaEmPortugues(pontos)}`
    : "";
  const msg = `Oi, Daniel. Fiz o diagnóstico no site. Meu resultado foi ${ESTAGIOS[r.estagio].nome}${trechoPontos}. Sou da ${empresa} e quero conversar 30 minutos sobre isso.`;
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(msg)}`;
}

export function primeiroNome(nome: string): string {
  const p = nome.trim().split(/\s+/)[0] ?? "";
  return p.charAt(0).toUpperCase() + p.slice(1);
}
