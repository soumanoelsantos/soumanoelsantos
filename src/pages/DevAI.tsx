
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import DevAIContent from '@/components/dev-ai/DevAIContent';
import UnauthenticatedView from '@/components/crm/views/UnauthenticatedView';

const DevAI = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <UnauthenticatedView />;
  }

  return <DevAIContent />;
};

export default DevAI;
