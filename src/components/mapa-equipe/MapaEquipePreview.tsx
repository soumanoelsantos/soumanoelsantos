
import React, { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Colaborador } from "@/types/mapaEquipe";
import { FileDown, ArrowLeft, CheckCircle2 } from "lucide-react";
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
      
      // Add a temporary class to identify the component for PDF generation
      if (mapRef.current) {
        mapRef.current.classList.add('mapa-equipe-preview');
      }
      
      // Pass filename string instead of callback
      const success = generatePDF(mapRef.current, "mapa-da-equipe.pdf");
      
      if (success) {
        toast({
          title: "Download concluído",
          description: "Seu PDF foi baixado com sucesso!",
        });
      }
      
      // Clean up the temporary class
      if (mapRef.current) {
        mapRef.current.classList.remove('mapa-equipe-preview');
      }
    }
  };

  // Determine if the map is filled with at least some basic information
  const isMapaPreenchido = 
    empresaNome.trim() !== "" && 
    colaboradores.length > 0 && 
    colaboradores[0].nome.trim() !== "";

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
      
      {isMapaPreenchido && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
          <CheckCircle2 className="text-green-500 h-6 w-6" />
          <p className="text-green-700 font-medium">
            Mapa da Equipe preenchido! Seus dados foram salvos com sucesso.
          </p>
        </div>
      )}
      
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
