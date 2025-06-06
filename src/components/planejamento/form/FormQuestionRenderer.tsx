
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { PerguntaPlanejamento } from "@/types/planejamentoEstrategico";

interface FormQuestionRendererProps {
  pergunta: PerguntaPlanejamento;
  respostaTemp: string | string[];
  onRespostaChange: (value: string | string[]) => void;
  onMultipleChoiceChange: (value: string, checked: boolean) => void;
}

const FormQuestionRenderer: React.FC<FormQuestionRendererProps> = ({
  pergunta,
  respostaTemp,
  onRespostaChange,
  onMultipleChoiceChange
}) => {
  switch (pergunta.tipo) {
    case "texto":
      return (
        <Textarea
          value={String(respostaTemp)}
          onChange={(e) => onRespostaChange(e.target.value)}
          placeholder="Digite sua resposta..."
          className="min-h-[100px]"
        />
      );
    
    case "sim_nao":
      return (
        <RadioGroup value={String(respostaTemp)} onValueChange={onRespostaChange}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sim" id="sim" />
            <Label htmlFor="sim">Sim</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="nao" id="nao" />
            <Label htmlFor="nao">Não</Label>
          </div>
        </RadioGroup>
      );
    
    case "multipla_escolha_multi":
      return (
        <div className="space-y-3">
          {pergunta.opcoes?.map((opcao, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={`opcao-multi-${index}`}
                checked={Array.isArray(respostaTemp) && respostaTemp.includes(opcao)}
                onCheckedChange={(checked) => onMultipleChoiceChange(opcao, checked as boolean)}
              />
              <Label htmlFor={`opcao-multi-${index}`}>{opcao}</Label>
            </div>
          ))}
        </div>
      );
    
    case "swot_guiada":
      return (
        <div className="space-y-4">
          <RadioGroup value={String(respostaTemp)} onValueChange={onRespostaChange}>
            {pergunta.opcoes?.map((opcao, index) => {
              const direcionamento = pergunta.direcionamento?.[opcao];
              return (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={opcao} id={`opcao-${index}`} />
                    <Label htmlFor={`opcao-${index}`} className="font-medium">{opcao}</Label>
                  </div>
                  {direcionamento && (
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      direcionamento === 'Força' ? 'bg-green-100 text-green-800' :
                      direcionamento === 'Fraqueza' ? 'bg-red-100 text-red-800' :
                      direcionamento === 'Oportunidade' ? 'bg-blue-100 text-blue-800' :
                      direcionamento === 'Ameaça' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      👉 {direcionamento}
                    </div>
                  )}
                </div>
              );
            })}
          </RadioGroup>
          
          {respostaTemp && pergunta.direcionamento?.[String(respostaTemp)] && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800 font-medium">
                    Esta resposta será classificada como: {pergunta.direcionamento[String(respostaTemp)]}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      );
    
    case "multipla_escolha":
      return (
        <RadioGroup value={String(respostaTemp)} onValueChange={onRespostaChange}>
          {pergunta.opcoes?.map((opcao, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={opcao} id={`opcao-${index}`} />
              <Label htmlFor={`opcao-${index}`}>{opcao}</Label>
            </div>
          ))}
        </RadioGroup>
      );
    
    default:
      return (
        <Input
          value={String(respostaTemp)}
          onChange={(e) => onRespostaChange(e.target.value)}
          placeholder="Digite sua resposta..."
        />
      );
  }
};

export default FormQuestionRenderer;
