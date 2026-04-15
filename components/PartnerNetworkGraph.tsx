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
  DollarSign
} from 'lucide-react';
import { API_NODES, SLA_ATTRIBUTIONS } from '../constants.tsx';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: string;
  health: number;
  volume: number;
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

  // Mock graph data
  const nodes: Node[] = [
    { id: 'bank-1', name: 'Primary FIP', type: 'BANK', health: 98, volume: 100 },
    { id: 'bank-2', name: 'Partner Bank', type: 'BANK', health: 64, volume: 150 },
    { id: 'aa-1', name: 'Ecosystem AA', type: 'AA', health: 82, volume: 80 },
    { id: 'aa-2', name: 'Secondary AA', type: 'AA', health: 91, volume: 70 },
    { id: 'fiu-1', name: 'Asset FIU', type: 'AMC', health: 95, volume: 60 },
    { id: 'fiu-2', name: 'Lending FIU', type: 'FINTECH', health: 88, volume: 90 },
    { id: 'fiu-3', name: 'Wealth FIU', type: 'FINTECH', health: 92, volume: 110 },
  ];

  const links: Link[] = [
    { source: 'bank-1', target: 'aa-1', value: 5, health: 98 },
    { source: 'bank-2', target: 'aa-1', value: 8, health: 64 },
    { source: 'aa-1', target: 'fiu-1', value: 4, health: 82 },
    { source: 'aa-1', target: 'fiu-2', value: 6, health: 82 },
    { source: 'aa-2', target: 'fiu-3', value: 7, health: 91 },
    { source: 'bank-1', target: 'aa-2', value: 3, health: 98 },
  ];

  useEffect(() => {
    if (!svgRef.current) return;

    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const simulation = d3.forceSimulation<Node>(nodes)
      .force('link', d3.forceLink<Node, Link>(links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-500))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter().append('line')
      .attr('stroke', d => d.health > 85 ? '#22C55E' : d.health > 70 ? '#F59E0B' : '#EF4444')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', d => Math.sqrt(d.value) * 2);

    const node = svg.append('g')
      .selectAll('g')
      .data(nodes)
      .enter().append('g')
      .call(d3.drag<SVGGElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))
      .on('click', (event, d) => setSelectedNode(d));

    node.append('circle')
      .attr('r', d => Math.sqrt(d.volume) * 3)
      .attr('fill', d => d.health > 85 ? '#22C55E' : d.health > 70 ? '#F59E0B' : '#EF4444')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .attr('class', 'cursor-pointer transition-all hover:scale-110');

    node.append('text')
      .attr('dy', d => Math.sqrt(d.volume) * 3 + 15)
      .attr('text-anchor', 'middle')
      .attr('fill', '#0A1628')
      .attr('font-size', '10px')
      .attr('font-weight', '900')
      .attr('class', 'uppercase tracking-widest pointer-events-none')
      .text(d => d.name);

    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node
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
    <div className="flex h-full gap-8 animate-fade-in">
      <div className="flex-1 flex flex-col space-y-6">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-black text-[#0A1628] uppercase tracking-tighter">Partner Map</h2>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Ecosystem Relationship & Health Intelligence</p>
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input 
                type="text" 
                placeholder="Search Partner..." 
                className="bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs font-bold outline-none focus:border-[#00B4D8] transition-all"
              />
            </div>
            <button className="bg-white border border-gray-200 p-2 rounded-xl text-gray-400 hover:text-[#00B4D8] transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-[40px] border border-gray-200 relative overflow-hidden shadow-sm">
          <svg ref={svgRef} className="w-full h-full" />
          
          {/* Legend */}
          <div className="absolute bottom-8 left-8 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-gray-100 space-y-2">
            <LegendItem color="#22C55E" label="High Compliance" />
            <LegendItem color="#F59E0B" label="Moderate Risk" />
            <LegendItem color="#EF4444" label="Chronic Breach" />
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {selectedNode && (
        <div className="w-[350px] bg-white rounded-[32px] border border-gray-200 flex flex-col shadow-xl animate-slide-in">
          <div className="p-8 border-b border-gray-100 flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{selectedNode.type}</p>
              <h3 className="text-xl font-black text-[#0A1628]">{selectedNode.name}</h3>
            </div>
            <button 
              onClick={() => setSelectedNode(null)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <ArrowRight size={20} className="text-gray-400" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <StatItem icon={<ShieldCheck size={14} />} label="SLA Index" value={`${selectedNode.health}%`} color={selectedNode.health > 85 ? 'text-green-500' : 'text-red-500'} />
              <StatItem icon={<Zap size={14} />} label="FailGuard" value="Low Risk" color="text-green-500" />
              <StatItem icon={<DollarSign size={14} />} label="Impact" value="₹ 0.8 Cr" color="text-[#0A1628]" />
              <StatItem icon={<Network size={14} />} label="Volume" value="1.2M Calls" color="text-[#0A1628]" />
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Info size={14} />
                Partner Profile
              </h4>
              <div className="space-y-4">
                <button className="w-full py-4 bg-[#0A1628] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 transition-all">
                  View Trace Evidence
                </button>
                <button className="w-full py-4 border border-gray-200 text-[#0A1628] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all">
                  Send Escalation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const LegendItem = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-2">
    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
  </div>
);

const StatItem = ({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) => (
  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
    <div className="flex items-center gap-2 text-gray-400 mb-1">
      {icon}
      <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
    </div>
    <p className={`text-sm font-black ${color}`}>{value}</p>
  </div>
);

export default PartnerNetworkGraph;
