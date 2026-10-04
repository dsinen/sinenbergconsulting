import { createFileRoute, Link } from "@tanstack/react-router";
import { Icon } from "@iconify/react";
import logoDark from "@/assets/logo-dark.png";
import iconMark from "@/assets/icon.png";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | Sinenberg Consulting" },
      {
        name: "description",
        content:
          "Como a Sinenberg Consulting usa os dados que você informa no site e no diagnóstico, e como pedir a exclusão.",
      },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: PrivacidadePage,
});

const EMAIL = "daniel@sinenberg.com.br";

function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <section className="mt-9">
      <h2 className="font-serif text-xl md:text-2xl text-[#0B2A5B]">{titulo}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#1f2a3d]/85">{children}</div>
    </section>
  );
}

function PrivacidadePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F5F9FE] text-[#0B2A5B]">
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
          <Link to="/" aria-label="Sinenberg Consulting, início" className="inline-flex items-center">
            <img src={iconMark} alt="Sinenberg Consulting" className="h-10 w-auto" />
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full">
        <div className="mx-auto max-w-[760px] px-4 sm:px-6 py-8 md:py-12">
          <h1 className="font-serif text-3xl md:text-[2.4rem] leading-[1.1]">Política de Privacidade</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-[#1f2a3d]/85">
            Aqui está, em linguagem direta, o que acontece com os dados que você informa neste site.
          </p>

          <Bloco titulo="Quem é responsável pelos seus dados">
            <p>
              Sinenberg Consultoria e Assessoria Empresarial LTDA, CNPJ 61.554.394/0001-14, com sede em
              São Paulo (SP). Para qualquer assunto sobre seus dados, escreva para{" "}
              <a className="underline" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              .
            </p>
          </Bloco>

          <Bloco titulo="Quais dados coletamos">
            <p>
              No Diagnóstico Rápido: nome, e-mail, empresa, faixa de faturamento, seu papel na empresa,
              as respostas às sete perguntas e o resultado calculado. Quando você fala conosco pelo
              WhatsApp ou por e-mail, guardamos o que você mesmo enviar na conversa.
            </p>
          </Bloco>

          <Bloco titulo="Para que usamos">
            <p>
              Para mostrar o resultado do seu diagnóstico, para conversar com você sobre ele e para
              entender se podemos ajudar sua empresa. Não usamos seus dados para anúncios e não os
              vendemos.
            </p>
            <p>
              A base legal é o seu consentimento, que você dá ao marcar a caixa antes de começar o
              diagnóstico (LGPD, art. 7º, inciso I). Você pode retirá-lo quando quiser.
            </p>
          </Bloco>

          <Bloco titulo="Com quem os dados passam">
            <p>
              Usamos ferramentas que tratam os dados em nosso nome, só para o funcionamento do
              serviço: Notion (onde organizamos nossos contatos), Resend (envio dos e-mails de
              aviso) e Cloudflare (hospedagem do site). Algumas dessas empresas têm servidores fora
              do Brasil, o que caracteriza transferência internacional de dados. Além delas, só
              compartilhamos seus dados se a lei exigir.
            </p>
          </Bloco>

          <Bloco titulo="Por quanto tempo guardamos">
            <p>
              Enquanto houver conversa ou relacionamento comercial com você, ou até você pedir a
              exclusão. Se o contato não for adiante, revisamos e apagamos os dados que não forem
              mais necessários.
            </p>
          </Bloco>

          <Bloco titulo="Seus direitos">
            <p>
              Você pode pedir a confirmação de que tratamos seus dados, acesso a eles, correção,
              anonimização ou exclusão, portabilidade e a retirada do consentimento. Basta enviar um
              e-mail para{" "}
              <a className="underline" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              . Se não ficar satisfeito com a resposta, você também pode procurar a Autoridade
              Nacional de Proteção de Dados (ANPD).
            </p>
          </Bloco>

          <Bloco titulo="Cookies e fontes externas">
            <p>
              O site não usa cookies de publicidade. As fontes de texto são carregadas dos servidores
              do Google, que podem registrar o endereço de IP de quem visita a página.
            </p>
          </Bloco>

          <Bloco titulo="Atualizações">
            <p>Este texto pode mudar. A versão em vigor é sempre a publicada nesta página.</p>
          </Bloco>
        </div>
      </main>

      <footer className="border-t border-[#0B2A5B]/10 bg-white">
        <div className="mx-auto max-w-[1100px] px-4 md:px-6 py-8 flex flex-col items-center justify-center gap-4">
          <img src={logoDark} alt="Sinenberg Consulting" className="h-[60px] w-auto" />
          <p className="text-[11px] md:text-xs text-[#0B2A5B]/55 text-center">
            © {new Date().getFullYear()} Sinenberg Consulting. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
