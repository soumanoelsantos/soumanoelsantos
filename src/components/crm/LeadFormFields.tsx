import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SecureTextInput from "@/components/security/SecureTextInput";
import { isValidEmail, isValidPhone } from "@/utils/security/inputValidation";
import { UseFormReturn } from "react-hook-form";
import { LeadFormValues } from "./schemas/leadFormSchema";

interface LeadFormFieldsProps {
  form: UseFormReturn<LeadFormValues>;
  statuses: string[];
}

const LeadFormFields: React.FC<LeadFormFieldsProps> = ({ form, statuses }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome *</FormLabel>
            <FormControl>
              <SecureTextInput
                value={field.value}
                onChange={field.onChange}
                placeholder="Nome do lead"
                maxLength={100}
                rateLimitKey="lead_name_input"
              />
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
            <FormLabel>Email *</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="email"
                placeholder="email@exemplo.com"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                  // Validate email format
                  if (value && !isValidEmail(value)) {
                    form.setError("email", { 
                      type: "manual", 
                      message: "Formato de email inválido" 
                    });
                  } else {
                    form.clearErrors("email");
                  }
                }}
              />
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
            <FormLabel>Telefone *</FormLabel>
            <FormControl>
              <Input
                {...field}
                type="tel"
                placeholder="(11) 99999-9999"
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value);
                  // Validate phone format
                  if (value && !isValidPhone(value)) {
                    form.setError("phone", { 
                      type: "manual", 
                      message: "Formato de telefone inválido" 
                    });
                  } else {
                    form.clearErrors("phone");
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Status</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um status" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Observações</FormLabel>
            <FormControl>
              <SecureTextInput
                value={field.value}
                onChange={field.onChange}
                placeholder="Observações sobre o lead..."
                maxLength={500}
                multiline
                rateLimitKey="lead_notes_input"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default LeadFormFields;
