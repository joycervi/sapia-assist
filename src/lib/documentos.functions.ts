import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const processarDocumentoInput = z.object({
  id_documento_inss: z.string().min(1, "id_documento_inss é obrigatório"),
});

export const processarDocumento = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => processarDocumentoInput.parse(data))
  .handler(async ({ data }) => {
    return {
      sucesso: true,
      id_documento_inss: data.id_documento_inss,
    };
  });
