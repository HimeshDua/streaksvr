import {NextRequest, NextResponse} from 'next/server';
import {prisma} from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const firebaseId: string = body.firebaseId;

    if (!firebaseId) {
      return NextResponse.json({error: 'Missing firebaseId'}, {status: 400});
    }

    const user = await prisma.user.findUnique({
      where: {firebaseId}
    });

    if (!user) {
      return NextResponse.json({error: 'User not found'}, {status: 404});
    }

    return NextResponse.json(user, {status: 200});
  } catch (err) {
    console.error('API Error:', err);
    return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
  }
}
