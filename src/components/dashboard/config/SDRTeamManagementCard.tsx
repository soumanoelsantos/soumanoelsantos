
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Plus, Target, Phone, Calendar, UserX, Settings } from 'lucide-react';
import { useSellers } from '@/hooks/useSellers';
import { usePreSalesGoals } from '@/hooks/usePreSalesGoals';
import { useGoalTypes } from '@/hooks/useGoalTypes';
import { SDRGoalDistribution } from '@/types/preSalesGoals';
import CustomGoalDistributionDialog from './CustomGoalDistributionDialog';
import { toast } from 'sonner';

const SDRTeamManagementCard: React.FC = () => {
  const { sellers, isLoading } = useSellers();
  const { createPreSalesGoal } = usePreSalesGoals();
  const { goalTypes, createGoalType } = useGoalTypes();
  
  const [companyGoals, setCompanyGoals] = useState({
    tentativas: 0,
    agendamentos: 0,
    noShow: 20, // Porcentagem padrão
    reagendamentos: 15 // Porcentagem padrão
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

  const handleCreateGoalTypes = async () => {
    const goalTypesToCreate = [
      { name: 'Tentativas de Ligação Diárias', unit: 'tentativas', category: 'pre_vendas', target_scope: 'individual' as const, is_percentage: false },
      { name: 'Agendamentos Diários', unit: 'agendamentos', category: 'pre_vendas', target_scope: 'individual' as const, is_percentage: false },
      { name: 'No Show Máximo', unit: '%', category: 'pre_vendas', target_scope: 'individual' as const, is_percentage: true },
      { name: 'Taxa de Reagendamento', unit: '%', category: 'pre_vendas', target_scope: 'individual' as const, is_percentage: true }
    ];

    for (const goalType of goalTypesToCreate) {
      const exists = preSalesGoalTypes.some(gt => gt.name === goalType.name);
      if (!exists) {
        await createGoalType(goalType);
      }
    }
  };

  const handleDistributeGoals = async () => {
    if (sdrs.length === 0) {
      toast.error('Nenhum SDR encontrado para distribuir as metas');
      return;
    }

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

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
    
    // Limpar os campos após distribuição
    setCompanyGoals({
      tentativas: 0,
      agendamentos: 0,
      noShow: 20,
      reagendamentos: 15
    });
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

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

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

  if (isLoading) {
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
            Carregando SDRs...
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
              <Button
                onClick={handleCreateGoalTypes}
                size="sm"
                variant="outline"
              >
                <Target className="h-4 w-4 mr-2" />
                Criar Tipos de Metas
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Tentativas de Ligação (mês)
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={companyGoals.tentativas}
                    onChange={(e) => setCompanyGoals(prev => ({ 
                      ...prev, 
                      tentativas: parseInt(e.target.value) || 0 
                    }))}
                    placeholder="Ex: 1200"
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
                  Agendamentos (mês)
                </Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    value={companyGoals.agendamentos}
                    onChange={(e) => setCompanyGoals(prev => ({ 
                      ...prev, 
                      agendamentos: parseInt(e.target.value) || 0 
                    }))}
                    placeholder="Ex: 240"
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
              <Button 
                onClick={handleDistributeGoals}
                disabled={sdrs.length === 0 || Object.values(companyGoals).every(v => v <= 0)}
                className="w-full"
              >
                <Target className="h-4 w-4 mr-2" />
                Distribuir Metas Igualmente Entre SDRs
              </Button>
              
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
                  <div>Tentativas por SDR: {Math.ceil(companyGoals.tentativas / sdrs.length)}/mês</div>
                )}
                {companyGoals.agendamentos > 0 && (
                  <div>Agendamentos por SDR: {Math.ceil(companyGoals.agendamentos / sdrs.length)}/mês</div>
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

