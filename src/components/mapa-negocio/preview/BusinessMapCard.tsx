
import React from "react";
import { Card } from "@/components/ui/card";

interface BusinessMapCardProps {
  title: string;
  content: string;
  style?: React.CSSProperties;
}

const BusinessMapCard = ({ title, content, style }: BusinessMapCardProps) => {
  return (
    <Card className="map-card col-span-1 p-2 bg-white border border-gray-300" style={style}>
      <h3 className="font-semibold text-sm mb-1">{title}</h3>
      <p className="text-xs">{content}</p>
    </Card>
  );
};

export default BusinessMapCard;
