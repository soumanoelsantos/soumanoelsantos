
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from 'react-hook-form';
import { CompanyInfoData } from '@/types/companyInfo';
import { useIsMobile } from '@/hooks/use-mobile';

interface SwotCompanyInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CompanyInfoData) => void;
}

const SwotCompanyInfoDialog: React.FC<SwotCompanyInfoDialogProps> = ({ 
  open, 
  onOpenChange,
  onSubmit
}) => {
  const { register, handleSubmit, formState: { errors } } = useForm<CompanyInfoData>({
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Informações da sua empresa</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 mt-4 pb-6">
          <div className="space-y-2">
            <Label htmlFor="industry">Setor/Indústria</Label>
            <Input 
              id="industry"
              placeholder="Ex: Tecnologia, Varejo, Saúde, etc."
              {...register('industry', { required: "Campo obrigatório" })}
            />
            {errors.industry && <p className="text-sm text-red-500">{errors.industry.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mainProducts">Principais produtos/serviços</Label>
            <Textarea 
              id="mainProducts"
              placeholder="Descreva seus principais produtos ou serviços"
              {...register('mainProducts', { required: "Campo obrigatório" })}
              rows={2}
            />
            {errors.mainProducts && <p className="text-sm text-red-500">{errors.mainProducts.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="targetAudience">Público-alvo</Label>
            <Input 
              id="targetAudience"
              placeholder="Quem são seus clientes ideais?"
              {...register('targetAudience', { required: "Campo obrigatório" })}
            />
            {errors.targetAudience && <p className="text-sm text-red-500">{errors.targetAudience.message}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="competitors">Principais concorrentes</Label>
            <Input 
              id="competitors"
              placeholder="Quem são seus concorrentes diretos?"
              {...register('competitors')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mainChallenges">Principais desafios</Label>
            <Textarea 
              id="mainChallenges"
              placeholder="Quais os principais desafios do seu negócio atualmente?"
              {...register('mainChallenges')}
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="goals">Objetivos de negócio</Label>
            <Textarea 
              id="goals"
              placeholder="Quais seus principais objetivos para os próximos 12 meses?"
              {...register('goals')}
              rows={2}
            />
          </div>
          
          <div className={`flex justify-end ${isMobile ? 'mt-6' : 'pt-4'}`}>
            <Button type="submit">Gerar Plano Personalizado</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SwotCompanyInfoDialog;
