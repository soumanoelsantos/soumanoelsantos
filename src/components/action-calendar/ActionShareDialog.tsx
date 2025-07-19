
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ActionCalendar, CreateActionData } from '@/types/actionCalendar';
import { toast } from 'sonner';
import { Copy, ExternalLink } from 'lucide-react';

interface ActionShareDialogProps {
  action: ActionCalendar;
  isOpen: boolean;
  onClose: () => void;
  onTogglePublic: (id: string, isPublic: boolean) => Promise<ActionCalendar>;
}

const ActionShareDialog = ({ action, isOpen, onClose, onTogglePublic }: ActionShareDialogProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Usar o share_token da ação para gerar o link
  const shareUrl = action.is_public && action.share_token
    ? `${window.location.origin}/shared/calendar/${action.share_token}`
    : '';

  console.log('ActionShareDialog - Dados da ação:', {
    id: action.id,
    title: action.title,
    is_public: action.is_public,
    share_token: action.share_token,
    shareUrl
  });

  const handleTogglePublic = async (isPublic: boolean) => {
    setIsUpdating(true);
    try {
      const updatedAction = await onTogglePublic(action.id, isPublic);
      console.log('Ação atualizada:', updatedAction);
      toast.success(isPublic ? 'Ação tornada pública' : 'Ação tornada privada');
    } catch (error) {
      console.error('Erro ao alterar visibilidade:', error);
      toast.error('Erro ao alterar visibilidade da ação');
    } finally {
      setIsUpdating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shareUrl) return;
    
    console.log('Copiando URL:', shareUrl);
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copiado para a área de transferência');
    } catch (error) {
      console.error('Erro ao copiar link:', error);
      toast.error('Erro ao copiar link');
    }
  };

  const openInNewTab = () => {
    if (!shareUrl) return;
    console.log('Abrindo URL em nova aba:', shareUrl);
    window.open(shareUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar Ação</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">{action.title}</h3>
            <p className="text-sm text-gray-600">
              Responsável: {action.responsible_person} | Setor: {action.department}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="public-toggle">Tornar ação pública</Label>
              <p className="text-xs text-gray-500">
                Permite que outros vejam esta ação através de um link
              </p>
            </div>
            <Switch
              id="public-toggle"
              checked={action.is_public}
              onCheckedChange={handleTogglePublic}
              disabled={isUpdating}
            />
          </div>

          {action.is_public && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label>Link de compartilhamento</Label>
                <div className="flex gap-2">
                  <Input
                    value={shareUrl}
                    readOnly
                    className="text-xs"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={copyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={openInNewTab}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-3 bg-blue-50 rounded-md">
                <p className="text-xs text-blue-800">
                  ✓ Esta ação está pública e pode ser acessada por qualquer pessoa com o link
                </p>
              </div>
            </div>
          )}

          {!action.is_public && (
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-xs text-gray-600">
                Esta ação está privada. Ative o compartilhamento público para gerar um link de acesso.
              </p>
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button onClick={onClose}>
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionShareDialog;
