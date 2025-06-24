
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Copy, Share2 } from 'lucide-react';
import { ActionCalendar, CreateActionData } from '@/types/actionCalendar';
import { toast } from 'sonner';

interface ActionShareDialogProps {
  action: ActionCalendar;
  isOpen: boolean;
  onClose: () => void;
  onTogglePublic: (id: string, isPublic: boolean) => Promise<ActionCalendar>;
}

const ActionShareDialog = ({ action, isOpen, onClose, onTogglePublic }: ActionShareDialogProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const shareUrl = action.is_public 
    ? `${window.location.origin}/shared/action/${action.share_token}`
    : '';

  const handleTogglePublic = async (isPublic: boolean) => {
    setIsUpdating(true);
    try {
      await onTogglePublic(action.id, isPublic);
      if (isPublic) {
        toast.success('Ação compartilhada com sucesso!');
      } else {
        toast.success('Compartilhamento desativado');
      }
    } catch (error) {
      console.error('Erro ao alterar compartilhamento:', error);
      toast.error('Erro ao alterar configuração de compartilhamento');
    } finally {
      setIsUpdating(false);
    }
  };

  const copyToClipboard = async () => {
    if (!shareUrl) return;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copiado para a área de transferência!');
    } catch (error) {
      console.error('Erro ao copiar link:', error);
      toast.error('Erro ao copiar link');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Compartilhar Ação
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-2">{action.title}</h3>
            <p className="text-sm text-gray-600">
              Responsável: {action.responsible_person} • {action.department}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="public-toggle">Compartilhamento Público</Label>
              <p className="text-sm text-gray-500">
                Permitir que pessoas externas vejam esta ação
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
              <Label>Link de Compartilhamento</Label>
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="flex-1 text-sm"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="px-3"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Qualquer pessoa com este link poderá visualizar a ação
              </p>
            </div>
          )}

          {!action.is_public && (
            <div className="text-center py-4 text-gray-500">
              <Share2 className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">
                Ative o compartilhamento público para gerar um link de acesso
              </p>
            </div>
          )}

          <div className="flex justify-end">
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
