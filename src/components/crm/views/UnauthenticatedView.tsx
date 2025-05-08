
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UnauthenticatedView = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Acesso Restrito</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center">Você não tem permissão para acessar esta área.</p>
      </CardContent>
    </Card>
  </div>
);

export default UnauthenticatedView;
