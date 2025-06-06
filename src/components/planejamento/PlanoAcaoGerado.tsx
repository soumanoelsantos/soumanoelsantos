
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, CheckCircle2, Clock, Target, TrendingUp, Users, ArrowLeft, Eye } from "lucide-react";
import { PlanejamentoEstrategicoData, PlanoAcao } from "@/types/planejamentoEstrategico";
import FerramentasResultados from "./FerramentasResultados";
import AiTipsDialog from "./AiTipsDialog";

interface PlanoAcaoGeradoProps {
  dados: PlanejamentoEstrategicoData;
  onUpdateProgresso: (progresso: number) => void;
  onVoltar?: () => void;
}

const PlanoAcaoGerado: React.FC<PlanoAcaoGeradoProps> = ({ dados, onUpdateProgresso, onVoltar }) => {
  const [acoesLocal, setAcoesLocal] = useState<PlanoAcao[]>(dados.planoAcao);
  const [showResults, setShowResults] = useState(false);

  const toggleAcaoConcluida = (acaoId: string) => {
    const novasAcoes = acoesLocal.map(acao => 
      acao.id === acaoId ? { ...acao, concluida: !acao.concluida } : acao
    );
    setAcoesLocal(novasAcoes);
    
    const acoesCompletas = novasAcoes.filter(acao => acao.concluida).length;
    const novoProgresso = (acoesCompletas / novasAcoes.length) * 100;
    onUpdateProgresso(novoProgresso);
  };

  const reordenarAcoes = (result: any) => {
    if (!result.destination) return;

    const novasAcoes = [...acoesLocal];
    const [itemMovido] = novasAcoes.splice(result.source.index, 1);
    novasAcoes.splice(result.destination.index, 0, itemMovido);

    // Reordenar cronologicamente
    const hoje = new Date();
    novasAcoes.forEach((acao, index) => {
      const diasOffset = Math.floor(index * 7); // 1 semana entre ações
      const novaData = new Date(hoje);
      novaData.setDate(hoje.getDate() + diasOffset);
      acao.dataVencimento = novaData;
    });

    setAcoesLocal(novasAcoes);
  };

  const getIconeCategoria = (categoria: string) => {
    switch(categoria) {
      case 'comercial': return <TrendingUp className="h-4 w-4" />;
      case 'gestao': return <Target className="h-4 w-4" />;
      case 'rh': return <Users className="h-4 w-4" />;
      case 'marketing': return <Target className="h-4 w-4" />;
      case 'financeiro': return <Target className="h-4 w-4" />;
      case 'implementacao': return <Clock className="h-4 w-4" />;
      default: return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const getCorCategoria = (categoria: string) => {
    switch(categoria) {
      case 'comercial': return 'bg-green-100 text-green-800';
      case 'gestao': return 'bg-blue-100 text-blue-800';
      case 'rh': return 'bg-purple-100 text-purple-800';
      case 'marketing': return 'bg-orange-100 text-orange-800';
      case 'financeiro': return 'bg-red-100 text-red-800';
      case 'implementacao': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCorPrioridade = (prioridade: string) => {
    switch(prioridade) {
      case 'alta': return 'bg-red-500';
      case 'media': return 'bg-yellow-500';
      case 'baixa': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(new Date(data));
  };

  const acoesCompletas = acoesLocal.filter(acao => acao.concluida).length;
  const progresso = (acoesCompletas / acoesLocal.length) * 100;

  if (showResults) {
    return <FerramentasResultados dados={dados} onVoltar={() => setShowResults(false)} />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl mb-2">{dados.empresaNome}</CardTitle>
              <p className="text-blue-100">Plano Estratégico - 6 Meses</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => setShowResults(true)} 
                className="bg-white text-blue-600 border-2 border-white hover:bg-blue-50 font-semibold"
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver Diagnóstico
              </Button>
              {onVoltar && (
                <Button 
                  onClick={onVoltar} 
                  className="bg-green-600 text-white border-2 border-green-600 hover:bg-green-700 font-semibold"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Novo Plano
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Progresso */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Progresso do Plano</h3>
            <span className="text-2xl font-bold text-blue-600">{Math.round(progresso)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>{acoesCompletas} de {acoesLocal.length} ações concluídas</span>
            <span>{acoesLocal.length - acoesCompletas} restantes</span>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Ações Cronológica */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Cronograma de Implementação - 6 Meses
          </CardTitle>
          <p className="text-gray-600">Arraste e solte para reordenar as ações conforme sua prioridade</p>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={reordenarAcoes}>
            <Droppable droppableId="acoes-cronologicas">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {acoesLocal.map((acao, index) => (
                    <Draggable key={acao.id} draggableId={acao.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 ${
                            snapshot.isDragging ? 'shadow-lg scale-105' : ''
                          } ${acao.concluida ? 'bg-green-50 border-green-200' : ''}`}
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                              <Checkbox
                                checked={acao.concluida}
                                onCheckedChange={() => toggleAcaoConcluida(acao.id)}
                                className="mt-1"
                              />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <h4 className={`font-medium text-lg ${acao.concluida ? 'line-through text-gray-500' : ''}`}>
                                  {acao.acao}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <div 
                                    className={`w-3 h-3 rounded-full ${getCorPrioridade(acao.prioridade)}`}
                                    title={`Prioridade ${acao.prioridade}`}
                                  />
                                  <Badge variant="outline" className={getCorCategoria(acao.categoria)}>
                                    {getIconeCategoria(acao.categoria)}
                                    <span className="ml-1 capitalize">{acao.categoria}</span>
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                                <div>
                                  <p className="text-gray-600"><strong>Prazo:</strong> {acao.prazo}</p>
                                  <p className="text-gray-600"><strong>Data:</strong> {formatarData(acao.dataVencimento)}</p>
                                </div>
                                <div>
                                  {acao.responsavel && (
                                    <p className="text-gray-600"><strong>Responsável:</strong> {acao.responsavel}</p>
                                  )}
                                  {acao.recursos && (
                                    <p className="text-gray-600"><strong>Recursos:</strong> {acao.recursos}</p>
                                  )}
                                </div>
                              </div>
                              
                              {acao.metricas && (
                                <div className="mb-3 p-3 bg-blue-50 rounded-lg">
                                  <p className="text-sm"><strong>Métricas de Sucesso:</strong> {acao.metricas}</p>
                                </div>
                              )}

                              {/* AI Tips Button */}
                              <div className="flex justify-end">
                                <AiTipsDialog acao={acao} />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanoAcaoGerado;
