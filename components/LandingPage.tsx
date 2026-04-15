import React from 'react';
import { Link } from 'react-router-dom';
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
  Play,
  CheckCircle2,
  TrendingUp,
  DollarSign
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F4F6FA] font-sans text-[#0A1628] selection:bg-[#00B4D8] selection:text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <span className="text-xl font-black tracking-tighter uppercase">Conduit</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-10">
            {[
              { label: 'API Health', path: '/health' },
              { label: 'SLA Performance', path: '/scorecard' },
              { label: 'Revenue Impact', path: '/shield' },
              { label: 'AI Actions', path: '/ai' }
            ].map((item) => (
              <Link 
                key={item.label} 
                to={item.path} 
                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0A1628] transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <Link 
            to="/login"
            className="bg-[#0A1628] text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all"
          >
            Login
            <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00B4D8]/10 text-[#00B4D8] border border-[#00B4D8]/20 mb-8">
            <Zap size={14} />
            <span className="text-[10px] font-black uppercase tracking-widest">Enterprise API Observability</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Conduit protects every <br />
            <span className="text-[#00B4D8]">rupee flowing</span> <br />
            through your APIs.
          </h1>
          
          <p className="text-xl text-gray-400 font-medium max-w-2xl mx-auto mb-12">
            The definitive revenue-linked observability platform for the Open Banking ecosystem. Stop AUM leakage, enforce partner SLAs, and automate remediation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/login"
              className="w-full sm:w-auto bg-[#0A1628] text-white px-10 py-6 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gray-800 transition-all shadow-2xl shadow-[#0A1628]/20"
            >
              Access Conduit
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Metric Strip */}
      <div className="bg-[#0A1628] py-6 overflow-hidden border-y border-white/5">
        <div className="flex items-center gap-20 animate-scroll whitespace-nowrap px-6">
          <MetricItem label="Revenue at Risk Detected Today" value="₹ 12.4 Cr" color="text-red-500" />
          <MetricItem label="API Success Rate" value="99.98%" color="text-green-500" />
          <MetricItem label="Avg. MTTR Reduction" value="68%" color="text-[#00B4D8]" />
          <MetricItem label="Active API Nodes" value="450+" color="text-white" />
          <MetricItem label="Revenue at Risk Detected Today" value="₹ 12.4 Cr" color="text-red-500" />
          <MetricItem label="API Success Rate" value="99.98%" color="text-green-500" />
        </div>
      </div>

      {/* Feature Overview */}
      <section className="py-32 px-6 bg-white" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#00B4D8] mb-4">Core Capabilities</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0A1628]">Built for Financial Infrastructure</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<Activity size={24} />} 
              title="API Health" 
              desc="Real-time distributed tracing and health metrics across your entire partner ecosystem."
            />
            <FeatureCard 
              icon={<BarChart3 size={24} />} 
              title="SLA Performance" 
              desc="Automated attribution engine that maps every millisecond of latency to the responsible partner."
            />
            <FeatureCard 
              icon={<Shield size={24} />} 
              title="Revenue Impact" 
              desc="Quantify the exact financial cost of API failures and latency in real-time Rupee values."
            />
            <FeatureCard 
              icon={<Brain size={24} />} 
              title="AI Actions" 
              desc="LSTMWatch and FailGuard models that predict failures and trigger automated remediation."
            />
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-32 px-6 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-[#00B4D8] mb-4">The Workflow</h2>
            <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-[#0A1628]">Detect to Resolve in Milliseconds</h3>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <WorkflowStep number="01" title="Detect" desc="Real-time anomaly detection across all API hops." />
            <ChevronRight className="hidden lg:block text-gray-300" size={32} />
            <WorkflowStep number="02" title="Attribute" desc="Pinpoint the exact partner causing the failure." />
            <ChevronRight className="hidden lg:block text-gray-300" size={32} />
            <WorkflowStep number="03" title="Quantify" desc="Calculate the AUM at risk for the specific failure." />
            <ChevronRight className="hidden lg:block text-gray-300" size={32} />
            <WorkflowStep number="04" title="Resolve" desc="Trigger automated failover or circuit breaking." />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-[#00B4D8] rounded-[60px] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[100px] pointer-events-none" />
          
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-8 text-[#0A1628]">
            Ready to secure your <br /> Open Banking revenue?
          </h2>
          
          <Link 
            to="/login"
            className="bg-[#0A1628] text-white px-12 py-6 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-gray-800 transition-all mx-auto shadow-2xl shadow-[#0A1628]/20"
          >
            Access Conduit
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <span className="text-xl font-black tracking-tighter uppercase">Conduit</span>
          </div>
          
          <div className="flex gap-10">
            {['Privacy', 'Terms', 'Security', 'Status'].map((item) => (
              <a key={item} href="#" className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#0A1628] transition-colors">{item}</a>
            ))}
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">© 2026 Conduit Intelligence Platform. All Rights Reserved.</p>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}} />
    </div>
  );
};

const MetricItem = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <div className="flex items-center gap-4">
    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}:</span>
    <span className={`text-sm font-black ${color}`}>{value}</span>
  </div>
);

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) => (
  <div className="p-8 rounded-[32px] border border-gray-100 bg-white hover:border-[#00B4D8]/30 transition-all group">
    <div className="w-12 h-12 bg-[#00B4D8]/10 rounded-xl flex items-center justify-center text-[#00B4D8] mb-6 group-hover:bg-[#00B4D8] group-hover:text-white transition-all">
      {icon}
    </div>
    <h4 className="text-lg font-black text-[#0A1628] mb-2">{title}</h4>
    <p className="text-sm text-gray-400 font-medium leading-relaxed">{desc}</p>
  </div>
);

const WorkflowStep = ({ number, title, desc }: { number: string; title: string; desc: string }) => (
  <div className="flex-1 text-center lg:text-left">
    <span className="text-4xl font-black text-[#00B4D8]/20 block mb-4">{number}</span>
    <h4 className="text-xl font-black text-[#0A1628] mb-2">{title}</h4>
    <p className="text-sm text-gray-400 font-medium">{desc}</p>
  </div>
);

export default LandingPage;
