import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { AuthCard } from "@/components/AuthCard";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Cadastre-se | SAPIA" },
      {
        name: "description",
        content:
          "Crie sua conta no SAPIA e automatize a elaboração de petições iniciais previdenciárias.",
      },
      { property: "og:title", content: "Cadastre-se | SAPIA" },
      {
        property: "og:description",
        content: "Crie sua conta no SAPIA e automatize suas petições iniciais previdenciárias.",
      },
    ],
  }),
  component: CadastroPage,
});

type Errors = Partial<Record<"nome" | "email" | "senha" | "confirmar", string>>;

function validate(values: Record<string, string>): Errors {
  const errors: Errors = {};
  const nome = values.nome.trim();
  if (nome.length < 3 || nome.length > 100) {
    errors.nome = "O nome completo deve ter entre 3 e 100 caracteres.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Informe um e-mail válido, por exemplo: nome@escritorio.com.br";
  }
  const senha = values.senha;
  if (
    senha.length < 8 ||
    !/[A-Z]/.test(senha) ||
    !/[a-z]/.test(senha) ||
    !/[0-9]/.test(senha) ||
    !/[^A-Za-z0-9]/.test(senha)
  ) {
    errors.senha =
      "A senha precisa ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.";
  }
  if (values.confirmar !== senha || !values.confirmar) {
    errors.confirmar = "As senhas não coincidem.";
  }
  return errors;
}

function CadastroPage() {
  const [values, setValues] = useState({ nome: "", email: "", senha: "", confirmar: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [success, setSuccess] = useState(false);

  const update = (key: string, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key] || Object.keys(errors).length) setErrors(validate(next));
    setSuccess(false);
  };

  const onBlur = (key: string) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ nome: true, email: true, senha: true, confirmar: true });
    setSuccess(Object.keys(found).length === 0);
  };

  const showError = (key: keyof Errors) => (touched[key] ? errors[key] : undefined);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AuthCard title="Cadastre-se" subtitle="Crie sua conta para começar a usar o SAPIA.">
        <form onSubmit={onSubmit} noValidate className="space-y-5">
          <FormField
            id="nome"
            label="Nome completo"
            icon={User}
            placeholder="Nome completo"
            value={values.nome}
            onChange={(e) => update("nome", e.target.value)}
            onBlur={() => onBlur("nome")}
            error={showError("nome")}
          />
          <FormField
            id="email"
            label="E-mail"
            icon={Mail}
            type="email"
            placeholder="E-mail"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            onBlur={() => onBlur("email")}
            error={showError("email")}
          />
          <FormField
            id="senha"
            label="Senha"
            icon={Lock}
            type="password"
            placeholder="Senha"
            value={values.senha}
            onChange={(e) => update("senha", e.target.value)}
            onBlur={() => onBlur("senha")}
            error={showError("senha")}
          />
          <FormField
            id="confirmar"
            label="Confirmar senha"
            icon={ShieldCheck}
            type="password"
            placeholder="Confirmar senha"
            value={values.confirmar}
            onChange={(e) => update("confirmar", e.target.value)}
            onBlur={() => onBlur("confirmar")}
            error={showError("confirmar")}
          />

          {success ? (
            <p className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground">
              Cadastro validado com sucesso.
            </p>
          ) : null}

          <Button type="submit" className="h-11 w-full rounded-lg shadow-sm">
            Finalizar
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Já tem conta?{" "}
            <Link to="/login" className="font-semibold text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </form>
      </AuthCard>
    </div>
  );
}
