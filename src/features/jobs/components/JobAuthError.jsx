import React from 'react';
import { XCircle, AlertCircle } from 'lucide-react';

export default function JobAuthError({ error }) {
  if (!error) return null;
  
  return (
    <div className="bg-rose-50 border border-rose-200 p-6 rounded-3xl flex items-start gap-4 animate-fade-in shadow-sm mb-10">
      <XCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />
      <div>
        <h3 className="font-bold text-rose-900">Eroare de Configurare</h3>
        <p className="text-rose-700 text-sm mt-1">{error}</p>
        <p className="text-rose-600 text-xs mt-3 font-medium flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4" />
          Verifică Firebase Console -&gt; Authentication -&gt; Sign-in method și activează "Google".
        </p>
      </div>
    </div>
  );
}
