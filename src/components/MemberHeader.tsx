
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserIcon, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface MemberHeaderProps {
  userEmail: string | null;
  onLogout: () => void;
}

const MemberHeader: React.FC<MemberHeaderProps> = ({ userEmail, onLogout }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  return (
    <header className="bg-dark-background border-b border-dark-primary/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/membros" className="text-2xl font-bold text-dark-primary">
            Programa Maximus
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-dark-text/80">
              <UserIcon className="h-4 w-4" />
              <span>{userEmail}</span>
            </div>
            
            {isAdmin && (
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
