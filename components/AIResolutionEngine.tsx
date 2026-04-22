import React, { useState } from 'react';
import { 
  Brain, 
  Zap,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  Shield,
  Activity,
  ArrowRight,
  Terminal,
  Play,
  UserCheck,
  Cpu
} from 'lucide-react';

const AIResolutionEngine: React.FC = () => {
  const [selectedResolution, setSelectedResolution] = useState(0);
  const [activeTab, setActiveTab] = useState<'active' | 'predictions' | 'logs'>('active');

  const activeResolutions = [
    { id: 'RES-99B', module: 'Revenue Impact', incident: 'INC-2281', confidence: '94%', status: 'PENDING_APPROVAL', time: '2m ago' },
    { id: 'RES-99A', module: 'API Health', incident: 'INC-2279', confidence: '88%', status: 'EXECUTING', time: '5m ago' },
    { id: 'RES-98F', module: 'Partner Map', incident: 'INC-2275', confidence: '92%', status: 'COMPLETED', time: '14m ago' },
  ];

  const predictions = [
    { id: 'PRE-001', target: 'Partner UPI Node', probability: '82%', type: 'Latency Spike', estimatedTime: '14m' },
    { id: 'PRE-002', target: 'Vendor Nginx', probability: '64%', type: 'Memory Leak', estimatedTime: '42m' },
    { id: 'PRE-003', target: 'Ecosystem Bridge', probability: '91%', type: 'Throughput Drop', estimatedTime: '5m' },
  ];

  const traceSteps = [
    { id: 1, title: 'Input Collection', desc: 'Analyzing Kafka trace logs for Partner UPI Node', status: 'completed' },
    { id: 2, title: 'Pattern Recognition', desc: 'Detected PII-leakage fingerprint in metadata headers', status: 'completed' },
    { id: 3, title: 'Impact Calculation', desc: 'Estimated revenue at risk: ₹14.2 Lakhs / Hour', status: 'completed' },
    { id: 4, title: 'Root Cause Attribution', desc: 'Identified misconfigured Nginx proxy on Vendor side', status: 'completed' },
    { id: 5, title: 'Proposed Remediation', desc: 'Enable Circuit Breaker & Failover to Ecosystem AA', status: 'active' },
    { id: 6, title: 'Action Execution', desc: 'Awaiting Administrator Approval', status: 'pending' },
  ];

  const remediationLogs = [
    { id: 'LOG-4421', action: 'Scale Replicas', target: 'Auth-Service', result: 'SUCCESS', time: '1h ago', triggeredBy: 'AI_AUTONOMOUS' },
    { id: 'LOG-4420', action: 'Flush Cache', target: 'Redis-Primary', result: 'SUCCESS', time: '3h ago', triggeredBy: 'ADMIN_MANUAL' },
    { id: 'LOG-4419', action: 'Update Firewall', target: 'API-Gateway', result: 'FAILED', time: '5h ago', triggeredBy: 'AI_SHIELD' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Top Banner: LSTMWATCH */}
      <div className="bg-[#0A1628] rounded-2xl p-6 border border-white/5 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B4D8]/5 blur-[80px] -mr-32 -mt-32" />
         <div className="flex items-center gap-6 relative z-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00B4D8] to-[#0077B6] flex items-center justify-center shadow-lg shadow-[#00B4D8]/20 group">
               <Activity size={32} className="text-white animate-pulse" />
            </div>
            <div>
               <h2 className="text-[20px] font-black text-white tracking-widest flex items-center gap-3">
                 LSTMWATCH <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded italic">LIVE</span>
               </h2>
               <p className="text-[12px] text-gray-400 font-medium">Real-time long short-term memory recurrent neural network for sequence prediction</p>
            </div>
         </div>
         <div className="flex items-center gap-12 relative z-10">
            <div className="text-center">
               <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Inference Rate</p>
               <p className="text-[18px] font-bold text-white">4.2k <span className="text-[10px] text-gray-400">tps</span></p>
            </div>
            <div className="text-center">
               <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Drift Delta</p>
               <p className="text-[18px] font-bold text-green-400">0.0024</p>
            </div>
            <div className="text-center border-l border-white/10 pl-12">
               <p className="text-[10px] font-black text-[#00B4D8] uppercase tracking-widest mb-1">State</p>
               <p className="text-[14px] font-black text-white px-3 py-1 bg-white/5 rounded-lg border border-white/10 uppercase tracking-widest tracking-widest leading-none flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                 Synchronized
               </p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Resolution Hub */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="flex border-b border-[#E2E8F0] bg-gray-50/50">
               <button 
                 onClick={() => setActiveTab('active')}
                 className={`px-6 h-[48px] text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'active' ? 'bg-white border-b-2 border-[#00B4D8] text-[#00B4D8]' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 Active Actions
               </button>
               <button 
                 onClick={() => setActiveTab('predictions')}
                 className={`px-6 h-[48px] text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'predictions' ? 'bg-white border-b-2 border-[#00B4D8] text-[#00B4D8]' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 Failure Predictions
               </button>
               <button 
                 onClick={() => setActiveTab('logs')}
                 className={`px-6 h-[48px] text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === 'logs' ? 'bg-white border-b-2 border-[#00B4D8] text-[#00B4D8]' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 Remediation Log
               </button>
            </div>

            {activeTab === 'active' && (
              <table className="w-full text-left border-collapse animate-fade-in">
                <thead>
                  <tr className="bg-gray-50/10 border-b border-[#E2E8F0]">
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">ID</th>
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">Module</th>
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">Incident</th>
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest text-center">Confidence</th>
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">Status</th>
                    <th className="px-4 h-[44px]"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {activeResolutions.map((res, i) => (
                    <tr 
                      key={res.id} 
                      onClick={() => setSelectedResolution(i)}
                      className={`h-[52px] cursor-pointer transition-colors ${selectedResolution === i ? 'bg-blue-50/30' : 'hover:bg-gray-50'}`}
                    >
                      <td className="px-4 text-[13px] font-bold text-[#0A1628]">{res.id}</td>
                      <td className="px-4 text-[13px] font-medium text-[#8B9BB4]">{res.module}</td>
                      <td className="px-4 text-[13px] font-medium text-[#00B4D8] font-mono">{res.incident}</td>
                      <td className="px-4 text-center">
                         <span className="text-[13px] font-bold text-[#0A1628] font-mono">{res.confidence}</span>
                      </td>
                      <td className="px-4">
                         <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-widest ${
                           res.status === 'PENDING_APPROVAL' ? 'bg-amber-50 text-amber-500 border border-amber-100' :
                           res.status === 'EXECUTING' ? 'bg-blue-50 text-blue-500 border border-blue-100' :
                           'bg-green-50 text-green-500 border border-green-100'
                         }`}>
                           {res.status.replace('_', ' ')}
                         </span>
                      </td>
                      <td className="px-4 text-right">
                         <ChevronRight size={16} className={`transition-transform ${selectedResolution === i ? 'translate-x-1 text-[#00B4D8]' : 'text-[#8B9BB4]'}`} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'predictions' && (
              <table className="w-full text-left border-collapse animate-fade-in">
                <thead>
                  <tr className="bg-gray-50/10 border-b border-[#E2E8F0]">
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">ID</th>
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">Target Node</th>
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">Failure Type</th>
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest text-center">Probability</th>
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">EST. Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {predictions.map((p) => (
                    <tr key={p.id} className="h-[52px] hover:bg-gray-50 transition-colors">
                      <td className="px-4 text-[13px] font-bold text-[#0A1628]">{p.id}</td>
                      <td className="px-4 text-[13px] font-bold text-[#00B4D8]">{p.target}</td>
                      <td className="px-4 text-[13px] font-medium text-[#8B9BB4]">{p.type}</td>
                      <td className="px-4 text-center">
                         <div className="flex items-center justify-center gap-2">
                           <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500" style={{ width: p.probability }} />
                           </div>
                           <span className="text-[12px] font-bold text-[#0A1628] font-mono">{p.probability}</span>
                         </div>
                      </td>
                      <td className="px-4">
                         <span className="text-[12px] font-bold text-red-500 italic block">{p.estimatedTime}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'logs' && (
              <table className="w-full text-left border-collapse animate-fade-in">
                <thead>
                  <tr className="bg-gray-50/10 border-b border-[#E2E8F0]">
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">ID</th>
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">Action Taken</th>
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">Component</th>
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">Trigger</th>
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">Result</th>
                    <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {remediationLogs.map((log) => (
                    <tr key={log.id} className="h-[52px] hover:bg-gray-50 transition-colors">
                      <td className="px-4 text-[12px] font-bold text-[#0A1628] opacity-60">{log.id}</td>
                      <td className="px-4 text-[13px] font-black text-[#0A1628] flex items-center gap-2">
                        <Zap size={14} className="text-[#00B4D8]" /> {log.action}
                      </td>
                      <td className="px-4 text-[13px] font-medium text-[#8B9BB4]">{log.target}</td>
                      <td className="px-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 rounded text-gray-500">{log.triggeredBy}</span>
                      </td>
                      <td className="px-4">
                         <span className={`text-[10px] font-black tracking-widest ${log.result === 'SUCCESS' ? 'text-green-500' : 'text-red-500'}`}>{log.result}</span>
                      </td>
                      <td className="px-4 text-[12px] font-medium text-gray-400">{log.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="bg-white rounded-lg p-5 h-[160px] border border-[#E2E8F0] flex flex-col justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-green-50 text-green-500 rounded-lg"><CheckCircle2 size={16} /></div>
                   <p className="text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">Auto-Resolved (24H)</p>
                </div>
                <div>
                   <p className="text-[24px] font-bold text-[#0A1628] tracking-tight">142 Cases</p>
                   <div className="mt-1 flex items-center gap-2 text-[11px] font-bold text-green-500 uppercase">
                       <ArrowRight size={12} className="-rotate-45" /> 24% Efficiency Gain
                   </div>
                </div>
             </div>
             <div className="bg-white rounded-lg p-5 h-[160px] border border-[#E2E8F0] flex flex-col justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-[#F0F9FF] text-[#00B4D8] rounded-lg"><Clock size={16} /></div>
                   <p className="text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">Mean Time to Action</p>
                </div>
                <div>
                   <p className="text-[24px] font-bold text-[#0A1628] tracking-tight">18.4 Seconds</p>
                   <div className="mt-1 text-[11px] font-bold text-[#00B4D8] uppercase">
                       942m Response Delta Saved
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Remediation Trace View */}
        <div className="space-y-4">
          <div className="bg-[#0A1628] rounded-xl p-6 text-white min-h-[500px] flex flex-col shadow-xl">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#00B4D8] mb-6 flex items-center gap-2 border-b border-white/5 pb-4">
               <Terminal size={14} />
               Trace: {activeResolutions[selectedResolution].id}
            </h3>
            
            <div className="flex-1 space-y-6 relative">
                <div className="absolute left-3 top-2 bottom-2 w-[1px] bg-white/10" />

                {traceSteps.map((step) => (
                   <div key={step.id} className="flex gap-4 relative">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        step.status === 'completed' ? 'bg-[#00B4D8]' :
                        step.status === 'active' ? 'bg-amber-500 animate-pulse' :
                        'bg-white/5'
                      }`}>
                         {step.status === 'completed' ? <CheckCircle2 size={12} className="text-white" /> : <div className="w-1 h-1 rounded-full bg-white/20" />}
                      </div>
                      <div className="space-y-1">
                         <p className={`text-[12px] font-bold tracking-tight ${
                           step.status === 'completed' ? 'text-white' :
                           step.status === 'active' ? 'text-amber-500' :
                           'text-[#8B9BB4]'
                         }`}>{step.title}</p>
                         <p className="text-[11px] font-medium text-[#8B9BB4] leading-relaxed line-clamp-1">{step.desc}</p>
                      </div>
                   </div>
                ))}
            </div>

            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10 space-y-4">
               <h4 className="text-[10px] font-black text-[#00B4D8] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                 <Shield size={12} />
                 Trace Decomposition & SLA Attribution
               </h4>
               <div className="space-y-3">
                  <div className="flex justify-between items-center text-[11px]">
                     <span className="text-gray-400 font-medium">Network Latency (Vendor)</span>
                     <span className="text-white font-bold">142ms <span className="text-red-500 ml-1">(+110ms)</span></span>
                  </div>
                  <div className="flex justify-between items-center text-[11px]">
                     <span className="text-gray-400 font-medium">Processing Time (Core)</span>
                     <span className="text-white font-bold">12ms <span className="text-green-500 ml-1">(-4ms)</span></span>
                  </div>
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden flex">
                     <div className="h-full bg-red-500" style={{ width: '85%' }} />
                     <div className="h-full bg-[#00B4D8]" style={{ width: '15%' }} />
                  </div>
                  <p className="text-[10px] text-gray-500 italic">SLA Credit Impact: ₹4,280 Attributable to Vendor-Side Nginx drift</p>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 space-y-4">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <UserCheck size={16} className="text-amber-500" />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-amber-500">Manual Approval</span>
                   </div>
                   <Play size={12} className="text-amber-500" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                   <button className="h-[36px] bg-white/5 hover:bg-white/10 rounded-[6px] text-[11px] font-bold uppercase tracking-widest text-white transition-all">Deny</button>
                   <button className="h-[36px] bg-[#00B4D8] hover:bg-[#0096b4] rounded-[6px] text-[11px] font-bold uppercase tracking-widest text-white transition-all">Execute</button>
                </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 border border-[#E2E8F0] shadow-sm">
             <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#F1F5F9] rounded-lg text-[#0A1628]"><Cpu size={16} /></div>
                <h4 className="text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">Model Config</h4>
             </div>
             <div className="space-y-3">
                <div className="flex justify-between items-center">
                   <span className="text-[11px] font-medium text-[#8B9BB4] uppercase">Version</span>
                   <span className="text-[11px] font-bold text-[#0A1628]">Conduit-v2.1-AA</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-[11px] font-medium text-[#8B9BB4] uppercase">Precision</span>
                   <span className="text-[11px] font-bold text-green-500">0.94</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIResolutionEngine;
