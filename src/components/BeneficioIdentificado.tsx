import { TIPOS_BENEFICIO } from "@/lib/beneficio.functions";

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
  return (
    <div>
      <p>Beneficio identificado:</p>
      <strong>{beneficio}</strong>
      <Select defaultValue={beneficio}>
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
    </div>
  );
}