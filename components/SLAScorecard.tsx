import React from 'react';
import { 
  FileDown, 
  Send, 
  Eye, 
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Shield,
  Zap,
  Activity
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
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-[#E2E8F0]">
                <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest">Partner</th>
                <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest text-center border-l border-[#E2E8F0]/30">SLA Index</th>
                <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest text-center border-l border-[#E2E8F0]/30">Breaches</th>
                <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest text-center border-l border-[#E2E8F0]/30">Latency</th>
                <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest text-right border-l border-[#E2E8F0]/30">Impact</th>
                <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest text-center border-l border-[#E2E8F0]/30">Risk</th>
                <th className="px-4 h-[44px] text-[11px] font-bold text-[#8B9BB4] uppercase tracking-widest text-right border-l border-[#E2E8F0]/30">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {SLA_ATTRIBUTIONS.sort((a, b) => a.slaIndex - b.slaIndex).map((partner, idx) => (
                <tr key={partner.partnerId} className={`h-[44px] ${idx % 2 === 1 ? 'bg-[#F8F9FB]' : 'bg-white'} hover:bg-blue-50/20 transition-colors group`}>
                  <td className="px-4 border-l border-transparent">
                    <div className="flex items-center gap-2">
                       <span className="text-[13px] font-medium text-[#0A1628] leading-none">{partner.partnerName}</span>
                       <span className="text-[10px] text-[#8B9BB4] font-medium uppercase tracking-tight">{partner.partnerType}</span>
                    </div>
                  </td>
                  <td className="px-4 text-center border-l border-[#E2E8F0]/30">
                    <span className={`text-[13px] font-medium font-mono ${getIndexColor(partner.slaIndex)}`}>
                      {partner.slaIndex}%
                    </span>
                  </td>
                  <td className="px-4 text-center border-l border-[#E2E8F0]/30">
                    <span className="text-[13px] font-medium text-[#0A1628]">{partner.breachesMonth}</span>
                  </td>
                  <td className="px-4 text-center border-l border-[#E2E8F0]/30">
                    <span className="text-[13px] font-mono font-medium text-[#8B9BB4]">{partner.avgLatency}ms</span>
                  </td>
                  <td className="px-4 text-right border-l border-[#E2E8F0]/30">
                    <span className={`text-[13px] font-medium font-mono ${partner.revenueImpact > 5 ? 'text-red-500' : 'text-[#0A1628]'}`}>
                      ₹ {partner.revenueImpact.toFixed(2)} Cr
                    </span>
                  </td>
                  <td className="px-4 text-center border-l border-[#E2E8F0]/30">
                    {getRiskBadge(partner.failGuardRisk)}
                  </td>
                  <td className="px-4 text-right border-l border-[#E2E8F0]/30">
                    <div className="flex justify-end gap-2">
                      <button title="Send Escalation" className="p-1 px-2 rounded-md bg-[#0A1628] text-white hover:bg-[#00B4D8] transition-all">
                        <Send size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 h-[160px] rounded-lg border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#10B981] glossy-icon text-white" style={{ backgroundColor: '#10B981' }}>
              <Shield size={16} />
            </div>
            <h4 className="text-[12px] font-medium uppercase tracking-tight text-[#8B9BB4]">Top Performer</h4>
          </div>
          <div>
            <p className="text-[18px] font-medium text-[#0A1628]">Primary FIP Gateway</p>
            <p className="text-[12px] text-green-500 font-bold mt-1">98.2% SLA Compliance</p>
          </div>
        </div>

        <div className="bg-white p-5 h-[160px] rounded-lg border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#EF4444] glossy-icon text-white" style={{ backgroundColor: '#EF4444' }}>
              <Zap size={16} />
            </div>
            <h4 className="text-[12px] font-medium uppercase tracking-tight text-[#8B9BB4]">Critical Breach</h4>
          </div>
          <div>
            <p className="text-[18px] font-medium text-[#0A1628]">Partner UPI Node</p>
            <p className="text-[12px] text-red-500 font-bold mt-1">64.5% SLA Compliance</p>
          </div>
        </div>

        <div className="bg-white p-5 h-[160px] rounded-lg border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#3B82F6] glossy-icon text-white" style={{ backgroundColor: '#3B82F6' }}>
              <Activity size={16} />
            </div>
            <h4 className="text-[12px] font-medium uppercase tracking-tight text-[#8B9BB4]">Ecosystem Average</h4>
          </div>
          <div>
            <p className="text-[18px] font-medium text-[#0A1628]">82.4% Index</p>
            <p className="text-[12px] text-[#00B4D8] font-bold mt-1">+2.1% v/s Month Start</p>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .glossy-icon {
          background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.1);
        }
      `}} />
    </div>
  );
};

export default SLAScorecard;
