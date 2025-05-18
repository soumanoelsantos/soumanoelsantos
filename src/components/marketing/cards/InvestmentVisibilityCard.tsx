
import React from "react";
import { BarChart4 } from "lucide-react";

const InvestmentVisibilityCard = () => {
  return (
    <>
      <div className="mb-8 flex justify-center">
        <div className="p-4 bg-red-900/30 rounded-full">
          <BarChart4 className="h-10 w-10 text-red-400" />
        </div>
      </div>
      
      <p className="text-xl mb-6 text-gray-300">
        A maioria dos empresários vive uma <strong>situação de incerteza constante</strong> ao investir em marketing digital:
      </p>
    </>
  );
};

export default InvestmentVisibilityCard;
