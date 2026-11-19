import { createFileRoute, redirect } from "@tanstack/react-router";

// A versão nova virou a home em 19/11/2026. Quem tiver o link antigo vai para a home.
export const Route = createFileRoute("/versao-nova/")({
  beforeLoad: () => {
    throw redirect({ to: "/", statusCode: 301 });
  },
});
