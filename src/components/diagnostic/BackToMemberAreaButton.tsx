
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BackToMemberAreaButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/membros');
  };

  return (
    <Button 
      onClick={handleClick} 
      className="bg-[#1d365c] hover:bg-[#1d365c]/90 text-white"
      size="lg"
    >
      <ArrowLeft className="mr-2" size={18} />
      Voltar para Área de Membros
    </Button>
  );
};

export default BackToMemberAreaButton;
