import React from 'react';
import { Briefcase, Sun, Moon, Plus, LogOut } from 'lucide-react';

export default function JobHeader({ isDarkMode, toggleTheme, onOpenAdd, user, onSignIn, onSignOut, canAdd }) {
  const ThemeButton = (
    <button
      onClick={toggleTheme}
      className={`p-3 lg:p-4 border rounded-2xl transition-all shadow-sm active:scale-90 ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-white'}`}
      title={isDarkMode ? "Mod Luminos" : "Mod Întunecat"}
    >
      {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );

  const ProfileSection = user ? (
    <div className={`flex items-center gap-1 rounded-full border p-1 transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-white border-slate-200 shadow-sm text-slate-700'}`}>
      {user.photoURL ? (
        <img src={user.photoURL} alt="Profile" className="w-9 h-9 lg:w-10 lg:h-10 rounded-full border border-white/10 shadow-sm" referrerPolicy="no-referrer" />
      ) : (
        <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
          {user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : 'U')}
        </div>
      )}
      <button
        onClick={onSignOut}
        className={`p-2 rounded-full transition-all active:scale-90 ${isDarkMode ? 'hover:bg-rose-500/10 text-rose-400' : 'hover:bg-rose-50 text-rose-500'}`}
        title="Deconectare"
      >
        <LogOut className="w-4 h-4 lg:w-5 lg:h-5" />
      </button>
    </div>
  ) : null;

  return (
    <header className={`flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 p-5 lg:p-6 rounded-[2rem] border transition-all duration-300 ${isDarkMode ? 'bg-slate-900 border-slate-800 shadow-none' : 'bg-white border-slate-200 shadow-sm'}`}>
      
      {/* 1. TOP ROW pe mobile (Logo Stânga + Actions Dreapta) */}
      <div className="flex w-full lg:w-auto items-center justify-between">
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="p-2 lg:p-2.5 bg-indigo-600/10 rounded-2xl">
            <Briefcase className="w-6 h-6 lg:w-7 lg:h-7 text-indigo-600" />
          </div>
          <div>
            <h1 className={`text-xl lg:text-2xl font-black tracking-tighter leading-none ${isDarkMode ? 'text-white' : 'text-slate-950'}`}>
              JobTrack
            </h1>
            <div className="flex items-center gap-2 mt-1.5 lg:mt-2">
              <span className={`text-[9px] lg:text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${isDarkMode ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-100 text-slate-600'}`}>
                Pro v1.0
              </span>
            </div>
          </div>
        </div>

        {/* Butoanele afișate DOAR pe mobile */}
        <div className="flex lg:hidden items-center gap-2">
          {ThemeButton}
          {ProfileSection}
          {!user && (
            <button onClick={onSignIn} className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-sm">
              Login
            </button>
          )}
        </div>
      </div>

      {/* 2. Quick Links */}
      <div className="flex flex-row flex-wrap lg:flex-nowrap items-center justify-center w-full lg:w-auto lg:flex-1 gap-2 mt-1 lg:mt-0">
        <a 
          href="https://www.rabota.md/ro/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600' : 'bg-slate-50 border-slate-200/70 hover:bg-white hover:shadow-sm hover:border-slate-200'}`}
          title="Mergi la Rabota.md"
        >
          <img src="https://www.google.com/s2/favicons?domain=rabota.md&sz=128" alt="Rabota.md" className="w-4 h-4 rounded-full object-contain bg-white" />
          <span className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>Rabota.md</span>
        </a>

        <a 
          href="https://www.delucru.md/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600' : 'bg-slate-50 border-slate-200/70 hover:bg-white hover:shadow-sm hover:border-slate-200'}`}
          title="Mergi la Delucru.md"
        >
          <img src="https://www.google.com/s2/favicons?domain=delucru.md&sz=128" alt="Delucru.md" className="w-4 h-4 rounded-full object-contain bg-white" />
          <span className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>Delucru.md</span>
        </a>

        <a 
          href="https://jobjob.md/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all hover:scale-105 active:scale-95 ${isDarkMode ? 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800 hover:border-slate-600' : 'bg-slate-50 border-slate-200/70 hover:bg-white hover:shadow-sm hover:border-slate-200'}`}
          title="Mergi la JobJob.md"
        >
          <img src="https://www.google.com/s2/favicons?domain=jobjob.md&sz=128" alt="JobJob.md" className="w-4 h-4 rounded-full object-contain bg-white" />
          <span className={`text-xs font-bold transition-colors ${isDarkMode ? 'text-slate-300 group-hover:text-white' : 'text-slate-600 group-hover:text-slate-900'}`}>JobJob.md</span>
        </a>
      </div>

      {/* 3. Butoanele Desktop + Adaugă */}
      <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mt-2 lg:mt-0">
        
        {/* Butoanele afișate DOAR pe desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {ThemeButton}
          {ProfileSection}
        </div>

        {canAdd && (
          <button
            onClick={onOpenAdd}
            className="w-full sm:w-auto flex items-center gap-2 bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-2xl font-bold transition-all justify-center shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 group order-last lg:order-none"
          >
            <Plus className="w-5 h-5 transition-transform group-hover:rotate-90" />
            Adaugă Aplicație
          </button>
        )}

        {!user && (
          <div className="hidden lg:block">
            <button
              onClick={onSignIn}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
            >
              Conectare Google
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
