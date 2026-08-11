import { createFileRoute } from "@tanstack/react-router";
import { FileUp } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/_authenticated/enviar-arquivos")({
  head: () => ({
    meta: [
      { title: "Enviar arquivos | SAPIA" },
      {
        name: "description",
        content: "Envie os documentos do processo previdenciário para gerar a petição inicial.",
      },
      { property: "og:title", content: "Enviar arquivos | SAPIA" },
      {
        property: "og:description",
        content: "Envie documentos previdenciários e gere sua petição inicial no SAPIA.",
      },
    ],
  }),
  component: EnviarArquivos,
});

function EnviarArquivos() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Enviar arquivos</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Faça login para enviar os documentos do seu cliente.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <FileUp className="size-6 text-primary" aria-hidden />
          <p className="mt-3 text-sm text-muted-foreground">
            Área de upload disponível em breve.
          </p>
        </div>
      </main>
    </div>
  );
}
