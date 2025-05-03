
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, UserPlus, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

// Form schema validation using Zod
const formSchema = z.object({
  name: z.string().min(3, { message: "Nome precisa ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha precisa ter pelo menos 6 caracteres" }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Você precisa aceitar os termos de uso"
  })
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não conferem",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof formSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);

  // Redirect authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/membros');
    }
  }, [isAuthenticated, navigate]);

  // Initialize form with react-hook-form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
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
        
        navigate('/membros');
      } catch (loginError: any) {
        console.error("Erro ao fazer login automático:", loginError);
        toast({
          title: "Login necessário",
          description: "Por favor, faça login com suas novas credenciais.",
        });
        navigate('/login');
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
    <div className="min-h-screen bg-dark-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-xl bg-dark-background/50 border-dark-primary/20">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-dark-text">Cadastre-se</CardTitle>
          <CardDescription className="text-dark-text/80">
            Crie sua conta para acessar a área de membros
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-dark-text text-sm">
                        Eu aceito os termos de uso e políticas de privacidade
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-dark-primary hover:bg-dark-primary/90 text-dark-background"
                disabled={isLoading}
              >
                {isLoading ? (
                  "Processando..."
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Criar conta
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center">
          <div className="text-sm text-dark-text/70">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-dark-primary hover:underline">
              Faça login
            </Link>
          </div>
          <Link to="/" className="text-sm text-dark-primary hover:underline flex items-center justify-center mt-2">
            <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
            Voltar para o início
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
