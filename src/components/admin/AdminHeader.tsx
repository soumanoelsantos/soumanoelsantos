
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MemberHeader from "@/components/MemberHeader";

interface AdminHeaderProps {
  userEmail: string | null;
  onLogout: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ userEmail, onLogout }) => {
  const navigate = useNavigate();

  return (
    <>
      <MemberHeader userEmail={userEmail} onLogout={onLogout} />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-dark-text">Administração de Usuários</h1>
          <Button 
            onClick={() => navigate("/membros")}
            variant="outline"
            className="border-dark-primary/30 text-dark-primary hover:bg-dark-primary/10"
          >
            Voltar para Área de Membros
          </Button>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
