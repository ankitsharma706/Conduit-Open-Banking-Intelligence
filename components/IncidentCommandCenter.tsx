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
  const [actionStatus, setActionStatus] = React.useState<{[key: string]: string}>({});

  const handleAction = (incidentId: string, action: string) => {
    setActionStatus(prev => ({ ...prev, [`${incidentId}-${action}`]: 'loading' }));
    setTimeout(() => {
      setActionStatus(prev => ({ ...prev, [`${incidentId}-${action}`]: 'success' }));
      setTimeout(() => {
        setActionStatus(prev => ({ ...prev, [`${incidentId}-${action}`]: '' }));
      }, 2000);
    }, 1500);
  };

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
    <div className="flex h-full gap-6 animate-fade-in">
      {/* Incident List */}
      <div className={`flex-1 space-y-4 ${selectedIncident ? 'hidden lg:block' : ''}`}>
        <div className="space-y-2">
          {INCIDENTS.map((incident) => (
            <div 
              key={incident.id}
              onClick={() => setSelectedIncident(incident.id)}
              className={`bg-white rounded-[8px] border p-4 transition-all cursor-pointer hover:border-[#00B4D8]/50 ${
                selectedIncident === incident.id ? 'border-[#00B4D8]' : 'border-[#E2E8F0]'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-widest ${getSeverityColor(incident.severity)}`}>
                    {incident.severity}
                  </span>
                  <span className="text-[11px] font-medium text-[#8B9BB4] uppercase tracking-widest">{incident.id}</span>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">
                  {getStatusIcon(incident.status)}
                  <span>{incident.status.replace('_', ' ')}</span>
                </div>
              </div>

              <h3 className="text-[16px] font-bold text-[#0A1628] leading-tight mb-1">{incident.partnerName}</h3>
              <p className="text-[11px] text-[#8B9BB4] font-medium uppercase tracking-widest mb-4">{incident.type.replace('_', ' ')}</p>

              <div className="flex justify-between items-center pt-4 border-t border-[#F1F5F9]">
                <div className="flex gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-[#8B9BB4] uppercase tracking-widest">Revenue at Risk</p>
                    <p className="text-[14px] font-bold text-red-500">₹ {incident.aumAtRisk} Cr</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#8B9BB4] uppercase tracking-widest">MTTR</p>
                    <p className="text-[14px] font-bold text-[#0A1628]">{incident.mttr}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#F1F5F9] border border-[#E2E8F0] flex items-center justify-center text-[10px] font-bold text-[#0A1628]">
                    {incident.owner.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-[12px] font-medium text-[#0A1628]">{incident.owner}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Incident Detail View: Fix 2 set to 380px */}
      {selectedIncident && activeIncident ? (
        <div className="w-[380px] bg-white border-l border-[#E2E8F0] flex flex-col animate-slide-in relative">
          <div className="p-6 border-b border-[#E2E8F0] flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold uppercase tracking-widest ${getSeverityColor(activeIncident.severity)}`}>
                  {activeIncident.severity}
                </span>
                <span className="text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">{activeIncident.id}</span>
              </div>
              <h3 className="text-[20px] font-bold text-[#0A1628] tracking-tight">{activeIncident.partnerName}</h3>
            </div>
            <button 
              onClick={() => setSelectedIncident(null)}
              className="p-1 hover:bg-[#F1F5F9] rounded-md transition-colors"
            >
              <ArrowRight size={20} className="text-[#8B9BB4]" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Action Panel */}
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleAction(activeIncident.id, 'autofix')}
                disabled={actionStatus[`${activeIncident.id}-autofix`] === 'loading'}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-[#00B4D8] text-white hover:opacity-90 transition-all disabled:opacity-50"
              >
                {actionStatus[`${activeIncident.id}-autofix`] === 'loading' ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Zap size={18} />}
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  {actionStatus[`${activeIncident.id}-autofix`] === 'success' ? 'Success' : 'AI Auto-Fix'}
                </span>
              </button>
              <button 
                onClick={() => handleAction(activeIncident.id, 'escalate')}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-[#0A1628] text-white hover:opacity-90 transition-all"
              >
                {actionStatus[`${activeIncident.id}-escalate`] === 'loading' ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <MessageSquare size={18} />}
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  {actionStatus[`${activeIncident.id}-escalate`] === 'success' ? 'Escalated' : 'Escalate'}
                </span>
              </button>
              <button 
                onClick={() => handleAction(activeIncident.id, 'sla')}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-[#E2E8F0] text-[#0A1628] hover:bg-[#F8FAFC] transition-all"
              >
                {actionStatus[`${activeIncident.id}-sla`] === 'loading' ? <div className="w-5 h-5 border-2 border-[#00B4D8]/20 border-t-[#00B4D8] rounded-full animate-spin" /> : <Gavel size={18} />}
                <span className="text-[11px] font-bold uppercase tracking-widest">
                   {actionStatus[`${activeIncident.id}-sla`] === 'success' ? 'Enforced' : 'Enforce SLA'}
                </span>
              </button>
              <button 
                onClick={() => handleAction(activeIncident.id, 'resolve')}
                className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg border border-[#E2E8F0] text-[#0A1628] hover:bg-[#F8FAFC] transition-all"
              >
                {actionStatus[`${activeIncident.id}-resolve`] === 'loading' ? <div className="w-5 h-5 border-2 border-[#00B4D8]/20 border-t-[#00B4D8] rounded-full animate-spin" /> : <CheckCircle2 size={18} />}
                <span className="text-[11px] font-bold uppercase tracking-widest">
                  {actionStatus[`${activeIncident.id}-resolve`] === 'success' ? 'Resolved' : 'Resolve'}
                </span>
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
