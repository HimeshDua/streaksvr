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

    // --- Backend Validations ---
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

    if (existingUsername) {
      return NextResponse.json(
        {error: 'Username already taken.'},
        {status: 409}
      );
    }

    const existingEmail = await prisma.user.findUnique({
      where: {email: email}
    });

    if (existingEmail) {
      return NextResponse.json({error: 'Email already exists.'}, {status: 409});
    }

    // --- Create User in Firebase Authentication (Using Admin SDK) ---
    try {
      const firebaseUserRecord = await firebaseAdminAuth.createUser({
        email: email,
        password: password,
        displayName: name // Optional: Set display name
      });

      const firebaseUid = firebaseUserRecord.uid;

      if (!firebaseUid) {
        return NextResponse.json(
          {error: 'Failed to create user in Firebase Authentication'},
          {status: 500}
        );
      }

      // --- Hash the password before storing in your database ---
      const hashedPassword = await bcrypt.hash(password, 10);

      // --- Sync the new user to the Prisma database ---
      const newUser = await prisma.user.create({
        data: {
          firebaseId: firebaseUid,
          email: email,
          username: username,
          name: name,
          password: hashedPassword
        }
      });

      // --- Send a success response with the new user data ---
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
