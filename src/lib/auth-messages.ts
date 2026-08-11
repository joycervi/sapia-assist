export const MSG = {
  campos_invalidos:
    "Campos obrigatórios não preenchidos. Verifique os dados e tente novamente.",
  falha_autenticacao:
    "E-mail e/ou senha incorretos. Tente novamente ou recupere sua senha.",
  conta_bloqueada:
    "Sua conta foi temporariamente bloqueada. Tente novamente em 15 minutos.",
  email_nao_cadastrado: "Este endereço de e-mail não está cadastrado no sistema.",
  email_enviado: "E-mail enviado com sucesso! Verifique sua caixa de entrada.",
  senha_fraca:
    "A senha deve conter no mínimo 8 caracteres, letras maiúsculas, minúsculas e números.",
  dados_incompletos:
    "Alguns campos obrigatórios não foram identificados. Complete-os manualmente antes de prosseguir.",
  email_duplicado: "Este e-mail já está cadastrado. Faça login ou recupere sua senha.",
  email_nao_confirmado:
    "Confirme seu e-mail antes de entrar. Verifique sua caixa de entrada.",
} as const;

/** Traduz erros do backend de autenticação para as mensagens padronizadas. */
export function mapAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("rate limit") || m.includes("too many") || m.includes("locked")) {
    return MSG.conta_bloqueada;
  }
  if (m.includes("email not confirmed") || m.includes("not confirmed")) {
    return MSG.email_nao_confirmado;
  }
  if (m.includes("already registered") || m.includes("already been registered") || m.includes("user already")) {
    return MSG.email_duplicado;
  }
  if (m.includes("invalid login credentials") || m.includes("invalid credentials")) {
    return MSG.falha_autenticacao;
  }
  if (m.includes("password")) return MSG.senha_fraca;
  return MSG.falha_autenticacao;
}

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isStrongPassword(senha: string) {
  return (
    senha.length >= 8 &&
    /[A-Z]/.test(senha) &&
    /[a-z]/.test(senha) &&
    /[0-9]/.test(senha) &&
    /[^A-Za-z0-9]/.test(senha)
  );
}
