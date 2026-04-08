import React from 'react';
import { 
  Building2, 
  Calendar, 
  Edit2, 
  Trash2, 
  Paperclip, 
  Download,
  ExternalLink
} from 'lucide-react';
import StatusBadge from '../../../components/ui/StatusBadge';

const getCardStyle = (status, isDark) => {
  if (isDark) {
    switch (status) {
      case 'applied': return 'bg-blue-900/20 border-blue-500/30 hover:border-blue-500/50';
      case 'interview': return 'bg-purple-900/20 border-purple-500/30 hover:border-purple-500/50';
      case 'accepted': return 'bg-emerald-900/20 border-emerald-500/30 hover:border-emerald-500/50';
      case 'rejected': return 'bg-rose-900/20 border-rose-500/30 hover:border-rose-500/50';
      default: return 'bg-slate-800 border-slate-700 hover:border-slate-600';
    }
  } else {
    switch (status) {
      case 'applied': return 'bg-blue-50 border-blue-200 hover:border-blue-300';
      case 'interview': return 'bg-purple-50 border-purple-200 hover:border-purple-300';
      case 'accepted': return 'bg-emerald-50 border-emerald-200 hover:border-emerald-300';
      case 'rejected': return 'bg-rose-50 border-rose-200 hover:border-rose-300';
      default: return 'bg-slate-50 border-slate-200 hover:border-slate-300';
    }
  }
};

const JobItem = React.memo(({ job, onEdit, onDelete, onDownload, isDark }) => {
  return (
    <div className={`px-5 py-3.5 ${getCardStyle(job.status, isDark)} border rounded-3xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col md:flex-row md:items-start justify-between gap-4 group animate-fade-in`}>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-3 mb-1.5">
          <div className="flex items-center gap-2">
            <h3 className={`text-lg font-bold transition-colors group-hover:text-primary ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {job.role}
            </h3>
            {job.jobLink && (
              <a 
                href={job.jobLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-1 px-2.5 bg-indigo-600/10 text-indigo-600 rounded-lg text-[9px] font-black tracking-widest uppercase hover:bg-indigo-600 hover:text-white transition-all flex items-center gap-1.5"
                title="Vezi anunțul original"
              >
                Link <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
          <StatusBadge status={job.status} />
        </div>
        
        <div className={`flex flex-wrap items-center gap-5 text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          <div className="flex items-center gap-2 group/meta">
            <Building2 className={`w-4 h-4 transition-colors group-hover/meta:text-primary ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            <span className="font-medium">{job.company}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className={`w-4 h-4 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            <span>{new Date(job.date).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        {job.notes && (
          <p className={`text-xs mt-3 p-3 rounded-lg border line-clamp-2 hover:line-clamp-none transition-all ${isDark ? 'text-slate-400 bg-slate-900/30 border-slate-800' : 'text-slate-600 bg-slate-50 border-slate-100'}`}>
            {job.notes}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {job.cvName && (
            <button
              onClick={() => onDownload(job.cvData, job.cvName)}
              className="flex items-center gap-2 text-[10px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 px-3 py-2 rounded-lg transition-all border border-indigo-100 dark:border-indigo-500/20"
              title="Descarcă CV"
            >
              <Paperclip className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{job.cvName}</span>
              <Download className="w-3 h-3 opacity-70" />
            </button>
          )}

          {job.clName && (
            <button
              onClick={() => onDownload(job.clData, job.clName)}
              className="flex items-center gap-2 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 px-3 py-2 rounded-lg transition-all border border-emerald-100 dark:border-emerald-500/20"
              title="Descarcă Scrisoare"
            >
              <Paperclip className="w-3 h-3" />
              <span className="truncate max-w-[100px]">{job.clName}</span>
              <Download className="w-3 h-3 opacity-70" />
            </button>
          )}
        </div>
      </div>
      
      <div className="flex items-center gap-2 self-end md:self-start md:mt-1">
        <button 
          onClick={() => onEdit(job)}
          className={`p-2.5 rounded-xl transition-all hover:rotate-6 hover:text-primary hover:bg-primary/10 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}
          title="Editează"
        >
          <Edit2 className="w-5 h-5" />
        </button>
        <button 
          onClick={() => onDelete(job.id)}
          className={`p-2.5 rounded-xl transition-all active:scale-90 hover:text-rose-600 hover:bg-rose-100/50 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}
          title="Șterge"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
});

export default JobItem;
