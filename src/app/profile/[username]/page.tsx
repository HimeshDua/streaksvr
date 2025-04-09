'use server';

import {prisma} from '@/lib/prisma';
import {notFound} from 'next/navigation';
import ProfileInfo from '@/components/ProfileInfo';

async function fetchUser(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {username},
      select: {
        name: true,
        username: true,
        email: true,
        createdAt: true,
        _count: {select: {tasks: true}},
        emailVerified: true
      }
    });
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export default async function UserProfileShadcn({
  params: paramsPromise
}: {
  params: Promise<{username: string}>;
}) {
  const params = await paramsPromise;
  const {username} = params;
  const user: any = await fetchUser(username);

  if (!user) {
    notFound();
  }

  return (
    <div className="flex justify-center p-8">
      <ProfileInfo
        user={{
          name: user.name,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt.toISOString(),
          tasksCount: user._count.tasks,
          emailVerified: user.emailVerified
        }}
      />
    </div>
    // <div className="flex justify-center py-12 px-4">
    //   <div className="absolute inset-0 pointer-events-none -z-1 flex items-center justify-center opacity-100">
    //     <img
    //       alt="background"
    //       src="/square-alt-grid.svg"
    //       className="object-contain pointer-events-none -z-1 w-full h-full opacity-100 dark:opacity-50 [mask-image:radial-gradient(75%_75%_at_center,white,transparent)]"
    //     />
    //   </div>
    //   <Card className="max-w-lg w-full">
    //     <CardContent className="p-6 space-y-6">
    //       {/* User Info Section */}
    //       <div className="flex flex-col md:flex-row items-center md:space-x-6 mb-6">
    //         <div className="relative mb-4 md:mb-0">
    //           {user.emailVerified && (
    //             <Badge
    //               className="absolute bottom-0 right-0 w-16 h-5 text-xs bg-green-600 rounded-full flex items-center justify-center"
    //               variant="secondary"
    //             >
    //               Verified
    //             </Badge>
    //           )}
    //         </div>
    //         <div className="text-center md:text-left">
    //           <h3 className="text-3xl font-extrabold  leading-tight">
    //             {user.name}
    //           </h3>
    //           <p className="text-2xl font-semibold text-indigo-400 dark:text-indigo-200 mt-1">
    //             @{user.username}
    //           </p>
    //         </div>
    //       </div>

    //       {/* Stats Section */}
    //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm  opacity-80">
    //         <div className="grid gap-2">
    //           <span className="font-semibold">Tasks:</span>
    //           <span className="block">{user._count.tasks}</span>
    //         </div>
    //         <div className="grid gap-2">
    //           <span className="font-semibold">Joined:</span>
    //           <span className="block">{joinedDate}</span>
    //         </div>
    //         <div className="grid gap-2">
    //           <span className="font-semibold">Email:</span>
    //           <span className="inline-block text-balance">{user.email}</span>
    //         </div>
    //       </div>

    //       {/* Logout Button */}
    //       <div className="mt-6 flex justify-center">
    //         <Button
    //           variant="destructive"
    //           className="w-full md:w-full  bg-red-600 hover:bg-red-700 transition duration-300"
    //           asChild
    //         ></Button>
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>
  );
}
