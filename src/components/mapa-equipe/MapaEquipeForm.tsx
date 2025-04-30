
import React from "react";
import { useMapaEquipe, niveisMaturidadeOptions, estilosLiderancaOptions, perfisComportamentaisOptions, potenciaisOptions } from "@/hooks/useMapaEquipe";
import MapaEquipePreview from "./MapaEquipePreview";
import MapaEquipeInstructions from "./MapaEquipeInstructions";
import EmpresaInfoForm from "./EmpresaInfoForm";
import ColaboradoresTable from "./ColaboradoresTable";

const MapaEquipeForm = () => {
  const { 
    empresaNome,
    setEmpresaNome,
    colaboradores,
    addColaborador,
    removeColaborador,
    updateColaborador,
    showPreview,
    handlePreview,
    closePreview,
    resetForm
  } = useMapaEquipe();

  if (showPreview) {
    return (
      <MapaEquipePreview 
        empresaNome={empresaNome}
        colaboradores={colaboradores}
        onClose={closePreview}
      />
    );
  }

  return (
    <div className="space-y-6">
      <MapaEquipeInstructions />
      
      <div className="card bg-white shadow-md p-6">
        <EmpresaInfoForm
          empresaNome={empresaNome}
          setEmpresaNome={setEmpresaNome}
          resetForm={resetForm}
        />
      </div>
      
      <ColaboradoresTable
        colaboradores={colaboradores}
        addColaborador={addColaborador}
        removeColaborador={removeColaborador}
        updateColaborador={updateColaborador}
        handlePreview={handlePreview}
        niveisMaturidadeOptions={niveisMaturidadeOptions}
        estilosLiderancaOptions={estilosLiderancaOptions}
        perfisComportamentaisOptions={perfisComportamentaisOptions}
        potenciaisOptions={potenciaisOptions}
      />
    </div>
  );
};

export default MapaEquipeForm;
