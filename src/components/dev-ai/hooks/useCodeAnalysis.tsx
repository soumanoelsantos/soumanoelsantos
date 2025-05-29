
import { useState, useEffect } from 'react';

export const useCodeAnalysis = (generatedCode: string, currentError: any) => {
  const [codeStatus, setCodeStatus] = useState<'valid' | 'warning' | 'error'>('valid');

  useEffect(() => {
    if (generatedCode) {
      const hasErrors = generatedCode.includes('undefined') || 
                       generatedCode.includes('Error:') ||
                       currentError;
      const hasWarnings = generatedCode.length < 100 ||
                         !generatedCode.includes('export default');
      
      if (hasErrors) {
        setCodeStatus('error');
      } else if (hasWarnings) {
        setCodeStatus('warning');
      } else {
        setCodeStatus('valid');
      }
    }
  }, [generatedCode, currentError]);

  return { codeStatus };
};
