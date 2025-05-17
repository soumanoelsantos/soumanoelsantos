
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const RegisterFooter: React.FC = () => {
  return (
    <>
      <div className="text-sm text-dark-text/70">
        Já tem uma conta?{" "}
        <Link to="/login" className="text-dark-primary hover:underline">
          Faça login
        </Link>
      </div>
      <Link to="/" className="text-sm text-dark-primary hover:underline flex items-center justify-center mt-2">
        <ArrowRight className="h-4 w-4 mr-1 rotate-180" />
        Voltar para o início
      </Link>
    </>
  );
};

export default RegisterFooter;
