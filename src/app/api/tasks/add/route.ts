import {prisma} from '@/lib/prisma';
import {NextResponse} from 'next/server';
import {z} from 'zod';

const taskSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().optional(),
  authorId: z.string().min(1)
});

async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = taskSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        {error: 'Invalid input', details: validatedData.error.issues},
        {status: 400}
      );
    }

    const {title, description, authorId} = validatedData.data;

    const existingUser = await prisma.user.findUnique({
      where: {id: authorId}
    });

    if (!existingUser) {
      return NextResponse.json(
        {error: `User with ID "${authorId}" not found`},
        {status: 404}
      );
    }

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        authorId,
        status: 'PENDING'
      }
    });

    return NextResponse.json(newTask, {status: 201});
  } catch (error: any) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      {error: 'Failed to create task', details: error.message},
      {status: 500}
    );
  }
}

export {POST};
