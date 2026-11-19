import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import icone from "@/assets/icon.png";
import {
  CARGOS,
  ESTAGIOS,
  FATURAMENTOS,
  PERGUNTAS,
  PILARES,
  calcularResultado,
  mensagemWhatsApp,
  primeiroNome,
  type Etiqueta,
  type Letra,
} from "@/lib/diagnostico-v3";
import { registrarDiagnosticoV3 } from "@/lib/leads-v3";

type Etapa = { tipo: "abertura" } | { tipo: "pergunta"; i: number } | { tipo: "formulario" } | { tipo: "resultado" };

const AZUL = "#2450FF";
const NAVY = "#0B1020";
const PAPEL = "#FFFDF8";
const COR_ETIQUETA: Record<Etiqueta, string> = {
  "Ponto fraco": "#FF6A2B",
  "Em construção": "#FFE27A",
  "Bem encaminhado": "#2EC4FF",
};

function Chevron({ cor = "#2EC4FF", w = 26 }: { cor?: string; w?: number }) {
  return (
    <svg width={w} height={Math.round(w * 0.42)} viewBox="0 0 48 20" aria-hidden="true">
      <polyline points="3,17 24,4 45,17" fill="none" stroke={cor} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GrandeS({ style, cor = "#2EC4FF" }: { style: CSSProperties; cor?: string }) {
  return (
    <svg viewBox="0 0 60 64" aria-hidden="true" style={{ position: "absolute", pointerEvents: "none", ...style }}>
      <polyline points="54,14 30,3 6,14 6,30" fill="none" stroke={cor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="6,50 30,61 54,50 54,34" fill="none" stroke={cor} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Marca({ claro }: { claro?: boolean }) {
  return (
    <a href="/" style={{ display: "flex", gap: 9, alignItems: "center", textDecoration: "none" }}>
      <img src={icone} alt="" style={{ width: 26, height: 26 }} />
      <span className="t" style={{ fontWeight: 800, fontSize: 16, letterSpacing: "-0.02em", color: claro ? "#FFFFFF" : NAVY }}>
        Sinenberg Consulting
      </span>
    </a>
  );
}

function Progresso({ feitas, atual }: { feitas: number; atual?: number }) {
  return (
    <div className="seg" aria-hidden="true">
      {PERGUNTAS.map((_, i) => (
        <i key={i} className={i < feitas ? "f" : i === atual ? "c" : ""} />
      ))}
    </div>
  );
}

export function DiagnosticoV3() {
  const [etapa, setEtapa] = useState<Etapa>({ tipo: "abertura" });
  const [respostas, setRespostas] = useState<(Letra | null)[]>(() => PERGUNTAS.map(() => null));
  const [form, setForm] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    empresa: "",
    cargo: "" as string,
    faturamento: "" as string,
    consentimento: false,
    website: "",
  });
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [copiaEnviada, setCopiaEnviada] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [etapa]);

  const resultado = useMemo(() => {
    if (respostas.some((r) => r === null)) return null;
    return calcularResultado(respostas as Letra[], form.faturamento);
  }, [respostas, form.faturamento]);

  const formOk =
    form.nome.trim().length >= 2 &&
    /^\S+@\S+\.\S+$/.test(form.email.trim()) &&
    form.whatsapp.replace(/\D/g, "").length >= 10 &&
    form.empresa.trim().length >= 2 &&
    form.cargo &&
    form.faturamento &&
    form.consentimento;

  async function enviar() {
    if (!formOk || !resultado) return;
    setEnviando(true);
    setErro("");
    try {
      const r = await registrarDiagnosticoV3({
        data: {
          nome: form.nome,
          email: form.email,
          whatsapp: form.whatsapp,
          empresa: form.empresa,
          cargo: form.cargo as (typeof CARGOS)[number],
          faturamento: form.faturamento as (typeof FATURAMENTOS)[number],
          consentimento: true,
          respostas: respostas as Letra[],
          website: form.website,
        },
      });
      setCopiaEnviada(Boolean(r?.copiaEnviada));
      setEtapa({ tipo: "resultado" });
    } catch (e) {
      console.error(e);
      setErro("Não consegui enviar agora. Confira os campos e tente de novo.");
    } finally {
      setEnviando(false);
    }
  }

  // ─────────────── Abertura ───────────────
  if (etapa.tipo === "abertura") {
    return (
      <main className="v3" style={{ background: NAVY, color: "#E8ECF6", minHeight: "100dvh", position: "relative", overflow: "hidden" }}>
        <GrandeS style={{ width: 380, right: -150, top: 120, opacity: 0.08 }} />
        <div className="dq-col" style={{ position: "relative", minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "22px 0" }}>
            <Marca claro />
          </div>
          <div style={{ paddingTop: "clamp(24px, 6vh, 80px)", display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
            <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
              <Chevron />
              <span style={{ fontSize: 15, color: "#B9C6E6" }}>Para empresas de tecnologia</span>
            </div>
            <h1 className="t" style={{ margin: 0, fontWeight: 800, fontSize: "clamp(48px, 9vw, 76px)", lineHeight: 0.95, letterSpacing: "-0.045em", color: "#FFFFFF" }}>
              Diagnóstico rápido
            </h1>
            <p style={{ margin: 0, fontSize: 18, lineHeight: 1.55, color: "#C3CBE0", maxWidth: 520 }}>
              São só <span className="mk">8 perguntas</span>, simples e rápidas. Em menos de 3 minutos você descobre em que
              estágio está a sua empresa e o que mais trava o crescimento hoje.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "3fr 3fr 2fr", gap: 10, marginTop: 8, maxWidth: 520 }}>
              {[
                { n: 3, cor: "#2EC4FF", nome: PILARES[0].nome },
                { n: 3, cor: AZUL, nome: PILARES[1].nome },
                { n: 2, cor: "#FFE27A", nome: PILARES[2].nome },
              ].map((g) => (
                <div key={g.nome} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {Array.from({ length: g.n }).map((_, k) => (
                      <i key={k} style={{ flex: 1, height: 6, borderRadius: 99, background: g.cor, display: "block" }} />
                    ))}
                  </div>
                  <span style={{ fontSize: 12.5, lineHeight: 1.3, color: "#9FB0D6" }}>{g.nome}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "auto", paddingBottom: 34, paddingTop: 56, display: "flex", flexDirection: "column", gap: 14, position: "relative", maxWidth: 520 }}>
              <span className="m" style={{ position: "absolute", right: 4, top: 14, fontSize: 21, fontWeight: 600, color: "#FFE27A", transform: "rotate(-4deg)" }}>
                menos de 3 minutos
              </span>
              <button type="button" className="cta btn" style={{ background: "#FFE27A", color: NAVY }} onClick={() => setEtapa({ tipo: "pergunta", i: 0 })}>
                Começar
              </button>
              <span style={{ fontSize: 13.5, lineHeight: 1.45, color: "#9FB0D6", textAlign: "center" }}>
                Não precisa se cadastrar para começar. Seus dados só são pedidos no final, para eu te enviar o resultado.
              </span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ─────────────── Pergunta ───────────────
  if (etapa.tipo === "pergunta") {
    const i = etapa.i;
    const q = PERGUNTAS[i];
    const pilar = PILARES.find((p) => p.id === q.pilar)!;
    const escolhida = respostas[i];
    const voltar = () => setEtapa(i === 0 ? { tipo: "abertura" } : { tipo: "pergunta", i: i - 1 });
    const avancar = () => setEtapa(i === PERGUNTAS.length - 1 ? { tipo: "formulario" } : { tipo: "pergunta", i: i + 1 });
    return (
      <main className="v3 dq split" style={{ background: PAPEL, color: NAVY }}>
        <aside className="dq-aside" style={{ background: NAVY, color: "#E8ECF6", padding: "36px 44px", flexDirection: "column", position: "relative", overflow: "hidden" }}>
          <GrandeS style={{ width: 420, left: -170, bottom: -260, opacity: 0.08 }} />
          <Marca claro />
          <div style={{ margin: "auto 0", display: "flex", flexDirection: "column", gap: 6, position: "relative" }}>
            <span style={{ fontSize: 16, color: "#B9C6E6" }}>Diagnóstico rápido</span>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 14 }}>
              <span className="t" style={{ fontSize: 220, fontWeight: 800, lineHeight: 0.8, letterSpacing: "-0.07em", color: AZUL }}>
                {q.n}
              </span>
              <span className="m" style={{ fontSize: 34, fontWeight: 600, color: "#FFE27A", transform: "rotate(-4deg)", marginBottom: 14 }}>
                de 8
              </span>
            </div>
            <div style={{ display: "flex", gap: 9, alignItems: "center", marginTop: 18 }}>
              <Chevron />
              <span className="t" style={{ fontSize: 22, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>{pilar.nome}</span>
            </div>
          </div>
        </aside>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100dvh" }}>
          <div className="dq-col" style={{ maxWidth: 720, flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0 14px", fontSize: 15 }}>
              <button type="button" onClick={voltar} style={{ background: "none", border: 0, padding: "12px 18px 12px 0", margin: "-12px 0", color: AZUL, fontWeight: 600, cursor: "pointer", fontSize: 15 }}>
                ‹ Voltar
              </button>
              <span className="t dq-mtop" style={{ fontWeight: 800, fontSize: 16 }}>
                {q.n} <span style={{ color: "#9AA1B0", fontWeight: 400 }}>de 8</span>
              </span>
            </div>
            <Progresso feitas={i} atual={i} />
            <div style={{ paddingTop: "clamp(28px, 6vh, 64px)", display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
              <div className="dq-mtop" style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <Chevron cor={AZUL} w={22} />
                <span style={{ fontSize: 15, color: AZUL, fontWeight: 600 }}>{pilar.nome}</span>
              </div>
              <h1 className="t dq-q" style={{ margin: 0, fontSize: 27, fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.025em" }}>
                {q.texto}
              </h1>
              <div role="group" aria-label="Respostas" style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 6 }}>
                {(["A", "B", "C"] as Letra[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    className="opt"
                    aria-pressed={escolhida === l}
                    onClick={() => setRespostas((rs) => rs.map((r, k) => (k === i ? l : r)))}
                  >
                    <span className="l">{l}</span>
                    <span>{q.opcoes[l]}</span>
                  </button>
                ))}
              </div>
              <p className="m" style={{ margin: "4px 0 0", fontSize: 17, fontWeight: 500, color: "#5A6275" }}>
                Responda pelo dia a dia de hoje, não pelo ideal.
              </p>
              <div className="dq-next" style={{ marginTop: "auto", padding: "28px 0 34px" }}>
                <button type="button" className="cta" style={{ background: AZUL, color: "#FFFFFF" }} disabled={!escolhida} onClick={avancar}>
                  Próxima
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ─────────────── Formulário ───────────────
  if (etapa.tipo === "formulario") {
    const campo = (rotulo: string, chave: "nome" | "email" | "whatsapp" | "empresa", props: Record<string, string>) => (
      <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 14, color: "#3A4152", fontWeight: 600 }}>{rotulo}</span>
        <input className="in" value={form[chave]} onChange={(e) => setForm({ ...form, [chave]: e.target.value })} {...props} />
      </label>
    );
    const chips = (rotulo: string, chave: "cargo" | "faturamento", opcoes: readonly string[]) => (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 14, color: "#3A4152", fontWeight: 600 }}>{rotulo}</span>
        <div role="group" aria-label={rotulo} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {opcoes.map((o) => (
            <button key={o} type="button" className="chip" aria-pressed={form[chave] === o} onClick={() => setForm({ ...form, [chave]: o })}>
              {o}
            </button>
          ))}
        </div>
      </div>
    );
    return (
      <main className="v3" style={{ background: PAPEL, color: NAVY, minHeight: "100dvh" }}>
        <div className="dq-col">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0 14px", fontSize: 15 }}>
            <button type="button" onClick={() => setEtapa({ tipo: "pergunta", i: PERGUNTAS.length - 1 })} style={{ background: "none", border: 0, padding: "12px 18px 12px 0", margin: "-12px 0", color: AZUL, fontWeight: 600, cursor: "pointer", fontSize: 15 }}>
              ‹ Voltar
            </button>
            <span style={{ color: "#5A6275" }}>Último passo</span>
          </div>
          <Progresso feitas={8} />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void enviar();
            }}
            style={{ padding: "30px 0 40px", display: "flex", flexDirection: "column", gap: 16 }}
          >
            <h1 className="t" style={{ margin: "0 0 4px", fontWeight: 800, fontSize: "clamp(31px, 5vw, 42px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
              Pronto. Para onde eu mando o seu <span className="mk2">resultado?</span>
            </h1>
            {campo("Nome", "nome", { autoComplete: "name", required: "true" })}
            {campo("E-mail", "email", { type: "email", autoComplete: "email", placeholder: "voce@empresa.com.br", required: "true" })}
            {campo("WhatsApp", "whatsapp", { type: "tel", autoComplete: "tel", inputMode: "tel", placeholder: "(11) 90000-0000", required: "true" })}
            {campo("Empresa", "empresa", { autoComplete: "organization", placeholder: "Nome da empresa", required: "true" })}
            {chips("Cargo", "cargo", CARGOS)}
            {chips("Faturamento anual aproximado", "faturamento", FATURAMENTOS)}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
            />
            <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, lineHeight: 1.45, color: "#5A6275", marginTop: 4, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={form.consentimento}
                onChange={(e) => setForm({ ...form, consentimento: e.target.checked })}
                style={{ width: 20, height: 20, marginTop: 1, accentColor: AZUL, flexShrink: 0 }}
              />
              <span>
                Concordo em compartilhar meus dados e respostas com a Sinenberg Consulting para receber o resultado e ser
                contatado sobre ele. Posso pedir a exclusão a qualquer momento. Leia a{" "}
                <a href="/privacidade" target="_blank" rel="noopener" style={{ color: "#5A6275", textDecoration: "underline" }}>
                  política de privacidade
                </a>
                .
              </span>
            </label>
            {erro && <p style={{ margin: 0, color: "#C2410C", fontSize: 15 }}>{erro}</p>}
            <button type="submit" className="cta" style={{ background: AZUL, color: "#FFFFFF", marginTop: 6 }} disabled={!formOk || enviando}>
              {enviando ? "Enviando..." : "Ver meu resultado"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  // ─────────────── Resultado ───────────────
  if (!resultado) return null;
  const nome = primeiroNome(form.nome);
  const est = ESTAGIOS[resultado.estagio];
  const cedo = resultado.estagio === "cedo";
  const whats = mensagemWhatsApp(resultado, form.empresa.trim());
  const DESTAQUE = { cedo: "tudo bem.", improviso: "tem limite.", virada: "travam.", pronto: "acelerar." } as const;
  const titulo = est.titulo(nome);
  const destaque = DESTAQUE[resultado.estagio];
  const antes = titulo.endsWith(destaque) ? titulo.slice(0, -destaque.length).trimEnd() : titulo;

  const PontosDeAtencao = ({ children }: { children?: ReactNode }) =>
    resultado.pontos.length ? (
      <div>
        {children}
        {resultado.pontos.map((p, k) => (
          <div key={p.n} style={{ display: "flex", gap: 14, padding: "18px 0", borderTop: k === 0 && children ? "none" : "1px solid #E8E4DA" }}>
            <span className="t" style={{ fontWeight: 800, fontSize: 34, lineHeight: 0.9, letterSpacing: "-0.04em", minWidth: 28, color: k === 0 ? "#FF6A2B" : AZUL }}>
              {k + 1}
            </span>
            <div>
              <p className="t" style={{ margin: "0 0 4px", fontSize: 17, fontWeight: 800 }}>{p.ponto}</p>
              <p style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#3A4152" }}>{p.acao}</p>
            </div>
          </div>
        ))}
      </div>
    ) : null;

  return (
    <main className="v3" style={{ background: PAPEL, color: NAVY, minHeight: "100dvh" }}>
      <div className="dq-col" style={{ paddingBottom: 30 }}>
        <div style={{ padding: "20px 0 8px" }}>
          <Marca />
        </div>
        <div style={{ paddingTop: 18, display: "flex", flexDirection: "column", gap: 18 }}>
          {cedo ? (
            <span style={{ alignSelf: "flex-start", background: "#F2EEE4", padding: "6px 12px", borderRadius: 99, fontSize: 14, fontWeight: 600 }}>
              Seu estágio: Ainda é cedo
            </span>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              <span style={{ fontSize: 14, color: "#5A6275" }}>Seu estágio</span>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
                {(["improviso", "virada", "pronto"] as const).map((id) => (
                  <i key={id} style={{ height: 8, borderRadius: 99, background: id === resultado.estagio ? AZUL : "#D6DAE3", display: "block" }} />
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, fontSize: 12.5, lineHeight: 1.25, color: "#9AA1B0" }}>
                {(["improviso", "virada", "pronto"] as const).map((id) =>
                  id === resultado.estagio ? (
                    <span key={id} className="t" style={{ color: AZUL, fontWeight: 800, fontSize: 13.5 }}>{ESTAGIOS[id].nome}</span>
                  ) : (
                    <span key={id}>{ESTAGIOS[id].nome}</span>
                  ),
                )}
              </div>
            </div>
          )}
          <h1 className="t" style={{ margin: "6px 0 0", fontWeight: 800, fontSize: "clamp(33px, 5.4vw, 46px)", lineHeight: 1.02, letterSpacing: "-0.04em" }}>
            {antes} {titulo.endsWith(destaque) && <span className="mk">{destaque}</span>}
          </h1>
          {est.textos.map((t) => (
            <p key={t} style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: "#3A4152" }}>{t}</p>
          ))}
        </div>

        {cedo ? (
          <>
            {resultado.pontos.length > 0 && (
              <p style={{ margin: "16px 0 4px", fontSize: 16, color: "#3A4152" }}>Mesmo assim, as suas respostas já mostram onde vale prestar atenção:</p>
            )}
            <PontosDeAtencao />
            <p style={{ margin: "18px 0 0", fontSize: 16, lineHeight: 1.6, color: "#3A4152", borderTop: "1px solid #E8E4DA", paddingTop: 18 }}>
              Salvei o seu contato. Quando a empresa se aproximar de R$ 1 milhão por ano, a conversa sobre estrutura passa a fazer
              muito mais sentido, e posso te procurar mais para frente.
            </p>
            <div style={{ marginTop: 24, background: NAVY, color: "#E8ECF6", borderRadius: 16, padding: "24px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
              <span className="m" style={{ fontSize: 18, fontWeight: 600, color: "#FFE27A", transform: "rotate(-2deg)", alignSelf: "flex-start" }}>
                material da palestra
              </span>
              <p className="t" style={{ margin: 0, fontSize: 23, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#FFFFFF" }}>
                Evidência vence carisma
              </p>
              <p style={{ margin: 0, fontSize: 15, color: "#C3CBE0" }}>
                Um guia para montar um pitch que prova que o seu negócio funciona. Ajuda a vender melhor desde já.
              </p>
              <a className="cta btn" href="/sebrae" style={{ background: "#2EC4FF", color: NAVY, fontSize: 17, padding: 15 }}>
                Baixar o material
              </a>
            </div>
          </>
        ) : (
          <>
            <div style={{ marginTop: 26, background: NAVY, color: "#E8ECF6", borderRadius: 16, padding: "24px 20px", display: "flex", flexDirection: "column", gap: 18 }}>
              <p className="t" style={{ margin: 0, fontSize: 20, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}>Como estão os seus três pilares</p>
              {resultado.pilares.map((p) => (
                <div key={p.id} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, fontSize: 15 }}>
                    <span>{p.nome}</span>
                    <span style={{ color: COR_ETIQUETA[p.etiqueta], whiteSpace: "nowrap" }}>{p.etiqueta}</span>
                  </div>
                  <div style={{ height: 8, borderRadius: 99, background: "rgba(255,255,255,.12)", overflow: "hidden" }}>
                    <i style={{ display: "block", height: 8, borderRadius: 99, width: `${Math.max(8, Math.round(p.fracao * 100))}%`, background: COR_ETIQUETA[p.etiqueta] }} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ paddingTop: 30 }}>
              <PontosDeAtencao>
                <p className="t" style={{ margin: "0 0 6px", fontSize: 22, fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.025em" }}>
                  Seus três pontos de atenção e o que fazer primeiro
                </p>
              </PontosDeAtencao>
            </div>
            <div style={{ marginTop: 18, background: AZUL, color: "#FFFFFF", borderRadius: 16, padding: "26px 20px", display: "flex", flexDirection: "column", gap: 14, position: "relative", overflow: "hidden" }}>
              <GrandeS cor="#FFFFFF" style={{ width: 200, right: -70, bottom: -70, opacity: 0.14 }} />
              <p className="t" style={{ margin: 0, fontSize: 24, fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", position: "relative" }}>
                Quer entender por onde começar na sua empresa?
              </p>
              <p style={{ margin: 0, fontSize: 15.5, color: "#E4E9FF", position: "relative" }}>
                Em uma conversa de 30 minutos a gente olha esse resultado junto, e eu te digo com franqueza por onde eu começaria. Sem compromisso.
              </p>
              <a className="cta btn" href={whats} target="_blank" rel="noopener" style={{ background: "#FFE27A", color: NAVY, fontSize: 17, padding: 16, position: "relative" }}>
                Conversar no WhatsApp
              </a>
              <a href="/#comeco" style={{ textAlign: "center", fontSize: 15, color: "#FFFFFF", textDecoration: "underline", position: "relative" }}>
                Ver como funciona o Sprint de Direção
              </a>
            </div>
          </>
        )}
        {copiaEnviada && (
          <p style={{ margin: "18px 0 0", fontSize: 14, color: "#5A6275", textAlign: "center" }}>Mandei uma cópia deste resultado para o seu e-mail.</p>
        )}
      </div>
    </main>
  );
}
