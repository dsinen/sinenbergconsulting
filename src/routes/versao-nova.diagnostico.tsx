import { createFileRoute, redirect } from "@tanstack/react-router";

// O diagnóstico novo agora fica em /diagnostico.
export const Route = createFileRoute("/versao-nova/diagnostico")({
  beforeLoad: () => {
    throw redirect({ to: "/diagnostico", statusCode: 301 });
  },
});
