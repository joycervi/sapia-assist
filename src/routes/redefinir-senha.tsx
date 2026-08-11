import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { AuthCard } from "@/components/AuthCard";
import { FormField } from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { MSG, isStrongPassword, mapAuthError } from "@/lib/auth-messages";

export const Route = createFileRoute("/redefinir-senha")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Redefinir senha | SAPIA" },
      {
        name: "description",
        content: "Defina uma nova senha para sua conta SAPIA com segurança.",
      },
      { property: "og:title", content: "Redefinir senha | SAPIA" },
      {
        property: "og:description",
        content: "Defina uma nova senha para sua conta SAPIA com segurança.",
      },
    ],
  }),
  component: RedefinirSenha,
});

function RedefinirSenha() {
  const navigate = useNavigate();
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [errors, setErrors] = useState<{ senha?: string; confirmar?: string }>({});
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: { senha?: string; confirmar?: string } = {};
    if (!isStrongPassword(senha)) {
      next.senha =
        "A senha precisa ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial.";
    }
    if (confirmar !== senha || !confirmar) next.confirmar = "As senhas não coincidem.";
    setErrors(next);
    if (Object.keys(next).length) {
      toast.error(next.senha ? MSG.senha_fraca : MSG.campos_invalidos);
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: senha });
    setLoading(false);

    if (error) {
      toast.error(mapAuthError(error.message));
      return;
    }
    toast.success("Senha atualizada com sucesso!");
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <AuthCard title="Redefinir senha" subtitle="Escolha uma nova senha para sua conta.">
        <form noValidate className="space-y-5" onSubmit={onSubmit}>
          <FormField
            id="senha"
            label="Nova senha"
            icon={Lock}
            type="password"
            placeholder="Nova senha"
            autoComplete="new-password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            error={errors.senha}
          />
          <FormField
            id="confirmar"
            label="Confirmar nova senha"
            icon={ShieldCheck}
            type="password"
            placeholder="Confirmar nova senha"
            autoComplete="new-password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            error={errors.confirmar}
          />
          <Button type="submit" disabled={loading} className="h-11 w-full rounded-lg shadow-sm">
            {loading ? "Salvando..." : "Salvar nova senha"}
          </Button>
        </form>
      </AuthCard>
    </div>
  );
}
