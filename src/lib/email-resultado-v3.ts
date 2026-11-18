import { ESTAGIOS, mensagemWhatsApp, type Resultado } from "./diagnostico-v3";

// E-mail do resultado que o cliente recebe depois do diagnóstico.
// Feito com tabelas e estilos na própria tag, que é o que Gmail e Outlook aceitam.
// As imagens ficam em public/email e são chamadas pelo endereço do site.

const SITE = "https://www.sinenbergconsulting.com.br";
const IMG_LOGO = `${SITE}/email/logo.png`;
const IMG_DANIEL = `${SITE}/email/daniel.jpg`;
const IMG_ASSINATURA = `${SITE}/email/assinatura-logo.png`;

const FONTE = `'Helvetica Neue', Helvetica, Arial, sans-serif`;
const ESCURO = "#0b1020";
const AZUL = "#2450ff";
const CIANO = "#2ec4ff";
const AMARELO = "#ffe27a";
const CREME = "#fdfbf4";
const CINZA = "#5b6275";
const MARINHO = "#0B2A5B";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const SELO: Record<string, { fundo: string; texto: string }> = {
  "Ponto fraco": { fundo: AMARELO, texto: ESCURO },
  "Em construção": { fundo: "#dbe4ff", texto: "#1b3bbf" },
  "Bem encaminhado": { fundo: AZUL, texto: "#ffffff" },
};

function pilar(nome: string, etiqueta: string, fracao: number): string {
  const s = SELO[etiqueta] ?? SELO["Em construção"];
  const cheio = Math.max(6, Math.round(fracao * 100));
  const vazio = 100 - cheio;
  const vazioCelula =
    vazio > 0 ? `<td width="${vazio}%" style="background:#e3e7f1;font-size:0;line-height:0;">&nbsp;</td>` : "";
  return `
    <tr><td style="padding:0 0 18px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="font-family:${FONTE};font-size:16px;font-weight:700;color:${ESCURO};padding:0 0 8px 0;">${esc(nome)}</td>
        <td align="right" style="padding:0 0 8px 0;">
          <span style="display:inline-block;font-family:${FONTE};font-size:12px;font-weight:700;color:${s.texto};background:${s.fundo};border-radius:99px;padding:4px 10px;">${esc(etiqueta)}</span>
        </td>
      </tr></table>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-radius:99px;overflow:hidden;"><tr>
        <td width="${cheio}%" height="8" style="background:${AZUL};font-size:0;line-height:0;height:8px;">&nbsp;</td>
        ${vazioCelula}
      </tr></table>
    </td></tr>`;
}

function ponto(n: number, titulo: string, acao: string): string {
  return `
    <tr><td style="padding:0 0 12px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border:1px solid #e3e7f1;border-radius:12px;"><tr>
        <td width="56" valign="top" style="padding:18px 0 18px 18px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
            <td width="32" height="32" align="center" valign="middle" style="background:${AZUL};border-radius:99px;font-family:${FONTE};font-size:15px;font-weight:700;color:#ffffff;width:32px;height:32px;">${n}</td>
          </tr></table>
        </td>
        <td valign="top" style="padding:18px 18px 18px 6px;">
          <div style="font-family:${FONTE};font-size:16px;font-weight:700;color:${ESCURO};line-height:1.3;padding:0 0 6px 0;">${esc(titulo)}</div>
          <div style="font-family:${FONTE};font-size:15px;color:${CINZA};line-height:1.55;">${esc(acao)}</div>
        </td>
      </tr></table>
    </td></tr>`;
}

const WHATSAPP_LINK = "https://wa.me/5511984083610";

function iconeAssinatura(href: string, arquivo: string, nome: string): string {
  return `<td style="padding:0 8px 0 0;"><a href="${href}"><img src="${SITE}/email/${arquivo}" width="24" height="24" alt="${nome}" style="display:block;border:0;"></a></td>`;
}

// Assinatura da marca: logo em quadrado azul-marinho, linha azul, nome, contatos e cinco ícones.
function assinatura(): string {
  const linhaTexto = `font-family:${FONTE};font-size:13px;line-height:1.7;color:#555555;`;
  return `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td valign="middle" style="padding:0 20px 0 0;border-right:2px solid ${CIANO};">
          <img src="${IMG_ASSINATURA}" width="96" height="96" alt="Sinenberg Consulting" style="display:block;border:0;">
        </td>
        <td valign="middle" style="padding:0 0 0 20px;">
          <div style="font-family:${FONTE};font-size:18px;font-weight:700;color:${MARINHO};line-height:1.2;padding:0 0 8px 0;">Daniel Sinenberg</div>
          <div style="${linhaTexto}"><a href="tel:+5511984083610" style="color:#555555;text-decoration:none;">+55 11 98408-3610</a></div>
          <div style="${linhaTexto}"><a href="mailto:daniel@sinenberg.com.br" style="color:#555555;text-decoration:none;">daniel@sinenberg.com.br</a></div>
          <div style="${linhaTexto}"><a href="${SITE}" style="color:#555555;text-decoration:none;">www.sinenbergconsulting.com.br</a></div>
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;"><tr>
            ${iconeAssinatura(SITE, "ic-site.png", "Site")}
            ${iconeAssinatura(WHATSAPP_LINK, "ic-whatsapp.png", "WhatsApp")}
            ${iconeAssinatura("mailto:daniel@sinenberg.com.br", "ic-email.png", "E-mail")}
            ${iconeAssinatura("https://www.linkedin.com/in/danielsinenberg/", "ic-linkedin.png", "LinkedIn")}
            ${iconeAssinatura("https://www.instagram.com/danielsinenberg/", "ic-instagram.png", "Instagram")}
          </tr></table>
        </td>
      </tr></table>`;
}

