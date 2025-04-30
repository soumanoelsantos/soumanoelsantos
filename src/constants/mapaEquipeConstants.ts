
import { 
  NivelMaturidade, 
  EstiloLideranca, 
  PerfilComportamental,
  Potencial
} from "@/types/mapaEquipe";

// Opções para os dropdowns
export const niveisMaturidadeOptions: NivelMaturidade[] = [
  "M1 (Bebê)",
  "M2 (Criança)",
  "M3 (Adolescente)",
  "M4 (Adulto)"
];

export const estilosLiderancaOptions: EstiloLideranca[] = [
  "E1 (Direção)",
  "E2 (Treinamento)",
  "E3 (Apoio)",
  "E4 (Delegação)"
];

export const perfisComportamentaisOptions: PerfilComportamental[] = [
  "Executor",
  "Comunicador",
  "Analista",
  "Planejador"
];

export const potenciaisOptions: Potencial[] = [
  "Sócio",
  "Diretor",
  "Gestor",
  "Supervisor/Coordenador",
  "Extraordinário",
  "Stand by"
];
