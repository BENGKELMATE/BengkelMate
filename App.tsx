import React, { useState } from 'react';
import ToolCard from './components/ToolCard';
import GeminiScanner from './components/GeminiScanner';
import ToolDetailModal from './components/ToolDetailModal';
import ProfileModal from './components/ProfileModal';
import { MOCK_TOOLS, MOCK_LOANS, MOCK_USERS } from './constants';
import { Tool, Loan } from './types';

export default function App() {
  const [tools, setTools] = useState<Tool[]>(MOCK_TOOLS);
  const [showScanner, setShowScanner] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedToolForScan, setSelectedToolForScan] = useState<Tool | undefined>();
  const [selectedToolForDetail, setSelectedToolForDetail] = useState<Tool | null>(null);
  const [activeTab, setActiveTab] = useState<'inventory' | 'loans'>('inventory');

  const handleScanClick = (e: React.MouseEvent, tool: Tool) => {
    setSelectedToolForScan(tool);
    setShowScanner(true);
  };

  const handleToolClick = (tool: Tool) => {
    setSelectedToolForDetail(tool);
  };

  const handleBorrow = (tool: Tool) => {
    const confirmed = window.confirm(`Konfirmasi peminjaman: ${tool.name}?`);
    if (confirmed) {
      setTools(prev => prev.map(t => 
        t.id === tool.id ? { ...t, status: 'Loaned' as any } : t
      ));
      // Close modal after action
      setSelectedToolForDetail(null);
      alert(`${tool.name} berhasil dipinjam!`);
    }
  };

  const handleReportIssue = (tool: Tool) => {
    alert(`Fitur Lapor Kerusakan untuk ${tool.name} akan segera hadir.`);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-200 pb-20 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#0f1115]/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black italic tracking-tighter text-white">
              BENGKEL<span className="text-orange-600">MATE</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Workshop OS v1.0</p>
          </div>
          
          <button 
            onClick={handleProfileClick}
            className="flex items-center gap-3 hover:bg-slate-800 p-2 -mr-2 rounded-xl transition-all border border-transparent hover:border-slate-700 group focus:outline-none focus:ring-2 focus:ring-orange-500/50"
          >
             <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors">{MOCK_USERS[1].name}</p>
                <p className="text-xs text-slate-500 font-mono uppercase">{MOCK_USERS[1].role}</p>
             </div>
             <div className="relative">
               <img src={MOCK_USERS[1].avatarUrl} alt="Profile" className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 object-cover group-hover:border-orange-500/50 transition-colors" />
               <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0f1115]"></div>
             </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        
        {/* Navigation Tabs */}
        <div className="flex gap-6 mb-8 border-b border-slate-800">
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors relative ${
              activeTab === 'inventory' ? 'text-orange-500' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Inventory
            {activeTab === 'inventory' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
            )}
          </button>
          <button 
            onClick={() => setActiveTab('loans')}
            className={`pb-3 text-sm font-bold uppercase tracking-wider transition-colors relative ${
              activeTab === 'loans' ? 'text-orange-500' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Active Loans
            {activeTab === 'loans' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-500"></span>
            )}
          </button>
        </div>

        {activeTab === 'inventory' ? (
          <>
            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-[#1e232e] p-4 rounded-lg border border-slate-800">
                <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Total Tools</p>
                <p className="text-3xl font-black text-white mt-1 font-mono">{tools.length}</p>
              </div>
              <div className="bg-[#1e232e] p-4 rounded-lg border border-slate-800">
                <p className="text-emerald-500/80 text-[10px] uppercase font-bold tracking-widest">Available</p>
                <p className="text-3xl font-black text-emerald-500 mt-1 font-mono">
                  {tools.filter(t => t.status === 'Available').length}
                </p>
              </div>
              <div className="bg-[#1e232e] p-4 rounded-lg border border-slate-800">
                <p className="text-blue-500/80 text-[10px] uppercase font-bold tracking-widest">On Loan</p>
                <p className="text-3xl font-black text-blue-500 mt-1 font-mono">
                  {tools.filter(t => t.status === 'Loaned').length}
                </p>
              </div>
              <div className="bg-[#1e232e] p-4 rounded-lg border border-slate-800">
                <p className="text-orange-500/80 text-[10px] uppercase font-bold tracking-widest">Issues</p>
                <p className="text-3xl font-black text-orange-500 mt-1 font-mono">
                  {tools.filter(t => t.status === 'Maintenance' || t.status === 'Damaged').length}
                </p>
              </div>
            </div>

            {/* Tool Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {tools.map(tool => (
                <ToolCard 
                  key={tool.id} 
                  tool={tool} 
                  onClick={handleToolClick}
                  onScanClick={handleScanClick}
                />
              ))}
            </div>
          </>
        ) : (
          /* Active Loans List */
          <div className="space-y-4">
             {MOCK_LOANS.map(loan => {
               const tool = MOCK_TOOLS.find(t => t.id === loan.toolId);
               return (
                 <div key={loan.id} className="bg-[#1e232e] rounded-lg p-4 border border-slate-800 flex justify-between items-center hover:border-orange-500/30 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-800 rounded overflow-hidden shrink-0 border border-slate-700">
                         <img src={tool?.imageUrl} alt={tool?.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white uppercase tracking-wide">{tool?.name}</h3>
                        <p className="text-xs text-slate-400 font-mono mt-1">
                          <span className="text-orange-500">USER:</span> {loan.userName}
                        </p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-xs font-bold uppercase tracking-wider rounded text-white transition-all">
                      Return
                    </button>
                 </div>
               );
             })}
          </div>
        )}
      </main>

      {/* Floating Action Button for Scan */}
      <button 
        onClick={() => handleScanClick(null as any, null as any)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-orange-600 hover:bg-orange-500 rounded-none transform rotate-45 flex items-center justify-center text-black shadow-[0_0_30px_rgba(234,88,12,0.4)] transition-all hover:scale-110 hover:rotate-90 z-40 border-2 border-black"
      >
        <div className="transform -rotate-45">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </button>

      {/* Modals */}
      {showScanner && (
        <GeminiScanner 
          onClose={() => setShowScanner(false)} 
          selectedTool={selectedToolForScan}
        />
      )}

      {selectedToolForDetail && (
        <ToolDetailModal 
          tool={selectedToolForDetail}
          onClose={() => setSelectedToolForDetail(null)}
          onBorrow={handleBorrow}
          onReportIssue={handleReportIssue}
        />
      )}

      {showProfile && (
        <ProfileModal 
          user={MOCK_USERS[1]} 
          onClose={() => setShowProfile(false)} 
        />
      )}
    </div>
  );
}