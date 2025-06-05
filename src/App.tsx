
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MemberArea from "./pages/MemberArea";
import AdminPage from "./pages/AdminPage";
import NotFound from "./pages/NotFound";
import DiagnosticoTest from "./pages/DiagnosticoTest";
import CheckListContratacao from "./pages/CheckListContratacao";
import AnaliseSwot from "./pages/AnaliseSwot";
import TesteFase from "./pages/TesteFase";
import MapaNegocio from "./pages/MapaNegocio";
import PropostaUnicaValor from "./pages/PropostaUnicaValor";
import MapaEquipe from "./pages/MapaEquipe";
import CrmPage from "./pages/CrmPage";
import Ferramentas from "./pages/Ferramentas";
import DiagnosticoLanding from "./pages/DiagnosticoLanding";
import DiagnosticoLandingV2 from "./pages/DiagnosticoLandingV2";
import DevAI from "./pages/DevAI";
import Dashboard from "./pages/Dashboard";
import DashboardConfig from "./pages/DashboardConfig";
import { AuthProvider } from "./hooks/useAuth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Register />} />
            <Route path="/ferramentas" element={<Ferramentas />} />
            <Route path="/membros" element={<MemberArea />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/crm" element={<CrmPage />} />
            <Route path="/dev-ai" element={<DevAI />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/configurar" element={<DashboardConfig />} />
            <Route path="/teste" element={<DiagnosticoTest />} />
            <Route path="/checklist-contratacao" element={<CheckListContratacao />} />
            <Route path="/analise-swot" element={<AnaliseSwot />} />
            <Route path="/teste-fase" element={<TesteFase />} />
            <Route path="/mapa-negocio" element={<MapaNegocio />} />
            <Route path="/proposta-unica-valor" element={<PropostaUnicaValor />} />
            <Route path="/mapa-equipe" element={<MapaEquipe />} />
            <Route path="/diagnostico" element={<DiagnosticoLanding />} />
            <Route path="/diagnostico-v2" element={<DiagnosticoLandingV2 />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
