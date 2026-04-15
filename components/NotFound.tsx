import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-[32px] flex items-center justify-center mb-8">
        <AlertTriangle size={40} />
      </div>
      <h1 className="text-6xl font-black text-[#0A1628] tracking-tighter mb-4">404</h1>
      <h2 className="text-xl font-black text-gray-400 uppercase tracking-widest mb-8">Node Not Found</h2>
      <p className="text-gray-400 max-w-md mb-12 font-medium">
        The route you are trying to access does not exist in the Conduit ecosystem. It may have been decommissioned or moved.
      </p>
      <button 
        onClick={() => navigate('/')}
        className="bg-[#0A1628] text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center gap-3 hover:bg-gray-800 transition-all shadow-xl shadow-[#0A1628]/20"
      >
        <Home size={18} />
        Back to Hub
      </button>
    </div>
  );
};

export default NotFound;
