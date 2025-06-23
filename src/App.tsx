import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Home from './pages/Home';
import Login from './pages/Login';
import MemberArea from './pages/MemberArea';
import AdminArea from './pages/AdminArea';
import DashboardConfig from './pages/DashboardConfig';
import MapaMental from './pages/MapaMental';
import SwotAnalysisPage from './pages/SwotAnalysisPage';
import BusinessModelCanvasPage from './pages/BusinessModelCanvasPage';
import DiagnosticPage from './pages/DiagnosticPage';
import PuvAnalysisPage from './pages/PuvAnalysisPage';
import MapaEquipePage from './pages/MapaEquipePage';
import CrmPage from './pages/CrmPage';
import PhaseTestPage from './pages/PhaseTestPage';
import PlanejamentoEstrategicoPage from './pages/PlanejamentoEstrategicoPage';
import ProcessDocuments from './pages/ProcessDocuments';
import SharedDocument from './pages/SharedDocument';
import SharedFolder from './pages/SharedFolder';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/membros" element={<MemberArea />} />
          <Route path="/admin" element={<AdminArea />} />
          <Route path="/dashboard-config" element={<DashboardConfig />} />
          <Route path="/mapa-mental" element={<MapaMental />} />
          <Route path="/swot" element={<SwotAnalysisPage />} />
          <Route path="/canvas" element={<BusinessModelCanvasPage />} />
          <Route path="/puv" element={<PuvAnalysisPage />} />
          <Route path="/diagnostic" element={<DiagnosticPage />} />
          <Route path="/mapa-equipe" element={<MapaEquipePage />} />
          <Route path="/crm" element={<CrmPage />} />
          <Route path="/phase-test" element={<PhaseTestPage />} />
          <Route path="/planejamento-estrategico" element={<PlanejamentoEstrategicoPage />} />
          <Route path="/processos-documentados" element={<ProcessDocuments />} />
          <Route path="/shared/document/:token" element={<SharedDocument />} />
          <Route path="/shared/folder/:token" element={<SharedFolder />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
