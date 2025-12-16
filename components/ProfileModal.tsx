import React from 'react';
import { User } from '../types';

interface ProfileModalProps {
  user: User;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-[#0f1115] w-full max-w-sm rounded-2xl p-8 border border-slate-800 shadow-2xl flex flex-col items-center text-center">
        
        {/* Avatar Ring */}
        <div className="relative mb-6">
            <div className="w-28 h-28 rounded-full border-4 border-[#1e232e] overflow-hidden shadow-2xl relative z-10">
                <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
            </div>
            {/* Decorative ring */}
            <div className="absolute inset-0 -m-2 border border-orange-600/30 rounded-full animate-pulse"></div>
        </div>
        
        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-tighter italic">
            {user.name}
        </h2>
        
        <div className="mb-6">
            <span className="px-4 py-1 bg-orange-600 text-black text-xs font-bold uppercase tracking-[0.2em] rounded-sm">
                {user.role}
            </span>
        </div>
        
        <div className="w-full space-y-4 mb-8">
            <div className="bg-[#1e232e] p-4 rounded-lg border border-slate-800 flex items-center gap-4 text-left group hover:border-slate-600 transition-colors">
                <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Email Address</p>
                    <p className="text-slate-200 text-sm font-mono">{user.email}</p>
                </div>
            </div>
            
             <div className="bg-[#1e232e] p-4 rounded-lg border border-slate-800 flex items-center gap-4 text-left group hover:border-slate-600 transition-colors">
                <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .883-.393 2-1 2s-1-1.117-1-2" />
                    </svg>
                </div>
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Employee ID</p>
                    <p className="text-slate-200 text-sm font-mono">{user.id.toUpperCase()}</p>
                </div>
            </div>
        </div>

        <button 
            onClick={onClose}
            className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-bold uppercase tracking-widest transition-colors border border-slate-700 hover:border-slate-500"
        >
            Dismiss
        </button>
      </div>
    </div>
  );
};

export default ProfileModal;