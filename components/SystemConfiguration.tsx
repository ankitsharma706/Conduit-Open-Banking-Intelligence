import React from 'react';
import { 
  Settings, 
  Database, 
  Shield, 
  Brain, 
  DollarSign, 
  Users,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2
} from 'lucide-react';
import { CONDUIT_USERS, REVENUE_MAPPINGS } from '../constants.tsx';

const SystemConfiguration: React.FC = () => {
  const [activeSection, setActiveSection] = React.useState<'api' | 'sla' | 'ai' | 'revenue' | 'users'>('api');

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-[#0A1628] uppercase tracking-tighter">System Setup</h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Enterprise Governance & Integration Control</p>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Nav */}
        <div className="w-64 shrink-0 space-y-1">
          <ConfigNavItem id="api" label="API Integration" icon={<Database size={16} />} active={activeSection === 'api'} onClick={() => setActiveSection('api')} />
          <ConfigNavItem id="sla" label="SLA Thresholds" icon={<Shield size={16} />} active={activeSection === 'sla'} onClick={() => setActiveSection('sla')} />
          <ConfigNavItem id="ai" label="AI Controls" icon={<Brain size={16} />} active={activeSection === 'ai'} onClick={() => setActiveSection('ai')} />
          <ConfigNavItem id="revenue" label="Revenue Mapping" icon={<DollarSign size={16} />} active={activeSection === 'revenue'} onClick={() => setActiveSection('revenue')} />
          <ConfigNavItem id="users" label="User Management" icon={<Users size={16} />} active={activeSection === 'users'} onClick={() => setActiveSection('users')} />
        </div>

        {/* Content */}
        <div className="flex-1 bg-white rounded-[40px] border border-gray-200 p-10 shadow-sm">
          {activeSection === 'api' && <APIIntegrationView />}
          {activeSection === 'sla' && <SLAThresholdView />}
          {activeSection === 'ai' && <AIControlView />}
          {activeSection === 'revenue' && <RevenueMappingView />}
          {activeSection === 'users' && <UserManagementView />}
        </div>
      </div>
    </div>
  );
};

const APIIntegrationView = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-black text-[#0A1628] uppercase tracking-tight mb-2">Observability Pipeline</h3>
      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Connect your Open Banking infrastructure to Conduit</p>
    </div>
    <div className="space-y-6">
      <InputGroup label="OpenTelemetry Collector Endpoint" value="https://telemetry.conduit.internal" />
      <InputGroup label="Kafka Bootstrap Servers" value="kafka-1.conduit.internal:9092, kafka-2.conduit.internal:9092" />
      <InputGroup label="AA Node Identifier" value="CONDUIT-AA-PROD-01" />
      <button className="bg-[#0A1628] text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
        Test Connection
      </button>
    </div>
  </div>
);

const SLAThresholdView = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-black text-[#0A1628] uppercase tracking-tight mb-2">SLA Threshold Configuration</h3>
      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Define critical thresholds for automated remediation</p>
    </div>
    <div className="space-y-6">
      <ThresholdItem label="P1 Latency Threshold (ms)" value={500} />
      <ThresholdItem label="P2 Latency Threshold (ms)" value={300} />
      <ThresholdItem label="Error Rate Critical (%)" value={5} />
      <ThresholdItem label="Success Rate Warning (%)" value={98} />
    </div>
  </div>
);

const AIControlView = () => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-black text-[#0A1628] uppercase tracking-tight mb-2">AI Execution Governance</h3>
      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Control the autonomy of Conduit's AI Resolution Engine</p>
    </div>
    <div className="space-y-6">
      <div className="p-6 rounded-2xl border border-gray-100 space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-black text-[#0A1628]">AutoRemediate Autonomy</span>
          <span className="text-[10px] font-black text-[#00B4D8] uppercase tracking-widest">Human-in-the-loop</span>
        </div>
        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-[#00B4D8] w-[40%]" />
        </div>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">AI requires manual approval for P1/P2 remediation actions.</p>
      </div>
      <ToggleItem label="Enable LSTMWatch Anomaly Detection" active />
      <ToggleItem label="Enable FailGuard Predictive Analysis" active />
      <ToggleItem label="Enable SLA Attribution Engine" active />
    </div>
  </div>
);

const RevenueMappingView = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-black text-[#0A1628] uppercase tracking-tight mb-2">Revenue Impact Mapping</h3>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Map API transactions to financial value (AUM)</p>
      </div>
      <button className="p-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-[#0A1628] hover:text-white transition-all">
        <Plus size={20} />
      </button>
    </div>
    <div className="space-y-3">
      {REVENUE_MAPPINGS.map((m, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
          <span className="text-sm font-bold text-[#0A1628]">{m.transactionType}</span>
          <div className="flex items-center gap-6">
            <span className="text-sm font-mono font-black text-[#00B4D8]">₹ {m.averageValue.toLocaleString()}</span>
            <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const UserManagementView = () => (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-black text-[#0A1628] uppercase tracking-tight mb-2">User Management & RBAC</h3>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Manage enterprise access and permissions</p>
      </div>
      <button className="bg-[#0A1628] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all">
        <Plus size={14} />
        Invite User
      </button>
    </div>
    <div className="space-y-3">
      {CONDUIT_USERS.map((u) => (
        <div key={u.id} className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xs font-black uppercase shadow-sm">
              {u.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-sm font-black text-[#0A1628]">{u.name}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{u.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <span className="px-3 py-1 bg-white rounded-lg border border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-600">
              {u.role.replace('_', ' ')}
            </span>
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-[#00B4D8] transition-colors"><Edit2 size={16} /></button>
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const ConfigNavItem = ({ id, label, icon, active, onClick }: { id: string; label: string; icon: React.ReactNode; active: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
      active 
        ? 'bg-[#0A1628] text-white shadow-lg' 
        : 'text-gray-400 hover:bg-gray-100 hover:text-gray-600'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const InputGroup = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
    <input 
      type="text" 
      defaultValue={value} 
      className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 text-sm font-bold text-[#0A1628] outline-none focus:border-[#00B4D8] transition-all"
    />
  </div>
);

const ThresholdItem = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100">
    <span className="text-sm font-bold text-[#0A1628]">{label}</span>
    <div className="flex items-center gap-4">
      <input 
        type="number" 
        defaultValue={value} 
        className="w-24 bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm font-black text-[#00B4D8] text-center outline-none focus:border-[#00B4D8] transition-all"
      />
      <CheckCircle2 size={20} className="text-green-500" />
    </div>
  </div>
);

const ToggleItem = ({ label, active }: { label: string; active?: boolean }) => (
  <div className="flex justify-between items-center p-6 bg-gray-50 rounded-2xl border border-gray-100">
    <span className="text-sm font-bold text-[#0A1628]">{label}</span>
    <div className={`w-10 h-5 rounded-full relative transition-all ${active ? 'bg-[#00B4D8]' : 'bg-gray-200'}`}>
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${active ? 'right-0.5' : 'left-0.5'}`} />
    </div>
  </div>
);

export default SystemConfiguration;
