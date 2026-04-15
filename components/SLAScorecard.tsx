import React from 'react';
import { 
  FileDown, 
  Send, 
  Eye, 
  TrendingUp,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { SLA_ATTRIBUTIONS } from '../constants.tsx';

const SLAScorecard: React.FC = () => {
  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case 'HIGH': return <span className="px-2 py-1 rounded-md bg-red-500/10 text-red-500 text-[9px] font-black tracking-widest uppercase">High Risk</span>;
      case 'MEDIUM': return <span className="px-2 py-1 rounded-md bg-amber-500/10 text-amber-500 text-[9px] font-black tracking-widest uppercase">Medium Risk</span>;
      default: return <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-[9px] font-black tracking-widest uppercase">Low Risk</span>;
    }
  };

  const getIndexColor = (score: number) => {
    if (score > 90) return 'text-green-500';
    if (score > 75) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-[#0A1628] uppercase tracking-tighter">SLA Performance</h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Accountability Engine & Attribution Index</p>
        </div>
        <button className="bg-[#0A1628] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-all">
          <FileDown size={14} />
          Generate Monthly SLA Report
        </button>
      </div>

      <div className="bg-white rounded-[32px] border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Partner & Type</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">SLA Index</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Breaches (MTD)</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Avg Latency</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Revenue Impact</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">FailGuard Risk</th>
                <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {SLA_ATTRIBUTIONS.sort((a, b) => a.slaIndex - b.slaIndex).map((partner) => (
                <tr key={partner.partnerId} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-[#0A1628]">{partner.partnerName}</span>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{partner.partnerType}</span>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className={`text-lg font-black font-mono ${getIndexColor(partner.slaIndex)}`}>
                        {partner.slaIndex}
                      </span>
                      <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${partner.slaIndex > 90 ? 'bg-green-500' : partner.slaIndex > 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                          style={{ width: `${partner.slaIndex}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className="text-sm font-bold text-gray-600">{partner.breachesMonth}</span>
                  </td>
                  <td className="p-6 text-center">
                    <span className="text-sm font-mono font-bold text-gray-600">{partner.avgLatency}ms</span>
                  </td>
                  <td className="p-6 text-right">
                    <span className={`text-sm font-mono font-black ${partner.revenueImpact > 5 ? 'text-red-500' : 'text-[#0A1628]'}`}>
                      ₹ {partner.revenueImpact.toFixed(2)} Cr
                    </span>
                  </td>
                  <td className="p-6 text-center">
                    {getRiskBadge(partner.failGuardRisk)}
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button title="Send Escalation" className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-[#0A1628] hover:text-white transition-all">
                        <Send size={14} />
                      </button>
                      <button title="View Trace Evidence" className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-[#0A1628] hover:text-white transition-all">
                        <Eye size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-green-500/10 text-green-500">
              <CheckCircle2 size={20} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Top Performer</h4>
          </div>
          <p className="text-lg font-black text-[#0A1628]">Primary FIP Gateway</p>
          <p className="text-xs text-green-500 font-bold mt-1">98.2% SLA Compliance</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-red-500/10 text-red-500">
              <AlertTriangle size={20} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Critical Breach</h4>
          </div>
          <p className="text-lg font-black text-[#0A1628]">Partner UPI Node</p>
          <p className="text-xs text-red-500 font-bold mt-1">64.5% SLA Compliance</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500">
              <TrendingUp size={20} />
            </div>
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-400">Ecosystem Average</h4>
          </div>
          <p className="text-lg font-black text-[#0A1628]">82.4% Index</p>
          <p className="text-xs text-blue-500 font-bold mt-1">+2.1% vs Last Month</p>
        </div>
      </div>
    </div>
  );
};

export default SLAScorecard;
