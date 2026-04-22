import React, { useState, useEffect } from 'react';
import Layout from './components/Layout.tsx';
import LandingPage from './components/LandingPage.tsx';
import LoginPage from './components/LoginPage.tsx';
import ObservabilityHub from './components/ObservabilityHub.tsx';
import SLAScorecard from './components/SLAScorecard.tsx';
import RevenueShield from './components/RevenueShield.tsx';
import IncidentCommandCenter from './components/IncidentCommandCenter.tsx';
import AIResolutionEngine from './components/AIResolutionEngine.tsx';
import PartnerNetworkGraph from './components/PartnerNetworkGraph.tsx';
import ComplianceMonitor from './components/ComplianceMonitor.tsx';
import SystemConfiguration from './components/SystemConfiguration.tsx';
import Integrations from './components/Integrations.tsx';
import { ConduitUser, UserRole } from './types.ts';
import { CONDUIT_USERS } from './constants.tsx';

import AIAssistantConsole from './components/AIAssistantConsole.tsx';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [user, setUser] = useState<ConduitUser | null>(null);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem('conduit_active_tab') || 'hub';
  });

  useEffect(() => {
    localStorage.setItem('conduit_active_tab', activeTab);
  }, [activeTab]);

  const handleLogin = (email: string) => {
    const foundUser = CONDUIT_USERS.find(u => u.email === email) || CONDUIT_USERS[0];
    setUser(foundUser);
    setIsAuthenticated(true);
    setShowLanding(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLanding(true);
    setUser(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'hub': return <ObservabilityHub />;
      case 'scorecard': return <SLAScorecard />;
      case 'shield': return <RevenueShield />;
      case 'incidents': return <IncidentCommandCenter />;
      case 'assistant': return <AIAssistantConsole />;
      case 'ai': return <AIResolutionEngine />;
      case 'graph': return <PartnerNetworkGraph />;
      case 'compliance': return <ComplianceMonitor />;
      case 'config': return <SystemConfiguration />;
      case 'integrations': return <Integrations />;
      default: return <ObservabilityHub />;
    }
  };

  if (showLanding && !isAuthenticated) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} onBack={() => setShowLanding(true)} />;
  }

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
      {renderContent()}
    </Layout>
  );
};

export default App;
