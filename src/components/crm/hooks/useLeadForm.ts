
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFormSchema, LeadFormValues, defaultLeadFormValues } from "../schemas/leadFormSchema";

interface UseLeadFormProps {
  onSubmit: (values: LeadFormValues) => Promise<boolean | void>;
  defaultValues?: LeadFormValues;
  isOpen: boolean;
}

export const useLeadForm = ({ onSubmit, defaultValues = defaultLeadFormValues, isOpen }: UseLeadFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Create form with default values
  const form = useForm<LeadFormValues>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: defaultValues
  });

  // Reset form when dialog opens or defaultValues change
  useEffect(() => {
    if (isOpen) {
      console.log("Dialog opened, resetting form with values:", defaultValues);
      form.reset(defaultValues);
    }
  }, [isOpen, defaultValues, form]);

  const handleSubmit = async (values: LeadFormValues) => {
    console.log("Form submitted with values:", values);
    setIsSubmitting(true);
    try {
      await onSubmit(values);
      console.log("Form submission completed successfully");
    } catch (error) {
      console.error("Error in form submission:", error);
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
