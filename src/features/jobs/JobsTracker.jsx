import React, { useState, useMemo, useCallback } from 'react';
import { useAuth } from './hooks/useAuth';
import { useJobs } from './hooks/useJobs';
import { useTheme } from '../../hooks/useTheme';
import { useToast } from '../../hooks/useToast';
import { isStandalone } from '../../config/firebase';

// Features Components
import JobForm from './components/JobForm';
import DeleteConfirm from './components/DeleteConfirm';
import JobHeader from './components/JobHeader';
import JobStats from './components/JobStats';
import JobFilters from './components/JobFilters';
import JobFeed from './components/JobFeed';
import JobLoading from './components/JobLoading';
import JobAuthError from './components/JobAuthError';
import Toast from '../../components/ui/Toast';

export default function JobsTracker() {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, authLoading, authError, signInWithGoogle, signOut } = useAuth();
  const { 
    jobs, 
    loading: jobsLoading, 
    error: jobsError, 
    isActionLoading, 
    stats, 
    handleSaveJob, 
    handleDeleteJob 
  } = useJobs(user);
  const { toasts, addToast } = useToast();

  const isUserSignedIn = isStandalone || !!user;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [jobToDelete, setJobToDelete] = useState(null);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesFilter = filter === 'all' || job.status === filter;
      const matchesSearch = !search || 
        job.company.toLowerCase().includes(search.toLowerCase()) || 
        job.role.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [jobs, filter, search]);

  const handleOpenAdd = useCallback(() => {
    setEditingJob(null);
    setIsFormOpen(true);
  }, []);

  const handleOpenEdit = useCallback((job) => {
    setEditingJob(job);
    setIsFormOpen(true);
  }, []);

  const handleSave = useCallback(async (formData) => {
    const success = await handleSaveJob(formData, editingJob?.id);
    if (success) {
      setIsFormOpen(false);
      addToast(editingJob ? 'Aplicație actualizată!' : 'Aplicație adăugată!');
    } else {
      addToast('Eroare la salvare. Încearcă din nou.', 'error');
    }
  }, [handleSaveJob, editingJob, addToast]);

  const handleDelete = useCallback(async () => {
    const job = jobToDelete;
    // Închidem modalul instant ca să nu pară că are "întârziere"
    setJobToDelete(null);
    
    // Rulăm funcția în background
    const success = await handleDeleteJob(job);
    if (success) {
      addToast('Aplicație ștearsă!');
    } else {
      addToast('Eroare la ștergere. Încearcă din nou.', 'error');
    }
  }, [handleDeleteJob, jobToDelete, addToast]);

  const handleDownloadCV = useCallback((cvData, fileName) => {
    if (!cvData) return;
    const a = document.createElement('a');
    a.href = cvData;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, []);

  const handleSignIn = useCallback(async () => {
    await signInWithGoogle();
  }, [signInWithGoogle]);

  const handleSignOut = useCallback(async () => {
    await signOut();
  }, [signOut]);

  if (authLoading || jobsLoading) {
    return <JobLoading />;
  }

  if (!isUserSignedIn) {
    return (
      <div className="min-h-screen p-4 sm:p-8 lg:p-12 bg-slate-50">
        <div className="max-w-6xl mx-auto space-y-8">
          <JobHeader
            isDarkMode={isDarkMode}
            toggleTheme={toggleTheme}
            onOpenAdd={handleOpenAdd}
            user={user}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
            canAdd={isUserSignedIn}
          />

          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold text-slate-950">Conectează-te cu Google</h2>
              <p className="text-slate-600">
                Folosește același cont pe PC și pe telefon pentru a vedea aceleași aplicații.
              </p>
              <button
                onClick={handleSignIn}
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-8 py-4 text-white font-bold hover:bg-blue-700 transition"
              >
                Conectare Google
              </button>
              <JobAuthError error={authError} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 lg:p-12 animate-fade-in transition-colors duration-500">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {isStandalone && (
          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-3xl shadow-sm animate-fade-in">
            <p className="text-yellow-800 font-semibold">Modul Local Activat</p>
            <p className="text-sm text-yellow-700 mt-2">
              Firebase nu este configurat complet. Datele se salvează local în browser și nu se sincronizează între dispozitive.
            </p>
          </div>
        )}

        <JobAuthError error={authError || jobsError} />

        <JobHeader 
          isDarkMode={isDarkMode} 
          toggleTheme={toggleTheme} 
          onOpenAdd={handleOpenAdd} 
          user={user}
          onSignIn={handleSignIn}
          onSignOut={handleSignOut}
          canAdd={isUserSignedIn}
        />

        <JobStats stats={stats} isDarkMode={isDarkMode} />

        <JobFilters 
          filter={filter} 
          setFilter={setFilter} 
          search={search}
          setSearch={setSearch}
          isDarkMode={isDarkMode} 
        />

        <JobFeed 
          jobs={filteredJobs} 
          onEdit={handleOpenEdit} 
          onDelete={setJobToDelete}
          onDownload={handleDownloadCV}
          isDarkMode={isDarkMode}
        />
      </div>

      {isFormOpen && (
        <JobForm 
          job={editingJob} 
          onSubmit={handleSave} 
          onClose={() => setIsFormOpen(false)} 
          isLoading={isActionLoading}
          isDark={isDarkMode}
        />
      )}

      {jobToDelete && (
        <DeleteConfirm 
          onConfirm={handleDelete}
          onCancel={() => setJobToDelete(null)}
          isLoading={isActionLoading}
          isDark={isDarkMode}
        />
      )}

      <Toast toasts={toasts} />
    </div>
  );
}
