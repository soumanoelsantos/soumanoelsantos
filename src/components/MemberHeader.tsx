
import React, { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserIcon, LogOut, Settings, ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useSecureSession } from "@/hooks/security/useSecureSession";
import { useAuditLogger } from "@/hooks/security/useAuditLogger";

interface MemberHeaderProps {
  userEmail: string | null;
  onLogout: () => void;
}

const MemberHeader: React.FC<MemberHeaderProps> = ({ userEmail, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin, isLoading } = useAuth();
  const { isAdminViewing, originalAdminEmail, clearAdminSession } = useSecureSession();
  const { logAdminAction } = useAuditLogger();
  
  // Check if we're on the members page
  const isMembersPage = location.pathname === "/membros";
  
  const handleReturnToAdmin = async () => {
    try {
      await logAdminAction('ADMIN_SESSION_END', `Returned from viewing as user: ${userEmail}`);
      clearAdminSession();
      navigate('/admin');
    } catch (error) {
      console.error('Error returning to admin:', error);
      clearAdminSession();
      navigate('/admin');
    }
  };
  
  const handleLogout = async () => {
    try {
      if (isAdminViewing) {
        await logAdminAction('ADMIN_LOGOUT_WHILE_VIEWING', `Logged out while viewing as: ${userEmail}`);
      }
      await onLogout();
    } catch (error) {
      console.error("Error during logout:", error);
    }
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
            
            {isAdminViewing && (
              <Button 
                variant="outline"
                size="sm"
                onClick={handleReturnToAdmin}
                className="border-orange-400 text-orange-600 hover:bg-orange-50"
                disabled={isLoading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retornar ao Admin
              </Button>
            )}
            
            {!isMembersPage && isAdmin && (
              <Button 
                variant="outline"
                size="sm"
                onClick={() => navigate("/admin")}
                className="border-dark-primary/30 text-dark-primary hover:bg-dark-primary/10"
                disabled={isLoading}
              >
                <Settings className="mr-2 h-4 w-4" />
                Admin
              </Button>
            )}
            
            <Button 
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="border-dark-primary/30 text-dark-primary hover:bg-dark-primary/10"
              disabled={isLoading}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoading ? "Aguarde..." : "Sair"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MemberHeader;
