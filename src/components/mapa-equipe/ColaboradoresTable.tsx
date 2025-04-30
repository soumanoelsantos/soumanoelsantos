
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Save } from "lucide-react";
import ColaboradorRow from "./ColaboradorRow";
import { Colaborador, NivelMaturidade, EstiloLideranca, PerfilComportamental, Potencial } from "@/types/mapaEquipe";

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

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={addColaborador}
              className="border-dark-primary/30 text-dark-primary hover:bg-dark-primary/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Colaborador
            </Button>
            
            <Button 
              className="bg-dark-primary hover:bg-dark-primary/90 text-white"
              onClick={handlePreview}
            >
              <Save className="h-4 w-4 mr-2" />
              Salvar e Visualizar Mapa
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColaboradoresTable;
