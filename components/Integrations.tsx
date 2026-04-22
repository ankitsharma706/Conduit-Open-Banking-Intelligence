import React, { useState } from 'react';
import { 
  Link2, 
  ExternalLink, 
  Copy, 
  Database, 
  Globe, 
  Shield, 
  RefreshCw, 
  CheckCircle2, 
  Code,
  Download,
  Share2,
  Plus
} from 'lucide-react';

const Integrations: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const apiEndpoints = [
    { id: 'traces', name: 'Raw Operations Stream', url: 'https://api.conduit.inc/v1/traces', method: 'GET / Streaming', desc: 'Real-time API trace data in OTel format' },
    { id: 'metrics', name: 'Financial Health Pulse', url: 'https://api.conduit.inc/v1/metrics/aum', method: 'GET', desc: 'Aggregate AUM at risk and health score data' },
    { id: 'incidents', name: 'Incident Webhook', url: 'https://api.conduit.inc/v1/webhooks/incidents', method: 'POST', desc: 'Real-time alerts for P1/P2 failures' },
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <h2 className="text-[11px] font-black text-[#8B9BB4] uppercase tracking-[0.25em]">Data Ecosystem & Integrations</h2>
        <p className="text-[14px] text-gray-500 max-w-2xl">Connect your Conduit workspace to external platforms, observability stacks, and BI tools via robust secure APIs.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* API Access Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[#F1F5F9] bg-[#F8FAFC] flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#0A1628] text-[#00B4D8] rounded-lg">
                <Code size={18} />
              </div>
              <span className="text-[14px] font-bold text-[#0A1628]">Public API Endpoints</span>
            </div>
            <button className="text-[11px] font-bold text-[#00B4D8] hover:underline uppercase tracking-widest">
              View Documentation
            </button>
          </div>
          
          <div className="flex-1 p-6 space-y-6">
            {apiEndpoints.map((api) => (
              <div key={api.id} className="p-4 rounded-xl border border-gray-100 bg-white hover:border-[#00B4D8]/30 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-[15px] font-bold text-[#0A1628]">{api.name}</h3>
                    <p className="text-[12px] text-gray-500 mt-0.5">{api.desc}</p>
                  </div>
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-black text-gray-400 uppercase tracking-widest">{api.method}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#F1F5F9] p-3 rounded-lg border border-gray-200">
                  <span className="flex-1 text-[11px] font-mono text-[#0A1628] truncate">{api.url}</span>
                  <button 
                    onClick={() => copyToClipboard(api.url, api.id)}
                    className="p-1.5 hover:bg-white rounded transition-all text-gray-400 hover:text-[#00B4D8]"
                  >
                    {copiedId === api.id ? <CheckCircle2 size={14} className="text-green-500" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Destinations */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#00B4D8]/10 text-[#00B4D8] rounded-lg">
              <Share2 size={18} />
            </div>
            <span className="text-[14px] font-bold text-[#0A1628]">Active Exports</span>
          </div>

          <ExportTarget icon={<Globe size={20} />} name="Snowflake Data Lake" status="Connected" color="text-blue-500" />
          <ExportTarget icon={<Database size={20} />} name="AWS S3 Bucket" status="Syncing" color="text-amber-500" />
          <ExportTarget icon={<RefreshCw size={20} />} name="DataDog Stream" status="Active" color="text-purple-500" />
          
          <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-3">
            <button className="w-full h-[44px] border border-[#E2E8F0] rounded-xl flex items-center justify-center gap-2 text-[12px] font-bold text-[#0A1628] hover:bg-gray-50 transition-all">
              <Plus size={16} />
              Add Destination
            </button>
            <button className="w-full h-[44px] bg-[#0A1628] text-white rounded-xl flex items-center justify-center gap-2 text-[12px] font-bold hover:bg-[#1E293B] transition-all">
              <Download size={16} />
              Export Batch (CSV)
            </button>
          </div>
        </div>
      </div>

      {/* API Key Management */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-red-50 text-red-500 rounded-xl">
                <Shield size={22} />
             </div>
             <div>
                <h3 className="text-[18px] font-bold text-[#0A1628]">Access Tokens</h3>
                <p className="text-[12px] text-gray-500">Manage credentials for secure server-to-server communication</p>
             </div>
          </div>
          <button className="h-[44px] px-6 bg-[#00B4D8] text-white rounded-xl text-[12px] font-bold hover:bg-[#0096b4] transition-all shadow-lg shadow-[#00B4D8]/20">
            Generate New Token
          </button>
        </div>

        <div className="space-y-4">
           <TokenRow name="Production Dashboard Read" keyId="cond_pk_....8x2j" created="14 days ago" />
           <TokenRow name="Automated Remediation Key" keyId="cond_rk_....5n1p" created="2 months ago" />
        </div>
      </div>
    </div>
  );
};

const ExportTarget = ({ icon, name, status, color }: { icon: React.ReactNode, name: string, status: string, color: string }) => (
  <div className="p-4 rounded-xl border border-gray-50 bg-[#F8FAFC] flex items-center justify-between">
    <div className="flex items-center gap-4">
      <div className={`text-gray-400`}>{icon}</div>
      <div>
        <p className="text-[13px] font-bold text-[#0A1628]">{name}</p>
        <div className="flex items-center gap-1.5 mt-0.5">
           <div className={`w-1.5 h-1.5 rounded-full bg-current ${color}`} />
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{status}</span>
        </div>
      </div>
    </div>
    <button className="text-gray-300 hover:text-[#0A1628]"><ExternalLink size={14} /></button>
  </div>
);

const TokenRow = ({ name, keyId, created }: { name: string, keyId: string, created: string }) => (
  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all">
    <div className="flex items-center gap-4 flex-1">
      <div className="w-2 h-2 rounded-full bg-green-500" />
      <span className="text-[14px] font-bold text-[#0A1628] min-w-[200px]">{name}</span>
      <code className="text-[11px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-mono">{keyId}</code>
    </div>
    <div className="flex items-center gap-6">
       <span className="text-[11px] font-bold text-gray-400">Created {created}</span>
       <button className="text-[11px] font-black text-red-500 uppercase tracking-widest hover:underline">Revoke</button>
    </div>
  </div>
);

export default Integrations;
