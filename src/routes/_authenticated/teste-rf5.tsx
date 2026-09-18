import { createFileRoute } from "@tanstack/react-router";
import { BeneficioIdentificado } from "@/components/BeneficioIdentificado";
import { identificarBeneficioDoRF4 } from "@/lib/beneficio.functions";

export const Route = createFileRoute("/_authenticated/teste-rf5")({
  component: TesteRF5,
});

function TesteRF5() {
    const resultadoRF4 = {
    extracted_text:
      "INSTITUTO NACIONAL DO SEGURO SOCIAL. BENEFICIO: APOSENTADORIA POR IDADE.",
    page_count: 2,
    pages_without_text: [],
  };

  const resultadoRF5 = identificarBeneficioDoRF4(resultadoRF4);
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
  beneficio={resultadoRF5.tipo}
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