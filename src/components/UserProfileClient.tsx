'use client';

import {notFound} from 'next/navigation';
import {useAuth} from '@/contexts/AuthContext';
import ProfileInfo from './ProfileInfo';
import {useEffect} from 'react';

const UserProfileClient = ({username}: {username: string}) => {
  const {userData, loading, error} = useAuth();

  useEffect(() => {
    if (!loading && userData && userData.username !== username) {
      notFound();
    }
  }, [loading, userData, username]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!userData) {
    return notFound();
  }

  return (
    <div className="flex justify-center p-8">
      <ProfileInfo
        user={{
          name: userData.name,
          username: userData.username,
          email: userData.email,
          createdAt: userData.createdAt,
          tasksCount: userData._count?.tasks || 0,
          emailVerified: userData.emailVerified
        }}
      />
    </div>
  );
};

export default UserProfileClient;
