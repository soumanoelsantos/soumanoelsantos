
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SecureSessionData {
  isAdminViewing: boolean;
  originalAdminEmail: string | null;
  sessionStartTime: number;
}

const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes
const STORAGE_KEY = 'secure_session_data';

export const useSecureSession = () => {
  const { toast } = useToast();
  const [sessionData, setSessionData] = useState<SecureSessionData | null>(null);

  // Initialize session data from sessionStorage (more secure than localStorage)
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: SecureSessionData = JSON.parse(stored);
        
        // Check if session has expired
        if (Date.now() - data.sessionStartTime > SESSION_TIMEOUT_MS) {
          clearAdminSession();
          toast({
            variant: "destructive",
            title: "Sessão expirada",
            description: "Sua sessão de administrador expirou por segurança.",
          });
        } else {
          setSessionData(data);
        }
      }
    } catch (error) {
      console.error('Error loading session data:', error);
      clearAdminSession();
    }
  }, [toast]);

  const startAdminSession = (originalEmail: string) => {
    const newSessionData: SecureSessionData = {
      isAdminViewing: true,
      originalAdminEmail: originalEmail,
      sessionStartTime: Date.now()
    };
    
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newSessionData));
    setSessionData(newSessionData);
    
    // Clear old localStorage data for security
    localStorage.removeItem('adminViewingAsUser');
    localStorage.removeItem('adminOriginalEmail');
  };

  const clearAdminSession = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('adminViewingAsUser');
    localStorage.removeItem('adminOriginalEmail');
    setSessionData(null);
  };

  const extendSession = () => {
    if (sessionData) {
      const updatedData = {
        ...sessionData,
        sessionStartTime: Date.now()
      };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      setSessionData(updatedData);
    }
  };

  return {
    isAdminViewing: sessionData?.isAdminViewing || false,
    originalAdminEmail: sessionData?.originalAdminEmail || null,
    startAdminSession,
    clearAdminSession,
    extendSession,
    sessionTimeRemaining: sessionData 
      ? Math.max(0, SESSION_TIMEOUT_MS - (Date.now() - sessionData.sessionStartTime))
      : 0
  };
};
