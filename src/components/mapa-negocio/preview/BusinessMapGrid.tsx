
import React from "react";
import BusinessMapCard from "./BusinessMapCard";
import { BusinessMapData } from "@/types/businessMap";

interface BusinessMapGridProps {
  data: BusinessMapData;
  fields: {
    key: keyof BusinessMapData;
    title: string;
    style?: React.CSSProperties;
  }[];
  className?: string;
}

const BusinessMapGrid = ({ data, fields, className = "" }: BusinessMapGridProps) => {
  // Helper function to check if a field should be displayed
  const shouldDisplayField = (value: string | undefined): boolean => {
    return !!value && value.trim() !== "" && value !== "Não preenchido";
  };

  return (
    <div className={`grid grid-cols-7 gap-2 ${className}`}>
      {fields.map((field) => {
        const content = data[field.key] as string || "Não preenchido";
        
        if (!shouldDisplayField(content)) {
          return null;
        }
        
        return (
          <BusinessMapCard
            key={field.key}
            title={field.title}
            content={content}
            style={field.style}
          />
        );
      })}
    </div>
  );
};

export default BusinessMapGrid;
