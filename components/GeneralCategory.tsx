import React from 'react';
import { Package, Info, ArrowRight } from 'lucide-react';

const GeneralCategory: React.FC = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-2xl font-black text-[#0A1628] uppercase tracking-tighter">General Category</h2>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-bold">Standard Operations & General Resources</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6">
            <Package size={24} />
          </div>
          <h3 className="text-lg font-black text-[#0A1628] mb-2 uppercase tracking-tight">Resource Management</h3>
          <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6">
            Access general operational resources, system documentation, and standard operating procedures for the Conduit platform.
          </p>
          <button className="flex items-center gap-2 text-[10px] font-black text-[#00B4D8] uppercase tracking-widest hover:underline">
            View Resources <ArrowRight size={14} />
          </button>
        </div>

        <div className="bg-white rounded-[32px] p-8 border border-gray-200 shadow-sm">
          <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 mb-6">
            <Info size={24} />
          </div>
          <h3 className="text-lg font-black text-[#0A1628] mb-2 uppercase tracking-tight">System Information</h3>
          <p className="text-sm text-gray-400 font-medium leading-relaxed mb-6">
            Unified view of system-wide configurations, version history, and general organizational metadata relevant to API ops.
          </p>
          <button className="flex items-center gap-2 text-[10px] font-black text-[#00B4D8] uppercase tracking-widest hover:underline">
            System Specs <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="bg-[#0A1628] rounded-[32px] p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-3xl font-black tracking-tighter mb-4">Operational Excellence</h3>
          <p className="text-white/60 max-w-xl text-lg mb-8">
            Conduit ensures that even general operations are monitored with the same rigor as critical financial paths.
          </p>
          <div className="flex gap-4">
            <div className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold uppercase tracking-widest">Efficiency: 99.4%</div>
            <div className="px-4 py-2 bg-white/10 rounded-lg text-xs font-bold uppercase tracking-widest">Uptime: 100%</div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00B4D8]/20 blur-[100px]" />
      </div>
    </div>
  );
};

export default GeneralCategory;
