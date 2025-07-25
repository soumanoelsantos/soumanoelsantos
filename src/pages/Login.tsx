
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowRight, LogIn, Mail, Lock, Eye, EyeOff, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

// Form schema validation using Zod
const formSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "A senha é obrigatória" }),
});

type LoginFormValues = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isTryingLogin, setIsTryingLogin] = useState(false);

  // Redirect authenticated users directly to /membros
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/membros');
    }
  }, [isAuthenticated, navigate]);

  // Initialize form with react-hook-form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Form submission handler - always redirect to /membros
  const onSubmit = async (values: LoginFormValues) => {
    try {
      setLoginError(null);
      setIsTryingLogin(true);
      
      console.log("Login attempted with:", values.email);
      
      // Always redirect to /membros after successful login
      await login(values.email, values.password, '/membros');
      
      toast({
        title: "Login bem-sucedido",
        description: "Redirecionando para a área de membros...",
      });
      
    } catch (error: any) {
      console.error("Login error:", error);
      
      setLoginError(error.message || "Credenciais inválidas. Verifique seu email e senha.");
    } finally {
      setIsTryingLogin(false);
    }
  };

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="min-h-screen bg-dark-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-xl bg-dark-background/50 border-dark-primary/20">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold text-dark-text">Login</CardTitle>
          <CardDescription className="text-dark-text/80">
            Entre na sua conta para acessar a área de membros
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loginError && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Erro no login</AlertTitle>
              <AlertDescription>
                {loginError}
              </AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                          disabled={isTryingLogin || isLoading}
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
                          disabled={isTryingLogin || isLoading}
                        />
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          className="absolute right-1 top-1 h-8 w-8 p-0" 
                          onClick={toggleShowPassword}
                          disabled={isTryingLogin || isLoading}
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
              <Button 
                type="submit" 
                className="w-full bg-dark-primary hover:bg-dark-primary/90 text-dark-background"
                disabled={isTryingLogin || isLoading}
              >
                {isTryingLogin || isLoading ? (
                  "Autenticando..."
                ) : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Entrar
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center">
          <div className="text-sm text-dark-text/70">
            Não tem uma conta?{" "}
            <Link to="/cadastro" className="text-dark-primary hover:underline">
              Cadastre-se
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

export default Login;
