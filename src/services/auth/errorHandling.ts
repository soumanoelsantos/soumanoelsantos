
import { AuthError } from '@supabase/supabase-js';

/**
 * Map generic error messages to more user-friendly messages
 */
export const getAuthErrorMessage = (error: AuthError | Error): string => {
  const errorMessage = error.message || 'An unknown error occurred';
  
  // Map Supabase auth error messages to more user-friendly messages
  switch (errorMessage) {
    case 'Invalid login credentials':
      return 'Email ou senha incorretos. Por favor, verifique suas credenciais.';
    case 'Email not confirmed':
      return 'Por favor, confirme seu email antes de fazer login.';
    case 'Password should be at least 6 characters':
      return 'A senha deve ter pelo menos 6 caracteres.';
    case 'User already registered':
      return 'Este email já está registrado. Tente fazer login ou recuperar sua senha.';
    case 'Email rate limit exceeded':
      return 'Muitas tentativas. Por favor, aguarde alguns minutos antes de tentar novamente.';
    default:
      return errorMessage;
  }
};
