import { useState } from "react";
import {
  TIPOS_BENEFICIO,
  salvarCorrecaoManualBeneficio,
} from "@/lib/beneficio.functions";
import { Button } from "@/components/ui/button";



import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BeneficioIdentificadoProps = {
  idDadosExtraidos: number;
  beneficio: string;
};

export function BeneficioIdentificado({
  idDadosExtraidos,
  beneficio,
}: BeneficioIdentificadoProps) {

    const [beneficioSelecionado, setBeneficioSelecionado] = useState(beneficio);

    const salvarCorrecao = async () => {
  await salvarCorrecaoManualBeneficio({
    data: {
      id_dados_extraidos: idDadosExtraidos,
      tipo_original: beneficio,
      tipo_corrigido: beneficioSelecionado,
    },
  });
};

  return (
    <div>
      <p>Beneficio identificado:</p>
      <strong>{beneficio}</strong>
      <Select
  value={beneficioSelecionado}
  onValueChange={setBeneficioSelecionado}
>
  <SelectTrigger>
    <SelectValue placeholder="Selecione o beneficio" />
  </SelectTrigger>

  <SelectContent>
    {TIPOS_BENEFICIO.map((tipo) => (
      <SelectItem key={tipo} value={tipo}>
        {tipo}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
<Button
  onClick={salvarCorrecao}
  disabled={beneficioSelecionado === beneficio}
>
  Salvar correcao
</Button>
    </div>
  );
}