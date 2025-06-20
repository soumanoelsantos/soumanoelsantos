
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSellerToken } from '@/hooks/useSellerToken';
import SellerPerformanceHeader from '@/components/seller/SellerPerformanceHeader';
import SellerPerformanceManager from '@/components/seller/SellerPerformanceManager';
import SellerPerformanceLoading from '@/components/seller/SellerPerformanceLoading';
import SellerPerformanceAccessDenied from '@/components/seller/SellerPerformanceAccessDenied';
import SellerPerformanceFooter from '@/components/seller/SellerPerformanceFooter';
import SellerPerformanceLayout from '@/components/seller/SellerPerformanceLayout';

const SellerPerformanceForm = () => {
  const { token } = useParams<{ token: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { seller, isLoading, handleSubmit } = useSellerToken(token);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      await handleSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <SellerPerformanceLoading />;
  }

  if (!seller) {
    return <SellerPerformanceAccessDenied />;
  }

  return (
    <SellerPerformanceLayout>
      <SellerPerformanceHeader seller={seller} />
      <SellerPerformanceManager 
        seller={seller}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
      />
      <SellerPerformanceFooter />
    </SellerPerformanceLayout>
  );
};

export default SellerPerformanceForm;
