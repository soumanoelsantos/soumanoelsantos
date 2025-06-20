
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MemberArea from "./pages/MemberArea";
import Dashboard from "./pages/Dashboard";
import DashboardConfig from "./pages/DashboardConfig";
import GoalsManagement from "./pages/GoalsManagement";
import AdminPage from "./pages/AdminPage";
import DiagnosticoTest from "./pages/DiagnosticoTest";
import TesteFase from "./pages/TesteFase";
import AnaliseSwot from "./pages/AnaliseSwot";
import MapaNegocio from "./pages/MapaNegocio";
import PropostaUnicaValor from "./pages/PropostaUnicaValor";
import MapaEquipe from "./pages/MapaEquipe";
import CheckListContratacao from "./pages/CheckListContratacao";
import Ferramentas from "./pages/Ferramentas";
import CrmPage from "./pages/CrmPage";
import DevAI from "./pages/DevAI";
import MindMapEditor from "./pages/MindMapEditor";
import SharedMindMap from "./pages/SharedMindMap";
import MapaMental from "./pages/MapaMental";
import DiagnosticoLanding from "./pages/DiagnosticoLanding";
import DiagnosticoLandingV2 from "./pages/DiagnosticoLandingV2";
import SellerPerformanceForm from "./pages/SellerPerformanceForm";
import NotFound from "./pages/NotFound";

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
            <Route path="/register" element={<Register />} />
            <Route path="/area-membro" element={<MemberArea />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/configurar" element={<DashboardConfig />} />
            <Route path="/metas" element={<GoalsManagement />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/diagnostico" element={<DiagnosticoTest />} />
            <Route path="/teste-fase" element={<TesteFase />} />
            <Route path="/analise-swot" element={<AnaliseSwot />} />
            <Route path="/mapa-negocio" element={<MapaNegocio />} />
            <Route path="/proposta-unica-valor" element={<PropostaUnicaValor />} />
            <Route path="/mapa-equipe" element={<MapaEquipe />} />
            <Route path="/checklist-contratacao" element={<CheckListContratacao />} />
            <Route path="/ferramentas" element={<Ferramentas />} />
            <Route path="/crm" element={<CrmPage />} />
            <Route path="/dev-ai" element={<DevAI />} />
            <Route path="/mind-map-editor" element={<MindMapEditor />} />
            <Route path="/shared-mind-map/:shareToken" element={<SharedMindMap />} />
            <Route path="/mapa-mental" element={<MapaMental />} />
            <Route path="/diagnostico-landing" element={<DiagnosticoLanding />} />
            <Route path="/diagnostico-landing-v2" element={<DiagnosticoLandingV2 />} />
            <Route path="/seller-performance/:token" element={<SellerPerformanceForm />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
