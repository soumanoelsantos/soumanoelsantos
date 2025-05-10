
import React from "react";
import { useForm } from "react-hook-form";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ActionButton from "@/components/ui/action-button";
import { Info } from "lucide-react";

interface CompanyInfoFormData {
  industry: string;
  mainProducts: string;
  targetAudience: string;
  mainChallenges: string;
  competitors: string;
  goals: string;
}

interface SwotCompanyInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CompanyInfoFormData) => void;
}

const SwotCompanyInfoDialog: React.FC<SwotCompanyInfoDialogProps> = ({
  open,
  onOpenChange,
  onSubmit
}) => {
  const form = useForm<CompanyInfoFormData>({
    defaultValues: {
      industry: "",
      mainProducts: "",
      targetAudience: "",
      mainChallenges: "",
      competitors: "",
      goals: ""
    }
  });

  const handleSubmit = (data: CompanyInfoFormData) => {
    onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-500" />
            Informações da Empresa
          </DialogTitle>
          <DialogDescription>
            Essas informações nos ajudarão a gerar um plano de ação mais personalizado e eficaz
            para sua empresa. Quanto mais detalhes você fornecer, melhores serão as recomendações.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Em que setor ou indústria sua empresa atua?</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Tecnologia, Saúde, Varejo..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="mainProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quais são seus principais produtos ou serviços?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva brevemente os produtos/serviços que você oferece..." 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="targetAudience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quem é seu público-alvo?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva o perfil dos seus clientes ideais..." 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="mainChallenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quais são os principais desafios ou gargalos do seu negócio?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva os problemas e dificuldades que enfrenta..." 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="competitors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quem são seus principais concorrentes?</FormLabel>
                  <FormControl>
                    <Input placeholder="Liste os principais concorrentes do seu negócio..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="goals"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quais são seus principais objetivos para os próximos 12 meses?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva o que você deseja alcançar..." 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <ActionButton type="submit" variant="secondary">
                Gerar Plano de Ação Personalizado
              </ActionButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SwotCompanyInfoDialog;
