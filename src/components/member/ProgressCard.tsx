
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProgressCardProps {
  completionPercent: number;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ completionPercent }) => {
  return (
    <Card className="bg-white border border-gray-200 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">Seu progresso</CardTitle>
        <CardDescription className="text-gray-600">
          Acompanhe seu avanço nas ferramentas disponíveis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span>Ferramentas completadas</span>
            <span className="font-medium">{completionPercent}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-dark-primary h-2.5 rounded-full transition-all duration-500 ease-in-out" 
              style={{ width: `${completionPercent}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressCard;
