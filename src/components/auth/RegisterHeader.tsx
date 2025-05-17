
import React from "react";
import { CardTitle, CardDescription } from "@/components/ui/card";

const RegisterHeader: React.FC = () => {
  return (
    <>
      <CardTitle className="text-3xl font-bold text-dark-text">Cadastre-se</CardTitle>
      <CardDescription className="text-dark-text/80">
        Crie sua conta para acessar a área de membros
      </CardDescription>
    </>
  );
};

export default RegisterHeader;
