
'use client';

import { notFound, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ProfileInfo from '@/components/ProfileInfo';
import { useAuth } from '@/contexts/AuthContext';

export default function UserProfile() {

  const { userData, loading, error } = useAuth();
  const { tasks } = useAuth();
  const router = useRouter();

  // useEffect(() => {
  //   if (!loading && !userData) {
  //     router.push('/signin');
  //   }

  //   if (!loading && userData && !userData.username) {
  //     notFound();
  //   }
  // }, [loading, userData, router]);

  // if (loading) {
  //   return <div>Loading profile...</div>;
  // }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex justify-center relative p-8">
      <ProfileInfo
        user={{
          name: userData.name,
          username: userData.username,
          email: userData.email,
          createdAt: userData.createdAt,
          tasksCount: tasks?.length || 0,
          emailVerified: userData.emailVerified,
        }}
      />
    </div>
  );
};
