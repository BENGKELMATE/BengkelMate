import React from 'react';
import { Tool, ToolStatus, ToolCondition } from '../types';

interface ToolCardProps {
  tool: Tool;
  onClick: (tool: Tool) => void;
  onScanClick: (e: React.MouseEvent, tool: Tool) => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, onClick, onScanClick }) => {
  const getStatusColor = (status: ToolStatus) => {
    switch (status) {
      case ToolStatus.AVAILABLE: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case ToolStatus.LOANED: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case ToolStatus.MAINTENANCE: return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case ToolStatus.DAMAGED: return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-slate-700 text-slate-300';
    }
  };

  const getConditionColor = (condition: ToolCondition) => {
    switch (condition) {
      case ToolCondition.GOOD: return 'text-emerald-400';
      case ToolCondition.FAIR: return 'text-orange-400';
      case ToolCondition.POOR: return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div 
      onClick={() => onClick(tool)}
      className="group bg-[#1e232e] rounded-xl overflow-hidden shadow-lg border border-slate-700/50 hover:border-orange-500/50 transition-all cursor-pointer flex flex-col relative"
    >
      <div className="relative h-48 overflow-hidden shrink-0">
        <img 
          src={tool.imageUrl} 
          alt={tool.name} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter contrast-125" 
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e232e] to-transparent opacity-80"></div>
        
        <div className="absolute top-2 right-2 z-10">
            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${getStatusColor(tool.status)}`}>
            {tool.status}
            </span>
        </div>
        
        <div className="absolute bottom-3 left-4 right-4">
           <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-1">{tool.category}</p>
           <p className="text-white font-bold text-lg leading-tight group-hover:text-orange-400 transition-colors font-mono">{tool.name}</p>
        </div>
      </div>
      
      <div className="p-4 pt-2 flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-end mb-4 border-b border-slate-700/50 pb-3">
            <div>
                 <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Brand</p>
                 <p className="text-sm text-slate-300 font-medium">{tool.brand}</p>
            </div>
            <div className="text-right">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Loc</p>
                <p className="text-sm text-slate-300 font-medium">{tool.location}</p>
            </div>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getConditionColor(tool.condition).replace('text-', 'bg-')}`}></div>
            <span className={`text-xs font-bold uppercase ${getConditionColor(tool.condition)}`}>{tool.condition}</span>
          </div>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onScanClick(e, tool);
            }}
            className="text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            AI SCAN
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToolCard;