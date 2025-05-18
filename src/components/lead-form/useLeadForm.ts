
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { leadFormSchema, LeadFormValues } from "./LeadFormSchema";

interface UseLeadFormProps {
  source: string;
  onSuccess?: () => void;
}

export const useLeadForm = ({ source, onSuccess }: UseLeadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      challenge: "",
    },
  });

  const handleSubmit = async (values: LeadFormValues) => {
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

  return {
    form,
    isSubmitting,
    handleSubmit
  };
};
