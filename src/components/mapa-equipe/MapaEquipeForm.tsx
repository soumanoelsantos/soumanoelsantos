
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMapaEquipe, niveisMaturidadeOptions, estilosLiderancaOptions, perfisComportamentaisOptions, potenciaisOptions } from "@/hooks/useMapaEquipe";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash, Plus, FileText, RefreshCw } from "lucide-react";
import MapaEquipePreview from "./MapaEquipePreview";

const MapaEquipeForm = () => {
  const { 
    empresaNome,
    setEmpresaNome,
    colaboradores,
    addColaborador,
    removeColaborador,
    updateColaborador,
    showPreview,
    handlePreview,
    closePreview,
    resetForm
  } = useMapaEquipe();

  if (showPreview) {
    return (
      <MapaEquipePreview 
        empresaNome={empresaNome}
        colaboradores={colaboradores}
        onClose={closePreview}
      />
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white shadow-md">
        <CardHeader className="bg-[#1d365c] text-white">
          <CardTitle>Mapa da Equipe - Instruções</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <p>Liste seus colaboradores e selecione o nível de maturidade, estilo de liderança e perfil comportamental dominante.</p>
            
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <h3 className="font-semibold mb-2">Preencha os itens abaixo com as seguintes opções:</h3>
              
              <div className="space-y-2">
                <p><span className="font-medium">Nível de Maturidade:</span> M1 (Bebê) | M2 (Criança) | M3 (Adolescente) | M4 (Adulto)</p>
                <p><span className="font-medium">Estilo de Liderança:</span> E1 (Direção) | E2 (Treinamento) | E3 (Apoio) | E4 (Delegação)</p>
                <p><span className="font-medium">Perfil comportamental:</span> Executor | Comunicador | Analista | Planejador</p>
                <p><span className="font-medium">Potencial:</span> Sócio | Diretor | Gestor | Supervisor/Coordenador | Extraordinário | Stand by</p>
              </div>
            </div>
            
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
          </div>
        </CardContent>
      </Card>

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
                    <TableRow key={index}>
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
                <FileText className="h-4 w-4 mr-2" />
                Visualizar Mapa
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MapaEquipeForm;
