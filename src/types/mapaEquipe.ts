
export interface Colaborador {
  nome: string;
  nivelMaturidade: string;
  estiloLideranca: string;
  perfilComportamental: string;
  futuro: string;
  potencial: string;
}

export interface MapaEquipeData {
  empresaNome: string;
  colaboradores: Colaborador[];
}
