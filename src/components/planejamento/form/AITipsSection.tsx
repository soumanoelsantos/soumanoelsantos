
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, Sparkles } from "lucide-react";

interface AITipsSectionProps {
  dicaIA: string;
}

const AITipsSection: React.FC<AITipsSectionProps> = ({ dicaIA }) => {
  if (!dicaIA) return null;

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-2">
            <Lightbulb className="h-4 w-4" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-blue-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Dica da IA - Como responder melhor:
            </p>
            <div className="text-blue-800 text-sm leading-relaxed whitespace-pre-line">
              {dicaIA}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AITipsSection;
