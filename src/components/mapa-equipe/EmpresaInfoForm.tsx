
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface EmpresaInfoFormProps {
  empresaNome: string;
  setEmpresaNome: (value: string) => void;
  resetForm: () => void;
}

const EmpresaInfoForm = ({ empresaNome, setEmpresaNome, resetForm }: EmpresaInfoFormProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 items-end">
      <div className="w-full md:w-1/2">
        <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">
          Nome da Empresa
        </label>
        <Input
          id="empresa"
          placeholder="Digite o nome da empresa"
          value={empresaNome}
          onChange={(e) => setEmpresaNome(e.target.value)}
        />
      </div>
      <div className="flex justify-end w-full md:w-1/2">
        <Button
          variant="outline"
          onClick={resetForm}
          className="border-red-400 text-red-500 hover:bg-red-50"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Limpar Formulário
        </Button>
      </div>
    </div>
  );
};

export default EmpresaInfoForm;
