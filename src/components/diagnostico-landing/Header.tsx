
import React from "react";

const Header = () => {
  return (
    <>
      <div className="bg-dark-primary text-black text-center py-2 text-sm font-medium px-4">
        Exclusivo para empresas com faturamento acima de R$ 30 mil/mês
      </div>
      <header className="bg-gradient-to-r from-[#0d112b] to-[#1d365c] py-4 px-4">
        <div className="container mx-auto flex justify-center">
          <h1 className="text-2xl font-bold text-white">
            Programa Maximus | <span className="text-dark-primary">Aceleração de Vendas</span>
          </h1>
        </div>
      </header>
    </>
  );
};

export default Header;
