
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0d112b] py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Acelerador Empresarial</h3>
            <p className="text-gray-400">Transformando empresas, acelerando resultados</p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6 text-sm text-gray-400">
            <a href="/politica-privacidade" className="hover:text-dark-primary transition-colors">
              Política de Privacidade
            </a>
            <span className="hidden md:block">|</span>
            <a href="/termos-uso" className="hover:text-dark-primary transition-colors">
              Termos de Uso
            </a>
            <span className="hidden md:block">|</span>
            <span>CNPJ: 25.048.157/0001-18</span>
          </div>
          
          <div className="text-center text-sm text-gray-500 mb-4">
            <p>© {new Date().getFullYear()} Manoel Santos - Acelerador Empresarial.</p>
            <p>Todos os direitos reservados.</p>
          </div>
          
          <div className="text-center text-xs text-gray-600">
            <p>Exclusivo para donos de empresa com 10 a 1000 funcionários</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
