
import React from "react";
import MemberContentList from "@/components/MemberContentList";
import DashboardCard from "@/components/member/DashboardCard";
import { useIsMobile } from "@/hooks/use-mobile";

const MemberAreaContent: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold text-gray-800 mb-8 text-center`}>
        Área de Membros
      </h1>
      
      <div className="grid grid-cols-1 gap-8">
        <DashboardCard />
        <MemberContentList />
      </div>
    </div>
  );
};

export default MemberAreaContent;
