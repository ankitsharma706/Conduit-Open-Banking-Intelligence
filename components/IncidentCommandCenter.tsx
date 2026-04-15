import React from 'react';
import { 
  Zap, 
  Clock, 
  User, 
  ArrowRight, 
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  History,
  ExternalLink,
  MessageSquare,
  Gavel
} from 'lucide-react';
import { INCIDENTS } from '../constants.tsx';

const IncidentCommandCenter: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = React.useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'P1': return 'bg-red-500 text-white';
      case 'P2': return 'bg-amber-500 text-black';
      case 'P3': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'RESOLVED': return <CheckCircle2 size={16} className="text-green-500" />;
      case 'ACTION_TAKEN': return <Zap size={16} className="text-blue-500" />;
      default: return <Clock size={16} className="text-amber-500" />;
    }
  };

  const activeIncident = INCIDENTS.find(i => i.id === selectedIncident);

  return (
    <div className="flex h-full gap-8 animate-fade-in">
      {/* Incident List */}
      <div className={`flex-1 space-y-6 ${selectedIncident ? 'hidden lg:block' : ''}`}>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#0A1628] uppercase tracking-tighter">Incident Control</h2>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Real-time Execution & Resolution Layer</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-red-500/10 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/20">2 Critical</span>
            <span className="px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/20">5 Active</span>
          </div>
        </div>

        <div className="space-y-3">
          {INCIDENTS.map((incident) => (
            <div 
              key={incident.id}
              onClick={() => setSelectedIncident(incident.id)}
              className={`bg-white rounded-2xl border-2 p-5 transition-all cursor-pointer hover:border-[#00B4D8]/50 ${
                selectedIncident === incident.id ? 'border-[#00B4D8]' : 'border-gray-100'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${getSeverityColor(incident.severity)}`}>
                    {incident.severity}
                  </span>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{incident.id}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  {getStatusIcon(incident.status)}
                  <span>{incident.status.replace('_', ' ')}</span>
                </div>
              </div>

              <h3 className="text-lg font-black text-[#0A1628] mb-1">{incident.partnerName}</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">{incident.type.replace('_', ' ')}</p>

              <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                <div className="flex gap-6">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">AUM at Risk</p>
                    <p className="text-sm font-black text-red-500">₹ {incident.aumAtRisk} Cr</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">MTTR</p>
                    <p className="text-sm font-black text-[#0A1628]">{incident.mttr}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-black uppercase">
                    {incident.owner.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-[10px] font-bold text-gray-600">{incident.owner}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident Detail View */}
      {selectedIncident && activeIncident ? (
        <div className="w-full lg:w-[500px] bg-white rounded-[32px] border border-gray-200 flex flex-col shadow-xl animate-slide-in">
          <div className="p-8 border-b border-gray-100 flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${getSeverityColor(activeIncident.severity)}`}>
                  {activeIncident.severity}
                </span>
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{activeIncident.id}</span>
              </div>
              <h3 className="text-xl font-black text-[#0A1628]">{activeIncident.partnerName}</h3>
            </div>
            <button 
              onClick={() => setSelectedIncident(null)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowRight size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {/* Action Panel */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-[#00B4D8] text-white hover:opacity-90 transition-all">
                <Zap size={20} />
                <span className="text-[9px] font-black uppercase tracking-widest">AI Auto-Fix</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-[#0A1628] text-white hover:opacity-90 transition-all">
                <MessageSquare size={20} />
                <span className="text-[9px] font-black uppercase tracking-widest">Escalate</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
                <Gavel size={20} />
                <span className="text-[9px] font-black uppercase tracking-widest">Enforce SLA</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-2xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all">
                <CheckCircle2 size={20} />
                <span className="text-[9px] font-black uppercase tracking-widest">Resolve</span>
              </button>
            </div>

            {/* Evidence Section */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert size={14} />
                Trace Evidence
              </h4>
              <div className="bg-gray-50 rounded-2xl p-4 font-mono text-[10px] text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>Trace ID:</span>
                  <span className="text-[#0A1628] font-bold">{activeIncident.traceId}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hop Contribution:</span>
                  <span className="text-red-500 font-bold">842ms (92%)</span>
                </div>
                <div className="flex justify-between">
                  <span>Status Code:</span>
                  <span className="text-red-500 font-bold">504 Gateway Timeout</span>
                </div>
                <button className="w-full mt-2 py-2 bg-white border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-all">
                  <ExternalLink size={12} />
                  View Raw Trace
                </button>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <History size={14} />
                Incident Timeline
              </h4>
              <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                <TimelineItem time="10:15" label="Incident Detected" status="DETECTED" />
                <TimelineItem time="10:18" label="Classified as P1 Critical" status="CLASSIFIED" />
                <TimelineItem time="10:22" label="Attributed to Partner UPI Node" status="ATTRIBUTED" />
                <TimelineItem time="10:45" label="AI Auto-Fix Triggered" status="ACTION_TAKEN" active />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Zap size={32} className="text-gray-300" />
            </div>
            <div>
              <p className="text-sm font-black text-gray-400 uppercase tracking-widest">Select an incident</p>
              <p className="text-xs text-gray-300 font-bold uppercase tracking-widest">To view distributed trace evidence</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TimelineItem: React.FC<{ time: string; label: string; status: string; active?: boolean }> = ({ time, label, status, active }) => (
  <div className="flex gap-4 relative">
    <div className={`w-4 h-4 rounded-full border-2 bg-white z-10 ${active ? 'border-[#00B4D8]' : 'border-gray-200'}`} />
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{time}</p>
      <p className={`text-xs font-bold ${active ? 'text-[#0A1628]' : 'text-gray-400'}`}>{label}</p>
    </div>
  </div>
);

export default IncidentCommandCenter;
