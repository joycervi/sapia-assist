import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { User, Mail, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { AuthCard } from "@/components/AuthCard";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { MSG, emailRegex, isStrongPassword, mapAuthError } from "@/lib/auth-messages";

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

type Values = { nome: string; email: string; senha: string; confirmar: string };

function validate(values: Values): Errors {
  const errors: Errors = {};
  const nome = values.nome.trim();
  if (nome.length < 3 || nome.length > 100) {
    errors.nome = "O nome completo deve ter entre 3 e 100 caracteres.";
  }
  if (!emailRegex.test(values.email.trim())) {
    errors.email = "Informe um e-mail válido, por exemplo: nome@escritorio.com.br";
  }
  if (!isStrongPassword(values.senha)) {
    errors.senha =
      "A senha precisa ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.";
  }
  if (values.confirmar !== values.senha || !values.confirmar) {
    errors.confirmar = "As senhas não coincidem.";
  }
  return errors;
}

function CadastroPage() {
  const [values, setValues] = useState<Values>({
    nome: "",
    email: "",
    senha: "",
    confirmar: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (key: keyof Values, value: string) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (touched[key] || Object.keys(errors).length) setErrors(validate(next));
  };

  const onBlur = (key: keyof Values) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ nome: true, email: true, senha: true, confirmar: true });

    if (Object.keys(found).length) {
      const emptyField = !values.nome || !values.email || !values.senha || !values.confirmar;
      if (emptyField) toast.error(MSG.campos_invalidos);
      else if (found.senha) toast.error(MSG.senha_fraca);
      else toast.error(MSG.dados_incompletos);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: values.email.trim(),
      password: values.senha,
      options: {
        emailRedirectTo: `${window.location.origin}/login`,
        data: { full_name: values.nome.trim() },
      },
    });
    setLoading(false);

    if (error) {
      toast.error(mapAuthError(error.message));
      return;
    }

    // Identidade vazia indica e-mail já cadastrado (resposta neutra do backend).
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      toast.error(MSG.email_duplicado);
      return;
    }

    setSent(true);
    toast.success(MSG.email_enviado);
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
            autoComplete="name"
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
            autoComplete="email"
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
            autoComplete="new-password"
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
            autoComplete="new-password"
            value={values.confirmar}
            onChange={(e) => update("confirmar", e.target.value)}
            onBlur={() => onBlur("confirmar")}
            error={showError("confirmar")}
          />

          {sent ? (
            <p className="rounded-lg bg-accent px-3 py-2 text-sm font-medium text-accent-foreground">
              Enviamos um e-mail de confirmação. Confirme seu endereço para ativar a conta.
            </p>
          ) : null}

          <Button type="submit" disabled={loading} className="h-11 w-full rounded-lg shadow-sm">
            {loading ? "Enviando..." : "Finalizar"}
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
