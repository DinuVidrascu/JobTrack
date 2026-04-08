import React from 'react';
import { Briefcase, Sun, Moon, Plus, LogOut } from 'lucide-react';

export default function JobHeader({ isDarkMode, toggleTheme, onOpenAdd, user, onSignIn, onSignOut, canAdd }) {
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
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
        <button
          onClick={toggleTheme}
          className={`p-4 border rounded-2xl transition-all shadow-sm active:scale-90 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}`}
          title={isDarkMode ? "Mod Luminos" : "Mod Întunecat"}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
        {canAdd && (
          <button
            onClick={onOpenAdd}
            className="flex-1 sm:flex-none flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold transition-all justify-center shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 group"
          >
            <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
            Adaugă Aplicație
          </button>
        )}
        {user ? (
          <div className={`flex items-center gap-1 rounded-full border p-1 transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-200 shadow-sm text-slate-700'}`}>
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full border border-white/10 shadow-sm" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U')}
              </div>
            )}
            <button
              onClick={onSignOut}
              className={`p-2 rounded-full transition-all active:scale-90 ${isDarkMode ? 'hover:bg-rose-500/10 text-rose-400' : 'hover:bg-rose-50 text-rose-500'}`}
              title="Deconectare"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            onClick={onSignIn}
            className="flex-1 sm:flex-none px-6 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          >
            Conectare Google
          </button>
        )}
      </div>
    </header>
  );
}
