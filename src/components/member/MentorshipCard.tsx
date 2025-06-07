
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const MentorshipCard: React.FC = () => {
  return (
    <Card className="bg-white border-gray-200 shadow-lg max-w-4xl mx-auto">
      <CardContent className="p-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Área de Membros
          </h2>
          <p className="text-lg text-gray-700">
            Bem-vindo à sua área exclusiva de ferramentas e conteúdo.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MentorshipCard;
