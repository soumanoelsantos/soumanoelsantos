
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MapaEquipeInstructions = () => {
  return (
    <Card className="bg-white shadow-md">
      <CardHeader className="bg-[#1d365c] text-white">
        <CardTitle>Mapa da Equipe - Instruções</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <p>Liste seus colaboradores e selecione o nível de maturidade, estilo de liderança e perfil comportamental dominante.</p>
          
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <h3 className="font-semibold mb-2">Preencha os itens abaixo com as seguintes opções:</h3>
            
            <div className="space-y-2">
              <p><span className="font-medium">Nível de Maturidade:</span> M1 (Bebê) | M2 (Criança) | M3 (Adolescente) | M4 (Adulto)</p>
              <p><span className="font-medium">Estilo de Liderança:</span> E1 (Direção) | E2 (Treinamento) | E3 (Apoio) | E4 (Delegação)</p>
              <p><span className="font-medium">Perfil comportamental:</span> Executor | Comunicador | Analista | Planejador</p>
              <p><span className="font-medium">Potencial:</span> Sócio | Diretor | Gestor | Supervisor/Coordenador | Extraordinário | Stand by</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MapaEquipeInstructions;
