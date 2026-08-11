import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { AuthCard } from "@/components/AuthCard";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/esqueci-a-senha")({
  head: () => ({
    meta: [
      { title: "Esqueci a senha | SAPIA" },
      {
        name: "description",
        content: "Recupere o acesso à sua conta SAPIA informando seu e-mail cadastrado.",
      },
      { property: "og:title", content: "Esqueci a senha | SAPIA" },
      {
        property: "og:description",
        content: "Recupere o acesso à sua conta SAPIA informando seu e-mail cadastrado.",
      },
    ],
  }),
  component: EsqueciSenha,
});

function EsqueciSenha() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AuthCard
        title="Esqueci a senha"
        subtitle="Informe seu e-mail para receber as instruções de recuperação."
      >
        <form
          noValidate
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
            setError(valid ? undefined : "Informe um e-mail válido.");
            setSent(valid);
          }}
        >
          <FormField
            id="email"
            label="E-mail"
            icon={Mail}
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error}
          />
          {sent ? (
            <p className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground">
              Se este e-mail estiver cadastrado, enviaremos as instruções em instantes.
            </p>
          ) : null}
          <Button type="submit" className="h-11 w-full rounded-lg shadow-sm">
            Enviar instruções
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Voltar ao login
            </Link>
          </p>
        </form>
      </AuthCard>
    </div>
  );
}
