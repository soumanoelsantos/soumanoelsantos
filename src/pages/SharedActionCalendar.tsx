
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <SharedActionCalendarHeader ownerName={ownerName} />
        <SharedActionCalendarTable actions={actions} />
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Este calendário é compartilhado publicamente pela {ownerName}</p>
        </div>
      </div>
    </div>
  );
};

export default SharedActionCalendar;
