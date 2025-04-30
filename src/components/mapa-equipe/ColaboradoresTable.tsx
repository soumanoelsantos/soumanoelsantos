
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Colaborador, NivelMaturidade, EstiloLideranca, PerfilComportamental, Potencial } from "@/types/mapaEquipe";
import ColaboradoresTableContent from "./ColaboradoresTableContent";
import ColaboradoresTableActions from "./ColaboradoresTableActions";

interface ColaboradoresTableProps {
  colaboradores: Colaborador[];
  addColaborador: () => void;
  removeColaborador: (index: number) => void;
  updateColaborador: (index: number, field: keyof Colaborador, value: string) => void;
  handlePreview: () => void;
  niveisMaturidadeOptions: NivelMaturidade[];
  estilosLiderancaOptions: EstiloLideranca[];
  perfisComportamentaisOptions: PerfilComportamental[];
  potenciaisOptions: Potencial[];
}

const ColaboradoresTable = ({
  colaboradores,
  addColaborador,
  removeColaborador,
  updateColaborador,
  handlePreview,
  niveisMaturidadeOptions,
  estilosLiderancaOptions,
  perfisComportamentaisOptions,
  potenciaisOptions
}: ColaboradoresTableProps) => {
  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="bg-[#1d365c] text-white">
        <CardTitle>Colaboradores</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <ColaboradoresTableContent 
            colaboradores={colaboradores}
            removeColaborador={removeColaborador}
            updateColaborador={updateColaborador}
            niveisMaturidadeOptions={niveisMaturidadeOptions}
            estilosLiderancaOptions={estilosLiderancaOptions}
            perfisComportamentaisOptions={perfisComportamentaisOptions}
            potenciaisOptions={potenciaisOptions}
          />
          
          <ColaboradoresTableActions 
            addColaborador={addColaborador}
            handlePreview={handlePreview}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ColaboradoresTable;
