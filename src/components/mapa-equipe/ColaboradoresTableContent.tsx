
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ColaboradorRow from "./ColaboradorRow";
import { Colaborador, NivelMaturidade, EstiloLideranca, PerfilComportamental, Potencial } from "@/types/mapaEquipe";

interface ColaboradoresTableContentProps {
  colaboradores: Colaborador[];
  removeColaborador: (index: number) => void;
  updateColaborador: (index: number, field: keyof Colaborador, value: string) => void;
  niveisMaturidadeOptions: NivelMaturidade[];
  estilosLiderancaOptions: EstiloLideranca[];
  perfisComportamentaisOptions: PerfilComportamental[];
  potenciaisOptions: Potencial[];
}

const ColaboradoresTableContent = ({
  colaboradores,
  removeColaborador,
  updateColaborador,
  niveisMaturidadeOptions,
  estilosLiderancaOptions,
  perfisComportamentaisOptions,
  potenciaisOptions
}: ColaboradoresTableContentProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do colaborador</TableHead>
            <TableHead>Nível de Maturidade</TableHead>
            <TableHead>Estilo de Liderança necessário</TableHead>
            <TableHead>Perfil Comportamental</TableHead>
            <TableHead>Futuro na empresa</TableHead>
            <TableHead>Potencial</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {colaboradores.map((colaborador, index) => (
            <ColaboradorRow
              key={index}
              colaborador={colaborador}
              index={index}
              updateColaborador={updateColaborador}
              removeColaborador={removeColaborador}
              niveisMaturidadeOptions={niveisMaturidadeOptions}
              estilosLiderancaOptions={estilosLiderancaOptions}
              perfisComportamentaisOptions={perfisComportamentaisOptions}
              potenciaisOptions={potenciaisOptions}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ColaboradoresTableContent;
