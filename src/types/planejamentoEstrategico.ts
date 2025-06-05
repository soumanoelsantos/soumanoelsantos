
export interface PerguntaPlanejamento {
  id: string;
  categoria: 'diagnostico' | 'swot' | 'negocio' | 'puv' | 'equipe' | 'fase';
  pergunta: string;
  tipo: 'texto' | 'multipla_escolha' | 'escala' | 'sim_nao';
  opcoes?: string[];
  obrigatoria: boolean;
  dependeDe?: string; // ID da pergunta que deve ser respondida antes
}

export interface RespostaPlanejamento {
  perguntaId: string;
  resposta: string | number;
  observacoes?: string;
}

export interface PlanoAcao {
  id: string;
  acao: string;
  categoria: string;
  prazo: string;
  prioridade: 'alta' | 'media' | 'baixa';
  concluida: boolean;
  dataVencimento: Date;
  responsavel?: string;
  recursos?: string;
  metricas?: string;
}

export interface PlanejamentoEstrategicoData {
  id?: string;
  empresaNome: string;
  respostas: RespostaPlanejamento[];
  ferramentasGeradas: {
    diagnostico?: any;
    swot?: any;
    mapaNegocios?: any;
    puv?: any;
    mapaEquipe?: any;
    faseEmpresa?: any;
  };
  planoAcao: PlanoAcao[];
  progresso: number; // 0-100
  dataInicio: Date;
  dataAtualizacao: Date;
  status: 'em_andamento' | 'concluido' | 'pausado';
}
