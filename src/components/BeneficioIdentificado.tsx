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
    </div>
  );
}