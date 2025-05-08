
import { z } from "zod";

export const leadFormSchema = z.object({
  name: z.string().min(2, { message: "Nome precisa ter no mínimo 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().min(10, { message: "Telefone inválido" }),
  notes: z.string().optional(),
  status: z.string(),
});

export type LeadFormValues = z.infer<typeof leadFormSchema>;

export const defaultLeadFormValues: LeadFormValues = {
  name: "",
  email: "",
  phone: "",
  notes: "",
  status: "Novo",
};
