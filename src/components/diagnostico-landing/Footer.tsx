
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0d112b] py-6">
      <div className="container mx-auto px-4">
        <div className="text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Programa Maximus. Todos os direitos reservados.</p>
          <p className="mt-2">
            Exclusivo para empresas que queiram vender pela internet.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
