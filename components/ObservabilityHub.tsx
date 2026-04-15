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
    <div className="space-y-8 animate-fade-in">
      {/* Headline Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Total API Calls (1h)" 
          value="1.2M" 
          delta="+4.2%" 
          trend="up" 
          icon={<Activity size={20} />} 
        />
        <MetricCard 
          label="Live Failure Rate" 
          value="0.42%" 
          delta="-0.05%" 
          trend="down" 
          icon={<TrendingUp size={20} />} 
          status="healthy"
        />
        <MetricCard 
          label="AUM at Risk" 
          value={`₹ ${ENTERPRISE_CLIENT.aumAtRisk} Cr`} 
          delta="+₹ 1.2 Cr" 
          trend="up" 
          icon={<DollarSign size={20} />} 
          status="critical"
        />
        <MetricCard 
          label="Active Incidents" 
          value={ENTERPRISE_CLIENT.criticalIncidents.toString()} 
          delta="+1" 
          trend="up" 
          icon={<AlertCircle size={20} />} 
          status="warning"
        />
      </div>

      {/* Node Grid */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Ecosystem Node Grid</h3>
          <span className="text-[10px] font-bold text-gray-400">Refreshed every 10s</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {API_NODES.map((node) => (
            <div 
              key={node.id} 
              className={`p-5 rounded-2xl border-2 transition-all cursor-pointer hover:scale-[1.02] ${getStatusColor(node.status)}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{node.type}</p>
                  <h4 className="text-sm font-black">{node.name}</h4>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  node.status === 'HEALTHY' ? 'bg-green-500' : 
                  node.status === 'WARNING' ? 'bg-amber-500' : 'bg-red-500'
                }`} />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Latency</p>
                  <p className="text-lg font-black font-mono">{node.latency}ms</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Success</p>
                  <p className="text-lg font-black font-mono">{node.successRate}%</p>
                </div>
              </div>

              <div className="h-10 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={node.latencyTrend.map((v, i) => ({ v, i }))}>
                    <Area 
                      type="monotone" 
                      dataKey="v" 
                      stroke={node.status === 'HEALTHY' ? '#22C55E' : node.status === 'WARNING' ? '#F59E0B' : '#EF4444'} 
                      fill={node.status === 'HEALTHY' ? '#22C55E20' : node.status === 'WARNING' ? '#F59E0B20' : '#EF444420'} 
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chart */}
      <div className="bg-white rounded-3xl border border-gray-200 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-lg font-black uppercase tracking-tight">Ecosystem Performance Trend</h3>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Last 24 Hours Distributed Trace Analysis</p>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {(['latency', 'error', 'throughput'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                  view === v ? 'bg-white text-[#0A1628] shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[400px] w-full">
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
}

const MetricCard: React.FC<MetricCardProps> = ({ label, value, delta, trend, icon, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'healthy': return 'text-green-500';
      case 'warning': return 'text-amber-500';
      case 'critical': return 'text-red-500';
      default: return 'text-[#00B4D8]';
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-xl bg-gray-50 ${getStatusColor()}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          <span>{delta}</span>
        </div>
      </div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
      <p className="text-2xl font-black tracking-tight">{value}</p>
    </div>
  );
};

export default ObservabilityHub;
