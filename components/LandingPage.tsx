import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Shield, 
  Zap, 
  ArrowRight, 
  BarChart3, 
  Brain, 
  Network, 
  FileCheck,
  ChevronRight,
  TrendingUp,
  Target,
  Search,
  MessageSquare,
  ShieldCheck,
  Calculator,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const [aum, setAum] = useState(10000);
  const [failureRate, setFailureRate] = useState(2.5);

  const estimatedLoss = (aum * (failureRate / 100) * 0.15); // Simple logic for demo
  const estimatedROI = (estimatedLoss / 2).toFixed(2);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-[#0A1628] selection:bg-[#00B4D8] selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0A1628] flex items-center justify-center text-[#00B4D8]">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="text-lg font-black tracking-tighter uppercase">Conduit</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            {['API Health', 'SLA Performance', 'Revenue Impact', 'AI Actions'].map((item) => (
              <a key={item} href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0A1628] transition-colors">{item}</a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={onEnter}
              className="text-[10px] font-black uppercase tracking-widest text-[#0A1628] hover:text-[#00B4D8] transition-colors"
            >
              Log In
            </button>
            <button 
              onClick={onEnter}
              className="bg-[#00B4D8] text-[#0A1628] px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#00B4D8]/90 transition-all shadow-sm"
            >
              Request a Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/20 mb-8">
              <ShieldCheck size={12} />
              <span className="text-[11px] font-bold uppercase tracking-widest text-nowrap">Open Banking Reliability</span>
            </div>
            <h1 className="text-[52px] font-bold tracking-tight leading-[1.1] mb-8 text-[#0A1628]">
              Protect your AUM from <br /> API failures in real time
            </h1>
            <p className="text-[18px] text-[#8B9BB4] font-medium leading-relaxed mb-10 max-w-xl">
              Conduit monitors every API call across your financial ecosystem, attributes failures to responsible partners, and quantifies revenue leakage in ₹ Crore before your team even opens a ticket.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={onEnter}
                className="bg-[#00B4D8] text-white px-8 py-4 rounded-xl text-[14px] font-bold hover:bg-[#0096b4] transition-all"
              >
                Request a Demo
              </button>
              <button 
                onClick={onEnter}
                className="border border-[#E2E8F0] text-[#0A1628] px-8 py-4 rounded-xl text-[14px] font-bold hover:bg-gray-50 transition-all"
              >
                View Live Dashboard
              </button>
            </div>
          </div>
          
          <div className="bg-[#0A1628] rounded-3xl p-8 aspect-[4/3] relative overflow-hidden flex items-center justify-center border border-white/5 shadow-2xl">
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #00B4D8 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
             <div className="relative w-full text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00B4D8] mb-4">REAL-TIME MONITORING</p>
                <div className="flex items-center justify-center gap-12 mb-8">
                   <div className="w-20 h-20 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                      <Zap size={32} className="text-[#00B4D8]" />
                   </div>
                   <div className="w-32 h-1 bg-[#00B4D8]/20 relative">
                     <motion.div 
                       animate={{ left: ['0%', '100%'] }}
                       transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                       className="absolute top-0 w-8 h-full bg-[#00B4D8] shadow-[0_0_10px_#00B4D8]"
                     />
                   </div>
                   <div className="w-20 h-20 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                      <Shield size={32} className="text-white" />
                   </div>
                </div>
                <p className="text-[36px] font-bold text-white tracking-tighter leading-none mb-1">99.98%</p>
                <p className="text-[11px] font-medium text-[#8B9BB4] uppercase tracking-widest">ECOSYSTEM UPTIME</p>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Metrics Bar */}
      <section className="bg-[#0A1628] py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <TrustMetric value="₹ 847 Cr" label="AUM Protected" />
          <TrustMetric value="2.3 min" label="Average MTTR" />
          <TrustMetric value="450+" label="Partners Monitored" />
          <TrustMetric value="99.2%" label="Attribution Accuracy" />
        </div>
      </section>

      {/* Module Grid Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[13px] font-bold uppercase tracking-[0.2em] text-[#00B4D8] mb-4">Enterprise Modules</h2>
          <h3 className="text-[36px] font-bold tracking-tight text-[#0A1628]">Full-Stack API Governance</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <ModuleCard bgColor="#3B82F6" icon={<Activity />} title="API Health" desc="Monitor live latency across all AA nodes." />
          <ModuleCard bgColor="#10B981" icon={<BarChart3 />} title="SLA Performance" desc="Track partner compliance & breach history." />
          <ModuleCard bgColor="#EF4444" icon={<Shield />} title="Revenue Impact" desc="Quantify AUM leakage in ₹ Crore." />
          <ModuleCard bgColor="#F59E0B" icon={<Zap />} title="Incident Control" desc="Manage & resolve incidents end to end." />
          <ModuleCard bgColor="#6366F1" icon={<MessageSquare />} title="AI Assistant" desc="Conversational interface for queries." />
          <ModuleCard bgColor="#14B8A6" icon={<Brain />} title="AI Actions" desc="Automated remediation & escalation." />
          <ModuleCard bgColor="#8B5CF6" icon={<Network />} title="Partner Map" desc="Visualise your supply chain." />
          <ModuleCard bgColor="#64748B" icon={<FileCheck />} title="Compliance Alerts" desc="Generate RBI-ready audit reports." />
        </div>
      </section>

      {/* How it Works Pipeline */}
      <section className="py-32 px-6 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
           <div className="text-center mb-20">
             <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00B4D8] mb-4">The Logic</h2>
             <h3 className="text-4xl font-black tracking-tighter text-[#0A1628]">Built on Pipeline Integrity</h3>
           </div>
           
           <div className="flex flex-col lg:flex-row items-center gap-4">
             {['Input', 'Monitor', 'Detect', 'Predict', 'Attribute', 'Calculate', 'Output'].map((step, idx) => (
               <React.Fragment key={step}>
                 <div className="flex-1 w-full lg:w-auto p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center lg:text-left hover:border-[#00B4D8] transition-all group">
                   <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-4 block">0{idx + 1}</span>
                   <h4 className="text-sm font-black text-[#0A1628] mb-2">{step}</h4>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-loose">Automated execution layer for {step.toLowerCase()} triggers.</p>
                 </div>
                 {idx < 6 && <ChevronRight className="hidden lg:block text-gray-200" size={24} />}
               </React.Fragment>
             ))}
           </div>
        </div>
      </section>

      {/* ROI Calculator Section: Fix 5 Centered */}
      <section className="py-20 px-6 flex justify-center">
        <div className="w-[720px] bg-[#0A1628] rounded-3xl p-10 md:p-[40px] text-white relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[#00B4D8]/10 blur-[100px] pointer-events-none" />
           <div className="relative z-10 space-y-12">
              <div className="text-center">
                <h3 className="text-[28px] font-bold tracking-tight mb-2 text-white">ROI Calculator</h3>
                <p className="text-[#8B9BB4] font-medium">Quantify yours API failure costs</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-10">
                   <div className="space-y-4">
                      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-[#8B9BB4]">
                         <span>Digital AUM</span>
                         <span className="text-white">₹ {aum.toLocaleString()} Cr</span>
                      </div>
                      <input 
                        type="range" min="1000" max="100000" step="1000" 
                        value={aum} onChange={(e) => setAum(parseInt(e.target.value))}
                        className="w-full accent-[#00B4D8]"
                      />
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between text-[11px] font-bold uppercase tracking-widest text-[#8B9BB4]">
                         <span>Failure Rate</span>
                         <span className="text-white">{failureRate}%</span>
                      </div>
                      <input 
                        type="range" min="1" max="10" step="0.1" 
                        value={failureRate} onChange={(e) => setFailureRate(parseFloat(e.target.value))}
                        className="w-full accent-[#00B4D8]"
                      />
                   </div>
                </div>
                
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col justify-center gap-6">
                   <div className="text-center">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#8B9BB4] mb-2">Annual AUM at Risk</p>
                      <p className="text-[36px] font-bold text-red-500 tracking-tighter leading-none">₹ {estimatedLoss.toFixed(2)} Cr</p>
                   </div>
                   <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                      <div className="text-center border-r border-white/10">
                         <p className="text-[9px] font-bold uppercase tracking-widest text-[#8B9BB4] mb-1">Subscription</p>
                         <p className="text-[18px] font-bold italic">₹ 1 Cr</p>
                      </div>
                      <div className="text-center">
                         <p className="text-[9px] font-bold uppercase tracking-widest text-[#8B9BB4] mb-1">ROI</p>
                         <p className="text-[18px] font-bold text-[#00B4D8]">{estimatedROI}x</p>
                      </div>
                   </div>
                </div>
              </div>
           </div>
        </div>
      </section>

      {/* Client Archetypes */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <h3 className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-16">Who Uses Conduit</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <ClientCard 
             title="Private Sector Banks" 
             desc="Managing digital wealth journeys and AA API compliance requirements."
           />
           <ClientCard 
             title="Fintech Platforms" 
             desc="Monitoring FIU API reliability and partner SLA performance metrics."
           />
           <ClientCard 
             title="Asset Mgmt Companies" 
             desc="Tracking distribution API uptime and consent flow completion rates."
           />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="text-[#00B4D8]" size={24} fill="currentColor" />
              <span className="text-xl font-black tracking-tighter uppercase">Conduit</span>
            </div>
            <p className="text-sm text-gray-400 font-medium max-w-md">
              The infrastructure layer for Open Banking reliability in the Indian financial ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-10">
            <FooterList title="Product" items={['API Health', 'SLA Performance', 'Revenue Impact', 'AI Actions']} />
            <FooterList title="Company" items={['About', 'Contact', 'Security', 'Privacy']} />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
             Aligned with RBI IT Outsourcing Master Directions 2025 and DPDP Rules 2025
           </p>
           <p className="text-[10px] text-gray-300 font-black uppercase tracking-widest">
             © 2026 Conduit Platform. All Rights Reserved.
           </p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .glossy-icon {
          background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.1);
        }
        input[type=range] {
          height: 4px;
          -webkit-appearance: none;
          background: rgba(255,255,255,0.1);
          border-radius: 2px;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #00B4D8;
          cursor: pointer;
          border: 4px solid #0A1628;
        }
      `}} />
    </div>
  );
};

const TrustMetric = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center space-y-2 lg:border-r border-white/5 last:border-0 px-4">
    <p className="text-[36px] font-bold text-white tracking-tighter leading-none">{value}</p>
    <p className="text-[11px] font-bold uppercase tracking-widest text-[#8B9BB4]">{label}</p>
  </div>
);

const ModuleCard = ({ icon, title, desc, bgColor }: { icon: React.ReactElement; title: string; desc: string; bgColor: string }) => (
  <div className="bg-white border border-gray-100 p-8 rounded-[32px] hover:border-[#00B4D8]/30 transition-all shadow-sm hover:shadow-md group cursor-pointer">
    <div 
      className="w-12 h-12 rounded-[14px] flex items-center justify-center text-white glossy-icon mb-6"
      style={{ backgroundColor: bgColor }}
    >
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <h4 className="text-[14px] font-bold text-[#0A1628] mb-2 tracking-tight">{title}</h4>
    <p className="text-[11px] text-[#8B9BB4] font-medium leading-relaxed tracking-tight">{desc}</p>
  </div>
);

const ClientCard = ({ title, desc }: { title: string; desc: string }) => (
  <div className="p-8 rounded-[40px] border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all">
    <h4 className="text-xl font-black text-[#0A1628] mb-4">{title}</h4>
    <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6">{desc}</p>
    <a href="#" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00B4D8] hover:gap-4 transition-all">
      See How It Works <ChevronRight size={14} />
    </a>
  </div>
);

const FooterList = ({ title, items }: { title: string; items: string[] }) => (
  <div className="space-y-6">
    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0A1628]">{title}</h4>
    <div className="flex flex-col gap-4">
      {items.map(item => (
        <a key={item} href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0A1628] transition-colors">{item}</a>
      ))}
    </div>
  </div>
);

export default LandingPage;