export function htmlResultado(nome: string, empresa: string, r: Resultado): string {
  const e = ESTAGIOS[r.estagio];
  const zap = mensagemWhatsApp(r, empresa);
  const paragrafos = e.textos
    .map(
      (t) =>
        `<p style="margin:0 0 14px 0;font-family:${FONTE};font-size:16px;line-height:1.6;color:#c9d0e4;">${esc(t)}</p>`,
    )
    .join("");
  const pilares = r.pilares.map((p) => pilar(p.nome, p.etiqueta, p.fracao)).join("");
  const pontos = r.pontos.length
    ? `
        <tr><td style="padding:30px 32px 0 32px;">
          <div style="font-family:${FONTE};font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${AZUL};padding:0 0 6px 0;">O que fazer primeiro</div>
          <div style="font-family:${FONTE};font-size:22px;font-weight:700;color:${ESCURO};line-height:1.25;padding:0 0 16px 0;">Seus pontos de atenção</div>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
            ${r.pontos.map((p, i) => ponto(i + 1, p.ponto, p.acao)).join("")}
          </table>
        </td></tr>`
    : "";

  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(nome)}, o resultado do seu diagnóstico</title>
</head>
<body style="margin:0;padding:0;background:#eceef4;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;font-size:1px;line-height:1px;color:#eceef4;">Seu estágio: ${esc(e.nome)}. Veja como estão os seus três pilares e o que fazer primeiro.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#eceef4;">
<tr><td align="center" style="padding:24px 12px;">

  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;background:${CREME};border-radius:16px;overflow:hidden;">

    <tr><td style="background:${ESCURO};padding:26px 32px 0 32px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td><img src="${IMG_LOGO}" width="96" alt="Sinenberg Consulting" style="display:block;border:0;height:auto;"></td>
        <td align="right" valign="top" style="font-family:${FONTE};font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${CIANO};padding-top:6px;">Diagnóstico rápido</td>
      </tr></table>
    </td></tr>

    <tr><td style="background:${ESCURO};padding:30px 32px 34px 32px;">
      <div style="font-family:${FONTE};font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${CIANO};padding:0 0 10px 0;">Seu estágio</div>
      <div style="font-family:${FONTE};font-size:36px;font-weight:800;line-height:1.1;color:#ffffff;padding:0 0 18px 0;"><span style="background:${AMARELO};color:${ESCURO};padding:0 8px;">${esc(e.nome)}</span></div>
      <div style="font-family:${FONTE};font-size:20px;font-weight:700;line-height:1.35;color:#ffffff;padding:0 0 16px 0;">${esc(e.titulo(nome))}</div>
      ${paragrafos}
    </td></tr>

    <tr><td style="padding:34px 32px 0 32px;">
      <div style="font-family:${FONTE};font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:${AZUL};padding:0 0 6px 0;">Como você foi</div>
      <div style="font-family:${FONTE};font-size:22px;font-weight:700;color:${ESCURO};line-height:1.25;padding:0 0 20px 0;">Os seus três pilares</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${pilares}
      </table>
    </td></tr>
    ${pontos}

    <tr><td style="padding:32px 0 0 0;">
      <img src="${IMG_DANIEL}" width="600" alt="Daniel Sinenberg" style="display:block;width:100%;max-width:600px;height:auto;border:0;">
    </td></tr>

    <tr><td style="background:${ESCURO};padding:32px 32px 34px 32px;">
      <div style="font-family:${FONTE};font-size:24px;font-weight:700;line-height:1.25;color:#ffffff;padding:0 0 12px 0;">Quer olhar isso junto comigo?</div>
      <div style="font-family:${FONTE};font-size:16px;line-height:1.6;color:#c9d0e4;padding:0 0 22px 0;">Em 30 minutos de conversa eu olho o seu resultado com você e digo, com franqueza, por onde eu começaria. Sem compromisso.</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
        <td align="center" style="background:${AMARELO};border-radius:10px;">
          <a href="${esc(zap)}" style="display:inline-block;font-family:${FONTE};font-size:16px;font-weight:700;color:${ESCURO};text-decoration:none;padding:15px 26px;">Conversar no WhatsApp</a>
        </td>
      </tr></table>
      <div style="font-family:${FONTE};font-size:14px;line-height:1.6;color:#9aa3bd;padding:18px 0 0 0;">Se preferir, é só responder este e-mail.</div>
    </td></tr>

    <tr><td style="padding:28px 32px 28px 32px;">
${assinatura()}
      <div style="font-family:${FONTE};font-size:12px;color:#8a91a6;line-height:1.6;padding:22px 0 0 0;">Você recebeu este e-mail porque respondeu o diagnóstico em sinenbergconsulting.com.br. Se não quiser mais receber nada, responda pedindo a exclusão dos seus dados.</div>
    </td></tr>

  </table>

</td></tr>
</table>
</body>
</html>`;
}
