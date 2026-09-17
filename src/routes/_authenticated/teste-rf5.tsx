import { createFileRoute } from "@tanstack/react-router";
import { BeneficioIdentificado } from "@/components/BeneficioIdentificado";

export const Route = createFileRoute("/_authenticated/teste-rf5")({
  component: TesteRF5,
});

function TesteRF5() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Teste RF5</h1>

        <p className="mt-2 text-muted-foreground">
          Tela temporaria para validacao da identificacao e correcao manual
          do tipo de beneficio.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6 shadow-sm">
        <BeneficioIdentificado
          idDadosExtraidos={1}
          beneficio="APOSENTADORIA_IDADE"
        />
      </div>

      <div className="mt-6 rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">
          Beneficio utilizado neste teste: APOSENTADORIA_IDADE
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          Esta pagina e temporaria e sera utilizada apenas para testes do RF5.
        </p>
      </div>
    </div>
  );
}