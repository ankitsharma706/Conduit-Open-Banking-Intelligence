import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, Lock, Mail, ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [accessKey, setAccessKey] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
    navigate('/health'); // Redirect to dashboard after login trigger
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md bg-white rounded-[40px] p-12 shadow-2xl shadow-gray-200 border border-gray-100 relative">
        <button 
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0A1628] transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </button>

        <div className="text-center mb-12 pt-8">
          <span className="text-2xl font-black tracking-tighter uppercase text-[#0A1628]">Conduit</span>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-2">Enterprise Access Gateway</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Mail size={12} />
              Email Address
            </label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo@conduit.ac.in"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-[#0A1628] outline-none focus:border-[#00B4D8] transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Lock size={12} />
              Access Key
            </label>
            <input 
              type="password" 
              required
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-[#0A1628] outline-none focus:border-[#00B4D8] transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#0A1628] text-white py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gray-800 transition-all group shadow-xl shadow-[#0A1628]/10"
          >
            Authenticate
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-center gap-6 text-gray-400">
          <div className="flex items-center gap-2">
            <Shield size={14} />
            <span className="text-[9px] font-black uppercase tracking-widest">Secure Session</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
