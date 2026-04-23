import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import logoDark from "@/assets/logo-dark.png";

const CTA = "https://wa.link/qijedd";

const links = [
  { href: "#metodo", label: "Método" },
  { href: "#servicos", label: "Serviços" },
  { href: "#sobre", label: "Sobre" },
  { href: "#depoimentos", label: "Depoimentos" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-scrolled" : "bg-[#0B2A5B]/70 backdrop-blur-sm"
      }`}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.18)" }}
    >
      <div className="mx-auto max-w-[1100px] px-6 h-[104px] md:h-[140px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src={logoDark} alt="Sinenberg Consulting" className="h-20 md:h-32 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-white/90 hover:text-[#2EC4FF] transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={CTA}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#2EC4FF] text-[#0B2A5B] font-semibold text-sm px-5 py-2.5 hover:brightness-110 transition"
          >
            Agendar Sessão
          </a>
        </nav>

        <button
          aria-label="Abrir menu"
          className="md:hidden text-white p-2"
          onClick={() => setOpen(true)}
        >
          <Icon icon="solar:hamburger-menu-outline" width="28" height="28" />
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 bg-[#0B2A5B] flex flex-col p-6 md:hidden">
          <div className="flex items-center justify-between">
            <img src={logoDark} alt="Sinenberg" className="h-12" />
            <button aria-label="Fechar" onClick={() => setOpen(false)} className="text-white p-2">
              <Icon icon="solar:close-circle-outline" width="32" height="32" />
            </button>
          </div>
          <nav className="flex flex-col items-center justify-center flex-1 gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-2xl text-white font-serif"
              >
                {l.label}
              </a>
            ))}
            <a
              href={CTA}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 rounded-full bg-[#2EC4FF] text-[#0B2A5B] font-semibold text-base px-8 py-3"
            >
              Agendar Sessão
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
