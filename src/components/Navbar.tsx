import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const navLinkClass =
  "text-sm font-medium text-foreground/70 transition-colors hover:text-primary";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/70 bg-background/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="text-xl font-bold tracking-[0.18em] text-foreground">
          SAPIA
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/enviar-arquivos"
            className={navLinkClass}
            activeProps={{ className: "text-primary" }}
          >
            Enviar arquivos
          </Link>
          <Link
            to="/historico"
            className={navLinkClass}
            activeProps={{ className: "text-primary" }}
          >
            Histórico de Arquivos
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            to="/cadastro"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
            activeProps={{ className: "underline" }}
          >
            Cadastre-se
          </Link>
          <Button asChild size="sm" className="rounded-lg shadow-sm">
            <Link to="/login">Entrar</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
