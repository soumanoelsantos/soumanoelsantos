
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share } from 'lucide-react';
import ActionCalendarManager from '@/components/action-calendar/ActionCalendarManager';
import { useAuth } from '@/hooks/useAuth';
import { useDashboardSharing } from '@/hooks/useDashboardSharing';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Copy, ExternalLink } from 'lucide-react';

const ActionCalendar = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { sharingData, enablePublicSharing, disablePublicSharing } = useDashboardSharing();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleTogglePublicSharing = async (isPublic: boolean) => {
    if (isPublic) {
      await enablePublicSharing();
    } else {
      await disablePublicSharing();
    }
  };

  const copyToClipboard = async () => {
    if (!sharingData.shareToken) return;
    
    const shareUrl = `${window.location.origin}/shared/calendar/${sharingData.shareToken}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copiado para a área de transferência');
    } catch (error) {
      console.error('Erro ao copiar link:', error);
      toast.error('Erro ao copiar link');
    }
  };

  const openInNewTab = () => {
    if (!sharingData.shareToken) return;
    const shareUrl = `${window.location.origin}/shared/calendar/${sharingData.shareToken}`;
    window.open(shareUrl, '_blank');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/membros')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para Área de Membros
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setIsShareDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Share className="h-4 w-4" />
            Compartilhar
          </Button>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Calendário de Ações
          </h1>
          <p className="text-gray-600">
            Gerencie e acompanhe todas as ações da sua equipe em um só lugar
          </p>
        </div>

        <ActionCalendarManager />
      </div>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Compartilhar Calendário de Ações</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="public-toggle">Tornar calendário público</Label>
                <p className="text-xs text-gray-500">
                  Permite que outros vejam suas ações através de um link
                </p>
              </div>
              <Switch
                id="public-toggle"
                checked={sharingData.isPublic}
                onCheckedChange={handleTogglePublicSharing}
              />
            </div>

            {sharingData.isPublic && sharingData.shareToken && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label>Link de compartilhamento</Label>
                  <div className="flex gap-2">
                    <Input
                      value={`${window.location.origin}/shared/calendar/${sharingData.shareToken}`}
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
                    ✓ Seu calendário está público e pode ser acessado por qualquer pessoa com o link
                  </p>
                </div>
              </div>
            )}

            {!sharingData.isPublic && (
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-600">
                  Seu calendário está privado. Ative o compartilhamento público para gerar um link de acesso.
                </p>
              </div>
            )}

            <div className="flex justify-end pt-4">
              <Button onClick={() => setIsShareDialogOpen(false)}>
                Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActionCalendar;
