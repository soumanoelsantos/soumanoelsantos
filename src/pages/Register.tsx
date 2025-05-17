
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import RegisterForm from "@/components/auth/RegisterForm";
import RegisterHeader from "@/components/auth/RegisterHeader";
import RegisterFooter from "@/components/auth/RegisterFooter";

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect authenticated users
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/membros');
    }
  }, [isAuthenticated, navigate]);

  const handleSuccess = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-dark-background flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md shadow-xl bg-dark-background/50 border-dark-primary/20">
        <CardHeader className="space-y-1 text-center">
          <RegisterHeader />
        </CardHeader>
        <CardContent>
          <RegisterForm onSuccess={handleSuccess} />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2 text-center">
          <RegisterFooter />
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
