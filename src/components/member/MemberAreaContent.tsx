
import React from "react";
import MemberContentList from "@/components/MemberContentList";
import ProgressCard from "@/components/member/ProgressCard";
import MentorshipCard from "@/components/member/MentorshipCard";

interface MemberAreaContentProps {
  completionPercent: number;
}

const MemberAreaContent: React.FC<MemberAreaContentProps> = ({ completionPercent }) => {
  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Área de Membros</h1>
      
      <div className="grid grid-cols-1 gap-6">
        <ProgressCard completionPercent={completionPercent} />
        <MemberContentList />
        <MentorshipCard />
      </div>
    </div>
  );
};

export default MemberAreaContent;
