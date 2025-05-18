
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome precisa ter no mínimo 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone inválido" }),
  challenge: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface LeadCaptureFormProps {
  source?: string;
  buttonText?: React.ReactNode;
  buttonClassName?: string;
  showChallengeField?: boolean;
  onSuccess?: () => void;
}

const LeadCaptureForm = ({ 
  source = "website", 
  buttonText = "Agendar reunião gratuita", 
  buttonClassName = "",
  showChallengeField = false,
  onSuccess 
}: LeadCaptureFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      challenge: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Enviando lead para o CRM:", {
        name: values.name,
        email: values.email,
        phone: values.phone,
        challenge: values.challenge,
        source: source,
        status: "Novo"
      });
      
      // Insert lead with the default status "Novo"
      const { error, data } = await supabase.from("leads").insert({
        name: values.name,
        email: values.email,
        phone: values.phone,
        challenge: values.challenge || "",
        source: source,
        status: "Novo", // Explicitly set status to "Novo"
        notes: `Lead capturado via ${source}${values.challenge ? `. Desafio: ${values.challenge}` : ''}`
      }).select();
      
      if (error) {
        console.error("Error inserting lead:", error);
        throw error;
      }
      
      console.log("Lead cadastrado com sucesso:", data);
      
      toast({
        title: "Solicitação enviada!",
        description: "Redirecionando para agendar sua consulta...",
      });
      
      form.reset();
      setIsOpen(false);
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Redirect to Google Calendar scheduling page
      setTimeout(() => {
        window.location.href = "https://calendar.app.google/24nP9V5SPd4gLF3v5";
      }, 1500); // Short delay for the toast to be visible
      
    } catch (error) {
      console.error("Error submitting lead:", error);
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description: "Não foi possível enviar sua solicitação. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={buttonClassName}>{buttonText}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[calc(100%-32px)] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">
            Agendar reunião gratuita
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 py-2 pb-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="seu@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Challenge field is now hidden by default regardless of the prop */}
            
            <Button 
              type="submit" 
              className="w-full bg-dark-primary hover:bg-dark-primary/90 text-black mt-2" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar"
              )}
            </Button>
          </form>
        </Form>
        
        <p className="text-sm text-center text-gray-500 mt-2">
          Seus dados estão seguros e não serão compartilhados com terceiros.
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureForm;
