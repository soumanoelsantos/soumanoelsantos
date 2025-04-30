
import React from "react";
import { Input } from "@/components/ui/input";

interface PUVPersonalInfoProps {
  colaborador: string;
  gestor: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PUVPersonalInfo = ({ colaborador, gestor, onChange }: PUVPersonalInfoProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      <div>
        <label className="block text-gray-700 font-medium mb-2">Colaborador</label>
        <Input
          name="colaborador"
          value={colaborador}
          onChange={onChange}
          placeholder="Nome do colaborador"
          className="w-full"
        />
      </div>
      
      <div>
        <label className="block text-gray-700 font-medium mb-2">Gestor</label>
        <Input
          name="gestor"
          value={gestor}
          onChange={onChange}
          placeholder="Nome do gestor"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default PUVPersonalInfo;
