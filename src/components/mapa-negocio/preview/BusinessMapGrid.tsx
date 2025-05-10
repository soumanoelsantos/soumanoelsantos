
import React from "react";
import BusinessMapCard from "./BusinessMapCard";

interface BusinessMapGridProps {
  data: Record<string, string>;
  fields: {
    key: string;
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
    <div className={`business-map-grid grid grid-cols-7 gap-2 ${className}`}>
      {fields.map((field) => 
        shouldDisplayField(data[field.key]) ? (
          <BusinessMapCard 
            key={field.key}
            title={field.title}
            content={data[field.key]}
            style={field.style}
          />
        ) : null
      )}
    </div>
  );
};

export default BusinessMapGrid;
