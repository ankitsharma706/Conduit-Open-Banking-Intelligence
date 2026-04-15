import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import LandingPage from './components/LandingPage.tsx';
import LoginPage from './components/LoginPage.tsx';
import ObservabilityHub from './components/ObservabilityHub.tsx';
import NotFound from './components/NotFound.tsx';

import { ConduitUser } from './types.ts';
import { CONDUIT_USERS } from './constants.tsx';

// Lazy load feature components
const SLAScorecard = lazy(() => import('./components/SLAScorecard.tsx'));
const RevenueShield = lazy(() => import('./components/RevenueShield.tsx'));
const IncidentCommandCenter = lazy(() => import('./components/IncidentCommandCenter.tsx'));
const AIResolutionEngine = lazy(() => import('./components/AIResolutionEngine.tsx'));
const PartnerNetworkGraph = lazy(() => import('./components/PartnerNetworkGraph.tsx'));
const ComplianceMonitor = lazy(() => import('./components/ComplianceMonitor.tsx'));
const SystemConfiguration = lazy(() => import('./components/SystemConfiguration.tsx'));
const AIAssistantConsole = lazy(() => import('./components/AIAssistantConsole.tsx'));
const GeneralCategory = lazy(() => import('./components/GeneralCategory.tsx'));

const ProtectedRoute = ({ children, isAuthenticated }: { children: React.ReactNode, isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppContent: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('conduit_auth') === 'true';
  });
  const [user, setUser] = useState<ConduitUser | null>(() => {
    const saved = localStorage.getItem('conduit_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (email: string) => {
    const foundUser = CONDUIT_USERS.find(u => u.email === email) || CONDUIT_USERS[0];
    setUser(foundUser);
    setIsAuthenticated(true);
    localStorage.setItem('conduit_auth', 'true');
    localStorage.setItem('conduit_user', JSON.stringify(foundUser));
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('conduit_auth');
    localStorage.removeItem('conduit_user');
  };

  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#F4F6FA]">
         <div className="w-12 h-12 border-4 border-[#00B4D8] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage onEnter={() => {}} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} onBack={() => {}} />} />

        {/* Protected Dashboard Routes */}
        <Route path="/*" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout onLogout={handleLogout}>
              <Routes>
                <Route path="health" element={<ObservabilityHub />} />
                <Route path="scorecard" element={<SLAScorecard />} />
                <Route path="shield" element={<RevenueShield />} />
                <Route path="incidents" element={<IncidentCommandCenter />} />
                <Route path="assistant" element={<AIAssistantConsole />} />
                <Route path="ai" element={<AIResolutionEngine />} />
                <Route path="graph" element={<PartnerNetworkGraph />} />
                <Route path="compliance" element={<ComplianceMonitor />} />
                <Route path="config" element={<SystemConfiguration />} />
                <Route path="other" element={<GeneralCategory />} />
                {/* Default dashboard redirect */}
                <Route path="" element={<Navigate to="/health" replace />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/404" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
