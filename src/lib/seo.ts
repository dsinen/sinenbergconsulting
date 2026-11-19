// Dados estruturados (schema.org) da Sinenberg Consulting, para o Google e as IAs entenderem
// quem é a empresa, quem é o Daniel e o que é oferecido. Manter os fatos iguais aos da página.
import { FAQ_V3 } from "./faq-v3";

export const SITE = "https://www.sinenbergconsulting.com.br";
const LINKEDIN = "https://www.linkedin.com/in/danielsinenberg/";
const INSTAGRAM = "https://www.instagram.com/danielsinenberg";

const empresa = {
  "@type": "ProfessionalService",
  "@id": `${SITE}/#empresa`,
  name: "Sinenberg Consulting",
  legalName: "Sinenberg Consultoria e Assessoria LTDA",
  url: `${SITE}/`,
  logo: `${SITE}/email/assinatura-logo.png`,
  image: `${SITE}/og-image.png`,
  description:
    "Consultoria estratégica para pequenas e médias empresas de tecnologia que cresceram, mas ainda dependem do fundador, especialmente em vendas.",
  foundingDate: "2025",
  founder: { "@id": `${SITE}/#daniel` },
  email: "daniel@sinenberg.com.br",
  telephone: "+55 11 98408-3610",
  address: { "@type": "PostalAddress", addressLocality: "São Paulo", addressRegion: "SP", addressCountry: "BR" },
  areaServed: { "@type": "Country", name: "Brasil" },
  knowsLanguage: ["pt-BR", "en"],
  sameAs: [LINKEDIN, INSTAGRAM],
};

const daniel = {
  "@type": "Person",
  "@id": `${SITE}/#daniel`,
  name: "Daniel Sinenberg",
  jobTitle: "Fundador e consultor estratégico",
  worksFor: { "@id": `${SITE}/#empresa` },
  url: `${SITE}/`,
  sameAs: [LINKEDIN, INSTAGRAM],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Universidade Presbiteriana Mackenzie" },
    { "@type": "CollegeOrUniversity", name: "FIA Business School" },
  ],
  knowsAbout: ["estratégia", "vendas B2B", "processo comercial", "marketing", "gestão de empresas de tecnologia"],
};

const sprint = {
  "@type": "Service",
  "@id": `${SITE}/#sprint`,
  name: "Sprint de Direção",
  serviceType: "Consultoria estratégica",
  provider: { "@id": `${SITE}/#empresa` },
  areaServed: { "@type": "Country", name: "Brasil" },
  audience: {
    "@type": "BusinessAudience",
    audienceType: "Pequenas e médias empresas de tecnologia B2B com faturamento entre R$ 1 milhão e R$ 50 milhões por ano",
  },
  description:
    "Projeto de 12 semanas, com escopo, prazo e preço fechados. Entrega Mapa de Foco, Plano Comercial e Painel do Plano para a empresa crescer sem depender do fundador.",
};

// Home: empresa, Daniel, serviço e perguntas frequentes.
export const schemaHomeNova = {
  "@context": "https://schema.org",
  "@graph": [
    empresa,
    daniel,
    sprint,
    {
      "@type": "FAQPage",
      mainEntity: FAQ_V3.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ],
};
