import { useState, useEffect } from 'react';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut, signInWithCustomToken } from 'firebase/auth';
import { auth, isStandalone } from '../../../config/firebase';

const googleProvider = new GoogleAuthProvider();

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const signInWithGoogle = async () => {
    setLoading(true);
    setError(null);

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-In Error', error);
      setError(error.message || 'Eroare la autentificarea cu Google.');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);

    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Sign Out Error', error);
      setError(error.message || 'Eroare la deconectare.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isStandalone) {
      setUser({ uid: 'demo-user', isAnonymous: true });
      setLoading(false);
      return;
    }

    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        }
      } catch (error) {
        console.error('Auth Error', error);
        setError(error.message || 'Eroare la autentificare.');
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { user, authLoading: loading, authError: error, signInWithGoogle, signOut };
}
