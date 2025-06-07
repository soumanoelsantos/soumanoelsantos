
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { 
  loadDiagnosticDataFromSupabase,
  loadSwotData,
  loadChecklistData,
  loadBusinessMapData,
  loadPUVData,
  loadMapaEquipeData,
  loadPhaseTestResults
} from '@/utils/storage';

export interface IntegratedData {
  diagnostic: any;
  swot: any;
  checklist: any;
  businessMap: any;
  puv: any;
  mapaEquipe: any;
  phaseTest: any;
}

export const useIntegratedData = () => {
  const { userId } = useAuth();
  const [data, setData] = useState<IntegratedData>({
    diagnostic: null,
    swot: null,
    checklist: null,
    businessMap: null,
    puv: null,
    mapaEquipe: null,
    phaseTest: null
  });
  const [isLoading, setIsLoading] = useState(false);

  const loadAllData = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const [
        diagnosticData,
        swotData,
        checklistData,
        businessMapData,
        puvData,
        mapaEquipeData,
        phaseTestData
      ] = await Promise.all([
        loadDiagnosticDataFromSupabase(userId),
        loadSwotData(userId),
        loadChecklistData(userId),
        loadBusinessMapData(userId),
        loadPUVData(userId),
        loadMapaEquipeData(userId),
        loadPhaseTestResults(userId)
      ]);

      setData({
        diagnostic: diagnosticData,
        swot: swotData,
        checklist: checklistData,
        businessMap: businessMapData,
        puv: puvData,
        mapaEquipe: mapaEquipeData,
        phaseTest: phaseTestData
      });
    } catch (error) {
      console.error('Erro ao carregar dados integrados:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [userId]);

  return { data, isLoading, reloadData: loadAllData };
};
