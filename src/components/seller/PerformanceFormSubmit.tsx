
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

interface PerformanceFormSubmitProps {
  isSubmitting: boolean;
}

const PerformanceFormSubmit: React.FC<PerformanceFormSubmitProps> = ({ isSubmitting }) => {
  return (
    <div className="flex gap-3 pt-4">
      <Button
        type="submit"
        disabled={isSubmitting}
        className="flex-1"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Salvando...
          </>
        ) : (
          <>
            <TrendingUp className="h-4 w-4 mr-2" />
            Registrar Performance
          </>
        )}
      </Button>
    </div>
  );
};

export default PerformanceFormSubmit;
