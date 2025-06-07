
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

// Export individual types for components
export type NivelMaturidade = string;
export type EstiloLideranca = string;
export type PerfilComportamental = string;
export type Potencial = string;
