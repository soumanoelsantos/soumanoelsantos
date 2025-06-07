
export interface PerguntaPlanejamento {
  id: string;
  categoria: string;
  pergunta: string;
  tipo: 'texto' | 'multipla_escolha' | 'multipla_escolha_multi' | 'sim_nao' | 'swot_guiada_multi';
  opcoes?: string[];
  direcionamento?: { [key: string]: string | null };
  obrigatoria: boolean;
}

export interface RespostaPlanejamento {
  perguntaId: string;
  resposta: string | string[];
}

export interface PlanoAcao {
  id: string;
  acao: string;
  categoria: string;
  prioridade: 'alta' | 'media' | 'baixa';
  prazo: string;
  responsavel?: string;
  recursos?: string;
  metricas?: string;
  dataVencimento: Date;
  concluida: boolean;
  tipo?: string;
}

export interface AcaoComercialSemanal {
  id: string;
  semana: number;
  acao: string;
  meta: string;
  prazo: string;
  responsavel: string;
  metricas: string;
}

export interface PlanejamentoEstrategicoData {
  empresaNome: string;
  respostas: RespostaPlanejamento[];
  planoAcao: PlanoAcao[];
  acoesComerciais?: AcaoComercialSemanal[];
  ferramentasGeradas: {
    diagnostico?: any;
    swot?: any;
    puv?: any;
    equipe?: any;
    fase?: any;
  };
  dataCreated: Date;
  dataAtualizacao: Date;
}
