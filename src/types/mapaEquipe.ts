
export interface Colaborador {
  nome: string;
  nivelMaturidade: string;
  estiloLideranca: string;
  perfilComportamental: string;
  futuro: string;
  potencial: string;
}

export interface MapaEquipeData {
  colaboradores: Colaborador[];
  empresaNome: string;
}

export type NivelMaturidade = 
  "M1 (Bebê)" | 
  "M2 (Criança)" | 
  "M3 (Adolescente)" | 
  "M4 (Adulto)";

export type EstiloLideranca = 
  "E1 (Direção)" | 
  "E2 (Treinamento)" | 
  "E3 (Apoio)" | 
  "E4 (Delegação)";

export type PerfilComportamental = 
  "Executor" | 
  "Comunicador" | 
  "Analista" | 
  "Planejador";

export type Potencial = 
  "Sócio" | 
  "Diretor" | 
  "Gestor" | 
  "Supervisor/Coordenador" | 
  "Extraordinário" | 
  "Stand by";
