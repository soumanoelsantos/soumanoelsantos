
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductsManager from './ProductsManager';
import MonthlyGoalsManager from './MonthlyGoalsManager';
import GoalTypesManager from './GoalTypesManager';
import PreSalesGoalsManager from './PreSalesGoalsManager';

const GoalsManager = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Gerenciamento de Metas</h2>
        <p className="text-gray-600">
          Configure produtos, tipos de metas e defina metas mensais para acompanhar o desempenho
        </p>
      </div>

      <Tabs defaultValue="goals" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="goals">Metas Mensais</TabsTrigger>
          <TabsTrigger value="presales">Pré-vendas</TabsTrigger>
          <TabsTrigger value="goaltypes">Tipos de Metas</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="goals" className="space-y-4">
          <MonthlyGoalsManager />
        </TabsContent>
        
        <TabsContent value="presales" className="space-y-4">
          <PreSalesGoalsManager />
        </TabsContent>
        
        <TabsContent value="goaltypes" className="space-y-4">
          <GoalTypesManager />
        </TabsContent>
        
        <TabsContent value="products" className="space-y-4">
          <ProductsManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GoalsManager;
