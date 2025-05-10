
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';
import { CompanyInfoData } from '@/types/companyInfo';
import { useIsMobile } from '@/hooks/use-mobile';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

interface SwotCompanyInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CompanyInfoData) => void;
}

// Create validation schema
const companyInfoSchema = z.object({
  industry: z.string().min(1, { message: "Campo obrigatório" }),
  mainProducts: z.string().min(1, { message: "Campo obrigatório" }),
  targetAudience: z.string().min(1, { message: "Campo obrigatório" }),
  mainChallenges: z.string().optional(),
  competitors: z.string().optional(),
  goals: z.string().optional(),
});

const SwotCompanyInfoDialog: React.FC<SwotCompanyInfoDialogProps> = ({ 
  open, 
  onOpenChange,
  onSubmit
}) => {
  const form = useForm<CompanyInfoData>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      industry: '',
      mainProducts: '',
      targetAudience: '',
      mainChallenges: '',
      competitors: '',
      goals: ''
    }
  });
  
  const isMobile = useIsMobile();
  
  const handleFormSubmit = (data: CompanyInfoData) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Informações da sua empresa</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 mt-4 pb-6">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Setor/Indústria</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Ex: Tecnologia, Varejo, Saúde, etc."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="mainProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Principais produtos/serviços</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva seus principais produtos ou serviços"
                      {...field}
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Público-alvo</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Quem são seus clientes ideais?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="competitors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Principais concorrentes</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Quem são seus concorrentes diretos?"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="mainChallenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Principais desafios</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Quais os principais desafios do seu negócio atualmente?"
                      {...field}
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Objetivos de negócio</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Quais seus principais objetivos para os próximos 12 meses?"
                      {...field}
                      rows={2}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className={`flex justify-end ${isMobile ? 'mt-6' : 'pt-4'}`}>
              <Button type="submit">Gerar Plano Personalizado</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SwotCompanyInfoDialog;
