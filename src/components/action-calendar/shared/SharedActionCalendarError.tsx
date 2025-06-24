
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

interface SharedActionCalendarErrorProps {
  error: string;
}

const SharedActionCalendarError = ({ error }: SharedActionCalendarErrorProps) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md">
        <CardContent className="p-6 text-center">
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Erro</h2>
          <p className="text-gray-600">{error}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SharedActionCalendarError;
