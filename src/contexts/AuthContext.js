'use client';
import React, {createContext, useState, useEffect, useContext} from 'react';
import {auth} from '@/lib/firebase';
import {onAuthStateChanged} from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({children}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      setError(null);
      if (authUser) {
        try {
          const res = await fetch('/api/user', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firebaseId: authUser.uid})
          });
          const dbUserData = await res.json();
          if (res.ok) {
            const combinedUserData = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              ...dbUserData
            };
            setUserData(combinedUserData);
          } else {
            setError(
              `Failed to fetch user data: ${dbUserData?.message || res.status}`
            );
            setUserData(null);
          }
        } catch (err) {
          setError(`Error fetching user data: ${err.message}`);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    userData,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}{' '}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
