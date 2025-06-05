import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import MemberArea from "@/pages/MemberArea";
import Admin from "@/pages/Admin";
import DiagnosticTest from "@/pages/DiagnosticTest";
import ChecklistContratacao from "@/pages/ChecklistContratacao";
import AnaliseSwot from "@/pages/AnaliseSwot";
import TesteFase from "@/pages/TesteFase";
import MapaNegocio from "@/pages/MapaNegocio";
import PropostaUnicaValor from "@/pages/PropostaUnicaValor";
import MapaEquipe from "@/pages/MapaEquipe";
import CRM from "@/pages/CRM";
import Dashboard from "@/pages/Dashboard";
import DiagnosticoLanding from "@/pages/DiagnosticoLanding";
import DevAI from "@/pages/DevAI";
import PlanejamentoEstrategico from "@/pages/PlanejamentoEstrategico";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/membros" element={<MemberArea />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/teste" element={<DiagnosticTest />} />
              <Route path="/checklist-contratacao" element={<ChecklistContratacao />} />
              <Route path="/analise-swot" element={<AnaliseSwot />} />
              <Route path="/teste-fase" element={<TesteFase />} />
              <Route path="/mapa-negocio" element={<MapaNegocio />} />
              <Route path="/proposta-unica-valor" element={<PropostaUnicaValor />} />
              <Route path="/mapa-equipe" element={<MapaEquipe />} />
              <Route path="/crm" element={<CRM />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/diagnostico" element={<DiagnosticoLanding />} />
              <Route path="/dev-ai" element={<DevAI />} />
              <Route path="/planejamento-estrategico" element={<PlanejamentoEstrategico />} />
            </Routes>
          </div>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
