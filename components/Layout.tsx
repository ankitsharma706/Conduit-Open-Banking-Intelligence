import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Activity, 
  BarChart3, 
  Shield, 
  Zap, 
  Brain, 
  Network, 
  FileCheck, 
  Settings, 
  AlertCircle,
  Menu,
  LogOut,
  MessageSquare,
  LayoutGrid
} from 'lucide-react';
import { ENTERPRISE_CLIENT } from '../constants.tsx';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { path: '/health', label: 'API Health', icon: <Activity size={18} /> },
    { path: '/scorecard', label: 'SLA Performance', icon: <BarChart3 size={18} /> },
    { path: '/shield', label: 'Revenue Impact', icon: <Shield size={18} /> },
    { path: '/incidents', label: 'Incident Control', icon: <Zap size={18} /> },
    { path: '/assistant', label: 'AI Assistant', icon: <MessageSquare size={18} /> },
    { path: '/ai', label: 'AI Actions', icon: <Brain size={18} /> },
    { path: '/graph', label: 'Partner Map', icon: <Network size={18} /> },
    { path: '/compliance', label: 'Compliance', icon: <FileCheck size={18} /> },
    { path: '/other', label: 'General', icon: <LayoutGrid size={18} /> },
    { path: '/config', label: 'System Setup', icon: <Settings size={18} /> },
  ];

  const getHealthColor = (score: number) => {
    if (score > 85) return 'text-green-500 bg-green-500/10 border-green-500/20';
    if (score > 60) return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    return 'text-red-500 bg-red-500/10 border-red-500/20';
  };

  return (
    <div className="flex h-screen bg-[#F4F6FA] font-sans text-[#0A1628]">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0A1628] text-white transform transition-transform duration-300 lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <NavLink to="/" className="p-6 flex items-center gap-3 border-b border-white/5">
            <img src="/favicon.png" alt="Conduit Logo" className="w-8 h-8 rounded-lg" />
            <span className="text-xl font-black tracking-tighter uppercase">Conduit</span>
          </NavLink>

          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/20' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="p-6 border-t border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                SA
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">System Admin</p>
                <p className="text-[10px] text-white/40 uppercase tracking-widest font-black">CTO</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 -ml-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-black uppercase tracking-widest text-gray-400">Client:</span>
              <span className="text-sm font-bold">{ENTERPRISE_CLIENT.name}</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold ${getHealthColor(ENTERPRISE_CLIENT.healthScore)}`}>
              <Activity size={14} />
              <span>Health: {ENTERPRISE_CLIENT.healthScore}</span>
            </div>

            <div className="hidden md:flex flex-col items-end">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">AUM at Risk</span>
              <span className="text-sm font-black text-red-500">₹ {ENTERPRISE_CLIENT.aumAtRisk} Cr</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                  <AlertCircle size={20} />
                  {ENTERPRISE_CLIENT.criticalIncidents > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {ENTERPRISE_CLIENT.criticalIncidents}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="h-8 w-px bg-gray-200 mx-2" />
              
              <button 
                onClick={onLogout}
                className="flex items-center gap-2 px-3 py-2 text-gray-400 hover:text-red-500 transition-colors text-xs font-black uppercase tracking-widest"
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-8">
          {children}
        </main>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
