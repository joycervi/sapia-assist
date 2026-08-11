import { createFileRoute, Link } from "@tanstack/react-router";
import { FileUp, History, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAPIA — Automação de Petição Inicial Previdenciária" },
      {
        name: "description",
        content:
          "SAPIA automatiza a elaboração de petições iniciais para advocacia previdenciária: envie documentos e acompanhe o histórico.",
      },
      { property: "og:title", content: "SAPIA — Automação de Petição Inicial Previdenciária" },
      {
        property: "og:description",
        content:
          "Automatize petições iniciais previdenciárias com envio de arquivos e histórico centralizado.",
      },
    ],
  }),
  component: Index,
});

const features = [
  {
    icon: FileUp,
    title: "Enviar arquivos",
    text: "Faça upload dos documentos do cliente e gere a petição inicial em minutos.",
  },
  {
    icon: History,
    title: "Histórico de Arquivos",
    text: "Acompanhe todos os envios e recupere peças anteriores quando precisar.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança jurídica",
    text: "Fluxo padronizado, com dados tratados de forma sigilosa e organizada.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <section className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Advocacia previdenciária
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Automação de petição inicial, do documento à peça pronta.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            O SAPIA organiza os documentos do seu cliente e acelera a produção de petições
            iniciais previdenciárias com padronização e rastreabilidade.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="h-11 rounded-lg px-6 shadow-sm">
              <Link to="/cadastro">Cadastre-se</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-lg px-6">
              <Link to="/login">Entrar</Link>
            </Button>
          </div>
        </section>

        <section className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, text }) => (
            <article
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-[0_10px_40px_-30px_oklch(0.208_0.042_265.755_/_0.6)]"
            >
              <Icon className="size-5 text-primary" aria-hidden />
              <h2 className="mt-4 text-base font-semibold text-foreground">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
