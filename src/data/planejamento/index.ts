
import { PerguntaPlanejamento } from "@/types/planejamentoEstrategico";
import { negocioQuestions } from "./negocioQuestions";
import { diagnosticoQuestions } from "./diagnosticoQuestions";
import { swotQuestions } from "./swotQuestions";
import { puvQuestions } from "./puvQuestions";
import { equipeQuestions } from "./equipeQuestions";
import { faseQuestions } from "./faseQuestions";

export const perguntasPlanejamento: PerguntaPlanejamento[] = [
  ...negocioQuestions,
  ...diagnosticoQuestions,
  ...swotQuestions,
  ...puvQuestions,
  ...equipeQuestions,
  ...faseQuestions
];

// Export individual question categories for specific use cases
export {
  negocioQuestions,
  diagnosticoQuestions,
  swotQuestions,
  puvQuestions,
  equipeQuestions,
  faseQuestions
};
