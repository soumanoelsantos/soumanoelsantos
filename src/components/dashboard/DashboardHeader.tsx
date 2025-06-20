
import React, { useState } from 'react';
import { ArrowLeft, Settings, Share2, Copy, Check, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { useDashboardSharing } from '@/hooks/useDashboardSharing';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const DashboardHeader = () => {
  const navigate = useNavigate();
  const { config } = useDashboardConfig();
  const { sharingData, enablePublicSharing, disablePublicSharing, regenerateToken } = useDashboardSharing();
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (!sharingData.shareToken) return '';
    const baseUrl = window.location.origin;
    return `${baseUrl}/dashboard/compartilhado/${sharingData.shareToken}`;
  };

  const handleShare = () => {
    setShareDialogOpen(true);
  };

  const handleTogglePublicSharing = async (enabled: boolean) => {
    if (enabled) {
      await enablePublicSharing();
    } else {
      await disablePublicSharing();
    }
  };

  const handleCopyLink = async () => {
    const shareUrl = getShareUrl();
    if (!shareUrl) {
      toast.error("Primeiro ative o compartilhamento público");
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copiado para a área de transferência!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erro ao copiar link:', error);
      toast.error("Erro ao copiar o link");
    }
  };

  const handleNativeShare = async () => {
    const shareUrl = getShareUrl();
    if (!shareUrl) {
      toast.error("Primeiro ative o compartilhamento público");
      return;
    }

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${config.companyName ? `${config.companyName} - Dashboard` : 'Dashboard Empresarial'}`,
          text: 'Confira este dashboard empresarial',
          url: shareUrl,
        });
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
        if (error.name !== 'AbortError') {
          toast.error("Erro ao compartilhar");
        }
      }
    } else {
      handleCopyLink();
    }
  };

  const handleRegenerateToken = async () => {
    await regenerateToken();
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/membros')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {config.companyName ? `${config.companyName} - Dashboard` : 'Dashboard Empresarial'}
                  </h1>
                  {sharingData.isPublic && (
                    <Badge variant="outline" className="text-green-600 border-green-200">
                      <Eye className="h-3 w-3 mr-1" />
                      Público
                    </Badge>
                  )}
                </div>
                <p className="text-gray-600">Acompanhe suas métricas em tempo real</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/dashboard/configurar')}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Configurar
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Compartilhar Dashboard</DialogTitle>
            <DialogDescription>
              Configure o compartilhamento público do seu dashboard para que outras pessoas possam visualizá-lo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Compartilhamento Público</Label>
                <p className="text-xs text-gray-500">
                  Permite que qualquer pessoa com o link visualize seu dashboard
                </p>
              </div>
              <Switch
                checked={sharingData.isPublic}
                onCheckedChange={handleTogglePublicSharing}
              />
            </div>

            {sharingData.isPublic && sharingData.shareToken && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="dashboard-url">Link do Dashboard</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="dashboard-url"
                      value={getShareUrl()}
                      readOnly
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      onClick={handleCopyLink}
                      className="flex items-center gap-2"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copiado
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copiar
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRegenerateToken}
                    className="flex items-center gap-2"
                  >
                    <RefreshCw className="h-4 w-4" />
                    Regenerar Link
                  </Button>
                  
                  {navigator.share && (
                    <Button
                      onClick={handleNativeShare}
                      size="sm"
                      className="flex items-center gap-2"
                    >
                      <Share2 className="h-4 w-4" />
                      Compartilhar
                    </Button>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Eye className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900">Dashboard Público</p>
                      <p className="text-blue-700">
                        Qualquer pessoa com este link poderá visualizar suas métricas em tempo real.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!sharingData.isPublic && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <EyeOff className="h-4 w-4 text-gray-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-gray-900">Dashboard Privado</p>
                    <p className="text-gray-700">
                      Apenas você pode visualizar este dashboard. Ative o compartilhamento público para gerar um link compartilhável.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardHeader;
