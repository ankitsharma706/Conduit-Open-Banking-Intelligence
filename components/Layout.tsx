import React from 'react';
import { 
  Activity, 
  BarChart3, 
  Shield, 
  Zap, 
  Brain, 
  Network, 
  FileCheck, 
  Settings, 
  LogOut,
  MessageSquare,
  CircuitBoard,
  User,
  ArrowLeft,
  Activity as PulseIcon,
  Users,
  ChevronRight
} from 'lucide-react';
import { ENTERPRISE_CLIENT } from '../constants.tsx';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const [timeFilter, setTimeFilter] = React.useState('LIVE');

  const navItems = [
    { id: 'hub', label: 'API Health' },
    { id: 'scorecard', label: 'SLA Performance' },
    { id: 'shield', label: 'Revenue Impact' },
    { id: 'incidents', label: 'Incident Control' },
    { id: 'assistant', label: 'AI Assistant' },
    { id: 'ai', label: 'AI Actions' },
    { id: 'graph', label: 'Partner Map' },
    { id: 'compliance', label: 'Compliance' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'config', label: 'System Setup' },
  ];

  const getActiveModuleLabel = () => {
    const active = navItems.find(item => item.id === activeTab);
    return active ? active.label : 'Dashboard';
  };

  return (
    <div className="flex flex-col h-screen bg-[#F0F4F8] font-sans text-[#0A1628] overflow-hidden">
      {/* Task 2: Horizontal Top Navigation Bar (52px) */}
      <nav className="h-[52px] w-full bg-[#0A1628] relative flex items-center px-6 shrink-0 z-[60]">
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0D1F3C] to-[#0A1628] pointer-events-none" />
        
        {/* Particle Effect: Tiny dots drifting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-[3px] h-[3px] rounded-full bg-[#00B4D8]/15 animate-drift"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${15 + Math.random() * 20}s`,
                animationDelay: `-${Math.random() * 20}s`
              }}
            />
          ))}
        </div>

        {/* Shimmering Bottom Border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00B4D8]/40 to-transparent pointer-events-none shadow-[0_0_8px_rgba(0,180,216,0.3)]" />

        {/* Logo with Heartbeat Pulse */}
        <div className="flex items-center gap-4 shrink-0 relative z-10 transition-all">
          <div className="text-[#00B4D8] animate-heartbeat">
            <CircuitBoard size={32} />
          </div>
          <div className="w-[0.5px] h-6 bg-white/10" />
        </div>

        {/* Navigation Labels */}
        <div className="flex-1 flex justify-evenly items-center px-8 h-full relative z-10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`h-full flex items-center px-2 relative transition-all text-[13px] font-medium tracking-tight group ${
                activeTab === item.id ? 'text-[#00B4D8]' : 'text-[#8B9BB4] hover:text-white'
              }`}
              style={{
                textShadow: activeTab === item.id ? '0 0 12px rgba(0,180,216,0.4)' : undefined
              }}
            >
              <span className={`transition-all duration-300 ${activeTab !== item.id ? 'group-hover:[text-shadow:0_0_12px_rgba(0,180,216,0.6)]' : ''}`}>
                {item.label}
              </span>
              {activeTab === item.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#00B4D8] animate-slide-right" />
              )}
            </button>
          ))}
        </div>

        {/* System Admin Avatar with Rotating Ring */}
        <div className="relative shrink-0 ml-4 z-[70] group">
          <div className="absolute inset-[-6px] rounded-full border-2 border-[#00B4D8]/20 group-hover:border-[#00B4D8]/50 transition-all pointer-events-none" />
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className={`w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-black transition-all border-2 relative z-[80] shadow-lg ${
              isProfileOpen ? 'bg-[#00B4D8] border-[#00B4D8] text-white' : 'bg-[#1E293B] text-white border-white/10 hover:border-[#00B4D8]/50'
            }`}
          >
            SA
          </button>
          
          {isProfileOpen && (
            <>
              {/* Click-outside backdrop */}
              <div 
                className="fixed inset-0 z-[65] bg-black/5 backdrop-blur-[2px]" 
                onClick={() => setIsProfileOpen(false)} 
              />
              <div className="absolute right-0 mt-4 w-[280px] bg-white border border-[#E2E8F0] rounded-[20px] shadow-[0_24px_60px_rgba(10,22,40,0.18)] overflow-hidden z-[90] animate-fade-in origin-top-right">
                <div className="p-6 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00B4D8] to-[#0077B6] text-white flex items-center justify-center font-black text-sm shadow-lg shadow-[#00B4D8]/20">SA</div>
                    <div>
                      <p className="text-[14px] font-black text-[#0A1628] leading-tight uppercase tracking-widest">System Admin</p>
                      <div className="flex items-center gap-2 mt-1">
                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">CTO Role</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-gray-100">
                    <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1 px-1">Organization</p>
                    <p className="text-[12px] font-bold text-[#0A1628] px-1 truncate">Conduit Infrastructure Inc.</p>
                  </div>
                </div>
                <div className="p-2">
                  <button 
                    onClick={() => { setActiveTab('config'); setIsProfileOpen(false); }}
                    className="w-full text-left px-5 py-3.5 text-[12px] hover:bg-gray-50 rounded-xl flex items-center justify-between text-gray-600 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Users size={16} className="text-[#8B9BB4] group-hover:text-[#00B4D8]" />
                      <span className="font-bold">RBAC & Invites</span>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => { setActiveTab('integrations'); setIsProfileOpen(false); }}
                    className="w-full text-left px-5 py-3.5 text-[12px] hover:bg-gray-50 rounded-xl flex items-center justify-between text-gray-600 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Network size={16} className="text-[#8B9BB4] group-hover:text-[#00B4D8]" />
                      <span className="font-bold">API & Data Links</span>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => { setActiveTab('config'); setIsProfileOpen(false); }}
                    className="w-full text-left px-5 py-3.5 text-[12px] hover:bg-gray-50 rounded-xl flex items-center justify-between text-gray-600 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Settings size={16} className="text-[#8B9BB4] group-hover:text-[#00B4D8]" />
                      <span className="font-bold">Workspace Config</span>
                    </div>
                    <ChevronRight size={14} className="text-gray-300 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  <div className="my-2 border-t border-[#F1F5F9]" />
                  <button 
                    onClick={() => { onLogout(); setIsProfileOpen(false); }}
                    className="w-full text-left px-5 py-4 text-[12px] text-red-500 hover:bg-red-50 rounded-xl flex items-center gap-3 transition-all group"
                  >
                    <div className="p-2 bg-red-100 rounded-lg text-red-600 group-hover:scale-110 transition-transform">
                      <LogOut size={16} />
                    </div>
                    <div className="flex flex-col">
                       <span className="font-black uppercase tracking-[0.2em] text-[10px]">Terminate Session</span>
                       <span className="text-[9px] font-bold text-red-400 mt-0.5">Logout from admin console</span>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Task 1: Contextual Sub-bar (44px) - Titles removed from pages, handled here */}
      <header className="h-[44px] bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0 z-40">
        {/* Module Title */}
        <div className="flex items-center gap-3 flex-1">
          <h1 className="text-[18px] font-bold text-[#0A1628] tracking-tight">{getActiveModuleLabel()}</h1>
          <div className="w-[1px] h-4 bg-gray-200" />
          <span className="text-[10px] font-black text-[#8B9BB4] uppercase tracking-[0.2em]">Live Session</span>
        </div>
        
        {/* Time filter pills */}
        {activeTab === 'hub' && (
          <div className="flex items-center gap-1 bg-gray-100 p-0.5 rounded-lg border border-gray-200">
            {['LIVE', '1H', '6H', '24H', 'MTD'].map((filter) => (
              <button 
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-3 py-1 rounded-md text-[10px] font-black tracking-widest transition-all ${
                  timeFilter === filter ? 'bg-white text-[#0A1628] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        {/* Global Status Indicators */}
        <div className="flex-1 flex items-center justify-end gap-10">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Health Score</span>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-green-500/10 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
              <PulseIcon size={12} className="text-green-600 animate-pulse" />
              <span className="text-[12px] font-bold text-green-600">{ENTERPRISE_CLIENT.healthScore}%</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">AUM at Risk</span>
            <span className="text-[14px] font-black text-red-500 tabular-nums">₹ {ENTERPRISE_CLIENT.aumAtRisk} Cr</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Active Incidents</span>
            <div className="w-6 h-6 flex items-center justify-center rounded-full bg-amber-500 text-white text-[12px] font-black shadow-[0_0_12px_rgba(245,158,11,0.3)]">
              {ENTERPRISE_CLIENT.activeIncidents}
            </div>
          </div>
        </div>
      </header>

      {/* Content Area with Accessibility Support */}
      <main className="flex-1 overflow-y-auto bg-[#F8FAFC]">
        <div className="p-6 h-full transition-all duration-500">
          {children}
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes drift {
          from { transform: translateX(-100px); opacity: 0; }
          50% { opacity: 1; }
          to { transform: translateX(100vw); opacity: 0; }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.04); }
        }
        @keyframes slide-right {
          from { width: 0; left: 50%; opacity: 0; }
          to { width: 100%; left: 0; opacity: 1; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-drift { animation: drift linear infinite; }
        .animate-heartbeat { animation: heartbeat 3s ease-in-out infinite; }
        .animate-slide-right { animation: slide-right 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-fade-in { animation: fade-in 0.2s cubic-bezier(0, 0, 0.2, 1) forwards; }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}} />
    </div>
  );
};

export default Layout;
