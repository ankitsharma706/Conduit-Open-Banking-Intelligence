import React from 'react';
import { Shield, ArrowRight, Lock, Mail, ArrowLeft } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string) => void;
  onBack: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [email, setEmail] = React.useState('');
  const [accessKey, setAccessKey] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email);
  };

  return (
    <div className="relative min-h-screen bg-white flex items-center justify-center overflow-hidden font-sans">
      {/* Task 4: Abstract Decorative Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Soft Blurry Blobs */}
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-[#00B4D8] rounded-full blur-[60px] opacity-[0.05]" />
        <div className="absolute bottom-[10%] right-[10%] w-[280px] h-[280px] bg-[#3B82F6] rounded-full blur-[60px] opacity-[0.06]" />
        <div className="absolute top-[40%] right-[5%] w-[200px] h-[200px] bg-[#6366F1] rounded-full blur-[60px] opacity-[0.04]" />
        
        {/* Decorative Arc Lines */}
        <svg className="absolute top-0 right-0 opacity-[0.08] text-[#00B4D8]" width="300" height="300">
          <path d="M 300 0 A 200 200 0 0 0 100 200" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
        <svg className="absolute bottom-0 left-0 opacity-[0.08] text-[#00B4D8]" width="200" height="200">
          <path d="M 0 200 A 140 140 0 0 1 140 60" fill="none" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      {/* Task 4: Login Card */}
      <div className="w-[460px] bg-white border border-[#E8EFFE] rounded-[24px] shadow-[0_12px_48px_rgba(31,41,55,0.08)] p-[52px_48px] relative z-10 animate-reveal">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 flex items-center gap-2 text-[12px] font-bold text-[#8B9BB4] hover:text-[#0A1628] transition-all group"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          BACK TO HOME
        </button>

        {/* Editorial Branding */}
        <div className="flex items-center gap-3 mb-8 mt-4">
           <div className="w-9 h-9 bg-[#0A1628] rounded-lg flex items-center justify-center text-[#00B4D8]">
              <Shield size={20} />
           </div>
           <span className="text-[14px] font-black uppercase tracking-[0.25em] text-[#0A1628]">Conduit</span>
        </div>

        <div className="mb-7">
          <h1 className="text-[36px] font-bold text-[#0A1628] leading-tight tracking-[-0.01em]">Welcome back</h1>
          <p className="text-[15px] text-[#6B7280] mt-1.5">Sign in to your Conduit workspace</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <input 
              type="email" 
              placeholder="Work email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 bg-white border-[1.5px] border-[#E5E7EB] rounded-[10px] px-4 text-[14px] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00B4D8] focus:ring-[3px] focus:ring-[#00B4D8]/12 transition-all font-medium text-[#0A1628]"
            />
          </div>
          
          <div className="space-y-1.5">
            <input 
              type="password" 
              placeholder="Access key"
              value={accessKey}
              required
              onChange={(e) => setAccessKey(e.target.value)}
              className="w-full h-12 bg-white border-[1.5px] border-[#E5E7EB] rounded-[10px] px-4 text-[14px] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#00B4D8] focus:ring-[3px] focus:ring-[#00B4D8]/12 transition-all font-medium text-[#0A1628]"
            />
          </div>

          <div className="flex justify-end">
             <button type="button" className="text-[12px] text-[#00B4D8] font-medium hover:underline">Forgot key?</button>
          </div>

          <button 
            type="submit"
            className="w-full h-[52px] bg-[#0A1628] hover:bg-[#00B4D8] rounded-[10px] text-[15px] font-medium text-white transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(0,0,0,0.1)] group"
          >
            Sign In with Conduit
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        </form>

        <div className="mt-8 text-center">
           <button className="text-[13px] font-medium text-[#00B4D8] hover:text-[#0096b4]">Request demo access &rarr;</button>
        </div>

        <div className="mt-12 pt-8 border-t border-[#F3F4F6] space-y-4 flex flex-col items-center">
            <div className="flex gap-2">
               <span className="bg-[#F0FDF4] border border-[#BBF7D0] px-2.5 py-1 rounded-full text-[11px] font-bold text-[#166534]">ISO 27001 Certified</span>
               <span className="bg-[#F0FDF4] border border-[#BBF7D0] px-2.5 py-1 rounded-full text-[11px] font-bold text-[#166534]">SOC2 Type II</span>
            </div>
            <span className="bg-[#EFF6FF] border border-[#BFDBFE] px-2.5 py-1 rounded-full text-[11px] font-bold text-[#1E40AF]">RBI Compliant Infrastructure</span>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes reveal {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-reveal { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}} />
    </div>
  );
};

export default LoginPage;
