
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Users, Plus, Target, Phone, Calendar, UserX } from 'lucide-react';
import { useSellers } from '@/hooks/useSellers';
import { usePreSalesGoals } from '@/hooks/usePreSalesGoals';
import { useGoalTypes } from '@/hooks/useGoalTypes';
import { toast } from 'sonner';

const SDRTeamManagementCard: React.FC = () => {
  const { sellers, isLoading } = useSellers();
  const { createPreSalesGoal } = usePreSalesGoals();
  const { goalTypes, createGoalType } = useGoalTypes();
  
  const [companyGoals, setCompanyGoals] = useState({
    tentativas: 0,
    agendamentos: 0,
    noShow: 0,
    reagendamentos: 0
  });

  // Filtrar apenas SDRs
  const sdrs = sellers.filter(seller => seller.seller_type === 'sdr' && seller.is_active);

  // Filtrar tipos de metas de pré-vendas
  const preSalesGoalTypes = goalTypes.filter(gt => gt.category === 'pre_vendas');

  const handleCreateGoalTypes = async () => {
    const goalTypesToCreate = [
      { name: 'Tentativas de Ligação Diárias', unit: 'tentativas', category: 'pre_vendas', target_scope: 'individual' as const },
      { name: 'Agendamentos Diários', unit: 'agendamentos', category: 'pre_vendas', target_scope: 'individual' as const },
      { name: 'No Show Diário', unit: 'no_show', category: 'pre_vendas', target_scope: 'individual' as const },
      { name: 'Reagendamentos Diários', unit: 'reagendamentos', category: 'pre_vendas', target_scope: 'individual' as const }
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

    // Criar metas individuais para cada SDR baseado na divisão das metas da empresa
    const goalTypes = [
      { key: 'tentativas', name: 'Tentativas de Ligação Diárias' },
      { key: 'agendamentos', name: 'Agendamentos Diários' },
      { key: 'noShow', name: 'No Show Diário' },
      { key: 'reagendamentos', name: 'Reagendamentos Diários' }
    ];

    for (const goalType of goalTypes) {
      const goalTypeRecord = preSalesGoalTypes.find(gt => gt.name === goalType.name);
      if (!goalTypeRecord) continue;

      const companyValue = companyGoals[goalType.key as keyof typeof companyGoals];
      if (companyValue <= 0) continue;

      const individualGoal = Math.ceil(companyValue / sdrs.length);

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
      noShow: 0,
      reagendamentos: 0
    });
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
            <h4 className="text-sm font-medium">Metas da Empresa (Mensais)</h4>
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
              <Input
                type="number"
                value={companyGoals.tentativas}
                onChange={(e) => setCompanyGoals(prev => ({ 
                  ...prev, 
                  tentativas: parseInt(e.target.value) || 0 
                }))}
                placeholder="Ex: 1200"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Agendamentos (mês)
              </Label>
              <Input
                type="number"
                value={companyGoals.agendamentos}
                onChange={(e) => setCompanyGoals(prev => ({ 
                  ...prev, 
                  agendamentos: parseInt(e.target.value) || 0 
                }))}
                placeholder="Ex: 240"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <UserX className="h-4 w-4" />
                No Show (mês)
              </Label>
              <Input
                type="number"
                value={companyGoals.noShow}
                onChange={(e) => setCompanyGoals(prev => ({ 
                  ...prev, 
                  noShow: parseInt(e.target.value) || 0 
                }))}
                placeholder="Ex: 48"
                min="0"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Reagendamentos (mês)
              </Label>
              <Input
                type="number"
                value={companyGoals.reagendamentos}
                onChange={(e) => setCompanyGoals(prev => ({ 
                  ...prev, 
                  reagendamentos: parseInt(e.target.value) || 0 
                }))}
                placeholder="Ex: 60"
                min="0"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button 
              onClick={handleDistributeGoals}
              disabled={sdrs.length === 0 || Object.values(companyGoals).every(v => v <= 0)}
              className="w-full"
            >
              <Target className="h-4 w-4 mr-2" />
              Distribuir Metas Entre SDRs
            </Button>
            
            {sdrs.length > 0 && (
              <div className="text-xs text-gray-500 text-center">
                As metas serão divididas igualmente entre {sdrs.length} SDR{sdrs.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>

        {/* Informações sobre distribuição */}
        {sdrs.length > 0 && Object.values(companyGoals).some(v => v > 0) && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="text-sm font-medium mb-2">Prévia da Distribuição:</h5>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {companyGoals.tentativas > 0 && (
                <div>Tentativas por SDR: {Math.ceil(companyGoals.tentativas / sdrs.length)}/mês</div>
              )}
              {companyGoals.agendamentos > 0 && (
                <div>Agendamentos por SDR: {Math.ceil(companyGoals.agendamentos / sdrs.length)}/mês</div>
              )}
              {companyGoals.noShow > 0 && (
                <div>No Show por SDR: {Math.ceil(companyGoals.noShow / sdrs.length)}/mês</div>
              )}
              {companyGoals.reagendamentos > 0 && (
                <div>Reagendamentos por SDR: {Math.ceil(companyGoals.reagendamentos / sdrs.length)}/mês</div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SDRTeamManagementCard;
