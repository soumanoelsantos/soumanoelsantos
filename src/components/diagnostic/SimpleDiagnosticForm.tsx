
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Rocket } from 'lucide-react';

interface DiagnosticData {
  empresaNome: string;
}

interface SimpleDiagnosticFormProps {
  onSubmit: (data: DiagnosticData) => void;
  isSubmitting: boolean;
}

const SimpleDiagnosticForm = ({ onSubmit, isSubmitting }: SimpleDiagnosticFormProps) => {
  const [empresaNome, setEmpresaNome] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!empresaNome.trim()) {
      return;
    }

    onSubmit({
      empresaNome: empresaNome.trim()
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
            <Rocket className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Diagnóstico Empresarial Inteligente
          </CardTitle>
          <p className="text-gray-600 mt-2">
            Gere um plano de aceleração personalizado para sua empresa com mais de 380 ações estratégicas
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="empresaNome" className="text-base font-medium">
                Nome da sua empresa *
              </Label>
              <Input
                id="empresaNome"
                type="text"
                value={empresaNome}
                onChange={(e) => setEmpresaNome(e.target.value)}
                placeholder="Digite o nome da sua empresa"
                required
                className="mt-2"
                disabled={isSubmitting}
              />
              <p className="text-sm text-gray-500 mt-1">
                Este será usado para personalizar seu plano de ação
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">
                O que você receberá:
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Mais de 380 ações estratégicas personalizadas</li>
                <li>• Plano organizado por categorias e prioridades</li>
                <li>• Cronograma detalhado com datas práticas</li>
                <li>• Exemplos de casos de sucesso</li>
                <li>• Sistema de acompanhamento completo</li>
              </ul>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg"
              disabled={isSubmitting || !empresaNome.trim()}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Gerando seu plano personalizado...
                </>
              ) : (
                <>
                  <Rocket className="h-5 w-5 mr-2" />
                  Gerar Plano de Aceleração
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleDiagnosticForm;
