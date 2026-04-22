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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ComplianceCard label="RBI Reportable" value="0" status="healthy" />
        <ComplianceCard label="SLA Breaches" value="24" status="warning" />
        <ComplianceCard label="Audit Trails" value="100%" status="healthy" />
        <ComplianceCard label="Consent Flows" value="98.2%" status="healthy" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Report Generation */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#E2E8F0] p-6">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#8B9BB4] mb-6">REGULATORY EVIDENCE REGISTRY</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <ReportItem 
              title="Monthly SLA Compliance" 
              desc="Breach summary & evidence." 
              standard="RBI IT 2025"
            />
            <ReportItem 
              title="Quarterly Incident Log" 
              desc="P1/P2 lifecycle evidence." 
              standard="RBI Master Direction"
            />
            <ReportItem 
              title="DPDP Audit Trail" 
              desc="Consent flow success metrics." 
              standard="DPDP Rules 2025"
            />
            <ReportItem 
              title="Third-Party Risk (FailGuard)" 
              desc="Partner risk & mitigations." 
              standard="RBI Outsourcing"
            />
          </div>
        </div>

        {/* Compliance Timeline */}
        <div className="bg-[#0A1628] rounded-xl p-6 text-white shadow-xl">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#00B4D8] mb-8 flex items-center gap-2 border-b border-white/5 pb-4">
            <History size={14} />
            Compliance Log
          </h3>
          <div className="space-y-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
            <LogItem time="2h ago" label="Quarterly Audit Exported" />
            <LogItem time="1d ago" label="SLA Penalty Logged" />
            <LogItem time="2d ago" label="Score Updated" />
            <LogItem time="5d ago" label="RBI Inspection Ready" />
          </div>
        </div>
      </div>

      {/* Audit Readiness Section */}
      <div className="bg-white rounded-xl p-8 border border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-50 text-green-500">
            <Lock size={28} />
          </div>
          <div>
            <h4 className="text-[18px] font-bold text-[#0A1628] tracking-tight">Immutable Audit Trail Active</h4>
            <p className="text-[13px] text-[#8B9BB4] font-medium leading-none mt-1">Every action is cryptographically signed and logged for RBI scrutiny.</p>
          </div>
        </div>
        <button className="h-[44px] bg-[#0A1628] text-white px-6 rounded-lg text-[13px] font-bold hover:bg-[#1E293B] transition-all">
          Verify Integrity
        </button>
      </div>
    </div>
  );
};

const ComplianceCard = ({ label, value, status }: { label: string; value: string; status: 'healthy' | 'warning' | 'critical' }) => (
  <div className="bg-white p-5 h-[160px] rounded-lg border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start">
      <div className={`p-2 rounded-lg ${status === 'healthy' ? 'bg-green-50 text-green-500' : 'bg-amber-50 text-amber-500'}`}>
        {status === 'healthy' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
      </div>
    </div>
    <div>
      <p className="text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest mb-1">{label}</p>
      <p className="text-[24px] font-bold text-[#0A1628] tracking-tight">{value}</p>
    </div>
  </div>
);

const ReportItem = ({ title, desc, standard }: { title: string; desc: string; standard: string }) => (
  <div className="p-4 rounded-lg border border-[#F1F5F9] hover:border-[#00B4D8]/30 transition-all group cursor-pointer bg-white">
    <div className="flex justify-between items-start mb-3">
      <div className="p-2 rounded-lg bg-[#F8FAFC] text-[#8B9BB4] group-hover:text-[#00B4D8] transition-colors">
        <FileCheck size={18} />
      </div>
      <FileDown size={14} className="text-[#E2E8F0] group-hover:text-[#0A1628] transition-colors" />
    </div>
    <h4 className="text-[13px] font-bold text-[#0A1628] mb-1 leading-tight">{title}</h4>
    <p className="text-[11px] text-[#8B9BB4] font-medium mb-3 line-clamp-1">{desc}</p>
    <span className="text-[10px] font-bold uppercase tracking-widest text-[#00B4D8] bg-[#E0F7FA] px-2 py-0.5 rounded-[4px]">
      {standard}
    </span>
  </div>
);

const LogItem = ({ time, label }: { time: string; label: string }) => (
  <div className="flex gap-4 relative">
    <div className="w-3 h-3 rounded-full border-2 border-white/20 bg-[#0A1628] z-10 translate-y-1" />
    <div>
      <p className="text-[10px] font-bold text-[#8B9BB4] uppercase tracking-widest">{time}</p>
      <p className="text-[12px] font-medium text-white/80 line-clamp-1">{label}</p>
    </div>
  </div>
);

export default ComplianceMonitor;
