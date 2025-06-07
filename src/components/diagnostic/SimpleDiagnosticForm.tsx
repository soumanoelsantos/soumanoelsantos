
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Building2, Users, TrendingUp, DollarSign, Target, Settings, User, Calendar } from 'lucide-react';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verificar se os campos obrigatórios estão preenchidos
    if (!formData.empresaNome || !formData.segmento || !formData.maioresDificuldades) {
      alert('Por favor, preencha pelo menos o nome da empresa, segmento e as maiores dificuldades.');
      return;
    }
    
    onSubmit(formData);
  };

  const isFormValid = formData.empresaNome && formData.segmento && formData.maioresDificuldades;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-4">Diagnóstico Empresarial Completo</CardTitle>
          <p className="text-blue-100 text-lg">
            Responda as perguntas abaixo para receber um plano de ação personalizado e prático para acelerar sua empresa nos próximos 6 meses
          </p>
        </CardHeader>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Informações Básicas da Empresa */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Informações da Empresa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="empresaNome">Nome da Empresa *</Label>
                <Input
                  id="empresaNome"
                  value={formData.empresaNome}
                  onChange={(e) => handleInputChange('empresaNome', e.target.value)}
                  placeholder="Nome da sua empresa"
                  required
                />
              </div>
              <div>
                <Label htmlFor="segmento">Segmento/Área de Atuação *</Label>
                <Input
                  id="segmento"
                  value={formData.segmento}
                  onChange={(e) => handleInputChange('segmento', e.target.value)}
                  placeholder="Ex: Consultoria, E-commerce, Saúde..."
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="tempoMercado">Tempo no Mercado</Label>
                <Input
                  id="tempoMercado"
                  value={formData.tempoMercado}
                  onChange={(e) => handleInputChange('tempoMercado', e.target.value)}
                  placeholder="Ex: 2 anos, 5 anos..."
                />
              </div>
              <div>
                <Label htmlFor="faturamentoMensal">Faturamento Mensal Aproximado</Label>
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
                  placeholder="Ex: 5, 20, 100..."
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Problemas por Área */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Principais Problemas por Área
            </CardTitle>
            <p className="text-sm text-gray-600">
              Descreva os principais problemas que sua empresa enfrenta em cada área. Seja específico.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="problemasComerciais" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Problemas Comerciais/Vendas
                </Label>
                <Textarea
                  id="problemasComerciais"
                  value={formData.problemasComerciais}
                  onChange={(e) => handleInputChange('problemasComerciais', e.target.value)}
                  placeholder="Ex: Dificuldade para fechar vendas, baixa conversão, falta de leads..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="problemasGestao" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Problemas de Gestão
                </Label>
                <Textarea
                  id="problemasGestao"
                  value={formData.problemasGestao}
                  onChange={(e) => handleInputChange('problemasGestao', e.target.value)}
                  placeholder="Ex: Falta de organização, processos mal definidos, tomada de decisão..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="problemasFinanceiros" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Problemas Financeiros
                </Label>
                <Textarea
                  id="problemasFinanceiros"
                  value={formData.problemasFinanceiros}
                  onChange={(e) => handleInputChange('problemasFinanceiros', e.target.value)}
                  placeholder="Ex: Fluxo de caixa, controle de custos, inadimplência..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="problemasRH" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Problemas de Pessoas/RH
                </Label>
                <Textarea
                  id="problemasRH"
                  value={formData.problemasRH}
                  onChange={(e) => handleInputChange('problemasRH', e.target.value)}
                  placeholder="Ex: Alta rotatividade, falta de treinamento, desmotivação..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="problemasMarketing" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Problemas de Marketing
                </Label>
                <Textarea
                  id="problemasMarketing"
                  value={formData.problemasMarketing}
                  onChange={(e) => handleInputChange('problemasMarketing', e.target.value)}
                  placeholder="Ex: Baixa visibilidade, falta de estratégia digital, marca fraca..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="problemasOperacionais" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Problemas Operacionais
                </Label>
                <Textarea
                  id="problemasOperacionais"
                  value={formData.problemasOperacionais}
                  onChange={(e) => handleInputChange('problemasOperacionais', e.target.value)}
                  placeholder="Ex: Atrasos na entrega, qualidade, produtividade, tecnologia..."
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dificuldades e Objetivos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Visão Geral
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="maioresDificuldades">Quais são as 3 maiores dificuldades da sua empresa hoje? *</Label>
              <Textarea
                id="maioresDificuldades"
                value={formData.maioresDificuldades}
                onChange={(e) => handleInputChange('maioresDificuldades', e.target.value)}
                placeholder="Descreva detalhadamente as 3 principais dificuldades que impedem o crescimento da sua empresa..."
                rows={4}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="objetivos6Meses" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Objetivos para os próximos 6 meses
              </Label>
              <Textarea
                id="objetivos6Meses"
                value={formData.objetivos6Meses}
                onChange={(e) => handleInputChange('objetivos6Meses', e.target.value)}
                placeholder="Ex: Aumentar faturamento em 50%, contratar 5 funcionários, lançar novo produto..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Botão de Envio */}
        <Card>
          <CardContent className="pt-6">
            <Button 
              type="submit" 
              disabled={!isFormValid || isSubmitting}
              className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Gerando Plano de Ação...
                </>
              ) : (
                'Gerar Plano de Ação Personalizado'
              )}
            </Button>
            
            {!isFormValid && (
              <p className="text-sm text-red-600 mt-2 text-center">
                Por favor, preencha pelo menos o nome da empresa, segmento e as maiores dificuldades.
              </p>
            )}
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default SimpleDiagnosticForm;
