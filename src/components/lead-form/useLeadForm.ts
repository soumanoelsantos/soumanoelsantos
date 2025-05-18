
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { leadFormSchema, LeadFormValues } from "./LeadFormSchema";

interface UseLeadFormProps {
  source: string;
  onSuccess?: () => void;
}

export const useLeadForm = ({ source, onSuccess }: UseLeadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        source: source,
        status: "Novo"
      });
      
      // Insert lead without the challenge field that's causing the error
      const { error, data } = await supabase.from("leads").insert({
        name: values.name,
        email: values.email,
        phone: values.phone,
        source: source,
        status: "Novo", // Explicitly set status to "Novo"
        notes: `Lead capturado via ${source}${values.challenge ? `. Desafio: ${values.challenge}` : ''}`
      }).select();
      
      if (error) {
        console.error("Error inserting lead:", error);
        throw error;
      }
      
      console.log("Lead cadastrado com sucesso:", data);
      
      form.reset();
      
      if (onSuccess) {
        onSuccess();
      }
      
      // Redirect to Google Calendar scheduling page without showing toast
      setTimeout(() => {
        window.location.href = "https://calendar.app.google/24nP9V5SPd4gLF3v5";
      }, 500); // Shorter delay since we're not showing toast
      
    } catch (error) {
      console.error("Error submitting lead:", error);
      // Removed error toast
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
