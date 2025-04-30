
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { PUVFormData } from "@/types/puv";
import ActionButton from "../ui/action-button";
import PUVFormField from "./PUVFormField";
import PUVPersonalInfo from "./PUVPersonalInfo";
import PUVFormHeading from "./PUVFormHeading";

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
          <PUVPersonalInfo 
            colaborador={data.colaborador}
            gestor={data.gestor}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 gap-6">
            <PUVFormHeading />
            
            <PUVFormField
              name="meus"
              label="Meus: (PRODUTOS OU SERVIÇOS)"
              value={data.meus}
              onChange={handleChange}
              placeholder="Descreva seus produtos ou serviços"
            />

            <PUVFormField
              name="ajudam"
              label="Ajudam: (SEGMENTO DO CLIENTE)"
              value={data.ajudam}
              onChange={handleChange}
              placeholder="Descreva o segmento do cliente que você atende"
            />

            <PUVFormField
              name="queDesejam"
              label="Que desejam: (NECESSIDADES DO CLIENTE)"
              value={data.queDesejam}
              onChange={handleChange}
              placeholder="Descreva as necessidades do seu cliente"
            />

            <PUVFormField
              name="para"
              label="Para: (SEU PRÓPRIO VERBO - Exemplo: Reduzir, Evitar)"
              value={data.para}
              onChange={handleChange}
              placeholder="Ex: Reduzir, Evitar, Minimizar, etc."
            />

            <PUVFormField
              name="dor"
              label="_: (UMA DOR DO CLIENTE)"
              value={data.dor}
              onChange={handleChange}
              placeholder="Descreva uma dor do seu cliente"
            />

            <PUVFormField
              name="e"
              label="e: (SEU PRÓPRIO VERBO - Exemplo: Aumentar, Possibilitar)"
              value={data.e}
              onChange={handleChange}
              placeholder="Ex: Aumentar, Possibilitar, Potencializar, etc."
            />

            <PUVFormField
              name="ganho"
              label="_: (UM GANHO DO CLIENTE)"
              value={data.ganho}
              onChange={handleChange}
              placeholder="Descreva um ganho do seu cliente"
            />
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
