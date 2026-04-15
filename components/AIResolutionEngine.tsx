import React from 'react';
import { 
  Brain, 
  Activity, 
  ShieldCheck, 
  Network, 
  Zap,
  Info,
  Settings2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const AIResolutionEngine: React.FC = () => {
  const [activeModel, setActiveModel] = React.useState<'lstm' | 'failguard' | 'sla' | 'auto'>('lstm');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-[#0A1628] uppercase tracking-tighter">AI Actions</h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Exposed Intelligence & Model Governance</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl">
          {[
            { id: 'lstm', label: 'LSTMWatch', icon: <Activity size={14} /> },
            { id: 'failguard', label: 'FailGuard', icon: <ShieldCheck size={14} /> },
            { id: 'sla', label: 'SLA Engine', icon: <Network size={14} /> },
            { id: 'auto', label: 'AutoRemediate', icon: <Zap size={14} /> },
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => setActiveModel(m.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                activeModel === m.id ? 'bg-white text-[#0A1628] shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {m.icon}
              {m.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Model Content */}
        <div className="lg:col-span-2 space-y-8">
          {activeModel === 'lstm' && <LSTMWatchView />}
          {activeModel === 'failguard' && <FailGuardView />}
          {activeModel === 'sla' && <SLAEngineView />}
          {activeModel === 'auto' && <AutoRemediateView />}
        </div>

        {/* Model Meta & Controls */}
        <div className="space-y-6">
          <div className="bg-[#0A1628] rounded-[32px] p-8 text-white">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#00B4D8] mb-6 flex items-center gap-2">
              <Settings2 size={14} />
              Execution Controls
            </h3>
            <div className="space-y-6">
              <ControlItem label="Anomaly Sensitivity" value="82%" />
              <ControlItem label="Confidence Threshold" value="85%" />
              <div className="pt-4 border-t border-white/5 space-y-4">
                <ToggleItem label="LSTMWatch Active" active />
                <ToggleItem label="FailGuard Active" active />
                <ToggleItem label="AutoRemediate Active" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <Info size={14} />
              Model Performance
            </h3>
            <div className="space-y-4">
              <PerformanceMetric label="Precision" value="94.2%" />
              <PerformanceMetric label="Recall" value="88.5%" />
              <PerformanceMetric label="F1 Score" value="91.2%" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LSTMWatchView = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-[32px] border border-gray-200 p-8">
      <h3 className="text-lg font-black text-[#0A1628] mb-6 uppercase tracking-tight">Real-time Latency Anomaly Feed</h3>
      <div className="space-y-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <div>
                <p className="text-sm font-black text-[#0A1628]">Partner UPI Node</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Latency: 485ms (+240ms spike)</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Confidence</p>
              <p className="text-sm font-black text-amber-500">92%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FailGuardView = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-[32px] border border-gray-200 p-8">
      <h3 className="text-lg font-black text-[#0A1628] mb-6 uppercase tracking-tight">Failure Prediction Table</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
            <th className="pb-4">Partner Node</th>
            <th className="pb-4 text-center">Failure Prob.</th>
            <th className="pb-4">Primary Driver</th>
            <th className="pb-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {[
            { name: 'Partner UPI Node', prob: '84%', driver: 'Elevated p95 latency (45m)', action: 'Circuit Breaker' },
            { name: 'Ecosystem AA', prob: '42%', driver: 'Incremental error rate', action: 'Retry Policy' },
            { name: 'Primary FIP', prob: '12%', driver: 'Normal baseline', action: 'Monitor' },
          ].map((row, i) => (
            <tr key={i}>
              <td className="py-4 text-sm font-bold text-[#0A1628]">{row.name}</td>
              <td className="py-4 text-center">
                <span className={`text-sm font-black font-mono ${parseInt(row.prob) > 70 ? 'text-red-500' : 'text-[#0A1628]'}`}>
                  {row.prob}
                </span>
              </td>
              <td className="py-4 text-xs text-gray-400 font-medium">{row.driver}</td>
              <td className="py-4 text-right">
                <button className="text-[10px] font-black text-[#00B4D8] uppercase tracking-widest hover:underline">Execute</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SLAEngineView = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-[32px] border border-gray-200 p-8">
      <h3 className="text-lg font-black text-[#0A1628] mb-6 uppercase tracking-tight">Trace Decomposition & Attribution</h3>
      <div className="space-y-8">
        {[1, 2].map(i => (
          <div key={i} className="space-y-3">
            <div className="flex justify-between items-end">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Incident TR-99281-AX</p>
              <p className="text-[10px] font-black text-[#00B4D8] uppercase tracking-widest">Attribution Confidence: 98%</p>
            </div>
            <div className="h-8 w-full bg-gray-100 rounded-lg overflow-hidden flex">
              <div className="h-full bg-green-500/40 w-[20%] border-r border-white/20 flex items-center justify-center text-[8px] font-black text-white uppercase">Bank</div>
              <div className="h-full bg-red-500 w-[65%] border-r border-white/20 flex items-center justify-center text-[8px] font-black text-white uppercase">AA Node</div>
              <div className="h-full bg-green-500/40 w-[15%] flex items-center justify-center text-[8px] font-black text-white uppercase">FIU</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const AutoRemediateView = () => (
  <div className="space-y-6">
    <div className="bg-white rounded-[32px] border border-gray-200 p-8">
      <h3 className="text-lg font-black text-[#0A1628] mb-6 uppercase tracking-tight">Automated Remediation Log</h3>
      <div className="space-y-4">
        {[
          { action: 'Circuit Breaker Activation', partner: 'Partner UPI Node', outcome: 'RESOLVED', time: '12ms' },
          { action: 'Retry Policy Adjustment', partner: 'Ecosystem AA', outcome: 'PARTIAL', time: '8ms' },
          { action: 'Rate Limit Override', partner: 'Primary FIP', outcome: 'RESOLVED', time: '15ms' },
        ].map((log, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-white shadow-sm text-[#00B4D8]">
                <Zap size={16} />
              </div>
              <div>
                <p className="text-sm font-black text-[#0A1628]">{log.action}</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{log.partner} | {log.time}</p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded text-[9px] font-black uppercase tracking-widest ${
              log.outcome === 'RESOLVED' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
            }`}>
              {log.outcome}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ControlItem = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40">
      <span>{label}</span>
      <span>{value}</span>
    </div>
    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
      <div className="h-full bg-[#00B4D8]" style={{ width: value }} />
    </div>
  </div>
);

const ToggleItem = ({ label, active }: { label: string; active?: boolean }) => (
  <div className="flex justify-between items-center">
    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{label}</span>
    <div className={`w-8 h-4 rounded-full relative transition-all ${active ? 'bg-[#00B4D8]' : 'bg-white/10'}`}>
      <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${active ? 'right-0.5' : 'left-0.5'}`} />
    </div>
  </div>
);

const PerformanceMetric = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center">
    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</span>
    <span className="text-sm font-black text-[#0A1628] font-mono">{value}</span>
  </div>
);

export default AIResolutionEngine;
