import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { 
  Network, 
  Filter, 
  Search, 
  Info, 
  ArrowRight,
  ShieldCheck,
  Zap,
  DollarSign,
  Activity,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { API_NODES, SLA_ATTRIBUTIONS } from '../constants.tsx';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: string;
  health: number;
  volume: string;
  responseTime: string;
  successRate: string;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string;
  target: string;
  value: number;
  health: number;
}

const PartnerNetworkGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [viewMode, setViewMode] = useState<'topology' | 'list'>('topology');

  // Enterprise Partner Nodes
  const nodes: Node[] = [
    { id: 'bank-prod', name: 'Primary FIP Gateway', type: 'BANK', health: 98, volume: '4.2M / day', responseTime: '124ms', successRate: '99.92%' },
    { id: 'bank-sec', name: 'Secondary FIP Node', type: 'BANK', health: 64, volume: '1.8M / day', responseTime: '485ms', successRate: '92.40%' },
    { id: 'aa-eco', name: 'Ecosystem AA Hub', type: 'AGGREGATOR', health: 82, volume: '8.4M / day', responseTime: '210ms', successRate: '98.15%' },
    { id: 'aa-ext', name: 'External AA Bridge', type: 'AGGREGATOR', health: 91, volume: '2.1M / day', responseTime: '185ms', successRate: '99.10%' },
    { id: 'fiu-amc', name: 'Strategic AMC FIU', type: 'AMC', health: 95, volume: '0.9M / day', responseTime: '150ms', successRate: '99.98%' },
    { id: 'fiu-fin', name: 'Lending Fintech FIU', type: 'FINTECH', health: 88, volume: '3.2M / day', responseTime: '190ms', successRate: '98.90%' },
    { id: 'fiu-wth', name: 'Wealth Platform FIU', type: 'FINTECH', health: 92, volume: '1.4M / day', responseTime: '165ms', successRate: '99.25%' },
  ];

  const links: Link[] = [
    { source: 'bank-prod', target: 'aa-eco', value: 5, health: 98 },
    { source: 'bank-sec', target: 'aa-eco', value: 8, health: 64 },
    { source: 'aa-eco', target: 'fiu-amc', value: 4, health: 82 },
    { source: 'aa-eco', target: 'fiu-fin', value: 6, health: 82 },
    { source: 'aa-ext', target: 'fiu-wth', value: 7, health: 91 },
    { source: 'bank-prod', target: 'aa-ext', value: 3, health: 98 },
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;
    const margin = 60; // Prevent nodes from touching edges

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(160))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2).strength(0.08))
      .force('collision', d3.forceCollide().radius(d => {
        const r = d.type === 'AGGREGATOR' ? 40 : (d.id === 'bank-prod' ? 32 : 24);
        return r + 30;
      }));

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', d => {
        const source = nodes.find(n => n.id === (typeof d.source === 'string' ? d.source : (d.source as any).id));
        const target = nodes.find(n => n.id === (typeof d.target === 'string' ? d.target : (d.target as any).id));
        const worseHealth = Math.min(source?.health || 100, target?.health || 100);
        return worseHealth < 80 ? '#EF4444' : worseHealth < 95 ? '#FCA5A5' : '#86EFAC';
      })
      .attr('stroke-width', d => 1.5 + (d.value / 10) * 2.5);

    const nodeG = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => setSelectedNode(d));

    // Nodes: Solid filled circles
    nodeG.append('circle')
      .attr('r', d => d.type === 'AGGREGATOR' ? 40 : (d.id === 'bank-prod' ? 32 : 24))
      .attr('fill', d => d.health > 95 ? '#22C55E' : d.health >= 80 ? '#F59E0B' : '#EF4444')
      .attr('class', 'cursor-pointer transition-transform hover:scale-110');

    // Label below node
    nodeG.append('text')
      .attr('dy', d => (d.type === 'AGGREGATOR' ? 40 : (d.id === 'bank-prod' ? 32 : 24)) + 16)
      .attr('text-anchor', 'middle')
      .attr('fill', '#374151')
      .attr('font-size', '10px')
      .attr('font-weight', '700')
      .attr('class', 'uppercase tracking-[0.06em] pointer-events-none')
      .text(d => d.name);

    simulation.on('tick', () => {
      nodes.forEach(d => {
        const r = d.type === 'AGGREGATOR' ? 40 : (d.id === 'bank-prod' ? 32 : 24);
        (d as any).x = Math.max(margin + r, Math.min(width - margin - r, (d as any).x || 0));
        (d as any).y = Math.max(margin + r, Math.min(height - margin - r, (d as any).y || 0));
      });

      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      nodeG
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }

    return () => simulation.stop();
  }, [nodes, links]);

  return (
    <div className="flex h-full gap-8 animate-fade-in pb-10">
      <div className="flex-1 flex flex-col space-y-6">
        <div className="flex justify-end items-start">
          <div className="flex gap-4">
             <div className="flex bg-gray-100 p-1 rounded-xl">
                <button 
                  onClick={() => setViewMode('topology')}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${viewMode === 'topology' ? 'bg-white text-[#0A1628] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  Topology View
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${viewMode === 'list' ? 'bg-white text-[#0A1628] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>
                  List View
                </button>
             </div>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-[48px] border border-gray-200 relative overflow-hidden shadow-sm flex flex-col">
           {viewMode === 'topology' ? (
             <>
               <div className="absolute inset-0 z-0 opacity-20" style={{ 
                  backgroundImage: 'radial-gradient(circle, #E2E8F0 1px, transparent 1px)', 
                  backgroundSize: '32px 32px'
               }} />
               
               <svg ref={svgRef} className="w-full h-full relative z-10" />
               
               {/* Legend Overlay */}
               <div className="absolute top-8 right-8 bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-gray-100 space-y-4 shadow-xl z-20">
                  <div className="flex items-center gap-3">
                     <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                     <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Compliant (SLA {'>'} 95%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                     <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Degraded (SLA 80-95%)</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
                     <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Critical (SLA {'<'} 80%)</span>
                  </div>
               </div>
             </>
           ) : (
             <div className="flex-1 overflow-y-auto p-10 animate-fade-in">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
                    <h3 className="text-[12px] font-black text-gray-400 uppercase tracking-widest">Active Partner Ecosystem ({nodes.length})</h3>
                    <div className="flex items-center gap-2">
                       <Search size={14} className="text-gray-400" />
                       <input type="text" placeholder="Filter partners..." className="bg-transparent border-none outline-none text-[12px] font-bold text-[#0A1628]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    {nodes.map(node => (
                      <div 
                        key={node.id} 
                        onClick={() => setSelectedNode(node)}
                        className={`p-6 rounded-3xl border transition-all cursor-pointer flex items-center justify-between group ${
                          selectedNode?.id === node.id ? 'border-[#00B4D8] bg-[#00B4D8]/5' : 'border-gray-100 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-6">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white ${
                            node.health > 95 ? 'bg-green-500' : node.health >= 80 ? 'bg-amber-500' : 'bg-red-500'
                          }`}>
                            <Network size={24} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">{node.type}</p>
                            <h4 className="text-[18px] font-bold text-[#0A1628] leading-tight">{node.name}</h4>
                          </div>
                        </div>
                        <div className="flex items-center gap-12">
                           <div className="text-right">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Volume</p>
                              <p className="text-[14px] font-bold text-[#0A1628]">{node.volume}</p>
                           </div>
                           <div className="text-right">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Health Indicator</p>
                              <p className={`text-[14px] font-black ${node.health > 95 ? 'text-green-500' : node.health >= 80 ? 'text-amber-500' : 'text-red-500'}`}>{node.health}%</p>
                           </div>
                           <ArrowRight className={`text-gray-300 transition-transform ${selectedNode?.id === node.id ? 'translate-x-2 text-[#00B4D8]' : 'group-hover:translate-x-2'}`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>
           )}
        </div>
      </div>

      {/* Side Panel: Partner Intelligence: Fix 2: 380px wide */}
      <div className="w-[380px] flex flex-col gap-6">
        {selectedNode ? (
          <div className="flex-1 bg-white rounded-[40px] border border-gray-200 shadow-xl overflow-hidden flex flex-col animate-slide-in">
             <div className="p-8 border-b border-gray-100 bg-gray-50/50">
               <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                    selectedNode.health > 85 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {selectedNode.type}
                  </span>
                  <button onClick={() => setSelectedNode(null)} className="p-2 hover:bg-white rounded-xl transition-colors">
                     <ArrowRight size={20} className="text-gray-300" />
                  </button>
               </div>
               <h3 className="text-2xl font-black text-[#0A1628] leading-tight mb-2 tracking-tighter">{selectedNode.name}</h3>
               <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${selectedNode.health > 85 ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Current SLA Index: {selectedNode.health}%</span>
               </div>
             </div>

             <div className="p-8 flex-1 overflow-y-auto space-y-8">
                <div className="grid grid-cols-2 gap-4">
                   <MetricBox icon={<Activity size={16} />} label="TX Volume" value={selectedNode.volume} />
                   <MetricBox icon={<Clock size={16} />} label="Avg Latency" value={selectedNode.responseTime} />
                   <MetricBox icon={<CheckCircle2 size={16} />} label="Success Rate" value={selectedNode.successRate} />
                   <MetricBox icon={<AlertCircle size={16} />} label="FailGuard" value={selectedNode.health > 85 ? 'Stable' : 'High Risk'} highlight={selectedNode.health <= 85} />
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-100">
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Remediation Tunnel</p>
                   <div className="p-4 bg-[#0A1628] rounded-3xl text-white">
                      <div className="flex justify-between items-center mb-4">
                         <span className="text-[9px] font-black uppercase tracking-widest text-[#00B4D8]">Circuit Breaker</span>
                         <span className="text-[9px] font-black uppercase tracking-widest text-green-400">Ready</span>
                      </div>
                      <p className="text-sm font-bold mb-4 leading-relaxed">Verified failover path exists via Secondary FIP Node. MTTR estim: 12s.</p>
                      <button className="w-full py-4 bg-[#00B4D8] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0096b4] transition-all">
                        Initialize failover
                      </button>
                   </div>
                </div>

                <div className="space-y-3">
                   <button className="w-full py-4 border border-gray-200 text-[#0A1628] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                      View Raw Trace Logs
                   </button>
                   <button className="w-full py-4 border border-gray-200 text-[#0A1628] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                      Escalate to CISO Portal
                   </button>
                </div>
             </div>
          </div>
        ) : (
          <div className="flex-1 bg-gray-50 rounded-[40px] border border-dashed border-gray-300 flex flex-col items-center justify-center p-12 text-center opacity-60">
             <div className="p-6 bg-white rounded-full shadow-sm mb-6"><Network size={48} className="text-gray-300" /></div>
             <p className="text-sm font-black text-[#0A1628] uppercase tracking-tighter mb-2">Select a Node</p>
             <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Click on any partner node to view detailed ecosystem intelligence</p>
          </div>
        )}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .critical-node {
          animation: pulse-scale 1.5s ease-in-out infinite;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .critical-node {
            animation: none;
          }
        }
      `}} />
    </div>
  );
};

const MetricBox = ({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) => (
  <div className={`p-4 rounded-3xl border transition-all ${highlight ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
     <div className="flex items-center gap-2 text-gray-400 mb-2">
        {icon}
        <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
     </div>
     <p className={`text-xs font-black uppercase tracking-tight ${highlight ? 'text-red-600' : 'text-[#0A1628]'}`}>{value}</p>
  </div>
);

export default PartnerNetworkGraph;
