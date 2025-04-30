
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { BusinessMapData } from "@/types/businessMap";
import ActionButton from "../ui/action-button";

interface MapaNegocioFormProps {
  data: BusinessMapData;
  onDataChange: (data: BusinessMapData) => void;
  onPreviewClick: () => void;
}

const MapaNegocioForm = ({ data, onDataChange, onPreviewClick }: MapaNegocioFormProps) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onDataChange({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200 shadow-md">
        <CardContent className="p-6">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Nome da Empresa</label>
            <Input
              name="empresa"
              value={data.empresa}
              onChange={handleChange}
              placeholder="Nome da sua empresa"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Missão</label>
              <Textarea
                name="missao"
                value={data.missao}
                onChange={handleChange}
                placeholder="Qual é a missão da sua empresa?"
                className="h-32"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Visão</label>
              <Textarea
                name="visao"
                value={data.visao}
                onChange={handleChange}
                placeholder="Qual é a visão da sua empresa?"
                className="h-32"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Valores</label>
              <Textarea
                name="valores"
                value={data.valores}
                onChange={handleChange}
                placeholder="Quais são os valores da sua empresa?"
                className="h-32"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Parceiros Chave
              </label>
              <Textarea
                name="parceirosChave"
                value={data.parceirosChave}
                onChange={handleChange}
                placeholder="Quem são seus principais parceiros e fornecedores?"
                className="h-32"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Atividades Chaves
              </label>
              <Textarea
                name="atividadesChaves"
                value={data.atividadesChaves}
                onChange={handleChange}
                placeholder="Quais são as atividades essenciais do seu negócio?"
                className="h-32"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Recursos Chave
              </label>
              <Textarea
                name="recursosChave"
                value={data.recursosChave}
                onChange={handleChange}
                placeholder="Quais recursos são indispensáveis para sua operação?"
                className="h-32"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Proposta de Valor
              </label>
              <Textarea
                name="valuePropositions"
                value={data.valuePropositions}
                onChange={handleChange}
                placeholder="Qual valor você entrega para seus clientes?"
                className="h-32"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Relação com Consumidor
              </label>
              <Textarea
                name="relacaoConsumidor"
                value={data.relacaoConsumidor}
                onChange={handleChange}
                placeholder="Como você se relaciona com seus clientes?"
                className="h-32"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Canais de Distribuição
              </label>
              <Textarea
                name="canaisDistribuicao"
                value={data.canaisDistribuicao}
                onChange={handleChange}
                placeholder="Como seus produtos/serviços chegam até os clientes?"
                className="h-32"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Segmento de Consumidores
              </label>
              <Textarea
                name="segmentoConsumidores"
                value={data.segmentoConsumidores}
                onChange={handleChange}
                placeholder="Para quem você cria valor?"
                className="h-32"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Estrutura de Custos
              </label>
              <Textarea
                name="estruturaCustos"
                value={data.estruturaCustos}
                onChange={handleChange}
                placeholder="Quais são os custos mais importantes do seu modelo de negócio?"
                className="h-32"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Fontes de Receita
              </label>
              <Textarea
                name="fontesReceita"
                value={data.fontesReceita}
                onChange={handleChange}
                placeholder="Como sua empresa ganha dinheiro?"
                className="h-32"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Vantagem Competitiva
              </label>
              <Textarea
                name="vantagemCompetitiva"
                value={data.vantagemCompetitiva}
                onChange={handleChange}
                placeholder="O que te diferencia da concorrência?"
                className="h-32"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Competências Essenciais
              </label>
              <Textarea
                name="competenciasEssenciais"
                value={data.competenciasEssenciais}
                onChange={handleChange}
                placeholder="Quais são as competências essenciais da sua empresa?"
                className="h-32"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Posicionamento de Mercado
              </label>
              <Textarea
                name="posicionamentoMercado"
                value={data.posicionamentoMercado}
                onChange={handleChange}
                placeholder="Como sua empresa se posiciona no mercado?"
                className="h-32"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center mt-6">
        <ActionButton 
          onClick={onPreviewClick}
          variant="secondary"
          icon={Eye}
        >
          Visualizar Mapa do Negócio
        </ActionButton>
      </div>
    </div>
  );
};

export default MapaNegocioForm;
