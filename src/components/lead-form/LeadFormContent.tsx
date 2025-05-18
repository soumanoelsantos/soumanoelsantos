
import React from "react";
import { Form } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { LeadFormValues } from "./LeadFormSchema";
import LeadFormFields from "./LeadFormFields";
import LeadFormActions from "./LeadFormActions";

interface LeadFormContentProps {
  form: UseFormReturn<LeadFormValues>;
  onSubmit: (values: LeadFormValues) => Promise<void>;
  isSubmitting: boolean;
}

const LeadFormContent = ({ form, onSubmit, isSubmitting }: LeadFormContentProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 py-2 pb-6">
        <LeadFormFields form={form} />
        <LeadFormActions isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default LeadFormContent;
