
import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Colaborador } from "@/types/mapaEquipe";
import { FileDown, ArrowLeft } from "lucide-react";
import { generatePDF } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";

interface MapaEquipePreviewProps {
  empresaNome: string;
  colaboradores: Colaborador[];
  onClose: () => void;
}

const MapaEquipePreview = ({ empresaNome, colaboradores, onClose }: MapaEquipePreviewProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleDownloadPDF = () => {
    if (mapRef.current) {
      toast({
        title: "Download iniciado",
        description: "Seu PDF está sendo gerado...",
      });
      
      generatePDF(mapRef.current, () => {
        toast({
          title: "Download concluído",
          description: "Seu PDF foi baixado com sucesso!",
        });
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={onClose}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para edição
        </Button>
        
        <Button onClick={handleDownloadPDF} className="bg-dark-primary hover:bg-dark-primary/90 text-white">
          <FileDown className="h-4 w-4 mr-2" />
          Baixar PDF
        </Button>
      </div>
      
      <div ref={mapRef} className="mapa-equipe-preview">
        <Card className="bg-white shadow-md overflow-hidden">
          <CardHeader className="bg-[#1d365c] text-white">
            <CardTitle className="text-center">MAPA DA EQUIPE - {empresaNome}</CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="font-bold">Nome do colaborador</TableHead>
                  <TableHead className="font-bold">Nível de Maturidade</TableHead>
                  <TableHead className="font-bold">Estilo de Liderança</TableHead>
                  <TableHead className="font-bold">Perfil Comportamental</TableHead>
                  <TableHead className="font-bold">Futuro na empresa</TableHead>
                  <TableHead className="font-bold">Potencial</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {colaboradores.map((colaborador, index) => (
                  <TableRow key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <TableCell className="font-medium">{colaborador.nome}</TableCell>
                    <TableCell>{colaborador.nivelMaturidade}</TableCell>
                    <TableCell>{colaborador.estiloLideranca}</TableCell>
                    <TableCell>{colaborador.perfilComportamental}</TableCell>
                    <TableCell>{colaborador.futuro}</TableCell>
                    <TableCell>{colaborador.potencial}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          
          <CardFooter className="bg-gray-100 p-4 text-sm text-gray-600 flex justify-between">
            <div>Criado em: {new Date().toLocaleDateString()}</div>
            <div>Programa Maximus</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MapaEquipePreview;
