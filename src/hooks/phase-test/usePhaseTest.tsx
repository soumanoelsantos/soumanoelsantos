import { usePhaseTestState } from "./usePhaseTestState";
import { usePhaseTestActions } from "./usePhaseTestActions";

export const usePhaseTest = () => {
  // Get state from usePhaseTestState
  const state = usePhaseTestState();
  
  // Get actions from usePhaseTestActions
  const actions = usePhaseTestActions(state);
  
  // Return all state and actions
  return {
    ...state,
    ...actions
  };
};
