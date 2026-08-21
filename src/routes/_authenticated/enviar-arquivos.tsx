import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { FileUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { processarDocumento } from "@/lib/documentos.functions";

export const Route = createFileRoute("/_authenticated/enviar-arquivos")({
  head: () => ({
    meta: [
      { title: "Enviar arquivos | SAPIA" },
      {
        name: "description",
        content: "Envie os documentos do processo previdenciário para gerar a petição inicial.",
      },
      { property: "og:title", content: "Enviar arquivos | SAPIA" },
      {
        property: "og:description",
        content: "Envie documentos previdenciários e gere sua petição inicial no SAPIA.",
      },
    ],
  }),
  component: EnviarArquivos,
});

function EnviarArquivos() {
  const [enviando, setEnviando] = useState(false);
  const [resultado, setResultado] = useState<string | null>(null);
  const chamarProcessarDocumento = useServerFn(processarDocumento);

  async function handleFile(file: File) {
    setEnviando(true);
    setResultado(null);
    try {
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        toast.error("Sessão expirada. Entre novamente para enviar arquivos.");
        return;
      }

      const caminho = `${user.id}/${Date.now()}-${file.name}`;
      const { error: storageError } = await supabase.storage
        .from("documentos-inss")
        .upload(caminho, file);
      if (storageError) throw storageError;

      const { data: documento, error: insertError } = await supabase
        .from("documento_inss")
        .insert({
          id_usuario: user.id,
          nome_arquivo: file.name,
          caminho_armazenamento: caminho,
          tamanho_bytes: file.size,
          status_upload: "concluido",
        })
        .select("id_documento_inss")
        .single();
      if (insertError) throw insertError;

      toast.success("Documento enviado com sucesso!");

      // Documento registrado: aciona o processamento server-side
      try {
        const resposta = await chamarProcessarDocumento({
          data: { id_documento_inss: String(documento.id_documento_inss) },
        });
        if (resposta.sucesso) {
          setResultado(
            `Processamento iniciado para o documento #${resposta.id_documento_inss}.`,
          );
          toast.success("Processamento iniciado.");
        } else {
          toast.error("Não foi possível iniciar o processamento do documento.");
        }
      } catch {
        toast.error("Falha ao iniciar o processamento do documento.");
      }
    } catch {
      toast.error("Não foi possível enviar o documento. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Enviar arquivos</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Selecione o documento do INSS para enviar e processar.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card p-12 text-center">
          <FileUp className="size-6 text-primary" aria-hidden />
          <p className="mt-3 text-sm text-muted-foreground">
            Arquivos PDF do processo previdenciário.
          </p>
          <input
            id="documento"
            type="file"
            accept="application/pdf"
            className="sr-only"
            disabled={enviando}
            onChange={(e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (file) void handleFile(file);
            }}
          />
          <Button asChild={!enviando} className="mt-6" disabled={enviando}>
            {enviando ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="size-4 animate-spin" aria-hidden />
                Enviando...
              </span>
            ) : (
              <label htmlFor="documento" className="cursor-pointer">
                Selecionar arquivo
              </label>
            )}
          </Button>
          {resultado && <p className="mt-4 text-sm text-foreground">{resultado}</p>}
        </div>
      </main>
    </div>
  );
}
