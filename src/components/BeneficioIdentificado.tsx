import { useState } from "react";
import { TIPOS_BENEFICIO } from "@/lib/beneficio.functions";
import { Button } from "@/components/ui/button";



import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type BeneficioIdentificadoProps = {
  beneficio: string;
};

export function BeneficioIdentificado({
  beneficio,
}: BeneficioIdentificadoProps) {

    const [beneficioSelecionado, setBeneficioSelecionado] = useState(beneficio);

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
<Button disabled={beneficioSelecionado === beneficio}>
  Salvar correcao
</Button>
    </div>
  );
}