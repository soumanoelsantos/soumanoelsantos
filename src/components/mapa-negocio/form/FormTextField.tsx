
import React from "react";
import { Textarea } from "@/components/ui/textarea";

interface FormTextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
}

const FormTextField = ({ label, name, value, onChange, placeholder }: FormTextFieldProps) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">{label}</label>
      <Textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="h-32"
      />
    </div>
  );
};

export default FormTextField;
