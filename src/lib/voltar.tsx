import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

// Páginas para as quais faz sentido voltar. Qualquer outra coisa cai na home.
export type Destino = "/" | "/links" | "/clinicas" | "/diagnostico";
const VALIDOS: Destino[] = ["/", "/links", "/clinicas", "/diagnostico"];
const CHAVE = "sc_pagina_anterior";

function normalizar(caminho: string | null | undefined): Destino | null {
  if (!caminho) return null;
  const limpo = caminho.length > 1 ? caminho.replace(/\/+$/, "") : caminho;
  return (VALIDOS as string[]).includes(limpo) ? (limpo as Destino) : null;
}

/** Guarda a página de onde a pessoa veio, a cada navegação. Usar uma vez, no root. */
export function useRastrearOrigem() {
  const caminho = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    try {
      const atual = sessionStorage.getItem(CHAVE + "_atual");
      if (atual && atual !== caminho) sessionStorage.setItem(CHAVE, atual);
      sessionStorage.setItem(CHAVE + "_atual", caminho);
    } catch {
      /* navegação privada: cai no fallback */
    }
  }, [caminho]);
}

/** Para onde o botão "Voltar" deve levar. */
export function useDestinoVoltar(): Destino {
  const [destino, setDestino] = useState<Destino>("/");
  useEffect(() => {
    let achado: Destino | null = null;
    try {
      achado = normalizar(sessionStorage.getItem(CHAVE));
    } catch {
      /* ignora */
    }
    if (!achado && document.referrer) {
      try {
        const url = new URL(document.referrer);
        if (url.origin === window.location.origin) achado = normalizar(url.pathname);
      } catch {
        /* ignora */
      }
    }
    setDestino(achado ?? "/");
  }, []);
  return destino;
}
