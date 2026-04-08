import React, { useEffect } from 'react';
import { AlertCircle, X, Trash2 } from 'lucide-react';

const DeleteConfirm = ({ onConfirm, onCancel, isLoading }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isLoading) onCancel();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLoading, onCancel]);

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 z-[60] transition-opacity duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] w-full max-w-sm shadow-2xl overflow-hidden p-8 text-center animate-in fade-in zoom-in slide-in-from-bottom-2 duration-300 border border-slate-100 dark:border-slate-800">
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-16 h-16 bg-rose-50 dark:bg-rose-900/30 text-rose-500 rounded-full flex items-center justify-center ring-4 ring-rose-50 dark:ring-rose-900/10">
              <Trash2 className="w-8 h-8" />
            </div>
            <AlertCircle className="absolute -bottom-1 -right-1 w-6 h-6 text-rose-600 bg-white dark:bg-slate-900 rounded-full border-2 border-white dark:border-slate-900" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Ești sigur?</h3>
        <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm font-medium leading-relaxed">
          Ești pe cale să ștergi această aplicație definitiv. Această acțiune nu poate fi anulată.
        </p>
        
        <div className="flex flex-col-reverse sm:flex-row gap-3">
          <button 
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-5 py-3.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-700 font-bold transition-all disabled:opacity-50"
          >
            Anulează
          </button>
          <button 
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-5 py-3.5 bg-rose-600 text-white rounded-2xl hover:bg-rose-700 font-bold transition-all shadow-lg shadow-rose-200 dark:shadow-rose-950/20 active:scale-95 disabled:opacity-70 disabled:active:scale-100"
          >
            {isLoading ? 'Se șterge...' : 'Șterge'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirm;
