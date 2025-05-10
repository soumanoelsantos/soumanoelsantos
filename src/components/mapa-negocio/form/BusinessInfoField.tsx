
import React from "react";
import { Input } from "@/components/ui/input";

interface BusinessInfoFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BusinessInfoField = ({ value, onChange }: BusinessInfoFieldProps) => {
  return (
    <div className="mb-6">
      <label className="block text-gray-700 font-medium mb-2">Nome da Empresa</label>
      <Input
        name="empresa"
        value={value}
        onChange={onChange}
        placeholder="Nome da sua empresa"
        className="w-full"
      />
    </div>
  );
};

export default BusinessInfoField;
