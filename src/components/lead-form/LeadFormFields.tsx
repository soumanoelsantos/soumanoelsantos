
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LeadFormValues } from "./LeadFormSchema";

interface LeadFormFieldsProps {
  form: UseFormReturn<LeadFormValues>;
}

const LeadFormFields = ({ form }: LeadFormFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel className="text-base">Nome completo</FormLabel>
            <FormControl>
              <Input placeholder="Seu nome" {...field} className="py-2" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem className="mb-4">
            <FormLabel className="text-base">Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="seu@email.com" {...field} className="py-2" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem className="mb-2">
            <FormLabel className="text-base">Telefone</FormLabel>
            <FormControl>
              <Input placeholder="(00) 00000-0000" {...field} className="py-2" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default LeadFormFields;
