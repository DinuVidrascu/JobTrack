import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db, isStandalone } from '../../config/firebase';

const LOCAL_STORAGE_KEY = 'jobtrack_demo_jobs';

/**
 * Helper to get local jobs
 */
const getLocalJobs = () => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!data) {
    const samples = [
      {
        id: 'sample-1',
        company: 'Google',
        role: 'Frontend Developer',
        status: 'interview',
        date: new Date().toISOString().split('T')[0],
        notes: 'Interviu tehnic programat pentru săptămâna viitoare.',
        userId: 'demo-user'
      },
      {
        id: 'sample-2',
        company: 'Adobe',
        role: 'Full Stack Engineer',
        status: 'applied',
        date: new Date(Date.now() - 86400000 * 2).toISOString().split('T')[0],
        notes: 'Trimis CV prin recomandare.',
        userId: 'demo-user'
      }
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(samples));
    return samples;
  }
  return JSON.parse(data);
};

/**
 * Helper to save local jobs
 */
const setLocalJobs = (jobs) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(jobs));
  // Emit custom event for "pseudo-realtime" within same tab if multiple listeners exist
  window.dispatchEvent(new Event('jobtrack_storage_update'));
};

/**
 * Get a reference to the user's jobs collection
 */
export const getJobsCollectionRef = (userId) => {
  if (isStandalone) return null;
  return collection(db, 'users', userId, 'jobs');
};

/**
 * Subscribe to the user's jobs collection
 */
export const subscribeToJobs = (userId, callback, onError) => {
  if (!userId) return null;

  if (isStandalone) {
    const pushFromLocal = () => {
      const jobs = getLocalJobs();
      // Sort descending by date
      jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
      callback(jobs);
    };

    pushFromLocal();
    window.addEventListener('jobtrack_storage_update', pushFromLocal);
    return () => window.removeEventListener('jobtrack_storage_update', pushFromLocal);
  }

  const jobsRef = getJobsCollectionRef(userId);
  return onSnapshot(jobsRef, (snapshot) => {
    const jobsList = [];
    snapshot.forEach((doc) => {
      jobsList.push({ id: doc.id, ...doc.data() });
    });
    jobsList.sort((a, b) => new Date(b.date) - new Date(a.date));
    callback(jobsList);
  }, (error) => {
    console.error("Firestore Subscription Error:", error);
    if (onError) onError(error);
  });
};

/**
 * Save or Update a job
 */
export const saveJob = async (userId, jobData, jobId = null) => {
  if (!userId) throw new Error("User not authenticated");
  
  if (isStandalone) {
    const jobs = getLocalJobs();
    const id = jobId || Date.now().toString();
    const newJob = { 
      ...jobData, 
      id, 
      updatedAt: new Date().toISOString(),
      userId: userId 
    };

    if (jobId) {
      const index = jobs.findIndex(j => j.id === jobId);
      if (index !== -1) jobs[index] = newJob;
      else jobs.push(newJob);
    } else {
      jobs.push(newJob);
    }
    
    setLocalJobs(jobs);
    return id;
  }

  const id = jobId || Date.now().toString();
  const jobRef = doc(db, 'users', userId, 'jobs', id);
  
  await setDoc(jobRef, {
    ...jobData,
    updatedAt: new Date().toISOString(),
    userId: userId
  });
  return id;
};

/**
 * Delete a job
 */
export const deleteJob = async (userId, jobId) => {
  if (!userId) throw new Error("User not authenticated");
  
  if (isStandalone) {
    const jobs = getLocalJobs();
    const filtered = jobs.filter(j => j.id !== jobId);
    setLocalJobs(filtered);
    return;
  }

  const jobRef = doc(db, 'users', userId, 'jobs', jobId);
  await deleteDoc(jobRef);
};
