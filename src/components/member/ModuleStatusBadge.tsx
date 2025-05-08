
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ModuleStatusBadgeProps {
  status: string;
}

const ModuleStatusBadge: React.FC<ModuleStatusBadgeProps> = ({ status }) => {
  switch(status) {
    case "completo":
      return <Badge className="bg-green-600 text-white hover:bg-green-600" variant="outline">Completo</Badge>;
    case "em andamento":
      return <Badge className="bg-yellow-500 text-gray-800 hover:bg-yellow-500" variant="outline">Em andamento</Badge>;
    case "bloqueado":
      return <Badge className="bg-gray-500/80 text-white hover:bg-gray-500/80" variant="outline">Bloqueado</Badge>;
    case "disponível":
      return <Badge className="bg-blue-600 text-white hover:bg-blue-600" variant="outline">Disponível</Badge>;
    default:
      return null;
  }
};

export default ModuleStatusBadge;
