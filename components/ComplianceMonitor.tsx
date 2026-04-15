import React from 'react';
import { 
  FileCheck, 
  ShieldCheck, 
  AlertCircle, 
  FileDown,
  History,
  CheckCircle2,
  Lock
} from 'lucide-react';

const ComplianceMonitor: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-[#0A1628] uppercase tracking-tighter">Compliance Alerts</h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Regulatory Evidence & Audit Readiness</p>
        </div>
        <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-xl border border-green-500/20">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Audit Readiness: 94%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ComplianceCard label="RBI Reportable Incidents" value="0" status="healthy" />
        <ComplianceCard label="SLA Breaches Documented" value="24" status="warning" />
        <ComplianceCard label="Complete Audit Trails" value="100%" status="healthy" />
        <ComplianceCard label="Consent Flow Success" value="98.2%" status="healthy" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Generation */}
        <div className="lg:col-span-2 bg-white rounded-[32px] border border-gray-200 p-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8">Regulatory Report Generation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReportItem 
              title="Monthly SLA Compliance Report" 
              desc="Partner breach summary with attribution evidence." 
              standard="RBI IT Outsourcing 2025"
            />
            <ReportItem 
              title="Quarterly Incident Register" 
              desc="All P1 and P2 incidents with full lifecycle data." 
              standard="RBI Master Direction 2025"
            />
            <ReportItem 
              title="Data Sharing Audit Trail" 
              desc="Consent flow completion and failure records." 
              standard="DPDP Rules 2025"
            />
            <ReportItem 
              title="Third-Party Risk Summary" 
              desc="FailGuard risk scores and mitigation actions." 
              standard="RBI IT Outsourcing 2025"
            />
          </div>
        </div>

        {/* Compliance Timeline */}
        <div className="bg-[#0A1628] rounded-[32px] p-8 text-white">
          <h3 className="text-xs font-black uppercase tracking-widest text-[#00B4D8] mb-8 flex items-center gap-2">
            <History size={14} />
            Compliance Log
          </h3>
          <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-white/5">
            <LogItem time="2h ago" label="Quarterly Audit Exported" />
            <LogItem time="1d ago" label="SLA Penalty Logged: Partner Node" />
            <LogItem time="2d ago" label="Compliance Score Updated" />
            <LogItem time="5d ago" label="RBI Inspection Data Ready" />
          </div>
        </div>
      </div>

      {/* Audit Readiness Section */}
      <div className="bg-white rounded-[40px] p-10 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="p-4 rounded-2xl bg-green-500/10 text-green-500">
            <Lock size={32} />
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight text-[#0A1628]">Immutable Audit Trail Active</h4>
            <p className="text-sm text-gray-400 font-medium">Every incident, attribution, and action is cryptographically signed and logged.</p>
          </div>
        </div>
        <button className="bg-[#0A1628] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
          Verify Audit Integrity
        </button>
      </div>
    </div>
  );
};

const ComplianceCard = ({ label, value, status }: { label: string; value: string; status: 'healthy' | 'warning' | 'critical' }) => (
  <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-xl ${status === 'healthy' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
        {status === 'healthy' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
      </div>
    </div>
    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    <p className="text-2xl font-black text-[#0A1628]">{value}</p>
  </div>
);

const ReportItem = ({ title, desc, standard }: { title: string; desc: string; standard: string }) => (
  <div className="p-6 rounded-2xl border border-gray-100 hover:border-[#00B4D8]/30 transition-all group cursor-pointer">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 rounded-lg bg-gray-50 text-gray-400 group-hover:text-[#00B4D8] transition-colors">
        <FileCheck size={20} />
      </div>
      <FileDown size={16} className="text-gray-300 group-hover:text-[#0A1628] transition-colors" />
    </div>
    <h4 className="text-sm font-black text-[#0A1628] mb-1">{title}</h4>
    <p className="text-[10px] text-gray-400 font-bold mb-4">{desc}</p>
    <span className="text-[8px] font-black uppercase tracking-widest text-[#00B4D8] bg-[#00B4D8]/5 px-2 py-1 rounded">
      {standard}
    </span>
  </div>
);

const LogItem = ({ time, label }: { time: string; label: string }) => (
  <div className="flex gap-4 relative">
    <div className="w-4 h-4 rounded-full border-2 border-white/20 bg-[#0A1628] z-10" />
    <div>
      <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{time}</p>
      <p className="text-xs font-bold text-white/80">{label}</p>
    </div>
  </div>
);

export default ComplianceMonitor;
