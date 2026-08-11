import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { AuthCard } from "@/components/AuthCard";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login | SAPIA" },
      {
        name: "description",
        content: "Acesse sua conta SAPIA para gerar petições iniciais previdenciárias.",
      },
      { property: "og:title", content: "Login | SAPIA" },
      {
        property: "og:description",
        content: "Acesse sua conta SAPIA para gerar petições iniciais previdenciárias.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [values, setValues] = useState({ email: "", senha: "" });
  const [errors, setErrors] = useState<{ email?: string; senha?: string }>({});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { email?: string; senha?: string } = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
      next.email = "Informe um e-mail válido.";
    }
    if (!values.senha) next.senha = "Informe sua senha.";
    setErrors(next);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AuthCard title="Login" subtitle="Bem-vindo de volta ao SAPIA.">
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <FormField
            id="email"
            label="E-mail"
            icon={Mail}
            type="email"
            placeholder="E-mail"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            error={errors.email}
          />
          <FormField
            id="senha"
            label="Senha"
            icon={Lock}
            type="password"
            placeholder="Senha"
            value={values.senha}
            onChange={(e) => setValues({ ...values, senha: e.target.value })}
            error={errors.senha}
          />

          <div className="text-center">
            <Link
              to="/esqueci-a-senha"
              className="text-sm font-semibold text-primary hover:underline"
            >
              Esqueci a senha
            </Link>
          </div>

          <Button type="submit" className="h-11 w-full rounded-lg shadow-sm">
            Entrar
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Não tem conta?{" "}
            <Link to="/cadastro" className="font-semibold text-primary hover:underline">
              Cadastre-se
            </Link>
          </p>
        </form>
      </AuthCard>
    </div>
  );
}
