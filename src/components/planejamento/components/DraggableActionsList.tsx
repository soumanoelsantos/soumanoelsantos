
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  User, 
  Target,
  TrendingUp,
  Zap,
  GripVertical
} from "lucide-react";
import { PlanoAcao } from "@/types/planejamentoEstrategico";
import AiTipsDialog from "../AiTipsDialog";
import { useToast } from "@/hooks/use-toast";

interface DraggableActionsListProps {
  acoes: PlanoAcao[];
  titulo: string;
  onToggleAcao: (acaoId: string) => void;
  onReorderAcoes: (sourceIndex: number, destinationIndex: number) => void;
}

const DraggableActionsList: React.FC<DraggableActionsListProps> = ({
  acoes,
  titulo,
  onToggleAcao,
  onReorderAcoes
}) => {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const { toast } = useToast();

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'alta': return 'bg-red-100 text-red-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baixa': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTipoIcon = (tipo?: string) => {
    switch (tipo) {
      case 'implementacao': return <Zap className="h-4 w-4 text-blue-600" />;
      case 'comercial_semanal': return <TrendingUp className="h-4 w-4 text-green-600" />;
      default: return <Target className="h-4 w-4 text-gray-600" />;
    }
  };

  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(data));
  };

  const handleDragStart = (e: React.DragEvent, acaoId: string, index: number) => {
    setDraggedItemId(acaoId);
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (dragIndex !== dropIndex) {
      onReorderAcoes(dragIndex, dropIndex);
      toast({
        title: "Ordem atualizada",
        description: "As ações foram reordenadas e as datas ajustadas cronologicamente.",
      });
    }
    setDraggedItemId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">{titulo}</h3>
        <p className="text-sm text-gray-500">Arraste para reordenar</p>
      </div>
      {acoes.map((acao, index) => (
        <Card 
          key={acao.id} 
          className={`transition-all cursor-move ${acao.concluida ? 'bg-green-50 border-green-200' : ''} ${
            draggedItemId === acao.id ? 'opacity-50' : ''
          }`}
          draggable
          onDragStart={(e) => handleDragStart(e, acao.id, index)}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, index)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <GripVertical className="h-5 w-5 text-gray-400 mt-1" />
              
              <Checkbox
                checked={acao.concluida}
                onCheckedChange={() => onToggleAcao(acao.id)}
                className="mt-1"
              />
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className={`font-medium ${acao.concluida ? 'line-through text-gray-500' : ''}`}>
                    {acao.acao}
                  </h4>
                  <div className="flex items-center gap-2">
                    {getTipoIcon(acao.tipo)}
                    <Badge className={getPrioridadeColor(acao.prioridade)}>
                      {acao.prioridade.charAt(0).toUpperCase() + acao.prioridade.slice(1)}
                    </Badge>
                  </div>
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

                <div className="flex items-center gap-2 pt-2">
                  <AiTipsDialog acao={acao} />
                </div>
              </div>
              
              {acao.concluida && (
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DraggableActionsList;
