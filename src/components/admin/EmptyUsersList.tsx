
import React from "react";

const EmptyUsersList: React.FC = () => {
  return (
    <div className="rounded-md border border-gray-200 p-8 text-center text-gray-500">
      Nenhum usuário encontrado com este termo de pesquisa
    </div>
  );
};

export default EmptyUsersList;
