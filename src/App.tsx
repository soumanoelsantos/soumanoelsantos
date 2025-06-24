
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Index from './pages/Index';
import Login from './pages/Login';
import MemberArea from './pages/MemberArea';
import AdminPage from './pages/AdminPage';
import DashboardConfig from './pages/DashboardConfig';
import MapaMental from './pages/MapaMental';
import MindMapEditor from './pages/MindMapEditor';
import SharedMindMap from './pages/SharedMindMap';
import AnaliseSwot from './pages/AnaliseSwot';
import MapaNegocio from './pages/MapaNegocio';
import DiagnosticoTest from './pages/DiagnosticoTest';
import PropostaUnicaValor from './pages/PropostaUnicaValor';
import MapaEquipe from './pages/MapaEquipe';
import CrmPage from './pages/CrmPage';
import TesteFase from './pages/TesteFase';
import ProcessDocuments from './pages/ProcessDocuments';
import SharedDocument from './pages/SharedDocument';
import SharedFolder from './pages/SharedFolder';
import ActionCalendar from './pages/ActionCalendar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/membros" element={<MemberArea />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/dashboard-config" element={<DashboardConfig />} />
          <Route path="/mapa-mental" element={<MapaMental />} />
          <Route path="/mapa-mental/:id" element={<MindMapEditor />} />
          <Route path="/mapa-mental/compartilhado/:shareToken" element={<SharedMindMap />} />
          <Route path="/swot" element={<AnaliseSwot />} />
          <Route path="/canvas" element={<MapaNegocio />} />
          <Route path="/puv" element={<PropostaUnicaValor />} />
          <Route path="/diagnostic" element={<DiagnosticoTest />} />
          <Route path="/mapa-equipe" element={<MapaEquipe />} />
          <Route path="/crm" element={<CrmPage />} />
          <Route path="/phase-test" element={<TesteFase />} />
          <Route path="/processos-documentados" element={<ProcessDocuments />} />
          <Route path="/shared/document/:token" element={<SharedDocument />} />
          <Route path="/shared/folder/:token" element={<SharedFolder />} />
          <Route path="/calendario-acoes" element={<ActionCalendar />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
