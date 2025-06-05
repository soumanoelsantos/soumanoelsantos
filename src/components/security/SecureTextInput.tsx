
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { sanitizeTextInput, checkRateLimit } from '@/utils/security/inputValidation';
import { useToast } from '@/hooks/use-toast';

interface SecureTextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  multiline?: boolean;
  className?: string;
  rateLimitKey?: string;
}

const SecureTextInput: React.FC<SecureTextInputProps> = ({
  value,
  onChange,
  placeholder,
  maxLength = 1000,
  multiline = false,
  className,
  rateLimitKey
}) => {
  const { toast } = useToast();
  const [isRateLimited, setIsRateLimited] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    
    // Rate limiting check if key provided
    if (rateLimitKey && !checkRateLimit(rateLimitKey, 10, 10000)) {
      if (!isRateLimited) {
        setIsRateLimited(true);
        toast({
          variant: "destructive",
          title: "Muitas tentativas",
          description: "Aguarde alguns segundos antes de continuar digitando.",
        });
        setTimeout(() => setIsRateLimited(false), 10000);
      }
      return;
    }

    // Sanitize input
    const sanitizedValue = sanitizeTextInput(newValue, maxLength);
    onChange(sanitizedValue);
  };

  const commonProps = {
    value,
    onChange: handleChange,
    placeholder,
    maxLength,
    className,
    disabled: isRateLimited
  };

  if (multiline) {
    return <Textarea {...commonProps} />;
  }

  return <Input {...commonProps} />;
};

export default SecureTextInput;
