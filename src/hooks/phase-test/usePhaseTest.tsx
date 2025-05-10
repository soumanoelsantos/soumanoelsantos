
import { usePhaseTestState } from "./usePhaseTestState";
import { usePhaseTestActions } from "./usePhaseTestActions";

export const usePhaseTest = () => {
  const stateHook = usePhaseTestState();
  const { 
    handleAnswer,
    handleNext,
    handlePrevious,
    resetTest
  } = usePhaseTestActions(stateHook);

  return {
    ...stateHook,
    handleAnswer,
    handleNext,
    handlePrevious,
    resetTest
  };
};
