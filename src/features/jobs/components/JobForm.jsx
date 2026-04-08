import React, { useState, useEffect } from 'react';
import { X, Paperclip, Loader2, AlertCircle } from 'lucide-react';
import { STATUSES } from '../constants';

const JobForm = ({ job, onSubmit, onClose, isLoading, isDark }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'applied',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    cvData: null,
    cvName: '',
    clData: null,
    clName: '',
    jobLink: ''
  });
  const [fileError, setFileError] = useState('');

  useEffect(() => {
    if (job) {
      setFormData(prev => ({ ...prev, ...job }));
    }             // ← închizi if-ul
  }, [job]);      
  // ESC key pentru a închide formularul
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isLoading) onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLoading, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    setFileError('');
    
    if (file) {
      if (file.size > 800 * 1024) {
        setFileError(`Fișierul (${field === 'cv' ? 'CV' : 'CL'}) este prea mare (max 800KB).`);
        return;
      }
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Folosim functional update pentru a evita stale closure
        setFormData(prev => ({
          ...prev,
          [field === 'cv' ? 'cvData' : 'clData']: reader.result,
          [field === 'cv' ? 'cvName' : 'clName']: file.name
        }));
      };
      reader.onerror = () => {
        setFileError('Eroare la citirea fișierului.');
      };
    }
  };

  return (
    <div className={`fixed inset-0 backdrop-blur-md flex items-start justify-center p-4 z-50 transition-all duration-300 overflow-y-auto ${isDark ? 'bg-slate-950/80' : 'bg-slate-900/60'} pt-4 sm:pt-10`}>
      <div className={`rounded-[2rem] w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in slide-in-from-top-4 duration-300 border mb-8 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
        <div className={`px-8 py-4 border-b flex justify-between items-center ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/50 border-slate-100'}`}>
          <div>
            <h2 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {job ? 'Editează Aplicația' : 'Adaugă Aplicație'}
            </h2>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-0.5">Detalii Rol</p>
          </div>
          <button 
            onClick={onClose} 
            disabled={isLoading}
            className={`p-2 rounded-xl transition-all ${isDark ? 'text-slate-500 hover:text-white hover:bg-slate-800' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={`text-[10px] font-black uppercase tracking-wider ml-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Companie *</label>
              <input 
                required
                type="text" 
                value={formData.company}
                onChange={e => setFormData({...formData, company: e.target.value})}
                className={`w-full px-5 py-3 border rounded-2xl outline-none transition-all placeholder:text-slate-500 text-sm ${isDark ? 'bg-slate-800/50 border-slate-700/50 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'}`}
                placeholder="ex: Google, Adobe"
              />
            </div>
            
            <div className="space-y-1.5">
              <label className={`text-[10px] font-black uppercase tracking-wider ml-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Funcție / Rol *</label>
              <input 
                required
                type="text" 
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
                className={`w-full px-5 py-3 border rounded-2xl outline-none transition-all placeholder:text-slate-500 text-sm ${isDark ? 'bg-slate-800/50 border-slate-700/50 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'}`}
                placeholder="ex: Developer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={`text-[10px] font-black uppercase tracking-wider ml-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Status</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    // Căutăm elementul "status" prin id pentru un toggle custom. Vom folosi domul pentru simplitate.
                    const dropdown = document.getElementById('status-dropdown');
                    if (dropdown) dropdown.classList.toggle('hidden');
                  }}
                  onBlur={() => setTimeout(() => {
                    const dropdown = document.getElementById('status-dropdown');
                    if (dropdown) dropdown.classList.add('hidden');
                  }, 150)}
                  className={`w-full px-5 py-3 border rounded-2xl outline-none transition-all cursor-pointer text-sm flex justify-between items-center ${isDark ? 'bg-slate-800/50 border-slate-700/50 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'}`}
                >
                  <span>{Object.values(STATUSES).find(s => s.id === formData.status)?.label || 'Alege'}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="m6 9 6 6 6-6"/></svg>
                </button>
                
                <div id="status-dropdown" className={`hidden absolute top-full left-0 right-0 mt-2 p-2 rounded-2xl border shadow-xl z-20 animate-in fade-in slide-in-from-top-2 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                  {Object.values(STATUSES).map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => {
                        setFormData({...formData, status: s.id});
                        document.getElementById('status-dropdown').classList.add('hidden');
                      }}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all ${formData.status === s.id ? (isDark ? 'bg-indigo-500/20 text-indigo-400 font-bold' : 'bg-indigo-50 text-indigo-700 font-bold') : (isDark ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-50')}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className={`text-[10px] font-black uppercase tracking-wider ml-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Data aplicării</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                className={`w-full px-5 py-3 border rounded-2xl outline-none transition-all text-sm ${isDark ? 'bg-slate-800/50 border-slate-700/50 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'}`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={`text-[10px] font-black uppercase tracking-wider ml-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Notițe / Detalii</label>
            <textarea 
              rows="2"
              value={formData.notes}
              onChange={e => setFormData({...formData, notes: e.target.value})}
              className={`w-full px-5 py-3 border rounded-2xl outline-none transition-all resize-none placeholder:text-slate-500 text-sm ${isDark ? 'bg-slate-800/50 border-slate-700/50 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'}`}
              placeholder="Informații suplimentare (tehnologii, contact, etc)..."
            ></textarea>
          </div>

          <div className="space-y-1.5">
            <label className={`text-[10px] font-black uppercase tracking-wider ml-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Link Job (URL)</label>
            <input 
              type="url" 
              value={formData.jobLink}
              onChange={e => setFormData({...formData, jobLink: e.target.value})}
              className={`w-full px-5 py-3 border rounded-2xl outline-none transition-all placeholder:text-slate-500 text-sm ${isDark ? 'bg-slate-800/50 border-slate-700/50 text-white focus:border-indigo-500' : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-indigo-500'}`}
              placeholder="https://..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-wider ml-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>CV (Opțional)</label>
              <div className="flex items-center gap-2">
                <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${fileError && fileError.includes('CV') ? 'border-rose-400 bg-rose-50/10' : (isDark ? 'border-slate-800 bg-slate-800/30 hover:border-indigo-500' : 'border-slate-100 bg-slate-50 hover:border-indigo-500')}`}>
                  <Paperclip className={`w-3.5 h-3.5 ${fileError && fileError.includes('CV') ? 'text-rose-500' : 'text-slate-400'}`} />
                  <span className={`text-[12px] font-medium truncate max-w-[150px] ${fileError && fileError.includes('CV') ? 'text-rose-700' : (isDark ? 'text-slate-400' : 'text-slate-600')}`}>
                    {formData.cvName ? formData.cvName : 'CV'}
                  </span>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'cv')} />
                </label>
                {formData.cvName && (
                  <button type="button" onClick={() => setFormData({...formData, cvData: null, cvName: ''})} className="p-2.5 text-rose-500 hover:bg-rose-100/50 rounded-xl transition-all"><X className="w-4 h-4" /></button>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className={`text-[10px] font-black uppercase tracking-wider ml-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Cover Letter (Opțional)</label>
              <div className="flex items-center gap-2">
                <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${fileError && fileError.includes('CL') ? 'border-rose-400 bg-rose-50/10' : (isDark ? 'border-slate-800 bg-slate-800/30 hover:border-indigo-500' : 'border-slate-100 bg-slate-50 hover:border-indigo-500')}`}>
                  <Paperclip className={`w-3.5 h-3.5 ${fileError && fileError.includes('CL') ? 'text-rose-500' : 'text-slate-400'}`} />
                  <span className={`text-[12px] font-medium truncate max-w-[150px] ${fileError && fileError.includes('CL') ? 'text-rose-700' : (isDark ? 'text-slate-400' : 'text-slate-600')}`}>
                    {formData.clName ? formData.clName : 'Scrisoare'}
                  </span>
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={(e) => handleFileChange(e, 'cl')} />
                </label>
                {formData.clName && (
                  <button type="button" onClick={() => setFormData({...formData, clData: null, clName: ''})} className="p-2.5 text-rose-500 hover:bg-rose-100/50 rounded-xl transition-all"><X className="w-4 h-4" /></button>
                )}
              </div>
            </div>
          </div>

          {fileError && <div className="flex items-center gap-2 text-rose-600 ml-1"><AlertCircle className="w-3.5 h-3.5" /><p className="text-[11px] font-bold">{fileError}</p></div>}

          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={onClose} disabled={isLoading} className={`flex-1 px-8 py-3 rounded-xl font-bold transition-all text-sm ${isDark ? 'bg-slate-800 text-slate-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>
              Anulează
            </button>
            <button type="submit" disabled={isLoading} className="flex-1 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2 text-sm">
              {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
              {job ? 'Salvează' : 'Adaugă Aplicație'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;
