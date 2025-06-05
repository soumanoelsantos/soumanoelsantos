
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  User, 
  Target,
  Eye,
  RotateCcw
} from "lucide-react";
import { PlanejamentoEstrategicoData, PlanoAcao } from "@/types/planejamentoEstrategico";
import FerramentasResultados from "./FerramentasResultados";

interface PlanoAcaoGeradoProps {
  dados: PlanejamentoEstrategicoData;
  onUpdateProgresso: (progresso: number) => void;
}

const PlanoAcaoGerado: React.FC<PlanoAcaoGeradoProps> = ({ dados, onUpdateProgresso }) => {
  const [acoesLocal, setAcoesLocal] = useState<PlanoAcao[]>(dados.planoAcao);

  const toggleAcaoConcluida = (acaoId: string) => {
    const novasAcoes = acoesLocal.map(acao => 
      acao.id === acaoId ? { ...acao, concluida: !acao.concluida } : acao
    );
    setAcoesLocal(novasAcoes);
    
    const acoesCompletas = novasAcoes.filter(acao => acao.concluida).length;
    const novoProgresso = (acoesCompletas / novasAcoes.length) * 100;
    onUpdateProgresso(novoProgresso);
  };

  const acoesCompletas = acoesLocal.filter(acao => acao.concluida).length;
  const progresso = (acoesCompletas / acoesLocal.length) * 100;

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(data));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Progresso do Plano de Ação</span>
            <span className="text-sm text-gray-500">
              {acoesCompletas} de {acoesLocal.length} ações concluídas
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progresso} className="mb-4" />
          <p className="text-center text-gray-600">
            {progresso.toFixed(1)}% concluído
          </p>
        </CardContent>
      </Card>

      <Tabs defaultValue="plano-acao" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="plano-acao">Plano de Ação</TabsTrigger>
          <TabsTrigger value="ferramentas">
            <Eye className="mr-2 h-4 w-4" />
            Ver Resultados Completos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plano-acao">
          <div className="space-y-4">
            {acoesLocal.map((acao) => (
              <Card key={acao.id} className={`transition-all ${acao.concluida ? 'bg-green-50 border-green-200' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={acao.concluida}
                      onCheckedChange={() => toggleAcaoConcluida(acao.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className={`font-medium ${acao.concluida ? 'line-through text-gray-500' : ''}`}>
                          {acao.acao}
                        </h3>
                        <Badge className={getPrioridadeColor(acao.prioridade)}>
                          {acao.prioridade.charAt(0).toUpperCase() + acao.prioridade.slice(1)}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Target className="h-4 w-4" />
                          {acao.categoria}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {acao.prazo}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatarData(acao.dataVencimento)}
                        </div>
                      </div>
                      
                      {acao.recursos && (
                        <div className="text-sm">
                          <span className="font-medium">Recursos:</span> {acao.recursos}
                        </div>
                      )}
                      
                      {acao.metricas && (
                        <div className="text-sm">
                          <span className="font-medium">Métricas:</span> {acao.metricas}
                        </div>
                      )}
                      
                      {acao.responsavel && (
                        <div className="flex items-center gap-1 text-sm">
                          <User className="h-4 w-4" />
                          <span className="font-medium">Responsável:</span> {acao.responsavel}
                        </div>
                      )}
                    </div>
                    
                    {acao.concluida && (
                      <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ferramentas">
          <FerramentasResultados dados={dados} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlanoAcaoGerado;
