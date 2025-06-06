
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye } from "lucide-react";
import { PlanejamentoEstrategicoData, PlanoAcao } from "@/types/planejamentoEstrategico";
import FerramentasResultados from "./FerramentasResultados";
import PlanoAcaoHeader from "./components/PlanoAcaoHeader";
import ProgressSection from "./components/ProgressSection";
import DraggableActionsList from "./components/DraggableActionsList";
import CommercialActionsSection from "./components/CommercialActionsSection";

interface PlanoAcaoGeradoProps {
  dados: PlanejamentoEstrategicoData;
  onUpdateProgresso: (progresso: number) => void;
  onVoltar?: () => void;
}

const PlanoAcaoGerado: React.FC<PlanoAcaoGeradoProps> = ({ dados, onUpdateProgresso, onVoltar }) => {
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

  const reordenarAcoes = (sourceIndex: number, destinationIndex: number) => {
    const novasAcoes = [...acoesLocal];
    const [itemMovido] = novasAcoes.splice(sourceIndex, 1);
    novasAcoes.splice(destinationIndex, 0, itemMovido);

    // Ajustar datas cronologicamente
    const hoje = new Date();
    novasAcoes.forEach((acao, index) => {
      const novaData = new Date(hoje);
      novaData.setDate(hoje.getDate() + (index * 30)); // 30 dias entre cada ação
      acao.dataVencimento = novaData;
    });

    setAcoesLocal(novasAcoes);
  };

  const acoesCompletas = acoesLocal.filter(acao => acao.concluida).length;
  const progresso = (acoesCompletas / acoesLocal.length) * 100;

  const acoesEstrategicas = acoesLocal.filter(acao => acao.tipo !== 'implementacao');
  const acoesImplementacao = acoesLocal.filter(acao => acao.tipo === 'implementacao');

  return (
    <div className="space-y-6" id="plano-acoes-completo">
      <PlanoAcaoHeader dados={dados} onVoltar={onVoltar} />

      <ProgressSection 
        acoesCompletas={acoesCompletas}
        totalAcoes={acoesLocal.length}
        progresso={progresso}
      />

      <Tabs defaultValue="plano-acao" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="plano-acao">Ações Estratégicas</TabsTrigger>
          <TabsTrigger value="implementacao">Implementação (6 meses)</TabsTrigger>
          <TabsTrigger value="comerciais">Ações Comerciais</TabsTrigger>
          <TabsTrigger value="ferramentas">
            <Eye className="mr-2 h-4 w-4" />
            Ver Resultados
          </TabsTrigger>
        </TabsList>

        <TabsContent value="plano-acao">
          <DraggableActionsList 
            acoes={acoesEstrategicas}
            titulo="Plano de Ação Estratégico"
            onToggleAcao={toggleAcaoConcluida}
            onReorderAcoes={reordenarAcoes}
          />
        </TabsContent>

        <TabsContent value="implementacao">
          <DraggableActionsList 
            acoes={acoesImplementacao}
            titulo="Plano de Implementação - 6 Meses"
            onToggleAcao={toggleAcaoConcluida}
            onReorderAcoes={reordenarAcoes}
          />
        </TabsContent>

        <TabsContent value="comerciais">
          <CommercialActionsSection acoesComerciais={dados.acoesComerciais} />
        </TabsContent>

        <TabsContent value="ferramentas">
          <FerramentasResultados dados={dados} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlanoAcaoGerado;
