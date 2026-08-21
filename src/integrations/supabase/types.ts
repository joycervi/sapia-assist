export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      dado_extraido: {
        Row: {
          campo: string
          confianca: number | null
          id_dado_extraido: number
          id_dados_extraidos: number
          valor: string | null
        }
        Insert: {
          campo: string
          confianca?: number | null
          id_dado_extraido?: number
          id_dados_extraidos: number
          valor?: string | null
        }
        Update: {
          campo?: string
          confianca?: number | null
          id_dado_extraido?: number
          id_dados_extraidos?: number
          valor?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_dado_dados_extraidos"
            columns: ["id_dados_extraidos"]
            isOneToOne: false
            referencedRelation: "dados_extraidos"
            referencedColumns: ["id_dados_extraidos"]
          },
        ]
      }
      dados_extraidos: {
        Row: {
          beneficio_identificado: string | null
          data_analise_ia: string | null
          id_dados_extraidos: number
          id_documento_inss: number
          nivel_confianca: number | null
        }
        Insert: {
          beneficio_identificado?: string | null
          data_analise_ia?: string | null
          id_dados_extraidos?: number
          id_documento_inss: number
          nivel_confianca?: number | null
        }
        Update: {
          beneficio_identificado?: string | null
          data_analise_ia?: string | null
          id_dados_extraidos?: number
          id_documento_inss?: number
          nivel_confianca?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_dados_documento"
            columns: ["id_documento_inss"]
            isOneToOne: false
            referencedRelation: "documento_inss"
            referencedColumns: ["id_documento_inss"]
          },
        ]
      }
      documento_inss: {
        Row: {
          caminho_armazenamento: string
          data_upload: string
          id_documento_inss: number
          id_usuario: string
          nome_arquivo: string
          status_upload: string
          tamanho_bytes: number
        }
        Insert: {
          caminho_armazenamento: string
          data_upload?: string
          id_documento_inss?: number
          id_usuario: string
          nome_arquivo: string
          status_upload: string
          tamanho_bytes: number
        }
        Update: {
          caminho_armazenamento?: string
          data_upload?: string
          id_documento_inss?: number
          id_usuario?: string
          nome_arquivo?: string
          status_upload?: string
          tamanho_bytes?: number
        }
        Relationships: []
      }
      processamento_documento: {
        Row: {
          confianca_ocr: number | null
          data_fim: string | null
          data_inicio: string | null
          id_documento_inss: number
          id_processamento: number
          mensagem_erro: string | null
          status_processamento: string
        }
        Insert: {
          confianca_ocr?: number | null
          data_fim?: string | null
          data_inicio?: string | null
          id_documento_inss: number
          id_processamento?: number
          mensagem_erro?: string | null
          status_processamento?: string
        }
        Update: {
          confianca_ocr?: number | null
          data_fim?: string | null
          data_inicio?: string | null
          id_documento_inss?: number
          id_processamento?: number
          mensagem_erro?: string | null
          status_processamento?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_documento_inss"
            columns: ["id_documento_inss"]
            isOneToOne: true
            referencedRelation: "documento_inss"
            referencedColumns: ["id_documento_inss"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
