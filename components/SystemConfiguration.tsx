import React, { useState } from 'react';
import { 
  Database, 
  Shield, 
  Brain, 
  DollarSign, 
  Users,
  CheckCircle2,
  Globe,
  Bell,
  Eye,
  FileText,
  Lock,
  ChevronRight,
  Plus,
  Trash2,
  Save,
  Zap,
  Activity,
  Target,
  Search,
  RefreshCw
} from 'lucide-react';
import { CONDUIT_USERS, REVENUE_MAPPINGS, SLA_ATTRIBUTIONS } from '../constants.tsx';

const SystemConfiguration: React.FC = () => {
  const [currentStage, setCurrentStage] = useState(1);
  const [completedStages, setCompletedStages] = useState<number[]>([1]);
  const [showSaved, setShowSaved] = useState(false);

  const stages = [
    { id: 1, label: 'Input', icon: <Database size={16} /> },
    { id: 2, label: 'Monitor', icon: <Activity size={16} /> },
    { id: 3, label: 'Detect', icon: <Search size={16} /> },
    { id: 4, label: 'Predict', icon: <Brain size={16} /> },
    { id: 5, label: 'Attribute', icon: <Target size={16} /> },
    { id: 6, label: 'Calculate', icon: <DollarSign size={16} /> },
    { id: 7, label: 'Output', icon: <Zap size={16} /> },
    { id: 8, label: 'RBAC', icon: <Users size={16} /> },
  ];

  const handleSaveStage = (stageId: number) => {
    if (!completedStages.includes(stageId)) {
      setCompletedStages([...completedStages, stageId]);
    }
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex items-center justify-between relative px-4">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#E2E8F0] -translate-y-1/2 -z-10" />
          {stages.map((stage) => {
            const isActive = currentStage === stage.id;
            const isCompleted = completedStages.includes(stage.id);
            return (
              <button 
                key={stage.id}
                onClick={() => setCurrentStage(stage.id)}
                className="flex flex-col items-center gap-2 relative z-10"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all border ${
                  isActive 
                    ? 'bg-[#00B4D8] border-[#00B4D8] text-white' 
                    : isCompleted 
                      ? 'bg-white border-[#00B4D8] text-[#00B4D8]' 
                      : 'bg-white border-[#E2E8F0] text-[#8B9BB4]'
                }`}>
                  {isCompleted && !isActive ? <CheckCircle2 size={14} /> : <span className="text-[12px] font-bold">{stage.id}</span>}
                </div>
                <span className={`text-[11px] font-bold uppercase tracking-widest ${isActive ? 'text-[#0A1628]' : 'text-[#8B9BB4]'}`}>
                  {stage.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm min-h-[500px] flex flex-col">
        <div className="flex-1">
          {currentStage === 1 && <Stage1Input onSave={() => handleSaveStage(1)} />}
          {currentStage === 2 && <Stage2Monitor onSave={() => handleSaveStage(2)} />}
          {currentStage === 3 && <Stage3Detect onSave={() => handleSaveStage(3)} />}
          {currentStage === 4 && <Stage4Predict onSave={() => handleSaveStage(4)} />}
          {currentStage === 5 && <Stage5Attribute onSave={() => handleSaveStage(5)} />}
          {currentStage === 6 && <Stage6Calculate onSave={() => handleSaveStage(6)} />}
          {currentStage === 7 && <Stage7Output onSave={() => handleSaveStage(7)} />}
          {currentStage === 8 && <Stage8RBAC onSave={() => handleSaveStage(8)} />}
        </div>
        
        <div className="mt-12 flex justify-between items-center pt-8 border-t border-[#F1F5F9]">
           <button 
             disabled={currentStage === 1}
             onClick={() => setCurrentStage(prev => prev - 1)}
             className="h-[44px] px-6 rounded-lg border border-[#E2E8F0] text-[13px] font-bold text-[#8B9BB4] disabled:opacity-50"
           >
             Back
           </button>
           
           <div className="flex items-center gap-4">
            {showSaved && (
              <span className="text-[10px] font-black text-green-500 uppercase tracking-widest animate-fade-in flex items-center gap-1">
                <CheckCircle2 size={12} />
                Changes Saved Successfully
              </span>
            )}
            <button 
              onClick={() => {
                handleSaveStage(currentStage);
                if (currentStage < 8) setTimeout(() => setCurrentStage(prev => prev + 1), 600);
              }}
              className="h-[44px] bg-[#0A1628] text-white px-8 rounded-lg text-[13px] font-bold flex items-center gap-2 hover:bg-[#1E293B] transition-all relative overflow-hidden"
            >
              {showSaved ? 'Saved' : 'Save & Continue'}
              <ChevronRight size={16} />
            </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const Stage8RBAC = ({ onSave }: { onSave: () => void }) => {
  const [isInviting, setIsInviting] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteSent, setInviteSent] = useState(false);

  const handleInvite = () => {
    if (!inviteEmail) return;
    setIsInviting(true);
    setTimeout(() => {
      setIsInviting(false);
      setInviteSent(true);
      setInviteEmail('');
      setTimeout(() => setInviteSent(false), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-start">
        <StageHeader title="User Management & RBAC" desc="Granular access control and workspace invitation" />
        <div className="flex items-center gap-3">
          {inviteSent && (
            <span className="text-[10px] font-black text-green-500 uppercase tracking-widest animate-fade-in">Invite Sent!</span>
          )}
          <div className="relative">
            <input 
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Enter email to invite..."
              className="h-[44px] w-[240px] bg-white border border-[#E2E8F0] rounded-xl px-4 text-[12px] font-medium outline-none focus:border-[#00B4D8] transition-all"
            />
            <button 
              onClick={handleInvite}
              disabled={isInviting || !inviteEmail}
              className="absolute right-1 top-1 h-[36px] px-4 bg-[#0A1628] text-white rounded-lg text-[11px] font-bold flex items-center gap-2 hover:bg-[#1E293B] transition-all disabled:opacity-50"
            >
              {isInviting ? <RefreshCw size={14} className="animate-spin" /> : <Plus size={14} />}
              {isInviting ? 'Sending...' : 'Invite'}
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Workspace Members</p>
         <div className="grid grid-cols-1 gap-3">
            {CONDUIT_USERS.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-[#00B4D8]/30 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#0A1628] text-[#00B4D8] flex items-center justify-center font-black text-xs shadow-inner">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                     <p className="text-[14px] font-bold text-[#0A1628]">{user.name}</p>
                     <p className="text-[11px] text-gray-400 font-medium">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                   <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Role</p>
                      <span className="px-2 py-0.5 bg-[#00B4D8]/10 text-[#00B4D8] rounded text-[10px] font-bold">{user.role}</span>
                   </div>
                   <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Last Login</p>
                      <p className="text-[11px] font-bold text-[#0A1628]">2h ago</p>
                   </div>
                   <button className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                   </button>
                </div>
              </div>
            ))}
         </div>
      </div>

      <div className="p-8 bg-gradient-to-br from-[#0A1628] to-[#1E293B] rounded-[24px] text-white shadow-xl shadow-[#0A1628]/20 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-5">
            <Lock size={120} />
         </div>
         <div className="relative z-10">
           <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-[#00B4D8]/20 rounded-lg">
                <Lock size={18} className="text-[#00B4D8]" />
              </div>
              <span className="text-[16px] font-bold">RBAC Strict Mode</span>
           </div>
           <p className="text-[13px] text-gray-400 mb-8 max-w-xl leading-relaxed">When active, users can only access modules explicitly defined in their permission scope. All unauthorized module attempts are logged for RBI audit compliance and flagged for security review.</p>
           <div className="flex items-center justify-between p-5 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
              <div className="flex flex-col">
                 <span className="text-[11px] font-black uppercase tracking-[0.2em]">Enforce Permission Guards</span>
                 <span className="text-[9px] font-bold text-[#00B4D8] mt-1">Audit Log Level: HIGH</span>
              </div>
              <Toggle active />
           </div>
         </div>
      </div>
    </div>
  );
};

const Stage1Input = ({ onSave }: { onSave: () => void }) => (
  <div className="space-y-8">
    <StageHeader title="Input Configuration" desc="Ingestion points for API traces and financial events" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ConfigInput label="OpenTelemetry Collector Endpoint" placeholder="https://otel.conduit.infra:4317" />
      <ConfigInput label="Kafka Broker Connection String" placeholder="kafka-1:9092,kafka-2:9092" />
      <ConfigInput label="Trace Topic Names" placeholder="conduit.traces.raw" />
      <ConfigInput label="Event Topic Names" placeholder="conduit.events.financial" />
    </div>
    <div className="flex items-center gap-4">
      <button className="px-6 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[10px] font-black uppercase tracking-widest text-[#0A1628] hover:bg-gray-100 transition-all">
        Test Connection
      </button>
      <div className="flex items-center gap-2 text-green-500 font-bold text-[10px] uppercase tracking-widest">
         <CheckCircle2 size={14} /> Ready for Ingestion
      </div>
    </div>
  </div>
);

const Stage2Monitor = ({ onSave }: { onSave: () => void }) => (
  <div className="space-y-8">
    <StageHeader title="Monitor Configuration" desc="Per-partner latency and throughput thresholds" />
    <div className="overflow-hidden border border-gray-100 rounded-2xl">
      <table className="w-full text-left bg-gray-50/50">
        <thead>
          <tr>
            <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-400">PartnerFIU / FIP</th>
            <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Warning (ms)</th>
            <th className="p-4 text-[9px] font-black uppercase tracking-widest text-gray-400">Critical (ms)</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {SLA_ATTRIBUTIONS.map(partner => (
            <tr key={partner.partnerId}>
              <td className="p-4 text-sm font-bold text-[#0A1628]">{partner.partnerName}</td>
              <td className="p-4">
                <input type="number" defaultValue={250} className="w-20 px-2 py-1 rounded border border-gray-200 text-xs text-[#00B4D8] font-black" />
              </td>
              <td className="p-4">
                <input type="number" defaultValue={500} className="w-20 px-2 py-1 rounded border border-gray-200 text-xs text-red-500 font-black" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
       <div className="flex-1 w-full">
         <p className="text-sm font-bold text-[#0A1628]">Global SLA Availability Threshold</p>
         <p className="text-[10px] text-gray-400 font-bold uppercase mb-4">Minimum uptime percentage required across all ecosystem nodes</p>
         <div className="flex items-center gap-4">
            <input type="range" min="95.00" max="99.99" step="0.01" className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#00B4D8]" />
            <span className="text-[12px] font-black text-[#0A1628] w-12 text-right">99.90%</span>
         </div>
       </div>
       <div className="hidden md:block w-[1px] h-12 bg-gray-200 mx-2" />
       <div className="shrink-0 flex items-center justify-between w-full md:w-auto gap-12">
         <div>
           <p className="text-sm font-bold text-[#0A1628]">Throughput Monitoring</p>
           <p className="text-[10px] text-gray-400 font-bold uppercase">Transaction volume anomalies</p>
         </div>
         <Toggle active />
       </div>
    </div>
    <ConfigInput label="Data Retention Period (Days)" placeholder="30" />
  </div>
);

const Stage3Detect = ({ onSave }: { onSave: () => void }) => (
  <div className="space-y-8">
    <StageHeader title="Detect Configuration" desc="LSTMWatch anomaly detection engine parameters" />
    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
       <span className="text-sm font-bold text-[#0A1628]">LSTMWatch Engine Active</span>
       <Toggle active />
    </div>
    <div className="space-y-6">
       <div className="space-y-2">
         <div className="flex justify-between">
           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Anomaly Sensitivity</label>
           <span className="text-xs font-black text-[#00B4D8]">Level 7</span>
         </div>
         <input type="range" min="1" max="10" className="w-full accent-[#00B4D8]" />
         <div className="flex justify-between text-[8px] font-black text-gray-300 uppercase">
           <span>1 (Extreme Spikes Only)</span>
           <span>10 (Minor Deviations)</span>
         </div>
       </div>
       <ConfigInput label="Minimum Window Size (Minutes)" placeholder="15" />
       <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-[#0A1628] uppercase tracking-widest">False-Positive Suppression</span>
          <Toggle active />
       </div>
    </div>
  </div>
);

const Stage4Predict = ({ onSave }: { onSave: () => void }) => (
  <div className="space-y-8">
    <StageHeader title="Predict Configuration" desc="FailGuard predictive analysis models" />
    <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
       <span className="text-sm font-bold text-[#0A1628]">FailGuard Active</span>
       <Toggle active />
    </div>
    <div className="space-y-6">
       <div className="space-y-2">
         <div className="flex justify-between">
           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confidence Threshold</label>
           <span className="text-xs font-black text-[#00B4D8]">85%</span>
         </div>
         <input type="range" min="50" max="99" className="w-full accent-[#00B4D8]" />
       </div>
       <div className="grid grid-cols-2 gap-4">
          <ConfigSelect label="Prediction Horizon" options={['15 min', '30 min', '1 hour']} />
          <ConfigSelect label="Model Retraining" options={['Daily', 'Weekly']} />
       </div>
    </div>
  </div>
);

const Stage5Attribute = ({ onSave }: { onSave: () => void }) => (
  <div className="space-y-8">
    <StageHeader title="Attribute Configuration" desc="Root-cause attribution and SLA penalties" />
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
       <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex justify-between items-center">
          <span className="text-sm font-bold text-[#0A1628]">Attribution Engine</span>
          <Toggle active />
       </div>
       <ConfigSelect label="Attribution Algorithm" options={['Proportional Blame', 'First Failure', 'Worst Offender']} />
    </div>
    <div className="space-y-4">
       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SLA Breach Penalty Rules</p>
       <table className="w-full text-left border border-gray-100 rounded-xl overflow-hidden">
         <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-[9px] font-black uppercase text-gray-400">Partner Type</th>
              <th className="p-3 text-[9px] font-black uppercase text-gray-400">Breach Threshold (min)</th>
              <th className="p-3 text-[9px] font-black uppercase text-gray-400">Penalty Score</th>
              <th className="p-3"></th>
            </tr>
         </thead>
         <tbody className="bg-white text-sm divide-y divide-gray-50">
            <tr>
              <td className="p-3 text-[#0A1628] font-bold">Private Sector Bank</td>
              <td className="p-3">15</td>
              <td className="p-3 text-red-500 font-bold">-2.5</td>
              <td className="p-3"><Trash2 size={14} className="text-gray-300" /></td>
            </tr>
         </tbody>
       </table>
    </div>
  </div>
);

const Stage6Calculate = ({ onSave }: { onSave: () => void }) => (
  <div className="space-y-8">
    <StageHeader title="Calculate Configuration" desc="Revenue impact mapping and ROI base values" />
    <div className="space-y-4">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Revenue Mapping Table</p>
      {REVENUE_MAPPINGS.map((m, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
           <span className="text-xs font-bold text-[#0A1628]">{m.transactionType}</span>
           <div className="flex items-center gap-4">
              <input type="text" defaultValue={m.averageValue} className="w-20 px-2 py-1 rounded border border-gray-200 text-xs text-[#00B4D8] font-black" />
              <button className="text-gray-300"><Trash2 size={14} /></button>
           </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-4">
       <ConfigInput label="Subscription Cost (₹ Cr/yr)" placeholder="2.5" />
       <ConfigInput label="Base AUM (₹ Cr)" placeholder="50000" />
    </div>
  </div>
);

const Stage7Output = ({ onSave }: { onSave: () => void }) => (
  <div className="space-y-12">
    <div className="space-y-6">
      <StageHeader title="Output Configuration" desc="Alert delivery and reporting rules" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <ConfigInput label="Slack Webhook URL" placeholder="https://hooks.slack.com/services/..." />
         <ConfigInput label="PagerDuty Integration Key" placeholder="xxxxxxxxxxxxxxxx" />
      </div>
    </div>

    <div className="space-y-6">
       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Accessibility & Data Governance</p>
       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ToggleSetting label="Screen Reader Mode" desc="Enable ARIA labels and high-contrast semantics" />
          <ToggleSetting label="High Contrast Display" desc="WCAG 2.1 AA compliant color scheme" />
          <ToggleSetting label="Reduced Motion" desc="Disable canvas animations and chart transitions" />
          <ToggleSetting label="Consent Audit Log" desc="Track and log all data access events for RBI" />
       </div>
    </div>

    <div className="space-y-6">
       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Data Retention Policy</p>
       <ConfigSelect label="Raw API Trace Data Retention" options={['30 Days', '90 Days', '180 Days', '1 Year']} />
    </div>
  </div>
);

const ConfigInput = ({ label, placeholder }: { label: string; placeholder: string }) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">{label}</label>
    <input 
      type="text" 
      placeholder={placeholder}
      className="w-full h-[44px] bg-white border border-[#E2E8F0] rounded-[6px] px-4 text-[13px] font-bold text-[#0A1628] outline-none focus:border-[#00B4D8] transition-all placeholder:text-[#E2E8F0]"
    />
  </div>
);

const ConfigSelect = ({ label, options }: { label: string; options: string[] }) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">{label}</label>
    <select className="w-full h-[44px] bg-white border border-[#E2E8F0] rounded-[6px] px-4 text-[13px] font-bold text-[#0A1628] outline-none focus:border-[#00B4D8] transition-all cursor-pointer">
       {options.map(o => <option key={o}>{o}</option>)}
    </select>
  </div>
);

const StageHeader = ({ title, desc }: { title: string; desc: string }) => (
  <div className="mb-8">
    <h3 className="text-[18px] font-bold text-[#0A1628] tracking-tight mb-1">{title}</h3>
    <p className="text-[11px] text-[#8B9BB4] uppercase tracking-widest font-bold leading-relaxed">{desc}</p>
  </div>
);

const Toggle = ({ active }: { active?: boolean }) => (
  <div className={`w-10 h-5 rounded-full relative transition-all ${active ? 'bg-[#00B4D8]' : 'bg-gray-200'}`}>
     <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${active ? 'right-0.5' : 'left-0.5'}`} />
  </div>
);

const ToggleSetting = ({ label, desc }: { label: string; desc: string }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
     <div>
        <p className="text-[11px] font-black text-[#0A1628] uppercase mb-1">{label}</p>
        <p className="text-[8px] text-gray-400 font-bold uppercase leading-relaxed">{desc}</p>
     </div>
     <Toggle />
  </div>
);

export default SystemConfiguration;
