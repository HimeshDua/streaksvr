'use client';

import React, {createContext, useState, useEffect, useContext} from 'react';
import {auth} from '@/lib/firebase';
import {onAuthStateChanged} from 'firebase/auth';
import {useRouter} from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({children}) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      console.log('Auth state changed:', authUser);
      setError(null);
      setLoading(true);
      console.log('Loading set to true');

      if (authUser) {
        console.log('User is authenticated:', authUser.uid);
        try {
          const res = await fetch('/api/user', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({firebaseId: authUser.uid})
          });
          const dbUserData = await res.json();
          console.log('API response:', res);
          console.log('DB user data:', dbUserData);

          if (res.ok) {
            const combinedUserData = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              ...dbUserData
            };
            setUserData(combinedUserData);
            console.log('userData set:', combinedUserData);
          } else {
            setError(dbUserData?.message || 'Failed to fetch user');
            setUserData(null);
            console.error('Failed to fetch user:', dbUserData?.message);
          }
        } catch (err) {
          console.error('Fetch error:', err);
          setError(err.message || 'Unknown error');
          setUserData(null);
        }
      } else {
        setUserData(null);
        console.log('User is not authenticated, userData set to null');
      }
      setLoading(false);
      console.log('Loading set to false');
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <AuthContext.Provider value={{userData, loading, error}}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
