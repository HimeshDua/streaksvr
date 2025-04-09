// app/api/auth/signup/route.ts
import {prisma} from '@/lib/prisma';
import {NextRequest, NextResponse} from 'next/server';
import bcrypt from 'bcrypt';
import {firebaseAdminAuth} from '@/lib/firebase-admin';

interface RequestBody {
  email: string;
  name: string;
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const {email, name, username, password} = body;

    if (!email.includes('@') || username.length < 4 || name.length < 4) {
      return NextResponse.json(
        {error: 'Please fill out all fields correctly'},
        {status: 400}
      );
    }

    if (password.length < 6 || password.length > 20) {
      return NextResponse.json(
        {error: 'Password must be between 6 and 20 characters'},
        {status: 400}
      );
    }

    const existingUsername = await prisma.user.findUnique({
      where: {username: username}
    });
    const existingEmail = await prisma.user.findUnique({
      where: {email: email}
    });

    if (existingUsername && existingEmail) {
      return NextResponse.json(
        {error: 'Account already exists, Create new account.'},
        {status: 409}
      );
    }

    if (existingUsername) {
      return NextResponse.json(
        {error: 'Username already taken.'},
        {status: 409}
      );
    }

    if (existingEmail) {
      return NextResponse.json({error: 'Email already exists.'}, {status: 409});
    }

    try {
      const firebaseUserRecord = await firebaseAdminAuth.createUser({
        email: email,
        password: password,
        displayName: name
      });

      const firebaseUid = firebaseUserRecord.uid;

      if (!firebaseUid) {
        return NextResponse.json(
          {error: 'Failed to create user in Firebase Authentication'},
          {status: 500}
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      // new user
      const newUser = await prisma.user.create({
        data: {
          firebaseId: firebaseUid,
          email: email,
          username: username,
          name: name,
          password: hashedPassword
        }
      });

      return NextResponse.json(newUser, {status: 201});
    } catch (firebaseError: any) {
      console.error('Firebase Admin SDK error:', firebaseError);
      if (firebaseError.code === 'auth/email-already-exists') {
        return NextResponse.json(
          {error: 'Email address is already in use.'},
          {status: 409}
        );
      }
      if (firebaseError.code === 'auth/invalid-email') {
        return NextResponse.json(
          {error: 'Invalid email address.'},
          {status: 400}
        );
      }
      if (firebaseError.code === 'auth/weak-password') {
        return NextResponse.json(
          {error: 'Password is too weak.'},
          {status: 400}
        );
      }
      return NextResponse.json(
        {error: 'Failed to create user in Firebase Authentication'},
        {status: 500}
      );
    }
  } catch (globalError: any) {
    console.error('Unhandled error in signup API:', globalError);
    return NextResponse.json({error: 'Internal server error'}, {status: 500});
  }
}
