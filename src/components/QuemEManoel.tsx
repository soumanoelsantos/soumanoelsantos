
import React from 'react';
import { Separator } from "@/components/ui/separator";

const QuemEManoel = () => {
  return (
    <div className="bg-gradient-to-b from-dark-background to-dark-background/95 text-dark-text py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Quem é <span className="text-dark-primary">Manoel Santos</span>?
        </h2>
        
        <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 shadow-lg">
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-dark-primary/20 flex items-center justify-center mr-3 mt-1">
                <span className="w-2 h-2 bg-dark-primary rounded-full"></span>
              </div>
              <span className="text-lg">Mestrando em Administração de Empresas</span>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-dark-primary/20 flex items-center justify-center mr-3 mt-1">
                <span className="w-2 h-2 bg-dark-primary rounded-full"></span>
              </div>
              <span className="text-lg">Pós - Graduação em Administração de Empresas</span>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-dark-primary/20 flex items-center justify-center mr-3 mt-1">
                <span className="w-2 h-2 bg-dark-primary rounded-full"></span>
              </div>
              <span className="text-lg">Pós - Graduação em Marketing</span>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-dark-primary/20 flex items-center justify-center mr-3 mt-1">
                <span className="w-2 h-2 bg-dark-primary rounded-full"></span>
              </div>
              <span className="text-lg">Extenção em Gestão de Recursos Humanos</span>
            </li>
            
            <li className="flex items-start">
              <div className="flex-shrink-0 h-6 w-6 rounded-full bg-dark-primary/20 flex items-center justify-center mr-3 mt-1">
                <span className="w-2 h-2 bg-dark-primary rounded-full"></span>
              </div>
              <span className="text-lg">Graduação em Psicologia com ênfase Organizacional</span>
            </li>
          </ul>
          
          <Separator className="my-8 bg-white/10" />
          
          <ul className="space-y-5">
            <li className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-dark-primary/20 flex items-center justify-center mr-4">
                <span className="text-dark-primary font-bold">18+</span>
              </div>
              <span className="text-lg">anos de experiência em Gestão, Marketing e Vendas</span>
            </li>
            
            <li className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-dark-primary/20 flex items-center justify-center mr-4">
                <span className="text-dark-primary font-bold">180+</span>
              </div>
              <span className="text-lg">empresas transformadas de 23 estados e 2 países</span>
            </li>
            
            <li className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-dark-primary/20 flex items-center justify-center mr-4">
                <span className="text-dark-primary font-bold">1B+</span>
              </div>
              <span className="text-lg">em vendas geradas</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QuemEManoel;
