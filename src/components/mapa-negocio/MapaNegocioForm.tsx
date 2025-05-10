
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BusinessMapData } from "@/types/businessMap";
import BusinessInfoField from "./form/BusinessInfoField";
import FormFields from "./form/FormFields";
import FormActions from "./form/FormActions";

interface MapaNegocioFormProps {
  data: BusinessMapData;
  onDataChange: (field: keyof BusinessMapData, value: string) => void;
  onPreviewClick: () => void;
}

const MapaNegocioForm = ({ data, onDataChange, onPreviewClick }: MapaNegocioFormProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onDataChange(name as keyof BusinessMapData, value);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200 shadow-md">
        <CardContent className="p-6">
          <BusinessInfoField 
            value={data.empresa}
            onChange={handleChange}
          />

          <FormFields 
            data={data}
            onFieldChange={handleChange}
          />
        </CardContent>
      </Card>

      <FormActions onPreviewClick={onPreviewClick} />
    </div>
  );
};

export default MapaNegocioForm;
