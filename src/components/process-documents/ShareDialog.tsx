
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ProcessDocument, ProcessFolder } from '@/types/processDocuments';
import { Copy, Share2, Globe, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface ShareDialogProps {
  type: 'document' | 'folder';
  item: ProcessDocument | ProcessFolder;
  isOpen: boolean;
  onClose: () => void;
  onTogglePublic: (isPublic: boolean) => void;
}

const ShareDialog = ({ type, item, isOpen, onClose, onTogglePublic }: ShareDialogProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const baseUrl = window.location.origin;
  const shareUrl = `${baseUrl}/shared/${type}/${item.share_token}`;

  const handleTogglePublic = async (checked: boolean) => {
    setIsUpdating(true);
    try {
      await onTogglePublic(checked);
    } catch (error) {
      console.error('Erro ao alterar visibilidade:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copiado para a área de transferência!');
    } catch (error) {
      console.error('Erro ao copiar link:', error);
      toast.error('Erro ao copiar link');
    }
  };

  const title = type === 'document' ? 'documento' : 'pasta';
  const itemName = type === 'document' ? (item as ProcessDocument).title : (item as ProcessFolder).name;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5" />
            Compartilhar {title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">{itemName}</h4>
            <p className="text-sm text-gray-600">
              Compartilhe este {title} com sua equipe através do link público.
            </p>
          </div>

          <div className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center gap-2">
              {item.is_public ? (
                <>
                  <Globe className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">Público</span>
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-600">Privado</span>
                </>
              )}
            </div>
            <Switch
              checked={item.is_public}
              onCheckedChange={handleTogglePublic}
              disabled={isUpdating}
            />
          </div>

          {item.is_public && (
            <div className="space-y-2">
              <Label>Link público</Label>
              <div className="flex gap-2">
                <Input
                  value={shareUrl}
                  readOnly
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopyLink}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500">
                Qualquer pessoa com este link poderá acessar o {title}.
              </p>
            </div>
          )}

          {!item.is_public && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Para compartilhar este {title}, ative a opção "Público" acima. 
                Isso permitirá que qualquer pessoa com o link tenha acesso ao conteúdo.
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

export default ShareDialog;
