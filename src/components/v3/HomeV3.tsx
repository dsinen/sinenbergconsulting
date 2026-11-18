// Gerado a partir da prancha E4 do canvas "Site Sinenberg v3". Ajustes de texto: editar aqui.
import icone from "@/assets/icon.png";
import fotoTopo from "@/assets/daniel-links.jpg";
import fotoSobre from "@/assets/v3/daniel-sobre.jpg";
import fotoPodcast from "@/assets/v3/podcast.jpg";
import fotoQr from "@/assets/v3/fe26-qr.jpg";
import fotoPalco from "@/assets/v3/fe26-palco.jpg";

export function HomeV3() {
  return (
    <div className="v3">
<div style={{ width: "100%", background: "#0B1020", color: "#E8ECF6", fontFamily: "Ronzino, 'Helvetica Neue', Arial, sans-serif", fontSize: "18px", lineHeight: "1.6" }}>

{/* NAV */}
<header style={{ borderBottom: "1px solid rgba(255,255,255,.1)" }}>
<nav className="nav" aria-label="Principal" style={{ maxWidth: "1240px", margin: "0 auto", padding: "18px clamp(20px, 4vw, 40px)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
<a href="#topo" style={{ display: "flex", alignItems: "center", gap: "10px" }}><img src={icone} alt="" style={{ width: "32px", height: "32px" }} /><span className="t" style={{ fontWeight: "800", fontSize: "19px", letterSpacing: "-0.02em" }}>Sinenberg Consulting</span></a>
<div style={{ display: "flex", gap: "26px", alignItems: "center", flexWrap: "wrap", fontSize: "16px" }}><span className="nav-links" style={{ display: "flex", gap: "26px" }}>
<a href="#metodo">Método</a><a href="#comeco">Como começa</a><a href="#sobre">Sobre</a><a href="#acao">Em ação</a><a href="#diagnostico">Diagnóstico</a></span>
<a className="btn nav-cta" href="https://wa.me/5511984083610?text=Oi%2C%20Daniel.%20Vim%20pelo%20site%20e%20quero%20marcar%20a%20conversa%20de%2030%20minutos." style={{ background: "#2EC4FF", color: "#0B1020", padding: "10px 18px", borderRadius: "8px", fontWeight: "600" }} target="_blank" rel="noopener">Conversa de 30 min</a>
</div>
</nav>
</header>

{/* HERO */}
<section id="topo" style={{ position: "relative", overflow: "hidden" }}>
<svg width="520" height="556" viewBox="0 0 60 64" aria-hidden="true" style={{ position: "absolute", right: "-120px", top: "-60px", opacity: ".07" }}><polyline points="54,14 30,3 6,14 6,30" fill="none" stroke="#2EC4FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></polyline><polyline points="6,50 30,61 54,50 54,34" fill="none" stroke="#2EC4FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></polyline></svg>
<div style={{ position: "relative", maxWidth: "1240px", margin: "0 auto", padding: "clamp(48px, 6vw, 96px) clamp(20px, 4vw, 40px) 100px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(480px, 100%), 1fr))", gap: "60px", alignItems: "center" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
<div style={{ display: "flex", gap: "10px", alignItems: "center" }}><svg width="30" height="12" viewBox="0 0 48 20" aria-hidden="true"><polyline points="3,17 24,4 45,17" fill="none" stroke="#2EC4FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></polyline></svg><span style={{ fontSize: "16px", color: "#B9C6E6" }}>Consultoria estratégica para empresas de tecnologia</span></div>
<h1 className="t" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(46px, 6vw, 84px)", lineHeight: "1", letterSpacing: "-0.04em", color: "#FFFFFF", textWrap: "balance" }}>Sua empresa de tech cresceu, mas ainda <span className="mk">depende demais de você.</span></h1>
<p style={{ margin: "0", fontSize: "20px", color: "#C3CBE0", maxWidth: "560px" }}>Eu levo o que as grandes empresas fazem de melhor em gestão para o tamanho da sua, de um jeito simples de entender e de colocar em prática. O objetivo é crescer com previsibilidade, sem tudo passar pela sua agenda.</p>
<div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
<a className="btn" href="https://wa.me/5511984083610?text=Oi%2C%20Daniel.%20Vim%20pelo%20site%20e%20quero%20marcar%20a%20conversa%20de%2030%20minutos." style={{ background: "#2EC4FF", color: "#0B1020", padding: "16px 26px", borderRadius: "8px", fontWeight: "600", textDecoration: "none" }} target="_blank" rel="noopener">Marcar conversa de 30 min</a>
<a className="btn" href="/versao-nova/diagnostico" style={{ color: "#FFFFFF", padding: "15px 24px", borderRadius: "8px", fontWeight: "600", textDecoration: "none", border: "1.5px solid rgba(255,255,255,.35)" }}>Fazer o diagnóstico (3 min)</a>
</div>
<p style={{ margin: "0", fontSize: "15px", color: "#9FB0D6" }}>Mentor de mais de 50 startups na Estácio e na Wyden · Palestrante na Feira do Empreendedor Sebrae-SP 2026</p>
</div>
<div style={{ position: "relative" }}>
<img src={fotoTopo} alt="Retrato de Daniel Sinenberg sorrindo, com folhagem verde ao fundo" style={{ width: "100%", aspectRatio: "4 / 4.4", objectFit: "cover", objectPosition: "50% 30%", borderRadius: "14px", display: "block" }} />
<div style={{ position: "absolute", left: "-24px", bottom: "30px", background: "#0B1020", border: "1px solid rgba(255,255,255,.18)", padding: "14px 18px", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "2px" }}>
<span style={{ fontSize: "13px", color: "#9FB0D6" }}>Onde trabalhei</span>
<span className="t" style={{ fontSize: "19px", fontWeight: "800", color: "#FFFFFF", letterSpacing: "-0.01em" }}>Vivo · Fast Shop · Linx · Stone</span>
</div>
<span className="m" style={{ position: "absolute", right: "6px", top: "-30px", fontSize: "26px", fontWeight: "600", color: "#FFE27A", transform: "rotate(-3deg)" }}>20 anos por dentro</span>
</div>
</div>
</section>

{/* LOGOS */}
<section style={{ background: "#FFFDF8", color: "#0B1020" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto", padding: "26px clamp(20px, 4vw, 40px)", display: "flex", flexWrap: "wrap", gap: "8px 34px", alignItems: "baseline" }}>
<span style={{ fontSize: "15px", color: "#5A6275" }}>Com quem fiz negócio</span>
<span className="t" style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.02em" }}>Shell</span><span className="t" style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.02em" }}>Ipiranga</span><span className="t" style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.02em" }}>BR</span><span className="t" style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.02em" }}>OXXO</span>
</div>
</section>

{/* DORES */}
<section style={{ background: "#FFFDF8", color: "#0B1020", padding: "80px clamp(20px, 4vw, 40px) 100px", borderTop: "1px solid #E8E4DA" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
<h2 className="t" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(38px, 4.4vw, 60px)", lineHeight: "1", letterSpacing: "-0.035em" }}>Você se reconhece?</h2>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(270px, 100%), 1fr))", gap: "0", borderTop: "2px solid #0B1020" }}>
<div style={{ padding: "26px 26px 26px 0", display: "flex", flexDirection: "column", gap: "12px", borderRight: "1px solid #E8E4DA" }}><span className="t" style={{ fontSize: "44px", fontWeight: "800", color: "#FF6A2B", lineHeight: "1" }}>01</span><h3 className="t" style={{ margin: "0", fontSize: "24px", fontWeight: "800", lineHeight: "1.12", letterSpacing: "-0.02em" }}>Toda venda e decisão importante ainda passa por você.</h3><p style={{ margin: "0", fontSize: "16px", color: "#3A4152" }}>Proposta grande, preço, contratação, cliente insatisfeito. A empresa anda no ritmo da sua agenda.</p></div>
<div style={{ padding: "26px", display: "flex", flexDirection: "column", gap: "12px", borderRight: "1px solid #E8E4DA" }}><span className="t" style={{ fontSize: "44px", fontWeight: "800", color: "#2450FF", lineHeight: "1" }}>02</span><h3 className="t" style={{ margin: "0", fontSize: "24px", fontWeight: "800", lineHeight: "1.12", letterSpacing: "-0.02em" }}>Cada mês é uma surpresa.</h3><p style={{ margin: "0", fontSize: "16px", color: "#3A4152" }}>Tem mês bom e mês ruim, e ninguém sabe explicar direito o porquê.</p></div>
<div style={{ padding: "26px", display: "flex", flexDirection: "column", gap: "12px", borderRight: "1px solid #E8E4DA" }}><span className="t" style={{ fontSize: "44px", fontWeight: "800", color: "#2450FF", lineHeight: "1" }}>03</span><h3 className="t" style={{ margin: "0", fontSize: "24px", fontWeight: "800", lineHeight: "1.12", letterSpacing: "-0.02em" }}>O time trabalha muito, mas cada um puxa para um lado.</h3><p style={{ margin: "0", fontSize: "16px", color: "#3A4152" }}>Falta alguém dizer o que vem primeiro e o que fica para depois.</p></div>
<div style={{ padding: "26px 0 26px 26px", display: "flex", flexDirection: "column", gap: "12px" }}><span className="t" style={{ fontSize: "44px", fontWeight: "800", color: "#2450FF", lineHeight: "1" }}>04</span><h3 className="t" style={{ margin: "0", fontSize: "24px", fontWeight: "800", lineHeight: "1.12", letterSpacing: "-0.02em" }}>Mais cliente virou mais dor de cabeça.</h3><p style={{ margin: "0", fontSize: "16px", color: "#3A4152" }}>O que funcionava com 20 clientes começa a travar com 80.</p></div>
</div>
<p className="t" style={{ margin: "0", fontSize: "clamp(24px, 2.6vw, 34px)", fontWeight: "600", lineHeight: "1.2", letterSpacing: "-0.02em", maxWidth: "880px" }}>Isso <span className="mk2">tem conserto</span>, e não passa por você trabalhar ainda mais.</p>
</div>
</section>

{/* TESE */}
<section style={{ background: "#0B1020", padding: "100px clamp(20px, 4vw, 40px)", overflow: "hidden" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "48px" }}>
<p className="t" aria-hidden="true" style={{ margin: "0", fontWeight: "800", fontSize: "min(14.5vw, 214px)", lineHeight: "0.82", letterSpacing: "-0.055em", color: "#2450FF", whiteSpace: "nowrap" }}>EVIDÊNCIA</p>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(440px, 100%), 1fr))", gap: "56px", alignItems: "center" }}>
<div style={{ position: "relative" }}>
<img src={fotoPalco} alt="Daniel falando ao microfone no palco da Feira do Empreendedor do Sebrae" style={{ width: "100%", aspectRatio: "1 / 1", objectFit: "cover", objectPosition: "40% 30%", borderRadius: "14px", display: "block" }} />
<span className="m" style={{ position: "absolute", left: "18px", bottom: "-18px", background: "#FFE27A", color: "#0B1020", fontSize: "22px", fontWeight: "600", padding: "4px 14px", borderRadius: "6px", transform: "rotate(-2.5deg)" }}>Feira do Empreendedor, Sebrae-SP</span>
</div>
<div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
<h2 className="t" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(40px, 4.8vw, 68px)", lineHeight: "0.98", letterSpacing: "-0.04em", color: "#FFFFFF" }}>Carisma ajuda.<br />Evidência convence.</h2>
<p style={{ margin: "0", color: "#C3CBE0" }}>Na maioria das empresas de tecnologia que cresceram bem, quem vende é o dono. Ninguém conhece o produto como ele, o cliente confia nele e o negócio fecha no olho no olho. Funciona até o dia em que não cabe mais na agenda.</p>
<p style={{ margin: "0", color: "#C3CBE0" }}>Carisma é difícil de passar adiante. Prova e processo dá para ensinar ao time. Quando a empresa sabe dizer quem é o cliente certo, como resolve o problema dele e o que já entregou para gente parecida, a venda deixa de depender de uma pessoa só.</p>
<div style={{ display: "flex", flexDirection: "column", gap: "0", borderTop: "1px solid rgba(255,255,255,.16)" }}>
<p className="t" style={{ margin: "0", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,.16)", fontSize: "22px", fontWeight: "600", color: "#FFFFFF", letterSpacing: "-0.015em" }}>Promessa começa com vou. Prova começa com <span className="mk">já.</span></p>
<p className="t" style={{ margin: "0", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,.16)", fontSize: "22px", fontWeight: "600", color: "#FFFFFF", letterSpacing: "-0.015em" }}>Estratégia sem venda é slide bonito.</p>
<p className="t" style={{ margin: "0", padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,.16)", fontSize: "22px", fontWeight: "600", color: "#FFFFFF", letterSpacing: "-0.015em" }}>Quem tenta falar com todo mundo não é lembrado por ninguém.</p>
</div>
</div>
</div>
</div>
</section>

{/* METODO */}
<section id="metodo" style={{ background: "#FFFDF8", color: "#0B1020", padding: "100px clamp(20px, 4vw, 40px)" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "44px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "800px" }}>
<div style={{ display: "flex", gap: "10px", alignItems: "center" }}><svg width="30" height="12" viewBox="0 0 48 20" aria-hidden="true"><polyline points="3,17 24,4 45,17" fill="none" stroke="#2450FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></polyline></svg><span style={{ fontSize: "16px", color: "#5A6275" }}>O método Crescimento Estruturado</span></div>
<h2 className="t" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(38px, 4.4vw, 60px)", lineHeight: "1", letterSpacing: "-0.035em" }}>Três pilares para crescer sem depender de você</h2>
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: "16px" }}>
<div style={{ background: "#0B1020", color: "#FFFFFF", borderRadius: "14px", padding: "32px", display: "flex", flexDirection: "column", gap: "14px" }}><span className="t" style={{ fontSize: "56px", fontWeight: "800", color: "#2EC4FF", lineHeight: "1", letterSpacing: "-0.04em" }}>01</span><h3 className="t" style={{ margin: "0", fontSize: "27px", fontWeight: "800", letterSpacing: "-0.02em" }}>Direção de Crescimento</h3><p style={{ margin: "0", fontSize: "17px", color: "#C3CBE0" }}>Quem é o seu cliente ideal e qual oferta vai na frente. A empresa para de correr atrás de tudo ao mesmo tempo.</p><span style={{ marginTop: "auto", fontSize: "15px", color: "#FFE27A", borderTop: "1px solid rgba(255,255,255,.16)", paddingTop: "12px" }}>Entrega: Mapa de Foco</span></div>
<div style={{ background: "#0B1020", color: "#FFFFFF", borderRadius: "14px", padding: "32px", display: "flex", flexDirection: "column", gap: "14px" }}><span className="t" style={{ fontSize: "56px", fontWeight: "800", color: "#2EC4FF", lineHeight: "1", letterSpacing: "-0.04em" }}>02</span><h3 className="t" style={{ margin: "0", fontSize: "27px", fontWeight: "800", letterSpacing: "-0.02em" }}>Estrutura de Receita</h3><p style={{ margin: "0", fontSize: "17px", color: "#C3CBE0" }}>Um processo comercial que o time segue sem você no meio: o que falar, o que provar, quanto vender e como acompanhar cada negociação.</p><span style={{ marginTop: "auto", fontSize: "15px", color: "#FFE27A", borderTop: "1px solid rgba(255,255,255,.16)", paddingTop: "12px" }}>Entrega: Plano Comercial</span></div>
<div style={{ background: "#0B1020", color: "#FFFFFF", borderRadius: "14px", padding: "32px", display: "flex", flexDirection: "column", gap: "14px" }}><span className="t" style={{ fontSize: "56px", fontWeight: "800", color: "#2EC4FF", lineHeight: "1", letterSpacing: "-0.04em" }}>03</span><h3 className="t" style={{ margin: "0", fontSize: "27px", fontWeight: "800", letterSpacing: "-0.02em" }}>Escala com Previsibilidade</h3><p style={{ margin: "0", fontSize: "17px", color: "#C3CBE0" }}>Os indicadores certos e os rituais de gestão certos para o plano não se perder na correria.</p><span style={{ marginTop: "auto", fontSize: "15px", color: "#FFE27A", borderTop: "1px solid rgba(255,255,255,.16)", paddingTop: "12px" }}>Entrega: Painel do Plano</span></div>
</div>
<p className="m" style={{ margin: "0", fontSize: "30px", fontWeight: "600", color: "#2450FF", transform: "rotate(-1deg)" }}>Eu monto o método e treino o seu time. Quem toca o dia a dia é a sua empresa.</p>
</div>
</section>

{/* TRADUCAO */}
<section style={{ background: "#F2EEE4", color: "#0B1020", padding: "100px clamp(20px, 4vw, 40px)" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))", gap: "56px", alignItems: "start" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
<h2 className="t" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(36px, 4.2vw, 56px)", lineHeight: "1.02", letterSpacing: "-0.035em" }}>Gestão de empresa grande, do tamanho da sua</h2>
<p style={{ margin: "0", color: "#3A4152" }}>Passei mais de 20 anos dentro de grandes empresas, com rituais de gestão, metas, prioridades e números acompanhados toda semana. Muito disso funciona para uma empresa de 10 ou de 100 pessoas, desde que venha sem burocracia e em português claro.</p>
<p className="m" style={{ margin: "0", fontSize: "28px", fontWeight: "600", color: "#2450FF" }}>Meu trabalho é fazer essa tradução.</p>
</div>
<div style={{ background: "#FFFDF8", border: "1px solid #DDD7C8", borderRadius: "14px", padding: "6px 28px" }}>
<div style={{ display: "grid", gridTemplateColumns: "minmax(0, 0.95fr) minmax(0, 1.6fr)", gap: "0 22px" }}>
<span className="t" style={{ padding: "18px 0", fontWeight: "800", fontSize: "19px", color: "#2450FF" }}>Cliente ideal (ICP)</span><span style={{ padding: "18px 0", fontSize: "16px" }}>O cliente que compra mais rápido, paga melhor e dá menos trabalho.</span>
<span className="t" style={{ padding: "18px 0", borderTop: "1px solid #E8E4DA", fontWeight: "800", fontSize: "19px", color: "#2450FF" }}>Forecast</span><span style={{ padding: "18px 0", borderTop: "1px solid #E8E4DA", fontSize: "16px" }}>Saber quanto você vai vender nos próximos meses, errando pouco.</span>
<span className="t" style={{ padding: "18px 0", borderTop: "1px solid #E8E4DA", fontWeight: "800", fontSize: "19px", color: "#2450FF" }}>Must-have e nice-to-have</span><span style={{ padding: "18px 0", borderTop: "1px solid #E8E4DA", fontSize: "16px" }}>O que não pode faltar e o que pode esperar.</span>
<span className="t" style={{ padding: "18px 0", borderTop: "1px solid #E8E4DA", fontWeight: "800", fontSize: "19px", color: "#2450FF" }}>OKR</span><span style={{ padding: "18px 0", borderTop: "1px solid #E8E4DA", fontSize: "16px" }}>Poucas metas claras, que todo mundo no time entende e persegue.</span>
<span className="t" style={{ padding: "18px 0", borderTop: "1px solid #E8E4DA", fontWeight: "800", fontSize: "19px", color: "#2450FF" }}>Rituais de gestão</span><span style={{ padding: "18px 0", borderTop: "1px solid #E8E4DA", fontSize: "16px" }}>As reuniões certas, no ritmo certo, com pauta curta e decisão no final.</span>
</div>
</div>
</div>
</section>

{/* DIAGNOSTICO */}
<section id="diagnostico" style={{ background: "#2450FF", color: "#FFFFFF", padding: "100px clamp(20px, 4vw, 40px)" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(440px, 100%), 1fr))", gap: "56px", alignItems: "center" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
<span style={{ fontSize: "16px", color: "#DCE4FF" }}>Diagnóstico rápido</span>
<h2 className="t" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(38px, 4.6vw, 62px)", lineHeight: "1", letterSpacing: "-0.035em" }}>Em que estágio está a sua empresa?</h2>
<p style={{ margin: "0", fontSize: "19px", color: "#E4E9FF" }}>São só 8 perguntas, simples e diretas. Em menos de 3 minutos você descobre em que estágio está a sua empresa e o que mais trava o crescimento hoje.</p>
<a className="btn" href="/versao-nova/diagnostico" style={{ alignSelf: "flex-start", background: "#FFE27A", color: "#0B1020", padding: "16px 28px", borderRadius: "8px", fontWeight: "600", textDecoration: "none" }}>Fazer o diagnóstico</a>
</div>
<div style={{ background: "#FFFDF8", color: "#0B1020", borderRadius: "14px", padding: "28px", display: "flex", flexDirection: "column", gap: "16px", boxShadow: "0 30px 60px -30px rgba(11,16,32,.6)" }}>
<div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px", color: "#5A6275" }}><span>Pergunta 8 de 8</span><span style={{ color: "#2450FF" }}>Escala com Previsibilidade</span></div>
<div style={{ height: "6px", background: "#E4ECFB", borderRadius: "99px" }}><div style={{ width: "100%", height: "6px", background: "#2450FF", borderRadius: "99px" }}></div></div>
<p className="t" style={{ margin: "0", fontSize: "24px", fontWeight: "800", lineHeight: "1.18", letterSpacing: "-0.015em" }}>Se você tirasse 15 dias de férias sem celular, o que aconteceria com a empresa?</p>
<div style={{ border: "1.5px solid #D6DAE3", borderRadius: "10px", padding: "12px 16px", fontSize: "16px" }}>A. Nem pensar. Muita coisa ia parar.</div>
<div style={{ border: "2px solid #2450FF", background: "#EEF2FF", borderRadius: "10px", padding: "12px 16px", fontSize: "16px" }}>B. Seguiria andando, mas eu voltaria com uma fila de decisões.</div>
<div style={{ border: "1.5px solid #D6DAE3", borderRadius: "10px", padding: "12px 16px", fontSize: "16px" }}>C. Seguiria normal. O time sabe decidir sem mim.</div>
</div>
</div>
</section>

{/* COMO COMECA */}
<section id="comeco" style={{ background: "#0B1020", padding: "100px clamp(20px, 4vw, 40px)" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "44px" }}>
<h2 className="t" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(38px, 4.4vw, 60px)", lineHeight: "1", letterSpacing: "-0.035em", color: "#FFFFFF", maxWidth: "820px" }}>Como a gente começa</h2>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))", gap: "16px" }}>
<div style={{ border: "1px solid rgba(255,255,255,.18)", borderRadius: "14px", padding: "30px", display: "flex", flexDirection: "column", gap: "12px" }}><span style={{ fontSize: "15px", color: "#9FB0D6" }}>Passo 1</span><h3 className="t" style={{ margin: "0", fontSize: "26px", fontWeight: "800", color: "#FFFFFF", letterSpacing: "-0.02em" }}>Conversa de 30 minutos</h3><p style={{ margin: "0", fontSize: "17px", color: "#C3CBE0" }}>Você me conta o momento da empresa e eu digo com franqueza se faz sentido trabalharmos juntos. Se não fizer, você sai com pelo menos uma recomendação prática.</p></div>
<div style={{ background: "#2450FF", borderRadius: "14px", padding: "30px", display: "flex", flexDirection: "column", gap: "12px", color: "#FFFFFF" }}><span style={{ fontSize: "15px", color: "#DCE4FF" }}>Passo 2 · 12 semanas</span><h3 className="t" style={{ margin: "0", fontSize: "26px", fontWeight: "800", letterSpacing: "-0.02em" }}>Sprint de Direção</h3><p style={{ margin: "0", fontSize: "17px", color: "#E4E9FF" }}>Um projeto com começo, meio e fim. No final, você tem três coisas na mão:</p>
<div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "16px" }}><span><strong>Mapa de Foco:</strong> onde crescer e em que ordem.</span><span><strong>Plano Comercial:</strong> como vender sem que tudo passe por você.</span><span><strong>Painel do Plano:</strong> os números que mostram se está dando certo.</span></div>
<p style={{ margin: "6px 0 0", fontSize: "15px", color: "#DCE4FF" }}>Toda semana falo com uma pessoa do seu time, a cada 15 dias com você e uma vez por mês com a liderança.</p></div>
<div style={{ border: "1px solid rgba(255,255,255,.18)", borderRadius: "14px", padding: "30px", display: "flex", flexDirection: "column", gap: "12px" }}><span style={{ fontSize: "15px", color: "#9FB0D6" }}>Passo 3</span><h3 className="t" style={{ margin: "0", fontSize: "26px", fontWeight: "800", color: "#FFFFFF", letterSpacing: "-0.02em" }}>Depois do Sprint</h3><p style={{ margin: "0", fontSize: "17px", color: "#C3CBE0" }}>A empresa segue com tudo o que foi montado. Se você quiser alguém por perto nas decisões dos meses seguintes, dá para combinar um acompanhamento mais leve. É escolha sua, não condição.</p></div>
</div>
<div style={{ borderTop: "1px solid rgba(255,255,255,.16)", paddingTop: "44px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))", gap: "40px", alignItems: "start" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
<h3 className="t" style={{ margin: "0", fontSize: "clamp(30px, 3.4vw, 44px)", fontWeight: "800", lineHeight: "1.04", letterSpacing: "-0.03em", color: "#FFFFFF" }}>Um projeto, não mais um custo fixo</h3>
<p style={{ margin: "0", fontSize: "17px", color: "#C3CBE0" }}>Contratar um gerente ou diretor para organizar a casa significa salário, encargos e benefícios todo mês, sem data para acabar. Antes disso ainda vêm os meses para achar a pessoa certa e o risco de errar na contratação.</p>
<p style={{ margin: "0", fontSize: "17px", color: "#C3CBE0" }}>O Sprint de Direção tem começo, meio e fim. Eu monto a estrutura, treino o time e deixo a operação rodando, com os primeiros resultados aparecendo. Aí eu saio. O que fica na empresa é o método funcionando, sem mais um salário na folha.</p>
</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "14px" }}>
<div style={{ background: "#161C30", borderRadius: "14px", padding: "24px" }}><span style={{ fontSize: "15px", color: "#9FB0D6" }}>Contratar um gerente</span><ul style={{ margin: "10px 0 0", paddingLeft: "18px", fontSize: "16px", color: "#C3CBE0", display: "flex", flexDirection: "column", gap: "4px" }}><li>Salário, encargos e benefícios todo mês</li><li>Sem data para acabar</li><li>Meses para achar a pessoa certa</li><li>Risco de errar na contratação</li></ul></div>
<div style={{ background: "#FFE27A", color: "#0B1020", borderRadius: "14px", padding: "24px" }}><span className="t" style={{ fontSize: "17px", fontWeight: "800" }}>Sprint de Direção</span><ul style={{ margin: "10px 0 0", paddingLeft: "18px", fontSize: "16px", display: "flex", flexDirection: "column", gap: "4px" }}><li>Escopo, prazo e preço fechados</li><li>12 semanas, com começo, meio e fim</li><li>Três entregas definidas</li><li>Termina com o time rodando</li></ul></div>
</div>
</div>
</div>
</section>

{/* PARA QUEM */}
<section style={{ background: "#FFFDF8", color: "#0B1020", padding: "100px clamp(20px, 4vw, 40px)" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
<h2 className="t" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(38px, 4.4vw, 60px)", lineHeight: "1", letterSpacing: "-0.035em" }}>Para quem é</h2>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(420px, 100%), 1fr))", gap: "20px" }}>
<div style={{ border: "2px solid #0B1020", borderRadius: "14px", padding: "32px", display: "flex", flexDirection: "column", gap: "14px" }}>
<h3 className="t" style={{ margin: "0", fontSize: "24px", fontWeight: "800", color: "#2450FF" }}>Faz sentido se</h3>
<ul style={{ margin: "0", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px" }}><li><strong>Toda venda e decisão importante ainda passa por você</strong></li><li>A empresa cresceu mais rápido do que conseguiu se organizar por dentro</li><li>Sua empresa de tecnologia vende para outras empresas e fatura entre R$ 1 milhão e R$ 50 milhões por ano</li><li>Você está disposto a mudar jeito de trabalhar e papéis para sair do meio de tudo</li></ul>
</div>
<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
<div style={{ border: "1px solid #DDD7C8", borderRadius: "14px", padding: "32px", display: "flex", flexDirection: "column", gap: "14px" }}><h3 className="t" style={{ margin: "0", fontSize: "24px", fontWeight: "800", color: "#5A6275" }}>Ainda não é o momento se</h3><ul style={{ margin: "0", paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "10px", color: "#3A4152" }}><li>A empresa está bem no começo e fatura menos de R$ 1 milhão por ano</li><li>Você procura uma solução de prateleira que resolva tudo em poucas semanas</li></ul></div>
<div style={{ background: "#0B1020", color: "#E8ECF6", borderRadius: "14px", padding: "28px 32px", display: "flex", flexDirection: "column", gap: "10px" }}><h3 className="t" style={{ margin: "0", fontSize: "21px", fontWeight: "800", color: "#FFE27A" }}>O que eu não faço</h3><p style={{ margin: "0", fontSize: "17px" }}>Não vendo no seu lugar, não viro gerente temporário e não assumo áreas da sua empresa. Também não prometo número de faturamento. O que eu garanto é método e acompanhamento até a nova rotina andar sozinha.</p></div>
</div>
</div>
</div>
</section>

{/* SOBRE */}
<section id="sobre" style={{ background: "#F2EEE4", color: "#0B1020", padding: "100px clamp(20px, 4vw, 40px)" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(440px, 100%), 1fr))", gap: "60px", alignItems: "start" }}>
<img src={fotoSobre} alt="Daniel Sinenberg sentado à mesa, perto de uma janela" style={{ width: "100%", aspectRatio: "4 / 4.6", objectFit: "cover", objectPosition: "38% 50%", borderRadius: "14px" }} />
<div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
<h2 className="t" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(36px, 4.2vw, 56px)", lineHeight: "1.02", letterSpacing: "-0.035em" }}>Quem está do outro lado da mesa</h2>
<p style={{ margin: "0", color: "#3A4152" }}>Sou Daniel Sinenberg. Comecei a trabalhar aos 17 anos e passei mais de 20 em empresas como Vivo, Fast Shop, Linx e Stone. Trabalhei com estratégia, marketing, produto e novos negócios, sempre com cliente e meta na mesa. Aprendi cedo que estratégia que não vira venda não sai do papel.</p>
<p style={{ margin: "0", color: "#3A4152" }}>Em 2025 abri a Sinenberg Consulting para levar esse jeito de trabalhar a empresas de tecnologia que cresceram e agora precisam de estrutura para o próximo passo.</p>
<p className="t" style={{ margin: "8px 0 0", fontSize: "23px", fontWeight: "800", letterSpacing: "-0.015em" }}>Algumas coisas que eu <span className="mk">já</span> fiz</p>
<div style={{ display: "flex", flexDirection: "column", borderTop: "2px solid #0B1020" }}>
<div style={{ display: "flex", gap: "18px", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid #DDD7C8" }}><span className="t" style={{ fontSize: "30px", fontWeight: "800", color: "#2450FF", minWidth: "150px", letterSpacing: "-0.03em" }}>R$ 50 mi</span><span style={{ fontSize: "16px" }}>em negócios conduzidos pela Stone com Shell, Ipiranga, BR e OXXO</span></div>
<div style={{ display: "flex", gap: "18px", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid #DDD7C8" }}><span className="t" style={{ fontSize: "30px", fontWeight: "800", color: "#2450FF", minWidth: "150px", letterSpacing: "-0.03em" }}>300%</span><span style={{ fontSize: "16px" }}>de retorno em mais de 150 ações de marketing na Linx</span></div>
<div style={{ display: "flex", gap: "18px", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid #DDD7C8" }}><span className="t" style={{ fontSize: "30px", fontWeight: "800", color: "#2450FF", minWidth: "150px", letterSpacing: "-0.03em" }}>55 → 70%</span><span style={{ fontSize: "16px" }}>de retenção de clientes de pequenas e médias empresas na Vivo</span></div>
<div style={{ display: "flex", gap: "18px", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid #DDD7C8" }}><span className="t" style={{ fontSize: "30px", fontWeight: "800", color: "#2450FF", minWidth: "150px", letterSpacing: "-0.03em" }}>600 lojas</span><span style={{ fontSize: "16px" }}>na chegada da OXXO ao Brasil pela Linx, com cerca de R$ 300 mil por mês em receita recorrente</span></div>
<div style={{ display: "flex", gap: "18px", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid #DDD7C8" }}><span className="t" style={{ fontSize: "30px", fontWeight: "800", color: "#FF6A2B", minWidth: "150px", letterSpacing: "-0.03em" }}>50+</span><span style={{ fontSize: "16px" }}>startups mentoradas na Estácio e na Wyden. Metade das categorias do Startup Experience foi vencida por times que passaram pela minha mentoria.</span></div>
</div>
<p style={{ margin: "6px 0 0", fontSize: "15px", color: "#5A6275" }}>Marketing pelo Mackenzie e MBA em Gestão de Tecnologia pela FIA.</p>
</div>
</div>
</section>

{/* EM ACAO */}
<section id="acao" style={{ background: "#0B1020", padding: "100px clamp(20px, 4vw, 40px)" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap" }}><h2 className="t" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(44px, 6.2vw, 92px)", lineHeight: "0.92", letterSpacing: "-0.045em", color: "#FFFFFF" }}>Em ação</h2><p style={{ margin: "0", maxWidth: "440px", color: "#C3CBE0" }}>Já levei essa conversa para o palco do Sebrae, para um podcast da Estácio e para a sala de aula.</p></div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))", gap: "16px" }}>
<article style={{ background: "#161C30", borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column" }}><img src={fotoQr} alt="Daniel no palco da Feira do Empreendedor, com a plateia fotografando o QR code do material" style={{ width: "100%", aspectRatio: "16 / 10", objectFit: "cover", display: "block" }} /><div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "8px", flex: "1" }}><span style={{ fontSize: "14px", color: "#FFE27A" }}>Palestra · Sebrae-SP 2026</span><h3 className="t" style={{ margin: "0", fontSize: "24px", fontWeight: "800", color: "#FFFFFF" }}>Evidência vence carisma</h3><p style={{ margin: "0", fontSize: "16px", color: "#C3CBE0", flex: "1" }}>Feira do Empreendedor. Sala cheia, gente de pé do lado de fora e um pitch de 40 segundos montado ao vivo.</p><a href="/sebrae" style={{ fontWeight: "600", fontSize: "16px" }}>Ver o material da palestra</a></div></article>
<article style={{ background: "#161C30", borderRadius: "14px", overflow: "hidden", display: "flex", flexDirection: "column" }}><img src={fotoPodcast} alt="Daniel gravando o podcast Você é Seu Negócio, da Estácio" style={{ width: "100%", aspectRatio: "16 / 10", objectFit: "cover", display: "block" }} /><div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: "8px", flex: "1" }}><span style={{ fontSize: "14px", color: "#FFE27A" }}>Podcast · Estácio</span><h3 className="t" style={{ margin: "0", fontSize: "24px", fontWeight: "800", color: "#FFFFFF" }}>Você é Seu Negócio</h3><p style={{ margin: "0", fontSize: "16px", color: "#C3CBE0", flex: "1" }}>Posicionamento, nicho e vendas em empresas de tecnologia.</p><a href="https://www.youtube.com/watch?v=ReIgJhQc6ew&amp;t=1591s" style={{ fontWeight: "600", fontSize: "16px" }}>Assistir no YouTube</a></div></article>
<article style={{ background: "#2450FF", borderRadius: "14px", padding: "28px", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "24px", color: "#FFFFFF" }}><div><span className="t" style={{ display: "block", fontSize: "clamp(96px, 9vw, 132px)", fontWeight: "800", lineHeight: "0.88", letterSpacing: "-0.06em" }}>50+</span><span className="m" style={{ display: "block", fontSize: "26px", fontWeight: "600", color: "#FFE27A" }}>startups mentoradas</span></div><div style={{ display: "flex", flexDirection: "column", gap: "8px" }}><span style={{ fontSize: "14px", color: "#DCE4FF" }}>Mentoria · Estácio e Wyden</span><h3 className="t" style={{ margin: "0", fontSize: "24px", fontWeight: "800" }}>Startup Experience</h3><p style={{ margin: "0", fontSize: "16px", color: "#E4E9FF" }}>Análise de mercado, posicionamento e pitch, em programas de empreendedorismo do grupo Yduqs.</p></div></article>
</div>
<div style={{ display: "flex", alignItems: "center", gap: "18px", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,.16)", paddingTop: "28px" }}><p className="t" style={{ margin: "0", fontSize: "22px", fontWeight: "600", color: "#FFFFFF" }}>Quer levar essa conversa para o seu evento ou para o seu time?</p><a className="btn" href="https://wa.me/5511984083610?text=Oi%2C%20Daniel.%20Vim%20pelo%20site%20e%20quero%20falar%20sobre%20uma%20palestra." style={{ background: "#FFFDF8", color: "#0B1020", padding: "12px 20px", borderRadius: "8px", fontWeight: "600", textDecoration: "none" }} target="_blank" rel="noopener">Falar sobre palestra</a></div>
</div>
</section>

{/* DEPOIMENTOS */}
<section style={{ background: "#FFFDF8", color: "#0B1020", padding: "100px clamp(20px, 4vw, 40px)" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "40px" }}>
<h2 className="t" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(38px, 4.4vw, 60px)", lineHeight: "1", letterSpacing: "-0.035em" }}>Quem trabalhou comigo</h2>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(480px, 100%), 1fr))", gap: "0 48px" }}>
<figure style={{ margin: "0", padding: "28px 0", borderTop: "1px solid #DDD7C8", display: "flex", flexDirection: "column", gap: "14px" }}><blockquote style={{ margin: "0", fontSize: "18px", color: "#22293A" }}>Daniel é o tipo de profissional que faz a diferença: propositivo e honesto nas relações comerciais. Contar com um parceiro como ele é sinônimo de confiança, agilidade e construção de valor mútuo.</blockquote><figcaption style={{ fontSize: "15px" }}><strong className="t" style={{ fontSize: "17px" }}>Alexandre Fernandes</strong><br /><span style={{ color: "#5A6275" }}>Gerente de Negócios · Vibra Energia/BR Mania</span></figcaption></figure>
<figure style={{ margin: "0", padding: "28px 0", borderTop: "1px solid #DDD7C8", display: "flex", flexDirection: "column", gap: "14px" }}><blockquote style={{ margin: "0", fontSize: "18px", color: "#22293A" }}>Daniel participou ativamente de grandes projetos na Linx, como a chegada da OXXO ao Brasil. Seu olhar atento aos movimentos do mercado fez com que se antecipasse em diversas frentes. Atuou muito além das especificações do seu cargo, extremamente competente e comprometido.</blockquote><figcaption style={{ fontSize: "15px" }}><strong className="t" style={{ fontSize: "17px" }}>Rodrigo Oliveira</strong><br /><span style={{ color: "#5A6275" }}>Product Marketing Manager · Linx</span></figcaption></figure>
<figure style={{ margin: "0", padding: "28px 0", borderTop: "1px solid #DDD7C8", display: "flex", flexDirection: "column", gap: "14px" }}><blockquote style={{ margin: "0", fontSize: "18px", color: "#22293A" }}>Daniel liderou a gestão de relacionamento com stakeholders-chave em distribuidoras de combustíveis, conectando demandas de clientes a toda a cadeia de produtos. Demonstra entendimento estratégico, antecipação de movimentos de mercado e habilidade para articular acordos entre múltiplas partes.</blockquote><figcaption style={{ fontSize: "15px" }}><strong className="t" style={{ fontSize: "17px" }}>Maurício Tripodoro</strong><br /><span style={{ color: "#5A6275" }}>IT &amp; Project Management · Linx/Stone</span></figcaption></figure>
<figure style={{ margin: "0", padding: "28px 0", borderTop: "1px solid #DDD7C8", display: "flex", flexDirection: "column", gap: "14px" }}><blockquote style={{ margin: "0", fontSize: "18px", color: "#22293A" }}>É um profissional focado, dedicado a sua carteira de clientes, preocupado em criar uma relação ganha-ganha e com ótima relação interpessoal. Trabalhar com pessoas que acreditam no poder do time é essencial hoje em dia.</blockquote><figcaption style={{ fontSize: "15px" }}><strong className="t" style={{ fontSize: "17px" }}>Fabiana Guiachetto</strong><br /><span style={{ color: "#5A6275" }}>Head de Growth &amp; Canais · Totvs</span></figcaption></figure>
</div>
</div>
</section>

{/* FAQ */}
<section style={{ background: "#F2EEE4", color: "#0B1020", padding: "100px clamp(20px, 4vw, 40px)" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "flex-start" }}>
<div style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: "12px" }}><h2 className="t" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(38px, 4.4vw, 60px)", lineHeight: "1", letterSpacing: "-0.035em" }}>Perguntas diretas</h2><p className="m" style={{ margin: "0", fontSize: "26px", fontWeight: "600", color: "#2450FF" }}>e respostas sem enrolação</p></div>
<div className="faq" style={{ flex: "999 1 560px", minWidth: "0", background: "#FFFDF8", border: "1px solid #DDD7C8", borderRadius: "14px", padding: "4px 28px" }}>
<details open style={{ borderBottom: "1px solid #E8E4DA", padding: "18px 0" }}><summary style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center" }}><span className="t" style={{ fontSize: "20px", fontWeight: "800" }}>Para que tipo de empresa faz sentido?</span><span className="pl" aria-hidden="true" style={{ fontSize: "26px", color: "#2450FF", lineHeight: "1" }}>+</span></summary><p style={{ margin: "10px 0 0", fontSize: "17px", color: "#3A4152" }}>Empresas de tecnologia que vendem para outras empresas, faturam entre R$ 1 milhão e R$ 50 milhões por ano e sentem que o jeito atual de crescer não aguenta o próximo degrau.</p></details>
<details style={{ borderBottom: "1px solid #E8E4DA", padding: "18px 0" }}><summary style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center" }}><span className="t" style={{ fontSize: "20px", fontWeight: "800" }}>Quanto custa?</span><span className="pl" aria-hidden="true" style={{ fontSize: "26px", color: "#2450FF", lineHeight: "1" }}>+</span></summary><p style={{ margin: "10px 0 0", fontSize: "17px", color: "#3A4152" }}>O Sprint de Direção tem escopo, prazo e preço fechados, e você sabe desde o início quanto vai investir e o que vai receber. Apresento o valor depois da conversa de 30 minutos, quando entendo o tamanho do desafio.</p></details>
<details style={{ borderBottom: "1px solid #E8E4DA", padding: "18px 0" }}><summary style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center" }}><span className="t" style={{ fontSize: "20px", fontWeight: "800" }}>Por que não contratar um gerente para isso?</span><span className="pl" aria-hidden="true" style={{ fontSize: "26px", color: "#2450FF", lineHeight: "1" }}>+</span></summary><p style={{ margin: "10px 0 0", fontSize: "17px", color: "#3A4152" }}>Pode ser que, lá na frente, contratar seja o caminho certo, e o Sprint ajuda a definir qual perfil faz sentido. Contratar antes de ter o método costuma colocar mais um custo fixo na folha, com encargos, para alguém que vai chegar e ainda precisar descobrir por onde começar.</p></details>
<details style={{ borderBottom: "1px solid #E8E4DA", padding: "18px 0" }}><summary style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center" }}><span className="t" style={{ fontSize: "20px", fontWeight: "800" }}>Você vende no lugar do meu time?</span><span className="pl" aria-hidden="true" style={{ fontSize: "26px", color: "#2450FF", lineHeight: "1" }}>+</span></summary><p style={{ margin: "10px 0 0", fontSize: "17px", color: "#3A4152" }}>Não. Eu desenho o jeito de trabalhar, coloco em prática junto com vocês e treino o time. Quem executa é a sua equipe, comigo por perto.</p></details>
<details style={{ borderBottom: "1px solid #E8E4DA", padding: "18px 0" }}><summary style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center" }}><span className="t" style={{ fontSize: "20px", fontWeight: "800" }}>Quanto do meu tempo vai tomar?</span><span className="pl" aria-hidden="true" style={{ fontSize: "26px", color: "#2450FF", lineHeight: "1" }}>+</span></summary><p style={{ margin: "10px 0 0", fontSize: "17px", color: "#3A4152" }}>Uma conversa a cada 15 dias com você, e uma pessoa do time falando comigo toda semana. A ideia é tirar coisa da sua agenda.</p></details>
<details style={{ borderBottom: "1px solid #E8E4DA", padding: "18px 0" }}><summary style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center" }}><span className="t" style={{ fontSize: "20px", fontWeight: "800" }}>Em quanto tempo aparece resultado?</span><span className="pl" aria-hidden="true" style={{ fontSize: "26px", color: "#2450FF", lineHeight: "1" }}>+</span></summary><p style={{ margin: "10px 0 0", fontSize: "17px", color: "#3A4152" }}>As primeiras decisões saem logo nas primeiras semanas, a começar pelo que parar de fazer. A nova rotina de vendas funcionando, com números confiáveis, leva as 12 semanas.</p></details>
<details style={{ borderBottom: "1px solid #E8E4DA", padding: "18px 0" }}><summary style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center" }}><span className="t" style={{ fontSize: "20px", fontWeight: "800" }}>É presencial ou online?</span><span className="pl" aria-hidden="true" style={{ fontSize: "26px", color: "#2450FF", lineHeight: "1" }}>+</span></summary><p style={{ margin: "10px 0 0", fontSize: "17px", color: "#3A4152" }}>Trabalho de forma híbrida. Parte dos encontros é online e parte é presencial, e o formato a gente combina com cada empresa.</p></details>
<details style={{ borderBottom: "1px solid #E8E4DA", padding: "18px 0" }}><summary style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center" }}><span className="t" style={{ fontSize: "20px", fontWeight: "800" }}>Atende empresas que não são de tecnologia?</span><span className="pl" aria-hidden="true" style={{ fontSize: "26px", color: "#2450FF", lineHeight: "1" }}>+</span></summary><p style={{ margin: "10px 0 0", fontSize: "17px", color: "#3A4152" }}>O método foi pensado para empresas de tecnologia que vendem para outras empresas. Se o seu negócio é de outro setor e funciona parecido, vale a conversa.</p></details>
<details style={{ padding: "18px 0" }}><summary style={{ display: "flex", justifyContent: "space-between", gap: "16px", alignItems: "center" }}><span className="t" style={{ fontSize: "20px", fontWeight: "800" }}>Qual a diferença entre o diagnóstico do site e o Sprint?</span><span className="pl" aria-hidden="true" style={{ fontSize: "26px", color: "#2450FF", lineHeight: "1" }}>+</span></summary><p style={{ margin: "10px 0 0", fontSize: "17px", color: "#3A4152" }}>O diagnóstico é uma leitura rápida, que você faz sozinho em 3 minutos. O Sprint é o trabalho completo, feito junto com você e a sua liderança.</p></details>
</div>
</div>
</section>

{/* FECHO */}
<section id="contato" style={{ background: "#0B1020", padding: "120px clamp(20px, 4vw, 40px)", position: "relative", overflow: "hidden" }}>
<svg width="420" height="448" viewBox="0 0 60 64" aria-hidden="true" style={{ position: "absolute", left: "-110px", bottom: "-120px", opacity: ".08" }}><polyline points="54,14 30,3 6,14 6,30" fill="none" stroke="#2EC4FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></polyline><polyline points="6,50 30,61 54,50 54,34" fill="none" stroke="#2EC4FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"></polyline></svg>
<div style={{ position: "relative", maxWidth: "940px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "22px" }}>
<h2 className="t" style={{ margin: "0", fontWeight: "800", fontSize: "clamp(44px, 6.4vw, 92px)", lineHeight: "0.96", letterSpacing: "-0.045em", color: "#FFFFFF", textWrap: "balance" }}>Me conta o momento da sua <span className="mk">empresa.</span></h2>
<p style={{ margin: "0", fontSize: "20px", color: "#C3CBE0", maxWidth: "580px" }}>Em 30 minutos dá para saber se faz sentido trabalharmos juntos. Sem apresentação longa e sem compromisso.</p>
<div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
<a className="btn" href="https://wa.me/5511984083610?text=Oi%2C%20Daniel.%20Vim%20pelo%20site%20e%20quero%20marcar%20a%20conversa%20de%2030%20minutos." style={{ background: "#2EC4FF", color: "#0B1020", padding: "18px 30px", borderRadius: "8px", fontWeight: "600", textDecoration: "none" }} target="_blank" rel="noopener">Marcar conversa de 30 min</a>
<a className="btn" href="/versao-nova/diagnostico" style={{ color: "#FFFFFF", padding: "17px 28px", borderRadius: "8px", fontWeight: "600", textDecoration: "none", border: "1.5px solid rgba(255,255,255,.35)" }}>Prefiro fazer o diagnóstico antes</a>
</div>
</div>
</section>

{/* RODAPE */}
<footer style={{ background: "#060A18", color: "#9FB0D6", padding: "56px clamp(20px, 4vw, 40px) 32px", fontSize: "15px" }}>
<div style={{ maxWidth: "1240px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px" }}>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(220px, 100%), 1fr))", gap: "28px" }}>
<div style={{ display: "flex", flexDirection: "column", gap: "10px" }}><div style={{ display: "flex", gap: "10px", alignItems: "center" }}><img src={icone} alt="" style={{ width: "30px", height: "30px" }} /><span className="t" style={{ fontWeight: "800", fontSize: "18px", color: "#FFFFFF" }}>Sinenberg Consulting</span></div><span>Crescimento estruturado para empresas de tecnologia.</span></div>
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ color: "#FFE27A" }}>Contato</span><a href="https://wa.me/5511984083610" style={{ color: "#E8ECF6" }}>WhatsApp (11) 98408-3610</a><a href="mailto:daniel@sinenberg.com.br" style={{ color: "#E8ECF6" }}>daniel@sinenberg.com.br</a></div>
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ color: "#FFE27A" }}>Redes</span><a href="https://www.linkedin.com/in/danielsinenberg/" style={{ color: "#E8ECF6" }}>LinkedIn</a><a href="https://www.instagram.com/danielsinenberg" style={{ color: "#E8ECF6" }}>Instagram @danielsinenberg</a></div>
<div style={{ display: "flex", flexDirection: "column", gap: "6px" }}><span style={{ color: "#FFE27A" }}>Páginas</span><a href="/versao-nova/diagnostico" style={{ color: "#E8ECF6" }}>Diagnóstico rápido</a><a href="/sebrae" style={{ color: "#E8ECF6" }}>Material da palestra</a><a href="/clinicas" style={{ color: "#9FB0D6" }}>Clínicas</a></div>
</div>
<div style={{ display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,.1)", paddingTop: "20px", fontSize: "13px" }}><span>© 2026 Sinenberg Consulting · <a href="/privacidade" style={{ color: "#9FB0D6" }}>Política de Privacidade</a></span><span>Fontes: Apfel Grotezk (Luigi Gorlero) e Ronzino, da Collletttivo, licença OFL. Shantell Sans, licença OFL.</span></div>
</div>
</footer>

</div>
    </div>
  );
}
