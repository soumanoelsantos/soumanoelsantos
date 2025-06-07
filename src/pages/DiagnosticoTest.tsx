
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import MemberHeader from "@/components/MemberHeader";
import NewDiagnosticTestContent from "@/components/diagnostic/NewDiagnosticTestContent";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";

const DiagnosticoTest = () => {
  const navigate = useNavigate();
  const { userEmail, logout } = useAuth();

  // Handle logout from this page
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mt-6 mb-6">
          <BackToMemberAreaButton />
        </div>
        
        <NewDiagnosticTestContent />
      </div>
    </div>
  );
};

export default DiagnosticoTest;
