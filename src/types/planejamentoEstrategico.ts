export interface PerguntaPlanejamento {
  id: string;
  categoria: 'diagnostico' | 'swot' | 'negocio' | 'puv' | 'equipe' | 'fase';
  pergunta: string;
  tipo: 'texto' | 'multipla_escolha' | 'multipla_escolha_multi' | 'escala' | 'sim_nao' | 'swot_guiada' | 'swot_guiada_multi';
  opcoes?: string[];
  direcionamento?: { [key: string]: 'Força' | 'Fraqueza' | 'Oportunidade' | 'Ameaça' | null };
  obrigatoria: boolean;
  dependeDe?: string; // ID da pergunta que deve ser respondida antes
}

export interface RespostaPlanejamento {
  perguntaId: string;
  resposta: string | number | string[]; // Permitir array para múltipla escolha
  observacoes?: string;
  swotClassificacao?: 'Força' | 'Fraqueza' | 'Oportunidade' | 'Ameaça' | null;
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
  tipo?: 'estrategica' | 'comercial_semanal' | 'implementacao';
}

export interface AcaoComercialSemanal {
  id: string;
  acao: string;
  meta: string;
  prazo: string;
  responsavel: string;
  metricas: string;
  semana: number;
}

export interface PlanejamentoEstrategicoData {
  id?: string;
  empresaNome: string;
  respostas: RespostaPlanejamento[];
  ferramentasGeradas: {
    diagnostico?: any;
    swot?: {
      forcas: string[];
      fraquezas: string[];
      oportunidades: string[];
      ameacas: string[];
    };
    mapaNegocios?: any;
    puv?: any;
    mapaEquipe?: any;
    faseEmpresa?: any;
  };
  planoAcao: PlanoAcao[];
  acoesComerciais?: AcaoComercialSemanal[];
  progresso: number; // 0-100
  dataInicio: Date;
  dataAtualizacao: Date;
  status: 'em_andamento' | 'concluido' | 'pausado';
}
