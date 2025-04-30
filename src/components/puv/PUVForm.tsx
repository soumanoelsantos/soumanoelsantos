
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye } from "lucide-react";
import { PUVFormData } from "@/types/puv";
import ActionButton from "../ui/action-button";

interface PUVFormProps {
  data: PUVFormData;
  onDataChange: (data: PUVFormData) => void;
  onPreviewClick: () => void;
}

const PUVForm = ({ data, onDataChange, onPreviewClick }: PUVFormProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onDataChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200 shadow-md">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Colaborador</label>
              <Input
                name="colaborador"
                value={data.colaborador}
                onChange={handleChange}
                placeholder="Nome do colaborador"
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Gestor</label>
              <Input
                name="gestor"
                value={data.gestor}
                onChange={handleChange}
                placeholder="Nome do gestor"
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Estrutura para elaboração da Proposta Única de Valor</h3>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Meus: (PRODUTOS OU SERVIÇOS)
              </label>
              <Textarea
                name="meus"
                value={data.meus}
                onChange={handleChange}
                placeholder="Descreva seus produtos ou serviços"
                className="h-24"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Ajudam: (SEGMENTO DO CLIENTE)
              </label>
              <Textarea
                name="ajudam"
                value={data.ajudam}
                onChange={handleChange}
                placeholder="Descreva o segmento do cliente que você atende"
                className="h-24"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Que desejam: (NECESSIDADES DO CLIENTE)
              </label>
              <Textarea
                name="queDesejam"
                value={data.queDesejam}
                onChange={handleChange}
                placeholder="Descreva as necessidades do seu cliente"
                className="h-24"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Para: (SEU PRÓPRIO VERBO - Exemplo: Reduzir, Evitar)
              </label>
              <Textarea
                name="para"
                value={data.para}
                onChange={handleChange}
                placeholder="Ex: Reduzir, Evitar, Minimizar, etc."
                className="h-24"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                _: (UMA DOR DO CLIENTE)
              </label>
              <Textarea
                name="dor"
                value={data.dor}
                onChange={handleChange}
                placeholder="Descreva uma dor do seu cliente"
                className="h-24"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                e: (SEU PRÓPRIO VERBO - Exemplo: Aumentar, Possibilitar)
              </label>
              <Textarea
                name="e"
                value={data.e}
                onChange={handleChange}
                placeholder="Ex: Aumentar, Possibilitar, Potencializar, etc."
                className="h-24"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                _: (UM GANHO DO CLIENTE)
              </label>
              <Textarea
                name="ganho"
                value={data.ganho}
                onChange={handleChange}
                placeholder="Descreva um ganho do seu cliente"
                className="h-24"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-6">
        <ActionButton 
          onClick={onPreviewClick}
          variant="secondary"
          icon={Eye}
        >
          Visualizar Proposta Única de Valor
        </ActionButton>
      </div>
    </div>
  );
};

export default PUVForm;
