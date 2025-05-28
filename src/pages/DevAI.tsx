
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import DevAIContent from '@/components/dev-ai/DevAIContent';
import UnauthenticatedView from '@/components/crm/views/UnauthenticatedView';
import { DevAIProvider } from '@/components/dev-ai/DevAIContext';
import { ProjectHistoryProvider } from '@/components/dev-ai/ProjectHistoryContext';

const DevAI = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <UnauthenticatedView />;
  }

  return (
    <DevAIProvider>
      <ProjectHistoryProvider>
        <DevAIContent />
      </ProjectHistoryProvider>
    </DevAIProvider>
  );
};

export default DevAI;
