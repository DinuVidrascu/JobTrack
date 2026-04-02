import React from 'react';
import { Briefcase, Sun, Moon, Plus } from 'lucide-react';

export default function JobHeader({ isDarkMode, toggleTheme, onOpenAdd }) {
  return (
    <header className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 p-6 rounded-[2rem] border transition-all duration-300 ${isDarkMode ? 'bg-slate-900 border-slate-800 shadow-none' : 'bg-white border-slate-200 shadow-sm'}`}>
      <div>
        <div className="flex items-center gap-4">
          <div className="p-2.5 bg-indigo-600/10 rounded-2xl">
            <Briefcase className="w-7 h-7 text-indigo-600" />
          </div>
          <div>
            <h1 className={`text-2xl font-black tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
              JobTrack
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-100 text-slate-600'}`}>
                Pro v1.0
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button
          onClick={toggleTheme}
          className={`p-4 border rounded-2xl transition-all shadow-sm active:scale-90 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}`}
          title={isDarkMode ? "Mod Luminos" : "Mod Întunecat"}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        <button
          onClick={onOpenAdd}
          className="flex-1 sm:flex-none flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold transition-all justify-center shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 group"
        >
          <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
          Adaugă Aplicație
        </button>
      </div>
    </header>
  );
}
