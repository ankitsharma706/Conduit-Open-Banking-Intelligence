import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Calculator,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Plug,
  Activity as Pulse,
  Radar,
  Brain,
  Target,
  ArrowRight,
  Zap,
  Box,
  Maximize2,
  Minimize2,
  Layers,
  Search,
  Eye,
  BarChart3,
  MousePointer2,
  Plus,
  Minus,
  RefreshCw
} from 'lucide-react';
import { 
  AreaChart,
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { motion, useAnimation, AnimatePresence } from 'motion/react';
import { REVENUE_TRENDS, REVENUE_MAPPINGS, SLA_ATTRIBUTIONS, ENTERPRISE_CLIENT } from '../constants.tsx';

const ORIGINAL_NODES = [
  { id: 'input', title: 'Input Collector', icon: <Plug size={14} />, color: '#00B4D8', x: 80, y: 60, metricName: 'API Ingest', value: 14282, status: 'active' },
  { id: 'monitor', title: 'Monitoring Node', icon: <Pulse size={14} />, color: '#3B82F6', x: 280, y: 160, metricName: 'p95 Latency', value: 142, status: 'active', suffix: 'ms' },
  { id: 'detect', title: 'Detection Node', icon: <Target size={14} />, color: '#F59E0B', x: 480, y: 280, metricName: 'Anomalies', value: 14, status: 'warning' },
  { id: 'predict', title: 'Prediction Node', icon: <Brain size={14} />, color: '#F97316', x: 740, y: 220, metricName: 'Risk Index', value: 88, status: 'warning', suffix: '%' },
  { id: 'attribute', title: 'Attribution Node', icon: <Box size={14} />, color: '#8B5CF6', x: 960, y: 100, metricName: 'Attributed Loss', value: 4.28, status: 'active', prefix: '₹', suffix: ' L' },
  { id: 'revenue', title: 'Revenue Node', icon: <ShieldAlert size={14} />, color: '#EF4444', x: 1180, y: 50, metricName: 'Leakage Blocked', value: 5.12, status: 'critical', prefix: '₹', suffix: ' Cr' },
  { id: 'output', title: 'Output Node', icon: <Zap size={14} />, color: '#22C55E', x: 1400, y: 180, metricName: 'ROI Multiple', value: 14.8, status: 'active', suffix: 'x' },
];

const RevenueShield: React.FC = () => {
  const [scale, setScale] = useState(0.85);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const connections = [
    { from: 'input', to: 'monitor' },
    { from: 'monitor', to: 'detect' },
    { from: 'detect', to: 'predict' },
    { from: 'predict', to: 'attribute' },
    { from: 'attribute', to: 'revenue' },
    { from: 'revenue', to: 'output' },
  ];
  
  const [nodes, setNodes] = useState(ORIGINAL_NODES);

  const handleNodeDrag = (id: string, info: any) => {
    // Info contains delta relative to previous frame
    setNodes(prev => prev.map(n => {
      if (n.id === id) {
        return { 
          ...n, 
          x: n.x + (info.delta.x / scale), 
          y: n.y + (info.delta.y / scale) 
        };
      }
      return n;
    }));
  };
  
  // Task 5: Calculator State
  const [aum, setAum] = useState(50000);
  const [failureRate, setFailureRate] = useState(2.5);
  const [incidents, setIncidents] = useState(12);
  const [teamSize, setTeamSize] = useState(5);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Task 5: Calculations
  const aumAtRisk = (aum * failureRate / 100) * 0.15;
  const leakagePrevented = aumAtRisk * 0.35;
  const roiMultiple = leakagePrevented / 2;
  const mttrImprovement = (incidents * teamSize * 2.5) / 60;

  const handleWheel = (e: React.WheelEvent) => {
    const delta = e.deltaY > 0 ? 0.95 : 1.05;
    setScale(prev => Math.min(Math.max(prev * delta, 0.4), 2));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.node-card')) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      {/* Task 1: Revenue Impact Pipeline (AgentCanvas Style) */}
      <div className="mx-6 h-[480px] bg-[#F0F4F8] rounded-[16px] border border-[#E2E8F0] shadow-sm relative overflow-hidden flex flex-col">
        {/* Dot Grid Background */}
        <div className="absolute inset-0 z-0 pointer-events-none" style={{ 
          backgroundImage: 'radial-gradient(circle, #C8D4E0 1px, transparent 1px)', 
          backgroundSize: '20px 20px'
        }} />
        
        {/* Badge Overlay */}
        <div className="absolute top-6 left-6 z-40 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E2E8F0] shadow-sm flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
          <span className="text-[10px] font-black text-[#0A1628] uppercase tracking-[0.1em]">Revenue Pipeline Live</span>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-6 right-6 z-40 flex flex-col gap-2">
          <button onClick={() => setScale(prev => Math.min(prev + 0.1, 2))} className="w-8 h-8 bg-white border border-[#E2E8F0] rounded-lg shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-[#00B4D8] transition-all">
            <Plus size={14} />
          </button>
          <button onClick={() => setScale(prev => Math.max(prev - 0.1, 0.4))} className="w-8 h-8 bg-white border border-[#E2E8F0] rounded-lg shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-[#00B4D8] transition-all">
            <Minus size={14} />
          </button>
          <button onClick={() => { setScale(0.85); setOffset({ x: 0, y: 0 }); setNodes(ORIGINAL_NODES); }} className="w-8 h-8 bg-white border border-[#E2E8F0] rounded-lg shadow-sm flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-[#00B4D8] transition-all">
            <RefreshCw size={14} />
          </button>
        </div>

        {/* Main Canvas Area */}
        <div
          ref={canvasRef}
          className="w-full h-full relative cursor-grab active:cursor-grabbing"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div 
            className="absolute inset-0 z-10 transition-transform duration-75 ease-out"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: 'center center' }}
          >
            {/* SVG Connector Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8" />
                </marker>
              </defs>
              {connections.map((conn, idx) => {
                const fromNode = nodes.find(n => n.id === conn.from);
                const toNode = nodes.find(n => n.id === conn.to);
                if (!fromNode || !toNode) return null;

                // Match with Port Y position (Bottom bar is roughly at node height 130 - 12)
                const outX = fromNode.x + 172; 
                const outY = fromNode.y + 118;
                const inX = toNode.x;
                const inY = toNode.y + 118;

                const cp1x = outX + (inX - outX) * 0.5;
                const cp1y = outY;
                const cp2x = outX + (inX - outX) * 0.5;
                const cp2y = inY;
                
                // Color logic based on downstream node status
                const connectorColor = 
                  toNode.status === 'critical' ? '#EF4444' : // Red for danger
                  toNode.status === 'warning' ? '#F59E0B' :  // Yellow for warning
                  '#22C55E';                                // Green for safe

                return (
                  <path 
                    key={`bezier-${idx}`}
                    d={`M ${outX} ${outY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${inX} ${inY}`}
                    fill="none"
                    stroke={connectorColor}
                    strokeWidth="2"
                    strokeDasharray="6 4"
                    className="animated-connector"
                    style={{ 
                      transition: 'stroke 500ms ease',
                      filter: `drop-shadow(0 0 2px ${connectorColor}44)` 
                    }}
                  />
                );
              })}
            </svg>

            {/* Pipeline Nodes */}
            {nodes.map((node, i) => (
              <motion.div
                key={node.id}
                drag
                dragMomentum={false}
                dragElastic={0}
                onDrag={(_, info) => handleNodeDrag(node.id, info)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute node-card w-[172px] h-[130px] bg-white rounded-[10px] border border-[#E2E8F0] shadow-[0_2px_12px_rgba(0,0,0,0.07)] flex flex-col pointer-events-auto cursor-move"
                style={{ left: node.x, top: node.y, borderTop: `3px solid ${node.color}`, x: 0, y: 0 }}
              >
                {/* Header Row */}
                <div className="h-[28px] px-3 flex items-center justify-between border-b border-[#F1F5F9]">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <span style={{ color: node.color }}>{node.icon}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.08em] whitespace-nowrap" style={{ color: node.color }}>
                      {node.title}
                    </span>
                  </div>
                  <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_4px_rgba(0,0,0,0.1)] ${
                    node.status === 'active' ? 'bg-[#22C55E] animate-pulse' : 
                    node.status === 'warning' ? 'bg-[#F59E0B]' : 'bg-[#EF4444]'
                  }`} />
                </div>

                {/* Content */}
                <div className="flex-1 p-3 flex flex-col justify-center">
                  <p className="text-[10px] font-medium text-[#94A3B8] uppercase tracking-wider mb-0.5">{node.metricName}</p>
                  <p className="text-[20px] font-medium text-[#0A1628] tracking-tight">
                    {node.prefix}<Counter value={node.value} decimals={node.value % 1 !== 0 ? 2 : 0} />{node.suffix}
                  </p>
                </div>

                {/* Ports Section */}
                <div className="h-[24px] px-2 flex items-center justify-between border-t border-[#F1F5F9] relative overflow-visible">
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full border border-[#CBD5E1] bg-white -ml-2.5 z-10 shadow-[0_0_4px_rgba(0,0,0,0.1)]" />
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full border border-[#CBD5E1] bg-white -mr-2.5 z-10 shadow-[0_0_4px_rgba(0,0,0,0.1)]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Task 5: Live ROI & MTTR Calculator */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#00B4D8] text-white rounded-lg glossy-icon" style={{ backgroundColor: '#00B4D8' }}>
            <Calculator size={18} />
          </div>
          <h2 className="text-[11px] font-black text-[#8B9BB4] uppercase tracking-[0.25em]">Interactive ROI & MTTR Engine</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
              <SliderInput 
                label="Digital AUM (₹ Crore)" 
                min={1000} 
                max={100000} 
                step={1000} 
                value={aum} 
                onChange={setAum} 
                suffix="Cr"
              />
              <SliderInput 
                label="Current API Failure Rate (%)" 
                min={0.5} 
                max={10} 
                step={0.1} 
                value={failureRate} 
                onChange={setFailureRate} 
                suffix="%"
              />
              <SliderInput 
                label="Average Incidents / Month" 
                min={1} 
                max={50} 
                step={1} 
                value={incidents} 
                onChange={setIncidents} 
              />
              <SliderInput 
                label="Ops Team Size" 
                min={1} 
                max={20} 
                step={1} 
                value={teamSize} 
                suffix="eng"
                onChange={setTeamSize} 
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="lg:col-span-4 bg-[#0A1628] rounded-2xl p-8 text-white relative overflow-hidden min-h-[300px] flex flex-col justify-between shadow-xl">
             <div className="absolute top-0 right-0 w-32 h-32 bg-[#00B4D8]/10 blur-[50px] -mr-16 -mt-16" />
             
             <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-black text-[#00B4D8] uppercase tracking-[0.2em] mb-1">Annual Leakage Prevented</p>
                  <p className="text-[32px] font-medium tracking-tight text-white">
                    ₹ <Counter value={leakagePrevented} decimals={2} /> Cr
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">ROI Multiple</p>
                    <p className="text-[18px] font-bold text-green-400">
                      <Counter value={roiMultiple} decimals={1} />x
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">MTTR Saved</p>
                    <p className="text-[18px] font-bold text-[#00B4D8]">
                      <Counter value={mttrImprovement} decimals={1} /> hrs
                    </p>
                  </div>
                </div>
             </div>

             <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-[11px] font-medium text-gray-400 leading-relaxed">
                   At <span className="text-white font-bold">₹ {aum.toLocaleString()} Cr</span> AUM with <span className="text-white font-bold">{failureRate}%</span> failure rate, Conduit delivers <span className="text-green-400 font-bold">{roiMultiple.toFixed(1)}x</span> ROI — protecting <span className="text-white font-bold">₹ {leakagePrevented.toFixed(2)} Cr</span> annually.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Hero Metrics: Fix 2 */}
      <div className="grid grid-cols-2 gap-4">
        {/* Metric Cards - already updated for glossy icons? No, let's add them here or later. I'll add them now. */}
        <div className="h-[140px] bg-[#0A1628] rounded-xl p-6 text-white relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-[#00B4D8] glossy-icon text-white" style={{ backgroundColor: '#00B4D8' }}>
              <ShieldCheck size={20} />
            </div>
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#00B4D8]">AUM PROTECTED (MTD)</span>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-[36px] font-medium tracking-tighter leading-none">₹ 19.8 Cr</p>
            <div className="flex items-center gap-1 text-green-400 text-[11px] font-bold">
              <ArrowUpRight size={14} />
              <span>+12.4%</span>
            </div>
          </div>
        </div>

        <div className="h-[140px] bg-white rounded-xl p-6 border border-[#E2E8F0] shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="p-2 rounded-lg bg-[#EF4444] glossy-icon text-white" style={{ backgroundColor: '#EF4444' }}>
              <ShieldAlert size={20} />
            </div>
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#8B9BB4]">AUM LOST (MTD)</span>
          </div>
          <div className="flex items-end justify-between">
            <p className="text-[36px] font-medium tracking-tighter leading-none text-[#0A1628]">₹ 5.1 Cr</p>
            <div className="flex items-center gap-1 text-red-500 text-[11px] font-bold">
              <TrendingUp size={14} />
              <span>+8.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Task 2: Financial Impact Trend (Modern Area Chart) */}
      <div className="bg-white rounded-[12px] border border-[#E2E8F0] p-6 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div className="flex flex-col gap-1">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Financial Impact Trend</h3>
          </div>
          <div className="flex gap-3">
             <div className="px-3 h-6 rounded-full bg-[#00B4D8]/15 text-[#00B4D8] text-[10px] font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00B4D8]" />
                AUM Protected
             </div>
             <div className="px-3 h-6 rounded-full bg-[#EF4444]/15 text-[#EF4444] text-[10px] font-bold flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444]" />
                AUM Lost
             </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={REVENUE_TRENDS} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorProtected" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00B4D8" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#00B4D8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} 
                dy={15} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fontWeight: 700, fill: '#64748B' }} 
              />
              <RechartsTooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: '#E2E8F0', strokeWidth: 1 }}
              />
              <Area 
                type="monotone" 
                dataKey="protected" 
                stroke="#00B4D8" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorProtected)" 
                dot={<CustomDot color="#00B4D8" />}
                activeDot={{ r: 6, stroke: '#FFFFFF', strokeWidth: 2, fill: '#00B4D8' }}
              />
              <Area 
                type="monotone" 
                dataKey="leakage" 
                stroke="#EF4444" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorLost)" 
                dot={<CustomDot color="#EF4444" />}
                activeDot={{ r: 6, stroke: '#FFFFFF', strokeWidth: 2, fill: '#EF4444' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes dash-flow {
          to { stroke-dashoffset: -20; }
        }
        .animated-connector {
          animation: dash-flow 1.2s linear infinite;
        }
        @keyframes glow-pulse {
          0%, 100% { filter: brightness(1); opacity: 1; }
          50% { filter: brightness(1.5); opacity: 0.8; }
        }
        .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
        .glossy-icon {
          background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 100%);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.1), 0 4px 12px rgba(0,0,0,0.1);
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}} />
    </div>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-[#E2E8F0] p-4 rounded-lg shadow-xl animate-scale-in">
        <p className="text-[11px] font-black text-[#94A3B8] uppercase tracking-[0.1em] mb-2">{label}</p>
        <div className="space-y-1">
          <div className="flex justify-between items-center gap-8">
            <span className="text-[12px] font-bold text-[#00B4D8]">AUM Protected</span>
            <span className="text-[14px] font-black text-[#0A1628]">₹ {payload[0].value.toFixed(2)} Cr</span>
          </div>
          <div className="flex justify-between items-center gap-8">
            <span className="text-[12px] font-bold text-[#EF4444]">AUM Lost</span>
            <span className="text-[14px] font-black text-[#0A1628]">₹ {payload[1].value.toFixed(2)} Cr</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const CustomDot = (props: any) => {
  const { cx, cy, color } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={4} fill={color} stroke="#FFFFFF" strokeWidth={2} className="shadow-sm" />
    </g>
  );
};

const CanvasAlert: React.FC<{ type: 'warning' | 'danger', title: string, desc: string, icon: React.ReactNode }> = ({ type, title, desc, icon }) => (
  <motion.div 
    initial={{ x: 50, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    className={`p-3 rounded-lg border flex items-center gap-3 backdrop-blur-md shadow-lg ${
      type === 'warning' 
        ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' 
        : 'bg-red-500/10 border-red-500/20 text-red-500'
    }`}
  >
    <div className={`p-1.5 rounded-[4px] glossy-icon ${type === 'warning' ? 'bg-amber-500' : 'bg-red-500'} text-white`}>
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black uppercase tracking-[0.15em] leading-none mb-0.5">{title}</p>
      <p className="text-[11px] font-medium text-white/80 leading-none">{desc}</p>
    </div>
  </motion.div>
);

const SliderInput: React.FC<{ label: string, min: number, max: number, step: number, value: number, suffix?: string, onChange: (v: number) => void }> = ({ label, min, max, step, value, suffix, onChange }) => (
  <div className="space-y-4">
    <div className="flex justify-between items-end">
      <label className="text-[10px] font-black text-[#8B9BB4] uppercase tracking-widest">{label}</label>
      <span className="px-2 py-0.5 bg-gray-100 rounded text-[11px] font-black text-[#0A1628]">
        {value.toLocaleString()}{suffix}
      </span>
    </div>
    <input 
      type="range" 
      min={min} 
      max={max} 
      step={step} 
      value={value} 
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-[#00B4D8]"
    />
  </div>
);

const Counter: React.FC<{ value: number, decimals?: number, isString?: boolean, stringVal?: string }> = ({ value, decimals = 0, isString, stringVal }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isString) return;
    let start = displayValue;
    const end = value;
    const duration = 800;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutQuad = (t: number) => t * (2 - t);
      const current = start + (end - start) * easeOutQuad(progress);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [value, isString]);

  if (isString) return <span>{stringVal}</span>;
  return <span>{displayValue.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}</span>;
};

export default RevenueShield;
