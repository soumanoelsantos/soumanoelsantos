
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Building2 } from "lucide-react";

interface DiagnosticData {
  empresaNome: string;
  segmento: string;
  tempoMercado: string;
  faturamentoMensal: string;
  numeroFuncionarios: string;
  problemasComerciais: string;
  problemasGestao: string;
  problemasFinanceiros: string;
  problemasRH: string;
  problemasMarketing: string;
  problemasOperacionais: string;
  maioresDificuldades: string;
  objetivos6Meses: string;
}

interface SimpleDiagnosticFormProps {
  onSubmit: (data: DiagnosticData) => void;
  isSubmitting: boolean;
}

const SimpleDiagnosticForm: React.FC<SimpleDiagnosticFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<DiagnosticData>({
    empresaNome: '',
    segmento: '',
    tempoMercado: '',
    faturamentoMensal: '',
    numeroFuncionarios: '',
    problemasComerciais: '',
    problemasGestao: '',
    problemasFinanceiros: '',
    problemasRH: '',
    problemasMarketing: '',
    problemasOperacionais: '',
    maioresDificuldades: '',
    objetivos6Meses: ''
  });

  const handleInputChange = (field: keyof DiagnosticData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const isFormValid = formData.empresaNome && formData.segmento && formData.maioresDificuldades;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Building2 className="h-6 w-6" />
            Diagnóstico Empresarial Completo
          </CardTitle>
          <p className="text-blue-100">
            Conte-nos sobre sua empresa e suas principais dificuldades. Vamos gerar um plano de ação prático para os próximos 6 meses.
          </p>
        </CardHeader>
      </Card>

      {/* Informações Básicas da Empresa */}
      <Card>
        <CardHeader>
          <CardTitle>Informações da Empresa</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="empresaNome">Nome da Empresa *</Label>
              <Input
                id="empresaNome"
                value={formData.empresaNome}
                onChange={(e) => handleInputChange('empresaNome', e.target.value)}
                placeholder="Digite o nome da sua empresa"
              />
            </div>
            <div>
              <Label htmlFor="segmento">Segmento/Ramo de Atividade *</Label>
              <Input
                id="segmento"
                value={formData.segmento}
                onChange={(e) => handleInputChange('segmento', e.target.value)}
                placeholder="Ex: Varejo, Consultoria, Indústria..."
              />
            </div>
            <div>
              <Label htmlFor="tempoMercado">Tempo no Mercado</Label>
              <Input
                id="tempoMercado"
                value={formData.tempoMercado}
                onChange={(e) => handleInputChange('tempoMercado', e.target.value)}
                placeholder="Ex: 2 anos, 6 meses..."
              />
            </div>
            <div>
              <Label htmlFor="faturamentoMensal">Faturamento Mensal Médio</Label>
              <Input
                id="faturamentoMensal"
                value={formData.faturamentoMensal}
                onChange={(e) => handleInputChange('faturamentoMensal', e.target.value)}
                placeholder="Ex: R$ 50.000, R$ 200.000..."
              />
            </div>
            <div>
              <Label htmlFor="numeroFuncionarios">Número de Funcionários</Label>
              <Input
                id="numeroFuncionarios"
                value={formData.numeroFuncionarios}
                onChange={(e) => handleInputChange('numeroFuncionarios', e.target.value)}
                placeholder="Ex: 5, 15, apenas eu..."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problemas por Área */}
      <Card>
        <CardHeader>
          <CardTitle>Conte-nos sobre os Problemas de Cada Área</CardTitle>
          <p className="text-gray-600">Seja específico sobre as dificuldades que sua empresa enfrenta em cada área. Quanto mais detalhes, melhor será o plano de ação.</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="problemasComerciais">Área Comercial/Vendas</Label>
            <Textarea
              id="problemasComerciais"
              value={formData.problemasComerciais}
              onChange={(e) => handleInputChange('problemasComerciais', e.target.value)}
              placeholder="Descreva os problemas na área de vendas: dificuldade para gerar leads, baixa conversão, falta de processo estruturado, equipe desmotivada, etc."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="problemasFinanceiros">Área Financeira</Label>
            <Textarea
              id="problemasFinanceiros"
              value={formData.problemasFinanceiros}
              onChange={(e) => handleInputChange('problemasFinanceiros', e.target.value)}
              placeholder="Descreva os problemas financeiros: fluxo de caixa apertado, falta de controle, inadimplência, margem baixa, etc."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="problemasGestao">Área de Gestão/Processos</Label>
            <Textarea
              id="problemasGestao"
              value={formData.problemasGestao}
              onChange={(e) => handleInputChange('problemasGestao', e.target.value)}
              placeholder="Descreva os problemas de gestão: falta de organização, processos mal definidos, dificuldade para delegar, etc."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="problemasRH">Área de Pessoas/RH</Label>
            <Textarea
              id="problemasRH"
              value={formData.problemasRH}
              onChange={(e) => handleInputChange('problemasRH', e.target.value)}
              placeholder="Descreva os problemas com pessoas: alta rotatividade, falta de motivação, dificuldade para contratar, problemas de clima, etc."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="problemasMarketing">Área de Marketing</Label>
            <Textarea
              id="problemasMarketing"
              value={formData.problemasMarketing}
              onChange={(e) => handleInputChange('problemasMarketing', e.target.value)}
              placeholder="Descreva os problemas de marketing: falta de visibilidade, redes sociais paradas, poucos leads, marca fraca, etc."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="problemasOperacionais">Área Operacional</Label>
            <Textarea
              id="problemasOperacionais"
              value={formData.problemasOperacionais}
              onChange={(e) => handleInputChange('problemasOperacionais', e.target.value)}
              placeholder="Descreva os problemas operacionais: qualidade do produto/serviço, atrasos na entrega, falta de padronização, etc."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      {/* Dificuldades Principais */}
      <Card>
        <CardHeader>
          <CardTitle>Principais Dificuldades e Objetivos</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="maioresDificuldades">Quais são as 3 maiores dificuldades da sua empresa hoje? *</Label>
            <Textarea
              id="maioresDificuldades"
              value={formData.maioresDificuldades}
              onChange={(e) => handleInputChange('maioresDificuldades', e.target.value)}
              placeholder="Liste e detalhe as 3 principais dificuldades que impedem o crescimento da sua empresa..."
              rows={5}
            />
          </div>

          <div>
            <Label htmlFor="objetivos6Meses">O que você quer alcançar nos próximos 6 meses?</Label>
            <Textarea
              id="objetivos6Meses"
              value={formData.objetivos6Meses}
              onChange={(e) => handleInputChange('objetivos6Meses', e.target.value)}
              placeholder="Descreva seus objetivos: aumentar faturamento em X%, contratar pessoas, organizar processos, etc."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
          size="lg"
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Gerando Plano de Ação...
            </>
          ) : (
            'Gerar Plano de Ação de 6 Meses'
          )}
        </Button>
      </div>
    </div>
  );
};

export default SimpleDiagnosticForm;
