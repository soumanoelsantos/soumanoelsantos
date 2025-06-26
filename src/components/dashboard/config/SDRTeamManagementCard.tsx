
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Plus, Target, Phone, Calendar, UserX, Settings, Save } from 'lucide-react';
import { useSellers } from '@/hooks/useSellers';
import { usePreSalesGoals } from '@/hooks/usePreSalesGoals';
import { useGoalTypes } from '@/hooks/useGoalTypes';
import { SDRGoalDistribution } from '@/types/preSalesGoals';
import CustomGoalDistributionDialog from './CustomGoalDistributionDialog';
import { toast } from 'sonner';

const SDRTeamManagementCard: React.FC = () => {
  const { sellers, isLoading } = useSellers();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  
  const { preSalesGoals, createPreSalesGoal, isLoading: goalsLoading } = usePreSalesGoals(currentMonth, currentYear);
  const { goalTypes, createGoalType } = useGoalTypes();
  
  const [companyGoals, setCompanyGoals] = useState({
    tentativas: 0,
    agendamentos: 0,
    noShow: 20,
    reagendamentos: 15
  });

  const [showCustomDistribution, setShowCustomDistribution] = useState(false);
  const [currentGoalForDistribution, setCurrentGoalForDistribution] = useState<{
    type: string;
    value: number;
    isPercentage: boolean;
    goalTypeId: string;
  } | null>(null);

  // Filtrar apenas SDRs
  const sdrs = sellers.filter(seller => seller.seller_type === 'sdr' && seller.is_active);

  // Filtrar tipos de metas de pré-vendas
  const preSalesGoalTypes = goalTypes.filter(gt => gt.category === 'pre_vendas');

  // Carregar metas existentes nos campos do formulário
  useEffect(() => {
    if (!goalsLoading && preSalesGoals.length > 0) {
      console.log('🔍 Carregando metas existentes:', preSalesGoals);
      
      // Filtrar apenas metas da empresa (sem seller_id)
      const companyGoalsData = preSalesGoals.filter(goal => !goal.seller_id);
      
      const updatedGoals = { ...companyGoals };
      
      companyGoalsData.forEach(goal => {
        if (goal.goal_type?.name === 'Tentativas de Ligação Diárias') {
          updatedGoals.tentativas = Number(goal.target_value);
        } else if (goal.goal_type?.name === 'Agendamentos Diários') {
          updatedGoals.agendamentos = Number(goal.target_value);
        } else if (goal.goal_type?.name === 'No Show Máximo') {
          updatedGoals.noShow = Number(goal.target_value);
        } else if (goal.goal_type?.name === 'Taxa de Reagendamento') {
          updatedGoals.reagendamentos = Number(goal.target_value);
        }
      });
      
      console.log('✅ Metas carregadas nos campos:', updatedGoals);
      setCompanyGoals(updatedGoals);
    }
  }, [preSalesGoals, goalsLoading]);

  const ensureGoalTypesExist = async () => {
    console.log('🔍 Verificando tipos de metas existentes...');
    
    const goalTypesToCreate = [
      { name: 'Tentativas de Ligação Diárias', unit: 'tentativas', category: 'pre_vendas', target_scope: 'individual' as const, is_percentage: false },
      { name: 'Agendamentos Diários', unit: 'agendamentos', category: 'pre_vendas', target_scope: 'individual' as const, is_percentage: false },
      { name: 'No Show Máximo', unit: '%', category: 'pre_vendas', target_scope: 'individual' as const, is_percentage: true },
      { name: 'Taxa de Reagendamento', unit: '%', category: 'pre_vendas', target_scope: 'individual' as const, is_percentage: true }
    ];

    for (const goalType of goalTypesToCreate) {
      // Verificar se já existe
      const exists = goalTypes.some(gt => 
        gt.name === goalType.name && 
        gt.category === goalType.category
      );
      
      if (!exists) {
        console.log('🆕 Criando tipo de meta:', goalType.name);
        await createGoalType(goalType);
      }
    }
  };

  const handleSaveGoals = async () => {
    try {
      console.log('🎯 SALVANDO METAS - Início do processo');
      
      // Validar se pelo menos uma meta foi definida
      const hasGoals = Object.values(companyGoals).some(value => value > 0);
      if (!hasGoals) {
        toast.error('Defina pelo menos uma meta antes de salvar');
        return;
      }

      // Garantir que os tipos de metas existam
      await ensureGoalTypesExist();
      
      // Aguardar um pouco para garantir que os tipos foram criados
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mapear as metas com seus tipos
      const goalMappings = [
        { key: 'tentativas', name: 'Tentativas de Ligação Diárias', isPercentage: false },
        { key: 'agendamentos', name: 'Agendamentos Diários', isPercentage: false },
        { key: 'noShow', name: 'No Show Máximo', isPercentage: true },
        { key: 'reagendamentos', name: 'Taxa de Reagendamento', isPercentage: true }
      ];

      let savedCount = 0;
      let errors = [];

      for (const goalMapping of goalMappings) {
        const companyValue = companyGoals[goalMapping.key as keyof typeof companyGoals];
        if (companyValue <= 0) {
          continue;
        }

        // Buscar o tipo de meta (aguardar um pouco mais se necessário)
        let goalTypeRecord = goalTypes.find(gt => 
          gt.name === goalMapping.name && gt.category === 'pre_vendas'
        );
        
        // Se ainda não encontrou, tentar buscar novamente
        if (!goalTypeRecord) {
          await new Promise(resolve => setTimeout(resolve, 500));
          goalTypeRecord = goalTypes.find(gt => 
            gt.name === goalMapping.name && gt.category === 'pre_vendas'
          );
        }
        
        if (!goalTypeRecord) {
          console.error('❌ Tipo de meta não encontrado:', goalMapping.name);
          errors.push(`Tipo de meta "${goalMapping.name}" não encontrado`);
          continue;
        }

        console.log('💾 Salvando meta:', {
          goal_type_id: goalTypeRecord.id,
          month: currentMonth,
          year: currentYear,
          target_value: companyValue,
          goal_name: goalMapping.name
        });

        // Salvar meta da empresa (sem seller_id)
        const success = await createPreSalesGoal({
          goal_type_id: goalTypeRecord.id,
          month: currentMonth,
          year: currentYear,
          target_value: companyValue
        });

        if (success) {
          savedCount++;
          console.log('✅ Meta salva:', goalMapping.name);
        } else {
          console.error('❌ Falha ao salvar meta:', goalMapping.name);
          errors.push(`Falha ao salvar "${goalMapping.name}"`);
        }
      }

      console.log('📊 Resultado final:', { savedCount, errors });

      if (savedCount > 0) {
        toast.success(`${savedCount} meta(s) salva(s) com sucesso!`);
      }
      
      if (errors.length > 0) {
        toast.error(`Alguns erros: ${errors.join(', ')}`);
      }
      
    } catch (error) {
      console.error('❌ Erro geral ao salvar metas:', error);
      toast.error('Erro ao salvar as metas: ' + (error instanceof Error ? error.message : 'Erro desconhecido'));
    }
  };

  const handleDistributeGoals = async () => {
    if (sdrs.length === 0) {
      toast.error('Nenhum SDR encontrado para distribuir as metas');
      return;
    }

    // Distribuir metas igualmente por padrão
    const goalTypes = [
      { key: 'tentativas', name: 'Tentativas de Ligação Diárias', isPercentage: false },
      { key: 'agendamentos', name: 'Agendamentos Diários', isPercentage: false },
      { key: 'noShow', name: 'No Show Máximo', isPercentage: true },
      { key: 'reagendamentos', name: 'Taxa de Reagendamento', isPercentage: true }
    ];

    for (const goalType of goalTypes) {
      const goalTypeRecord = preSalesGoalTypes.find(gt => gt.name === goalType.name);
      if (!goalTypeRecord) continue;

      const companyValue = companyGoals[goalType.key as keyof typeof companyGoals];
      if (companyValue <= 0) continue;

      const individualGoal = goalType.isPercentage 
        ? companyValue // Para porcentagem, cada SDR tem a mesma meta
        : Math.ceil(companyValue / sdrs.length);

      for (const sdr of sdrs) {
        await createPreSalesGoal({
          goal_type_id: goalTypeRecord.id,
          seller_id: sdr.id,
          month: currentMonth,
          year: currentYear,
          target_value: individualGoal
        });
      }
    }

    toast.success('Metas distribuídas com sucesso entre os SDRs!');
  };

  const handleCustomDistribution = (goalKey: string) => {
    const goalType = {
      tentativas: { name: 'Tentativas de Ligação Diárias', isPercentage: false },
      agendamentos: { name: 'Agendamentos Diários', isPercentage: false },
      noShow: { name: 'No Show Máximo', isPercentage: true },
      reagendamentos: { name: 'Taxa de Reagendamento', isPercentage: true }
    }[goalKey];

    if (!goalType) return;

    const goalTypeRecord = preSalesGoalTypes.find(gt => gt.name === goalType.name);
    if (!goalTypeRecord) return;

    const value = companyGoals[goalKey as keyof typeof companyGoals];
    if (value <= 0) return;

    setCurrentGoalForDistribution({
      type: goalType.name,
      value,
      isPercentage: goalType.isPercentage,
      goalTypeId: goalTypeRecord.id
    });
    setShowCustomDistribution(true);
  };

  const handleCustomDistributionSave = async (distributions: SDRGoalDistribution[]) => {
    if (!currentGoalForDistribution) return;

    for (const distribution of distributions) {
      await createPreSalesGoal({
        goal_type_id: currentGoalForDistribution.goalTypeId,
        seller_id: distribution.seller_id,
        month: currentMonth,
        year: currentYear,
        target_value: distribution.target_value
      });
    }

    toast.success('Metas personalizadas distribuídas com sucesso!');
    setCurrentGoalForDistribution(null);
  };

  if (isLoading || goalsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gerenciar Time de SDRs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            Carregando SDRs e metas...
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Gerenciar Time de SDRs
          </CardTitle>
          <CardDescription>
            Gerencie seu time de SDRs e distribua metas da empresa entre eles
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Lista de SDRs */}
          <div>
            <h4 className="text-sm font-medium mb-3">Time de SDRs ({sdrs.length})</h4>
            {sdrs.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                <p>Nenhum SDR cadastrado.</p>
                <p className="text-sm">Vá para a aba Comercial para adicionar SDRs.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {sdrs.map((sdr) => (
                  <div key={sdr.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{sdr.name}</div>
                      <div className="text-sm text-gray-500">{sdr.email}</div>
                    </div>
                    <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      SDR
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Configuração de Metas da Empresa */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Metas da Empresa</h4>
              <div className="text-xs text-gray-500">
                Mês: {currentMonth}/{currentYear}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Tentativas de Ligação (diária)
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={companyGoals.tentativas}
                    onChange={(e) => setCompanyGoals(prev => ({ 
                      ...prev, 
                      tentativas: parseInt(e.target.value) || 0 
                    }))}
                    placeholder="Ex: 300"
                    min="0"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCustomDistribution('tentativas')}
                    disabled={companyGoals.tentativas <= 0 || sdrs.length === 0}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Agendamentos (diários)
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={companyGoals.agendamentos}
                    onChange={(e) => setCompanyGoals(prev => ({ 
                      ...prev, 
                      agendamentos: parseInt(e.target.value) || 0 
                    }))}
                    placeholder="Ex: 5"
                    min="0"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCustomDistribution('agendamentos')}
                    disabled={companyGoals.agendamentos <= 0 || sdrs.length === 0}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <UserX className="h-4 w-4" />
                  No Show Máximo (%)
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={companyGoals.noShow}
                    onChange={(e) => setCompanyGoals(prev => ({ 
                      ...prev, 
                      noShow: parseFloat(e.target.value) || 0 
                    }))}
                    placeholder="Ex: 20"
                    min="0"
                    max="100"
                    step="0.1"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCustomDistribution('noShow')}
                    disabled={companyGoals.noShow <= 0 || sdrs.length === 0}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Taxa de Reagendamento (%)
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={companyGoals.reagendamentos}
                    onChange={(e) => setCompanyGoals(prev => ({ 
                      ...prev, 
                      reagendamentos: parseFloat(e.target.value) || 0 
                    }))}
                    placeholder="Ex: 15"
                    min="0"
                    max="100"
                    step="0.1"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCustomDistribution('reagendamentos')}
                    disabled={companyGoals.reagendamentos <= 0 || sdrs.length === 0}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button 
                  onClick={handleSaveGoals}
                  variant="outline"
                  className="flex-1"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Metas
                </Button>
                
                <Button 
                  onClick={handleDistributeGoals}
                  disabled={sdrs.length === 0 || Object.values(companyGoals).every(v => v <= 0)}
                  className="flex-1"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Distribuir Entre SDRs
                </Button>
              </div>
              
              {sdrs.length > 0 && (
                <div className="text-xs text-gray-500 text-center">
                  Use o botão ⚙️ ao lado de cada meta para distribuição personalizada
                </div>
              )}
            </div>
          </div>

          {/* Informações sobre distribuição */}
          {sdrs.length > 0 && Object.values(companyGoals).some(v => v > 0) && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="text-sm font-medium mb-2">Prévia da Distribuição Igual:</h5>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {companyGoals.tentativas > 0 && (
                  <div>Tentativas por SDR: {Math.ceil(companyGoals.tentativas / sdrs.length)}/dia</div>
                )}
                {companyGoals.agendamentos > 0 && (
                  <div>Agendamentos por SDR: {Math.ceil(companyGoals.agendamentos / sdrs.length)}/dia</div>
                )}
                {companyGoals.noShow > 0 && (
                  <div>No Show por SDR: {companyGoals.noShow}% (máximo)</div>
                )}
                {companyGoals.reagendamentos > 0 && (
                  <div>Reagendamentos por SDR: {companyGoals.reagendamentos}%</div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <CustomGoalDistributionDialog
        open={showCustomDistribution}
        onOpenChange={setShowCustomDistribution}
        sdrs={sdrs}
        goalType={currentGoalForDistribution?.type || ''}
        totalGoal={currentGoalForDistribution?.value || 0}
        isPercentage={currentGoalForDistribution?.isPercentage || false}
        onDistribute={handleCustomDistributionSave}
      />
    </>
  );
};

export default SDRTeamManagementCard;
