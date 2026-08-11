import { createFileRoute } from "@tanstack/react-router";
import { History } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/_authenticated/historico")({
  head: () => ({
    meta: [
      { title: "Histórico de Arquivos | SAPIA" },
      {
        name: "description",
        content: "Consulte o histórico de arquivos enviados e petições geradas no SAPIA.",
      },
      { property: "og:title", content: "Histórico de Arquivos | SAPIA" },
      {
        property: "og:description",
        content: "Consulte o histórico de envios e petições geradas no SAPIA.",
      },
    ],
  }),
  component: Historico,
});

function Historico() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Histórico de Arquivos
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Seus envios anteriores aparecerão aqui após o login.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-border bg-card p-12 text-center">
          <History className="size-6 text-primary" aria-hidden />
          <p className="mt-3 text-sm text-muted-foreground">Nenhum arquivo enviado ainda.</p>
        </div>
      </main>
    </div>
  );
}
