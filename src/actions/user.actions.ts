import {prisma} from '@/lib/prisma';

interface FirebaseUser {
  uid: string;
  email: string;
  emailVerified: boolean;
}

interface ExtraUserInfo {
  username: string;
  name: string;
  password: string;
}

export default async function syncUser(
  user: FirebaseUser,
  extraUserInfo: ExtraUserInfo
) {
  const {name, username, password} = extraUserInfo;
  const {uid: firebaseId, email, emailVerified} = user;

  const existingUser = await prisma.user.findUnique({
    where: {email}
  });

  const existingUsername = await prisma.user.findUnique({
    where: {username}
  });

  if (existingUsername) {
    throw new Error('Username already taken. Please choose another.');
  }

  if (existingUser) {
    throw new Error('User already exists. Please try to log in.');
  }

  try {
    const newUser = await prisma.user.create({
      data: {
        firebaseId,
        name,
        username,
        email,
        emailVerified,
        password
      }
    });

    return newUser;
  } catch (error: any) {
    console.error('Prisma Error:', error);
    throw new Error('Failed to create user. Please try again.');
  }
}
