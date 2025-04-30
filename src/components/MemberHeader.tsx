
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserIcon, LogOut, Settings, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface MemberHeaderProps {
  userEmail: string | null;
  onLogout: () => void;
}

const MemberHeader: React.FC<MemberHeaderProps> = ({ userEmail, onLogout }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [isAdminViewingAsUser, setIsAdminViewingAsUser] = useState(false);
  const [originalAdminEmail, setOriginalAdminEmail] = useState<string | null>(null);
  
  useEffect(() => {
    const adminViewingFlag = localStorage.getItem('adminViewingAsUser') === 'true';
    const adminEmail = localStorage.getItem('adminOriginalEmail');
    
    setIsAdminViewingAsUser(adminViewingFlag);
    setOriginalAdminEmail(adminEmail);
  }, []);
  
  const handleReturnToAdmin = () => {
    // Restore the original admin email
    if (originalAdminEmail) {
      localStorage.setItem('userEmail', originalAdminEmail);
    }
    
    // Remove the admin viewing flag
    localStorage.removeItem('adminViewingAsUser');
    localStorage.removeItem('adminOriginalEmail');
    
    toast({
      title: "Retornando para admin",
      description: "Você retornou para sua visão de administrador",
    });
    
    // Navigate to admin page
    navigate('/admin');
  };
  
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/membros" className="text-2xl font-bold text-dark-primary">
            Programa Maximus
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-gray-700">
              <UserIcon className="h-4 w-4" />
              <span>{userEmail}</span>
            </div>
            
            {isAdminViewingAsUser && (
              <Button 
                variant="outline"
                size="sm"
                onClick={handleReturnToAdmin}
                className="border-orange-400 text-orange-600 hover:bg-orange-50"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retornar ao Admin
              </Button>
            )}
            
            {isAdmin && !isAdminViewingAsUser && (
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate("/admin")}
                className="border-dark-primary/30 text-dark-primary hover:bg-dark-primary/10"
              >
                <Settings className="mr-2 h-4 w-4" />
                Admin
              </Button>
            )}
            
            <Button 
              variant="outline"
              size="sm"
              onClick={onLogout}
              className="border-dark-primary/30 text-dark-primary hover:bg-dark-primary/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MemberHeader;
