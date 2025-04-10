import UserProfileClient from '@/components/UserProfileClient';

export default async function UserProfile({
  params: paramsPromise
}: {
  params: Promise<{username: string}>;
}) {
  const {username} = await paramsPromise;
  return <UserProfileClient username={username} />;
}
