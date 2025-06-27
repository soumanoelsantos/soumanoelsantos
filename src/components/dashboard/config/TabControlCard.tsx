
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings, Eye, EyeOff } from 'lucide-react';

interface TabControlCardProps {
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const TabControlCard: React.FC<TabControlCardProps> = ({
  title,
  description,
  isEnabled,
  onToggle
}) => {
  console.log(`🔧 [DEBUG] TabControlCard - ${title} isEnabled:`, isEnabled);

  const handleToggle = (checked: boolean) => {
    console.log(`🔧 [DEBUG] TabControlCard - ${title} toggling to:`, checked);
    onToggle(checked);
  };

  return (
    <Card className="border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-blue-600" />
          <CardTitle className="text-sm font-medium">
            Controle da Aba {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <Label className="text-sm font-medium">
              Exibir aba no Dashboard
            </Label>
            <p className="text-xs text-gray-600 mt-1">
              {description}
            </p>
          </div>
          <div className="flex items-center gap-2 ml-4">
            {isEnabled ? (
              <Eye className="h-4 w-4 text-green-600" />
            ) : (
              <EyeOff className="h-4 w-4 text-gray-400" />
            )}
            <Switch
              checked={isEnabled}
              onCheckedChange={handleToggle}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TabControlCard;
