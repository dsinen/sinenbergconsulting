import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import logoDark from "@/assets/logo-dark.png";

const CTA =
  "https://wa.me/5511984083610?text=Ol%C3%A1%20Daniel%2C%20gostaria%20de%20conhecer%20mais%20sobre%20a%20consultoria.%20Aguardo%20seu%20contato%2C%20por%20favor.";

const links = [
  { href: "#metodo", label: "Método" },
  { href: "#servicos", label: "Serviços" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#sobre", label: "Sobre" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
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

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "nav-scrolled" : "bg-[#0B2A5B]/70 backdrop-blur-sm"
      }`}
      style={{ borderBottom: "1px solid rgba(255,255,255,0.18)" }}
    >
      <div className="mx-auto max-w-[1100px] px-6 h-[80px] md:h-[140px] flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <img src={logoDark} alt="Sinenberg Consulting" className="h-14 md:h-32 w-auto" />
        </a>

        <nav className="hidden md:flex items-center gap-6">
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
            Fale comigo
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

      {open && typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 flex flex-col p-6 md:hidden"
            style={{
              backgroundColor: "#0B2A5B",
              opacity: 1,
              zIndex: 9999,
            }}
          >
            <div className="flex items-center justify-between">
              <img src={logoDark} alt="Sinenberg" className="h-12" />
              <button
                aria-label="Fechar"
                onClick={() => setOpen(false)}
                className="text-white p-2 min-w-12 min-h-12 flex items-center justify-center"
              >
                <Icon icon="solar:close-circle-outline" width="32" height="32" />
              </button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-6">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-serif py-2 px-4"
                  style={{ color: "#FFFFFF", fontSize: "20px", lineHeight: 1.4 }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href={CTA}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-full bg-[#2EC4FF] text-[#0B2A5B] font-semibold px-8 py-3"
                style={{ fontSize: "18px" }}
              >
                Fale comigo
              </a>
            </nav>
          </div>,
          document.body,
        )}
    </header>
  );
}
