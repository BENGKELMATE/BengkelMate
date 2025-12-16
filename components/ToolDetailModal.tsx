import React from 'react';
import { Tool, ToolCondition, ToolStatus } from '../types';

interface ToolDetailModalProps {
  tool: Tool;
  onClose: () => void;
  onBorrow: (tool: Tool) => void;
  onReportIssue: (tool: Tool) => void;
}

const ToolDetailModal: React.FC<ToolDetailModalProps> = ({ tool, onClose, onBorrow, onReportIssue }) => {
  
  // Dummy History Data for UI visualization
  const history = [
    { name: 'Joko Anwar', date: '12 Mei 2024', status: 'Returned' },
    { name: 'Budi Santoso', date: '05 Mei 2024', status: 'Returned' },
    { name: 'Asep Knalpot', date: '28 Apr 2024', status: 'Returned' },
  ];

  const isAvailable = tool.status === ToolStatus.AVAILABLE;
  const isGood = tool.condition === ToolCondition.GOOD;

  const getButtonText = () => {
    switch (tool.status) {
      case ToolStatus.AVAILABLE:
        return 'PINJAM ALAT INI';
      case ToolStatus.LOANED:
        return 'SEDANG DIPINJAM';
      case ToolStatus.MAINTENANCE:
        return 'SEDANG PERBAIKAN';
      case ToolStatus.DAMAGED:
        return 'ALAT RUSAK';
      default:
        return 'TIDAK TERSEDIA';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Main Card / Screen */}
      <div className="relative bg-[#0f1115] w-full max-w-2xl h-full sm:h-auto sm:max-h-[90vh] sm:rounded-2xl overflow-hidden flex flex-col shadow-2xl border border-slate-700">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-orange-600 transition-colors backdrop-blur-md"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* 1. Foto Alat Besar */}
        <div className="relative h-72 sm:h-80 shrink-0">
          <img 
            src={tool.imageUrl} 
            alt={tool.name} 
            className="w-full h-full object-cover filter brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1115] via-transparent to-transparent"></div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <span className="inline-block px-2 py-1 bg-orange-600 text-black text-xs font-bold tracking-widest uppercase mb-2 rounded-sm">
              {tool.category}
            </span>
            <h2 className="text-3xl font-bold text-white leading-tight font-mono tracking-tighter uppercase">
              {tool.name}
            </h2>
            <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              {tool.brand} — {tool.location}
            </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* 2. Status Kondisi */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border ${isGood ? 'bg-emerald-900/10 border-emerald-500/30' : 'bg-red-900/10 border-red-500/30'}`}>
              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Condition</p>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isGood ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className={`text-xl font-bold ${isGood ? 'text-emerald-400' : 'text-red-500'}`}>
                  {tool.condition.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-700 bg-slate-800/50">
               <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Status</p>
               <span className={`text-xl font-bold ${isAvailable ? 'text-blue-400' : 'text-orange-400'}`}>
                 {tool.status}
               </span>
            </div>
          </div>

          <div className="space-y-2">
             <p className="text-sm text-slate-400 leading-relaxed border-l-2 border-slate-700 pl-4 italic">
               "{tool.description || 'Professional grade workshop tool meant for heavy duty usage. Please handle with care and return to the designated location after use.'}"
             </p>
          </div>

          {/* 3. Riwayat Peminjaman (History List) */}
          <div>
            <h3 className="text-white font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wider">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent History
            </h3>
            <div className="bg-[#151921] rounded-xl border border-slate-800 overflow-hidden">
              {history.map((item, idx) => (
                <div key={idx} className="p-3 border-b border-slate-800 last:border-0 flex justify-between items-center hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-slate-300 font-bold">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm text-slate-200 font-medium">{item.name}</p>
                      <p className="text-xs text-slate-500">{item.date}</p>
                    </div>
                  </div>
                  <span className="text-xs text-emerald-500 font-medium bg-emerald-900/20 px-2 py-1 rounded">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Action Buttons (Footer) */}
        <div className="p-4 border-t border-slate-800 bg-[#0f1115] sticky bottom-0">
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => onBorrow(tool)}
              disabled={!isAvailable}
              className={`w-full py-4 rounded-lg font-black text-lg tracking-widest uppercase transition-all transform active:scale-[0.98] ${
                isAvailable 
                ? 'bg-orange-600 hover:bg-orange-500 text-black shadow-[0_0_20px_rgba(234,88,12,0.3)]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              {getButtonText()}
            </button>
            
            <button 
              onClick={() => onReportIssue(tool)}
              className="w-full py-3 rounded-lg font-bold text-sm text-red-400 border border-red-900/50 hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              LAPORKAN RUSAK
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ToolDetailModal;