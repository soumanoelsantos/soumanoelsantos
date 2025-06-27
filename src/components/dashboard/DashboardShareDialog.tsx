
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Share2, Copy, RefreshCw } from 'lucide-react';
import { useDashboardSharing } from '@/hooks/useDashboardSharing';
import { toast } from 'sonner';

interface DashboardShareDialogProps {
  children?: React.ReactNode;
}

const DashboardShareDialog: React.FC<DashboardShareDialogProps> = ({ children }) => {
  const { sharingData, isLoading, enablePublicSharing, disablePublicSharing, regenerateToken } = useDashboardSharing();
  const [isOpen, setIsOpen] = useState(false);

  const shareUrl = sharingData.shareToken 
    ? `${window.location.origin}/shared/${sharingData.shareToken}`
    : '';

  const handleToggleSharing = async (enabled: boolean) => {
    if (enabled) {
      await enablePublicSharing();
    } else {
      await disablePublicSharing();
    }
  };

  const handleCopyUrl = async () => {
    if (shareUrl) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copiado para a área de transferência!');
      } catch (error) {
        console.error('Erro ao copiar URL:', error);
        toast.error('Erro ao copiar link');
      }
    }
  };

  const handleRegenerateToken = async () => {
    await regenerateToken();
    toast.success('Link regenerado com sucesso!');
  };

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {children || (
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Carregando...</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Compartilhar
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar Dashboard</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="public-sharing"
              checked={sharingData.isPublic}
              onCheckedChange={handleToggleSharing}
            />
            <Label htmlFor="public-sharing">
              Habilitar compartilhamento público
            </Label>
          </div>

          {sharingData.isPublic && shareUrl && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="share-url">Link de compartilhamento</Label>
                <div className="flex space-x-2">
                  <Input
                    id="share-url"
                    value={shareUrl}
                    readOnly
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleCopyUrl}
                    className="shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRegenerateToken}
                className="w-full"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerar Link
              </Button>

              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                <p className="font-medium mb-1">ℹ️ Importante:</p>
                <p>Este link permite acesso público ao seu dashboard. Qualquer pessoa com este link poderá visualizar seus dados.</p>
              </div>
            </div>
          )}

          {!sharingData.isPublic && (
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
              <p>Habilite o compartilhamento público para gerar um link de acesso ao seu dashboard.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardShareDialog;
