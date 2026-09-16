import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const salvarBeneficioInput = z.object({
  id_documento_inss: z.number(),
  beneficio_identificado: z.string(),
  nivel_confianca: z.number(),
});

const corrigirBeneficioInput = z.object({
  id_dados_extraidos: z.number(),
  tipo_original: z.string(),
  tipo_corrigido: z.string(),
});

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
export type ResultadoIdentificacaoBeneficio = {
  tipo: TipoBeneficio;
  confianca: number;
};

export type CorrecaoManualBeneficio = {
  tipoOriginal: TipoBeneficio;
  tipoCorrigido: TipoBeneficio;
  corrigidoManualmente: boolean;
};

export type FeedbackIdentificacaoBeneficio = {
  tipoIdentificado: TipoBeneficio;
  tipoCorreto: TipoBeneficio;
  houveErroIdentificacao: boolean;
};

export function tipoBeneficioValido(valor: string): valor is TipoBeneficio {
  return TIPOS_BENEFICIO.includes(valor as TipoBeneficio);
}

export function identificarBeneficio(texto: string): TipoBeneficio {
  const textoNormalizado = texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
  if (textoNormalizado.includes("APOSENTADORIA POR IDADE")) {
    return "APOSENTADORIA_IDADE";
  }

  if (textoNormalizado.includes("APOSENTADORIA POR TEMPO DE CONTRIBUICAO")) {
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
    textoNormalizado.includes("AUXILIO-DOENCA")
  ) {
    return "AUXILIO_INCAPACIDADE_TEMPORARIA";
  }

  if (textoNormalizado.includes("AUXILIO-ACIDENTE")) {
    return "AUXILIO_ACIDENTE";
  }

  if (textoNormalizado.includes("PENSAO POR MORTE")) {
    return "PENSAO_MORTE";
  }

  if (
    textoNormalizado.includes("SALARIO-MATERNIDADE") ||
    textoNormalizado.includes("SALARIO MATERNIDADE")
  ) {
    return "SALARIO_MATERNIDADE";
  }

  if (
    textoNormalizado.includes("BPC IDOSO") ||
    textoNormalizado.includes("BENEFICIO ASSISTENCIAL AO IDOSO")
  ) {
    return "BPC_IDOSO";
  }

  if (
    textoNormalizado.includes("BPC DEFICIENCIA") ||
    textoNormalizado.includes("BENEFICIO ASSISTENCIAL A PESSOA COM DEFICIENCIA")
  ) {
    return "BPC_DEFICIENCIA";
  }

  return "NAO_IDENTIFICADO";
}

export function identificarBeneficioComConfianca(
  texto: string,
): ResultadoIdentificacaoBeneficio {
  const tipo = identificarBeneficio(texto);

  if (tipo === "NAO_IDENTIFICADO") {
    return {
      tipo,
      confianca: 0,
    };
  }

  return {
    tipo,
    confianca: 0.95,
  };
}

export function corrigirBeneficio(
  tipoOriginal: TipoBeneficio,
  tipoCorrigido: TipoBeneficio,
): CorrecaoManualBeneficio {
  return {
    tipoOriginal,
    tipoCorrigido,
    corrigidoManualmente: tipoOriginal !== tipoCorrigido,
  };
}

export function gerarFeedbackIdentificacao(
  tipoIdentificado: TipoBeneficio,
  tipoCorreto: TipoBeneficio,
): FeedbackIdentificacaoBeneficio {
  return {
    tipoIdentificado,
    tipoCorreto,
    houveErroIdentificacao: tipoIdentificado !== tipoCorreto,
  };
}


export const salvarBeneficioIdentificado = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => salvarBeneficioInput.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const { error } = await supabaseAdmin
      .from("dados_extraidos")
      .insert({
        id_documento_inss: data.id_documento_inss,
        beneficio_identificado: data.beneficio_identificado,
        nivel_confianca: data.nivel_confianca,
        data_analise_ia: new Date().toISOString(),
      });

    if (error) {
      throw new Error(`Erro ao salvar beneficio identificado: ${error.message}`);
    }

    return {
      sucesso: true,
      dados: data,
    };
  });

export const salvarCorrecaoManualBeneficio = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => corrigirBeneficioInput.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const { error } = await supabaseAdmin
      .from("dados_extraidos")
      .update({
        beneficio_identificado: data.tipo_corrigido,
      })
      .eq("id_dados_extraidos", data.id_dados_extraidos);

    if (error) {
      throw new Error(`Erro ao corrigir beneficio identificado: ${error.message}`);
    }

    return {
      sucesso: true,
      dados: data,
    };
  });













