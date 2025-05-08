
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

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome precisa ter no mínimo 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone inválido" }),
});

type FormValues = z.infer<typeof formSchema>;

interface LeadCaptureFormProps {
  source?: string;
  buttonText?: React.ReactNode;
  buttonClassName?: string;
  onSuccess?: () => void;
}

const LeadCaptureForm = ({ 
  source = "website", 
  buttonText = "Agendar diagnóstico gratuito", 
  buttonClassName = "",
  onSuccess 
}: LeadCaptureFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      console.log("Enviando lead para o CRM:", {
        name: values.name,
        email: values.email,
        phone: values.phone,
        source: source,
        status: "Novo"
      });
      
      // Insert lead with the default status "Novo"
      const { error, data } = await supabase.from("leads").insert({
        name: values.name,
        email: values.email,
        phone: values.phone,
        source: source,
        status: "Novo", // Explicitly set status to "Novo"
        notes: `Lead capturado via ${source}`
      }).select();
      
      if (error) {
        console.error("Error inserting lead:", error);
        throw error;
      }
      
      console.log("Lead cadastrado com sucesso:", data);
      
      toast({
        title: "Solicitação enviada!",
        description: "Entraremos em contato em breve.",
      });
      
      form.reset();
      setIsOpen(false);
      
      if (onSuccess) {
        onSuccess();
      }
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">Agendar diagnóstico gratuito</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
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
            
            <Button type="submit" className="w-full bg-dark-primary hover:bg-dark-primary/90 text-black" disabled={isSubmitting}>
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
