export const TIPOS_BENEFICIO = [
  "APOSENTADORIA_IDADE",
  "APOSENTADORIA_TEMPO_CONTRIBUICAO",
  "APOSENTADORIA_INCAPACIDADE",
  "AUXILIO_INCAPACIDADE_TEMPORARIA",
  "AUXILIO_ACIDENTE",
  "PENSAO_MORTE",
  "SALARIO_MATERNIDADE",
  "BPC_IDOSO",
  "BPC_DEFICIENCIA",
  "OUTRO",
  "NAO_IDENTIFICADO",
] as const;

export type TipoBeneficio = (typeof TIPOS_BENEFICIO)[number];
export function identificarBeneficio(texto: string): TipoBeneficio {
  const textoNormalizado = texto.toUpperCase();

  if (textoNormalizado.includes("APOSENTADORIA POR IDADE")) {
    return "APOSENTADORIA_IDADE";
  }

  if (
  textoNormalizado.includes("APOSENTADORIA POR TEMPO DE CONTRIBUICAO") ||
  textoNormalizado.includes("APOSENTADORIA POR TEMPO DE CONTRIBUIÇÃO")
) {
  return "APOSENTADORIA_TEMPO_CONTRIBUICAO";
}

if (
  textoNormalizado.includes("APOSENTADORIA POR INCAPACIDADE PERMANENTE") ||
  textoNormalizado.includes("APOSENTADORIA POR INVALIDEZ")
) {
  return "APOSENTADORIA_INCAPACIDADE";
}

if (
  textoNormalizado.includes("AUXILIO POR INCAPACIDADE TEMPORARIA") ||
  textoNormalizado.includes("AUXÍLIO POR INCAPACIDADE TEMPORÁRIA") ||
  textoNormalizado.includes("AUXILIO-DOENCA") ||
  textoNormalizado.includes("AUXÍLIO-DOENÇA")
) {
  return "AUXILIO_INCAPACIDADE_TEMPORARIA";
}

if (
  textoNormalizado.includes("AUXILIO-ACIDENTE") ||
  textoNormalizado.includes("AUXÍLIO-ACIDENTE")
) {
  return "AUXILIO_ACIDENTE";
}

if (textoNormalizado.includes("PENSAO POR MORTE") ||
    textoNormalizado.includes("PENSÃO POR MORTE")) {
  return "PENSAO_MORTE";
}

if (
  textoNormalizado.includes("SALARIO-MATERNIDADE") ||
  textoNormalizado.includes("SALÁRIO-MATERNIDADE") ||
  textoNormalizado.includes("SALARIO MATERNIDADE") ||
  textoNormalizado.includes("SALÁRIO MATERNIDADE")
) {
  return "SALARIO_MATERNIDADE";
}

if (
  textoNormalizado.includes("BPC IDOSO") ||
  textoNormalizado.includes("BENEFICIO ASSISTENCIAL AO IDOSO") ||
  textoNormalizado.includes("BENEFÍCIO ASSISTENCIAL AO IDOSO")
) {
  return "BPC_IDOSO";
}

if (
  textoNormalizado.includes("BPC DEFICIENCIA") ||
  textoNormalizado.includes("BPC DEFICIÊNCIA") ||
  textoNormalizado.includes("BENEFICIO ASSISTENCIAL A PESSOA COM DEFICIENCIA") ||
  textoNormalizado.includes("BENEFÍCIO ASSISTENCIAL À PESSOA COM DEFICIÊNCIA")
) {
  return "BPC_DEFICIENCIA";
}

  return "NAO_IDENTIFICADO";
}