
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

interface SharingData {
  isPublic: boolean;
  shareToken: string | null;
}

export const useDashboardSharing = () => {
  const { userId } = useAuth();
  const [sharingData, setSharingData] = useState<SharingData>({
    isPublic: false,
    shareToken: null
  });
  const [isLoading, setIsLoading] = useState(true);

  const loadSharingData = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('dashboard_configs')
        .select('is_public, share_token')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error loading sharing data:', error);
        return;
      }

      if (data) {
        setSharingData({
          isPublic: data.is_public || false,
          shareToken: data.share_token
        });
      }
    } catch (error) {
      console.error('Error loading sharing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const enablePublicSharing = async () => {
    if (!userId) return;

    try {
      // Generate a new token if one doesn't exist
      const shareToken = sharingData.shareToken || crypto.randomUUID();

      const { error } = await supabase
        .from('dashboard_configs')
        .upsert({
          user_id: userId,
          is_public: true,
          share_token: shareToken,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) {
        console.error('Error enabling public sharing:', error);
        return;
      }

      setSharingData({
        isPublic: true,
        shareToken
      });
    } catch (error) {
      console.error('Error enabling public sharing:', error);
    }
  };

  const disablePublicSharing = async () => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('dashboard_configs')
        .update({
          is_public: false,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) {
        console.error('Error disabling public sharing:', error);
        return;
      }

      setSharingData(prev => ({
        ...prev,
        isPublic: false
      }));
    } catch (error) {
      console.error('Error disabling public sharing:', error);
    }
  };

  const regenerateToken = async () => {
    if (!userId) return;

    try {
      const newToken = crypto.randomUUID();

      const { error } = await supabase
        .from('dashboard_configs')
        .update({
          share_token: newToken,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (error) {
        console.error('Error regenerating token:', error);
        return;
      }

      setSharingData(prev => ({
        ...prev,
        shareToken: newToken
      }));
    } catch (error) {
      console.error('Error regenerating token:', error);
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
    regenerateToken
  };
};
