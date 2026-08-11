import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/integrations/supabase/client";

const navLinkClass =
  "text-sm font-medium text-white/70 transition-colors hover:text-white";

export function Navbar() {
  const { session, loading } = useSession();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    toast.success("Você saiu da sua conta.");
    navigate({ to: "/login", replace: true });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-navy backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="text-xl font-bold tracking-[0.18em] text-white">
          SAPIA
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/enviar-arquivos"
            className={navLinkClass}
            activeProps={{ className: "text-white" }}
          >
            Enviar arquivos
          </Link>
          <Link
            to="/historico"
            className={navLinkClass}
            activeProps={{ className: "text-white" }}
          >
            Histórico de Arquivos
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {loading ? null : session ? (
            <>
              <span className="hidden max-w-[180px] truncate text-sm text-white/70 sm:inline">
                {(session.user.user_metadata?.["full_name"] as string | undefined) ??
                  session.user.email}
              </span>
              <Button
                size="sm"
                variant="secondary"
                className="rounded-lg"
                onClick={handleSignOut}
              >
                Sair
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/cadastro"
                className="text-sm font-semibold text-white underline-offset-4 hover:underline"
                activeProps={{ className: "underline" }}
              >
                Cadastre-se
              </Link>
              <Button asChild size="sm" className="rounded-lg shadow-sm">
                <Link to="/login">Entrar</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
