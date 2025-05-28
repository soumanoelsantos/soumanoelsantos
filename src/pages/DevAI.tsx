
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import DevAIContent from '@/components/dev-ai/DevAIContent';
import UnauthenticatedView from '@/components/crm/views/UnauthenticatedView';
import { DevAIProvider } from '@/components/dev-ai/DevAIContext';

const DevAI = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <UnauthenticatedView />;
  }

  return (
    <DevAIProvider>
      <DevAIContent />
    </DevAIProvider>
  );
};

export default DevAI;
