
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface PUVFormFieldProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

const PUVFormField = ({ name, label, value, onChange, placeholder }: PUVFormFieldProps) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">
        {label}
      </label>
      <Textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-24"
      />
    </div>
  );
};

export default PUVFormField;
