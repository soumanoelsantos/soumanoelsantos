
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  Target, 
  TrendingUp,
  FileText,
  Users,
  BarChart
} from "lucide-react";
import { PlanoAcao, PlanejamentoEstrategicoData } from "@/types/planejamentoEstrategico";

interface PlanoAcaoGeradoProps {
  dados: PlanejamentoEstrategicoData;
  onUpdateProgresso: (novoProgresso: number) => void;
}

const PlanoAcaoGerado: React.FC<PlanoAcaoGeradoProps> = ({ dados, onUpdateProgresso }) => {
  const [planoAtualizado, setPlanoAtualizado] = useState<PlanoAcao[]>(dados.planoAcao);

  const toggleAcaoConcluida = (acaoId: string) => {
    const novoPlano = planoAtualizado.map(acao => {
      if (acao.id === acaoId) {
        return { ...acao, concluida: !acao.concluida };
      }
      return acao;
    });
    
    setPlanoAtualizado(novoPlano);
    
    // Calcular novo progresso
    const acoesConcluidas = novoPlano.filter(a => a.concluida).length;
    const novoProgresso = (acoesConcluidas / novoPlano.length) * 100;
    onUpdateProgresso(novoProgresso);
  };

  const agruparPorCategoria = (acoes: PlanoAcao[]) => {
    return acoes.reduce((grupos, acao) => {
      const categoria = acao.categoria;
      if (!grupos[categoria]) {
        grupos[categoria] = [];
      }
      grupos[categoria].push(acao);
      return grupos;
    }, {} as Record<string, PlanoAcao[]>);
  };

  const agruparPorPrioridade = (acoes: PlanoAcao[]) => {
    return acoes.reduce((grupos, acao) => {
      const prioridade = acao.prioridade;
      if (!grupos[prioridade]) {
        grupos[prioridade] = [];
      }
      grupos[prioridade].push(acao);
      return grupos;
    }, {} as Record<string, PlanoAcao[]>);
  };

  const getCorPrioridade = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baixa': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const acoesConcluidas = planoAtualizado.filter(a => a.concluida).length;
  const progressoAtual = (acoesConcluidas / planoAtualizado.length) * 100;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header com progresso geral */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6" />
            Plano de Ação Estratégico - 6 Meses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-2xl font-bold">{Math.round(progressoAtual)}% Concluído</p>
              <p className="text-gray-600">{acoesConcluidas} de {planoAtualizado.length} ações realizadas</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Empresa: {dados.empresaNome}</p>
              <p className="text-sm text-gray-500">Iniciado em: {dados.dataInicio.toLocaleDateString()}</p>
            </div>
          </div>
          <Progress value={progressoAtual} className="h-3" />
        </CardContent>
      </Card>

      <Tabs defaultValue="cronograma" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cronograma">Cronograma</TabsTrigger>
          <TabsTrigger value="categorias">Por Categoria</TabsTrigger>
          <TabsTrigger value="prioridades">Por Prioridade</TabsTrigger>
          <TabsTrigger value="ferramentas">Ferramentas Geradas</TabsTrigger>
        </TabsList>

        <TabsContent value="cronograma" className="space-y-4">
          <div className="grid gap-4">
            {planoAtualizado.map((acao) => (
              <Card key={acao.id} className={`transition-all ${acao.concluida ? 'opacity-60 bg-green-50' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={acao.concluida}
                      onCheckedChange={() => toggleAcaoConcluida(acao.id)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`font-medium ${acao.concluida ? 'line-through text-gray-500' : ''}`}>
                            {acao.acao}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">{acao.categoria}</p>
                          {acao.recursos && (
                            <p className="text-sm text-blue-600 mt-1">Recursos: {acao.recursos}</p>
                          )}
                          {acao.metricas && (
                            <p className="text-sm text-purple-600 mt-1">Métricas: {acao.metricas}</p>
                          )}
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={getCorPrioridade(acao.prioridade)}>
                            {acao.prioridade.charAt(0).toUpperCase() + acao.prioridade.slice(1)}
                          </Badge>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            {acao.dataVencimento.toLocaleDateString()}
                          </div>
                          {acao.concluida && (
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categorias" className="space-y-4">
          {Object.entries(agruparPorCategoria(planoAtualizado)).map(([categoria, acoes]) => (
            <Card key={categoria}>
              <CardHeader>
                <CardTitle className="text-lg capitalize">{categoria}</CardTitle>
                <p className="text-sm text-gray-600">
                  {acoes.filter(a => a.concluida).length} de {acoes.length} ações concluídas
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {acoes.map((acao) => (
                  <div key={acao.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Checkbox
                      checked={acao.concluida}
                      onCheckedChange={() => toggleAcaoConcluida(acao.id)}
                    />
                    <div className="flex-1">
                      <p className={`${acao.concluida ? 'line-through text-gray-500' : ''}`}>
                        {acao.acao}
                      </p>
                    </div>
                    <Badge className={getCorPrioridade(acao.prioridade)}>
                      {acao.prioridade}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="prioridades" className="space-y-4">
          {['alta', 'media', 'baixa'].map((prioridade) => {
            const acoesPrioridade = agruparPorPrioridade(planoAtualizado)[prioridade] || [];
            if (acoesPrioridade.length === 0) return null;
            
            return (
              <Card key={prioridade}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {prioridade === 'alta' && <Clock className="h-5 w-5 text-red-600" />}
                    {prioridade === 'media' && <TrendingUp className="h-5 w-5 text-yellow-600" />}
                    {prioridade === 'baixa' && <Target className="h-5 w-5 text-green-600" />}
                    Prioridade {prioridade.charAt(0).toUpperCase() + prioridade.slice(1)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {acoesPrioridade.map((acao) => (
                    <div key={acao.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Checkbox
                        checked={acao.concluida}
                        onCheckedChange={() => toggleAcaoConcluida(acao.id)}
                      />
                      <div className="flex-1">
                        <p className={`${acao.concluida ? 'line-through text-gray-500' : ''}`}>
                          {acao.acao}
                        </p>
                        <p className="text-sm text-gray-500">{acao.categoria}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="ferramentas" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Diagnóstico Empresarial
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Ver Resultado Completo
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5" />
                  Análise SWOT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Ver Análise Completa
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Mapa do Negócio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Ver Mapa Completo
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Mapa da Equipe
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Ver Estrutura da Equipe
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlanoAcaoGerado;
