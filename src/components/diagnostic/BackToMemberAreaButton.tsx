
import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../ui/action-button';

const BackToMemberAreaButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/membros');
  };

  return (
    <ActionButton 
      onClick={handleClick} 
      variant="secondary"
      icon={ArrowLeft}
    >
      Voltar para Área de Membros
    </ActionButton>
  );
};

export default BackToMemberAreaButton;
