
import React from "react";
import FormTextField from "./FormTextField";
import { BusinessMapData } from "@/types/businessMap";

interface FormFieldsProps {
  data: BusinessMapData;
  onFieldChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormFields = ({ data, onFieldChange }: FormFieldsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <FormTextField
        label="Missão"
        name="missao"
        value={data.missao}
        onChange={onFieldChange}
        placeholder="Qual é a missão da sua empresa?"
      />
      
      <FormTextField
        label="Visão"
        name="visao"
        value={data.visao}
        onChange={onFieldChange}
        placeholder="Qual é a visão da sua empresa?"
      />
      
      <FormTextField
        label="Valores"
        name="valores"
        value={data.valores}
        onChange={onFieldChange}
        placeholder="Quais são os valores da sua empresa?"
      />
      
      <FormTextField
        label="Parceiros Chave"
        name="parceirosChave"
        value={data.parceirosChave}
        onChange={onFieldChange}
        placeholder="Quem são seus principais parceiros e fornecedores?"
      />
      
      <FormTextField
        label="Atividades Chaves"
        name="atividadesChaves"
        value={data.atividadesChaves}
        onChange={onFieldChange}
        placeholder="Quais são as atividades essenciais do seu negócio?"
      />
      
      <FormTextField
        label="Recursos Chave"
        name="recursosChave"
        value={data.recursosChave}
        onChange={onFieldChange}
        placeholder="Quais recursos são indispensáveis para sua operação?"
      />
      
      <FormTextField
        label="Proposta de Valor"
        name="valuePropositions"
        value={data.valuePropositions}
        onChange={onFieldChange}
        placeholder="Qual valor você entrega para seus clientes?"
      />
      
      <FormTextField
        label="Relação com Consumidor"
        name="relacaoConsumidor"
        value={data.relacaoConsumidor}
        onChange={onFieldChange}
        placeholder="Como você se relaciona com seus clientes?"
      />
      
      <FormTextField
        label="Canais de Distribuição"
        name="canaisDistribuicao"
        value={data.canaisDistribuicao}
        onChange={onFieldChange}
        placeholder="Como seus produtos/serviços chegam até os clientes?"
      />
      
      <FormTextField
        label="Segmento de Consumidores"
        name="segmentoConsumidores"
        value={data.segmentoConsumidores}
        onChange={onFieldChange}
        placeholder="Para quem você cria valor?"
      />
      
      <FormTextField
        label="Estrutura de Custos"
        name="estruturaCustos"
        value={data.estruturaCustos}
        onChange={onFieldChange}
        placeholder="Quais são os custos mais importantes do seu modelo de negócio?"
      />
      
      <FormTextField
        label="Fontes de Receita"
        name="fontesReceita"
        value={data.fontesReceita}
        onChange={onFieldChange}
        placeholder="Como sua empresa ganha dinheiro?"
      />
      
      <FormTextField
        label="Vantagem Competitiva"
        name="vantagemCompetitiva"
        value={data.vantagemCompetitiva}
        onChange={onFieldChange}
        placeholder="O que te diferencia da concorrência?"
      />
      
      <FormTextField
        label="Competências Essenciais"
        name="competenciasEssenciais"
        value={data.competenciasEssenciais}
        onChange={onFieldChange}
        placeholder="Quais são as competências essenciais da sua empresa?"
      />
      
      <FormTextField
        label="Posicionamento de Mercado"
        name="posicionamentoMercado"
        value={data.posicionamentoMercado}
        onChange={onFieldChange}
        placeholder="Como sua empresa se posiciona no mercado?"
      />
    </div>
  );
};

export default FormFields;
