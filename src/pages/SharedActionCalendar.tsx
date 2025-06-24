
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSharedActionCalendar } from '@/hooks/useSharedActionCalendar';
import SharedActionCalendarHeader from '@/components/action-calendar/shared/SharedActionCalendarHeader';
import SharedActionCalendarTable from '@/components/action-calendar/shared/SharedActionCalendarTable';
import SharedActionCalendarLoading from '@/components/action-calendar/shared/SharedActionCalendarLoading';
import SharedActionCalendarError from '@/components/action-calendar/shared/SharedActionCalendarError';

const SharedActionCalendar = () => {
  const { shareToken } = useParams();
  const { actions, isLoading, error, ownerName } = useSharedActionCalendar(shareToken);

  if (isLoading) {
    return <SharedActionCalendarLoading />;
  }

  if (error) {
    return <SharedActionCalendarError error={error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <SharedActionCalendarHeader ownerName={ownerName} />
        <SharedActionCalendarTable actions={actions} />
        
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-gray-600">
              Atualizado em tempo real
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SharedActionCalendar;
