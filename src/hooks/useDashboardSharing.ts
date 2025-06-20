
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

interface DashboardSharingData {
  shareToken: string | null;
  isPublic: boolean;
}

export const useDashboardSharing = () => {
  const { userId } = useAuth();
  const [sharingData, setSharingData] = useState<DashboardSharingData>({
    shareToken: null,
    isPublic: false
  });
  const [isLoading, setIsLoading] = useState(true);

  const generateShareToken = () => {
    return crypto.randomUUID().replace(/-/g, '').substring(0, 16);
  };

  const loadSharingData = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('dashboard_configs')
        .select('share_token, is_public')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error loading sharing data:', error);
        return;
      }

      if (data) {
        setSharingData({
          shareToken: data.share_token,
          isPublic: data.is_public || false
        });
      }
    } catch (error) {
      console.error('Error in loadSharingData:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const enablePublicSharing = async () => {
    if (!userId) return null;

    try {
      const newToken = generateShareToken();
      
      const { error } = await supabase
        .from('dashboard_configs')
        .upsert({
          user_id: userId,
          share_token: newToken,
          is_public: true,
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error enabling public sharing:', error);
        toast.error('Erro ao habilitar compartilhamento público');
        return null;
      }

      setSharingData({
        shareToken: newToken,
        isPublic: true
      });

      toast.success('Compartilhamento público habilitado!');
      return newToken;
    } catch (error) {
      console.error('Error in enablePublicSharing:', error);
      toast.error('Erro ao habilitar compartilhamento público');
      return null;
    }
  };

  const disablePublicSharing = async () => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('dashboard_configs')
        .update({ is_public: false })
        .eq('user_id', userId);

      if (error) {
        console.error('Error disabling public sharing:', error);
        toast.error('Erro ao desabilitar compartilhamento público');
        return;
      }

      setSharingData({
        shareToken: sharingData.shareToken,
        isPublic: false
      });

      toast.success('Compartilhamento público desabilitado!');
    } catch (error) {
      console.error('Error in disablePublicSharing:', error);
      toast.error('Erro ao desabilitar compartilhamento público');
    }
  };

  const regenerateToken = async () => {
    if (!userId) return null;

    try {
      const newToken = generateShareToken();
      
      const { error } = await supabase
        .from('dashboard_configs')
        .update({ share_token: newToken })
        .eq('user_id', userId);

      if (error) {
        console.error('Error regenerating token:', error);
        toast.error('Erro ao regenerar token');
        return null;
      }

      setSharingData({
        shareToken: newToken,
        isPublic: sharingData.isPublic
      });

      toast.success('Token regenerado com sucesso!');
      return newToken;
    } catch (error) {
      console.error('Error in regenerateToken:', error);
      toast.error('Erro ao regenerar token');
      return null;
    }
  };

  useEffect(() => {
    loadSharingData();
  }, [userId]);

  return {
    sharingData,
    isLoading,
    enablePublicSharing,
    disablePublicSharing,
    regenerateToken,
    refetch: loadSharingData
  };
};
