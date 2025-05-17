
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { RegisterFormSchema, type RegisterFormValues } from "./RegisterFormSchema";

interface RegisterFormProps {
  onSuccess: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  // Initialize form with react-hook-form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Form submission handler
  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setIsLoading(true);
      setRegisterError(null);
      
      // Register user using Supabase Auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.name,
          }
        }
      });
      
      if (signUpError) throw signUpError;
      
      toast({
        title: "Cadastro bem-sucedido",
        description: "Sua conta foi criada com sucesso!",
      });
      
      // Log the user in automatically
      try {
        await login(values.email, values.password, null);
        
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo à área de membros!",
        });
        
        onSuccess();
      } catch (loginError: any) {
        console.error("Erro ao fazer login automático:", loginError);
        toast({
          title: "Login necessário",
          description: "Por favor, faça login com suas novas credenciais.",
        });
        onSuccess();
      }
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      
      let errorMessage = "Não foi possível criar sua conta";
      
      if (error.message === "User already registered") {
        errorMessage = "Este email já está cadastrado. Por favor, tente fazer login.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setRegisterError(errorMessage);
      
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      {registerError && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-500 text-sm">
          {registerError}
        </div>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark-text">Nome completo</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-dark-text/40" />
                    <Input 
                      placeholder="Seu nome completo" 
                      className="pl-10 bg-dark-background border-dark-primary/20 text-dark-text" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark-text">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-dark-text/40" />
                    <Input 
                      placeholder="seu@email.com" 
                      className="pl-10 bg-dark-background border-dark-primary/20 text-dark-text" 
                      {...field} 
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark-text">Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-dark-text/40" />
                    <Input 
                      type={showPassword ? "text" : "password"} 
                      placeholder="********" 
                      className="pl-10 bg-dark-background border-dark-primary/20 text-dark-text" 
                      {...field} 
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-1 top-1 h-8 w-8 p-0" 
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-dark-text/40" />
                      ) : (
                        <Eye className="h-4 w-4 text-dark-text/40" />
                      )}
                      <span className="sr-only">{showPassword ? "Ocultar senha" : "Mostrar senha"}</span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-dark-text">Confirmar senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-dark-text/40" />
                    <Input 
                      type={showConfirmPassword ? "text" : "password"} 
                      placeholder="********" 
                      className="pl-10 bg-dark-background border-dark-primary/20 text-dark-text" 
                      {...field} 
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm" 
                      className="absolute right-1 top-1 h-8 w-8 p-0" 
                      onClick={toggleShowConfirmPassword}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-dark-text/40" />
                      ) : (
                        <Eye className="h-4 w-4 text-dark-text/40" />
                      )}
                      <span className="sr-only">{showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}</span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-dark-primary hover:bg-dark-primary/90 text-dark-background"
            disabled={isLoading}
          >
            {isLoading ? "Processando..." : "Criar conta"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default RegisterForm;
