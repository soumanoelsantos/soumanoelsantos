
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import { Trash } from "lucide-react";
import { Colaborador, NivelMaturidade, EstiloLideranca, PerfilComportamental, Potencial } from "@/types/mapaEquipe";

interface ColaboradorRowProps {
  colaborador: Colaborador;
  index: number;
  updateColaborador: (index: number, field: keyof Colaborador, value: string) => void;
  removeColaborador: (index: number) => void;
  niveisMaturidadeOptions: NivelMaturidade[];
  estilosLiderancaOptions: EstiloLideranca[];
  perfisComportamentaisOptions: PerfilComportamental[];
  potenciaisOptions: Potencial[];
}

const ColaboradorRow = ({
  colaborador,
  index,
  updateColaborador,
  removeColaborador,
  niveisMaturidadeOptions,
  estilosLiderancaOptions,
  perfisComportamentaisOptions,
  potenciaisOptions
}: ColaboradorRowProps) => {
  return (
    <TableRow>
      <TableCell>
        <Input
          placeholder="Nome"
          value={colaborador.nome}
          onChange={(e) => updateColaborador(index, 'nome', e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Select
          value={colaborador.nivelMaturidade}
          onValueChange={(value) => updateColaborador(index, 'nivelMaturidade', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Nível" />
          </SelectTrigger>
          <SelectContent>
            {niveisMaturidadeOptions.map((nivel) => (
              <SelectItem key={nivel} value={nivel}>{nivel}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Select
          value={colaborador.estiloLideranca}
          onValueChange={(value) => updateColaborador(index, 'estiloLideranca', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Estilo" />
          </SelectTrigger>
          <SelectContent>
            {estilosLiderancaOptions.map((estilo) => (
              <SelectItem key={estilo} value={estilo}>{estilo}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Select
          value={colaborador.perfilComportamental}
          onValueChange={(value) => updateColaborador(index, 'perfilComportamental', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Perfil" />
          </SelectTrigger>
          <SelectContent>
            {perfisComportamentaisOptions.map((perfil) => (
              <SelectItem key={perfil} value={perfil}>{perfil}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Textarea
          placeholder="Descreva o futuro"
          className="min-h-[80px]"
          value={colaborador.futuro}
          onChange={(e) => updateColaborador(index, 'futuro', e.target.value)}
        />
      </TableCell>
      <TableCell>
        <Select
          value={colaborador.potencial}
          onValueChange={(value) => updateColaborador(index, 'potencial', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Potencial" />
          </SelectTrigger>
          <SelectContent>
            {potenciaisOptions.map((potencial) => (
              <SelectItem key={potencial} value={potencial}>{potencial}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </TableCell>
      <TableCell>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => removeColaborador(index)}
          title="Remover colaborador"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default ColaboradorRow;
