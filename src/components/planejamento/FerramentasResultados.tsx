
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  Target, 
  Users, 
  TrendingUp, 
  Map, 
  Heart 
} from "lucide-react";
import { PlanejamentoEstrategicoData } from "@/types/planejamentoEstrategico";

interface FerramentasResultadosProps {
  dados: PlanejamentoEstrategicoData;
}

const FerramentasResultados: React.FC<FerramentasResultadosProps> = ({ dados }) => {
  const { ferramentasGeradas } = dados;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Ferramentas Geradas</h2>
      
      <Tabs defaultValue="diagnostico" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="diagnostico">Diagnóstico</TabsTrigger>
          <TabsTrigger value="swot">SWOT</TabsTrigger>
          <TabsTrigger value="mapa-negocio">Mapa Negócio</TabsTrigger>
          <TabsTrigger value="puv">PUV</TabsTrigger>
          <TabsTrigger value="equipe">Equipe</TabsTrigger>
          <TabsTrigger value="fase">Fase</TabsTrigger>
        </TabsList>

        <TabsContent value="diagnostico">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Diagnóstico Empresarial
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ferramentasGeradas?.diagnostico && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Processos Documentados</span>
                    <Badge variant={ferramentasGeradas.diagnostico.processosDocumentados ? "default" : "destructive"}>
                      {ferramentasGeradas.diagnostico.processosDocumentados ? "Sim" : "Não"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Controle de Qualidade</span>
                    <Badge variant={ferramentasGeradas.diagnostico.controleQualidade ? "default" : "destructive"}>
                      {ferramentasGeradas.diagnostico.controleQualidade ? "Sim" : "Não"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Metas Definidas</span>
                    <Badge variant={ferramentasGeradas.diagnostico.metasDefinidas ? "default" : "destructive"}>
                      {ferramentasGeradas.diagnostico.metasDefinidas ? "Sim" : "Não"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Acompanhamento de Resultados</span>
                    <Badge variant={ferramentasGeradas.diagnostico.acompanhamentoResultados ? "default" : "destructive"}>
                      {ferramentasGeradas.diagnostico.acompanhamentoResultados ? "Sim" : "Não"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Sistema de Gestão</span>
                    <Badge variant={ferramentasGeradas.diagnostico.sistemaGestao ? "default" : "destructive"}>
                      {ferramentasGeradas.diagnostico.sistemaGestao ? "Sim" : "Não"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>Capacitação da Equipe</span>
                    <Badge variant={ferramentasGeradas.diagnostico.capacitacaoEquipe ? "default" : "destructive"}>
                      {ferramentasGeradas.diagnostico.capacitacaoEquipe ? "Sim" : "Não"}
                    </Badge>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="swot">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Análise SWOT
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ferramentasGeradas?.swot && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg bg-green-50">
                    <h3 className="font-semibold text-green-800 mb-2">Forças</h3>
                    <ul className="space-y-1">
                      {ferramentasGeradas.swot.forcas.map((forca, index) => (
                        <li key={index} className="text-sm text-green-700">• {forca}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg bg-red-50">
                    <h3 className="font-semibold text-red-800 mb-2">Fraquezas</h3>
                    <ul className="space-y-1">
                      {ferramentasGeradas.swot.fraquezas.map((fraqueza, index) => (
                        <li key={index} className="text-sm text-red-700">• {fraqueza}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <h3 className="font-semibold text-blue-800 mb-2">Oportunidades</h3>
                    <ul className="space-y-1">
                      {ferramentasGeradas.swot.oportunidades.map((oportunidade, index) => (
                        <li key={index} className="text-sm text-blue-700">• {oportunidade}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg bg-yellow-50">
                    <h3 className="font-semibold text-yellow-800 mb-2">Ameaças</h3>
                    <ul className="space-y-1">
                      {ferramentasGeradas.swot.ameacas.map((ameaca, index) => (
                        <li key={index} className="text-sm text-yellow-700">• {ameaca}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapa-negocio">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Map className="h-5 w-5" />
                Mapa do Negócio
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ferramentasGeradas?.mapaNegocios && (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Empresa</h3>
                    <p className="text-gray-700">{ferramentasGeradas.mapaNegocios.empresa}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Setor</h3>
                    <p className="text-gray-700">{ferramentasGeradas.mapaNegocios.setor}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Produtos/Serviços</h3>
                    <p className="text-gray-700">{ferramentasGeradas.mapaNegocios.produtos}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Público-Alvo</h3>
                    <p className="text-gray-700">{ferramentasGeradas.mapaNegocios.publicoAlvo}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="puv">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Proposta Única de Valor
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ferramentasGeradas?.puv && (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Diferencial Competitivo</h3>
                    <p className="text-gray-700">{ferramentasGeradas.puv.diferencial}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Problema que Resolve</h3>
                    <p className="text-gray-700">{ferramentasGeradas.puv.problema}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Principal Benefício</h3>
                    <p className="text-gray-700">{ferramentasGeradas.puv.beneficio}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="equipe">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Mapa da Equipe
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ferramentasGeradas?.mapaEquipe && (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Número de Funcionários</h3>
                    <p className="text-gray-700">{ferramentasGeradas.mapaEquipe.numeroFuncionarios}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Modelo da Empresa</h3>
                    <p className="text-gray-700">{ferramentasGeradas.mapaEquipe.estruturaHierarquica}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Áreas/Departamentos</h3>
                    <p className="text-gray-700">{ferramentasGeradas.mapaEquipe.principaisCargos}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fase">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Fase da Empresa
              </CardTitle>
            </CardHeader>
            <CardContent>
              {ferramentasGeradas?.faseEmpresa && (
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Tempo no Mercado</h3>
                    <p className="text-gray-700">{ferramentasGeradas.faseEmpresa.tempoMercado}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Faturamento Atual</h3>
                    <p className="text-gray-700">{ferramentasGeradas.faseEmpresa.faturamento}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Crescimento</h3>
                    <p className="text-gray-700">{ferramentasGeradas.faseEmpresa.crescimento}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FerramentasResultados;
