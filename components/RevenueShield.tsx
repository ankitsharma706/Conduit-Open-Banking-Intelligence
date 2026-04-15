import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Calculator,
  ArrowUpRight,
  TrendingUp,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { REVENUE_TRENDS, REVENUE_MAPPINGS } from '../constants.tsx';

const RevenueShield: React.FC = () => {
  const totalProtected = REVENUE_TRENDS.reduce((acc, curr) => acc + curr.protected, 0);
  const totalLost = REVENUE_TRENDS.reduce((acc, curr) => acc + curr.leakage, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-black text-[#0A1628] uppercase tracking-tighter">Revenue Impact</h2>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">AUM Leakage & Protection Command Centre</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-500/10 text-blue-500 px-4 py-2 rounded-xl border border-blue-500/20">
          <Activity size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Live Revenue Impact Active</span>
        </div>
      </div>

      {/* Hero Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0A1628] rounded-[40px] p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B4D8]/10 blur-[100px] pointer-events-none" />
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 rounded-2xl bg-[#00B4D8]/20 text-[#00B4D8]">
              <ShieldCheck size={32} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00B4D8]">AUM Protected (MTD)</span>
          </div>
          <p className="text-5xl font-black tracking-tighter mb-2">₹ 19.8 Cr</p>
          <div className="flex items-center gap-2 text-green-400 text-sm font-bold">
            <ArrowUpRight size={16} />
            <span>+12.4% vs Last Month</span>
          </div>
        </div>

        <div className="bg-white rounded-[40px] p-10 border border-gray-200 relative overflow-hidden">
          <div className="flex justify-between items-start mb-8">
            <div className="p-4 rounded-2xl bg-red-500/10 text-red-500">
              <ShieldAlert size={32} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">AUM Lost (MTD)</span>
          </div>
          <p className="text-5xl font-black tracking-tighter mb-2 text-[#0A1628]">₹ 5.1 Cr</p>
          <div className="flex items-center gap-2 text-red-500 text-sm font-bold">
            <TrendingUp size={16} />
            <span>+8.2% vs Last Month</span>
          </div>
        </div>
      </div>

      {/* Monthly Trend */}
      <div className="bg-white rounded-[32px] border border-gray-200 p-8">
        <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-8">Financial Impact Trend (Last 3 Months)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={REVENUE_TRENDS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} />
              <Tooltip 
                cursor={{ fill: '#F8FAFC' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }} />
              <Bar dataKey="protected" name="AUM Protected" fill="#00B4D8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="leakage" name="AUM Lost" fill="#EF4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transaction Breakdown */}
      <div className="bg-white rounded-[32px] border border-gray-200 overflow-hidden">
        <div className="p-8 border-b border-gray-100">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Transaction Type Leakage Analysis</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">Transaction Type</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Avg Value</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Failures (MTD)</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Rupee Impact</th>
              <th className="p-6 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">AI Recovery %</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {REVENUE_MAPPINGS.map((m, i) => (
              <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-6 text-sm font-bold text-[#0A1628]">{m.transactionType}</td>
                <td className="p-6 text-center text-sm font-mono text-gray-600">₹ {m.averageValue.toLocaleString()}</td>
                <td className="p-6 text-center text-sm font-bold text-gray-600">{Math.floor(Math.random() * 500) + 100}</td>
                <td className="p-6 text-right text-sm font-mono font-black text-red-500">₹ {(Math.random() * 2).toFixed(2)} Cr</td>
                <td className="p-6 text-center">
                  <span className="px-2 py-1 rounded-md bg-green-500/10 text-green-500 text-[10px] font-black">
                    {Math.floor(Math.random() * 30) + 60}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ROI Calculator */}
      <div className="bg-blue-600 rounded-[40px] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="p-4 rounded-2xl bg-white/20">
            <Calculator size={32} />
          </div>
          <div>
            <h4 className="text-xl font-black uppercase tracking-tight">Live ROI Calculator</h4>
            <p className="text-sm text-white/60 font-medium">Subscription: ₹ 2.5 Cr/yr | MTTR Reduction: 68%</p>
          </div>
        </div>
        <div className="text-center md:text-right">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-1">Current ROI Multiple</p>
          <p className="text-5xl font-black tracking-tighter">14.2x</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueShield;
