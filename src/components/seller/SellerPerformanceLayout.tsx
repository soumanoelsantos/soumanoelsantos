
import React from 'react';

interface SellerPerformanceLayoutProps {
  children: React.ReactNode;
}

const SellerPerformanceLayout: React.FC<SellerPerformanceLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {children}
      </div>
    </div>
  );
};

export default SellerPerformanceLayout;
