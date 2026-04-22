import React from 'react';
import { 
  Activity, 
  TrendingUp, 
  AlertCircle, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { API_NODES, ENTERPRISE_CLIENT } from '../constants.tsx';

const ObservabilityHub: React.FC = () => {
  const [view, setView] = React.useState<'latency' | 'error' | 'throughput'>('latency');

  // Mock time-series data
  const timeSeriesData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    latency: Math.floor(Math.random() * 200) + 100,
    errorRate: (Math.random() * 2).toFixed(2),
    throughput: Math.floor(Math.random() * 5000) + 2000,
  }));

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'HEALTHY': return 'border-green-500 bg-green-500/5';
      case 'WARNING': return 'border-amber-500 bg-amber-500/5';
      case 'CRITICAL': return 'border-red-500 bg-red-500/5';
      default: return 'border-gray-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* Headline Metrics: Fix 2 - 140px height, repeat(4, 1fr), 16px gap */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard 
          label="Total API Calls (1h)" 
          value="1.2M" 
          delta="+4.2%" 
          trend="up" 
          icon={<Activity size={20} />} 
          variant="headline"
        />
        <MetricCard 
          label="Live Failure Rate" 
          value="0.42%" 
          delta="-0.05%" 
          trend="down" 
          icon={<TrendingUp size={20} />} 
          status="healthy"
          variant="headline"
        />
        <MetricCard 
          label="AUM at Risk" 
          value={`₹ ${ENTERPRISE_CLIENT.aumAtRisk} Cr`} 
          delta="+₹ 1.2 Cr" 
          trend="up" 
          icon={<DollarSign size={20} />} 
          status="critical"
          variant="headline"
        />
        <MetricCard 
          label="Active Incidents" 
          value={ENTERPRISE_CLIENT.criticalIncidents.toString()} 
          delta="+1" 
          trend="up" 
          icon={<AlertCircle size={20} />} 
          status="warning"
          variant="headline"
        />
      </div>

      {/* Node Grid: Fix 2 - 160px height (standard metric card height), repeat(4, 1fr), 16px gap */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="text-[13px] font-medium uppercase tracking-[0.08em] text-[#8B9BB4]">Ecosystem Node Grid</h3>
          <span className="text-[10px] font-bold text-[#8B9BB4]">REFRESHED EVERY 10S</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {API_NODES.map((node) => (
            <div 
              key={node.id} 
              className={`h-[160px] p-5 rounded-lg border transition-all cursor-pointer hover:border-[#00B4D8] flex flex-col justify-between bg-white ${getStatusColor(node.status)} shadow-sm`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#8B9BB4] mb-0.5">{node.type}</p>
                  <h4 className="text-[14px] font-medium text-[#0A1628] truncate max-w-[120px]">{node.name}</h4>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  node.status === 'HEALTHY' ? 'bg-green-500' : 
                  node.status === 'WARNING' ? 'bg-amber-500' : 'bg-red-500'
                }`} />
              </div>
              
              <div className="flex items-end justify-between">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[9px] font-bold text-[#8B9BB4] uppercase mb-0.5 tracking-tighter">Latency</p>
                    <p className="text-[16px] font-medium text-[#0A1628] leading-none">{node.latency}ms</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-[#8B9BB4] uppercase mb-0.5 tracking-tighter">Success</p>
                    <p className="text-[16px] font-medium text-[#0A1628] leading-none">{node.successRate}%</p>
                  </div>
                </div>

                <div className="h-8 w-20 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={node.latencyTrend.map((v, i) => ({ v, i }))}>
                      <Area 
                        type="monotone" 
                        dataKey="v" 
                        stroke={node.status === 'HEALTHY' ? '#22C55E' : node.status === 'WARNING' ? '#F59E0B' : '#EF4444'} 
                        fill={node.status === 'HEALTHY' ? '#22C55E20' : node.status === 'WARNING' ? '#F59E0B20' : '#EF444420'} 
                        strokeWidth={1.5}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-[18px] font-bold text-[#0A1628] tracking-tight">Ecosystem Performance Trend</h3>
            <p className="text-[11px] text-[#8B9BB4] font-bold uppercase tracking-widest mt-1">Distributed Trace Analysis (24H)</p>
          </div>
          <div className="flex bg-[#F1F5F9] p-1 rounded-lg">
            {(['latency', 'error', 'throughput'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-widest transition-all ${
                  view === v ? 'bg-white text-[#0A1628] shadow-sm' : 'text-[#8B9BB4] hover:text-[#0A1628]'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="time" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#94A3B8' }} 
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                labelStyle={{ fontWeight: 900, marginBottom: '4px' }}
              />
              <Line 
                type="monotone" 
                dataKey={view === 'latency' ? 'latency' : view === 'error' ? 'errorRate' : 'throughput'} 
                stroke="#00B4D8" 
                strokeWidth={4} 
                dot={false} 
                activeDot={{ r: 6, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  label: string;
  value: string;
  delta: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  status?: 'healthy' | 'warning' | 'critical';
  variant?: 'standard' | 'headline';
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, delta, trend, icon, status, variant = 'standard' }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-amber-500';
      case 'critical': return 'text-red-500';
      default: return 'text-[#00B4D8]';
    }
  };

  const isHeadline = variant === 'headline';

  return (
    <div className={`${isHeadline ? 'h-[140px]' : 'h-[160px]'} bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-sm overflow-hidden flex flex-col justify-between`}>
      <div className="flex justify-between items-start">
        <div className={`p-2 rounded-lg bg-[#F8FAFC] ${getStatusColor()}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          <span>{delta}</span>
        </div>
      </div>
      <div>
        <p className="text-[12px] font-medium text-[#8B9BB4] uppercase tracking-tight mb-1">{label}</p>
        <p className={`${isHeadline ? 'text-[28px]' : 'text-[22px]'} font-medium text-[#0A1628] leading-none`}>{value}</p>
      </div>
    </div>
  );
};

export default ObservabilityHub;
