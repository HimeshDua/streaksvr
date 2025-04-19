'use server';
import {prisma} from '@/lib/prisma';
import {differenceInCalendarDays} from 'date-fns';

export async function updateStreakOnTaskComplete(userId: string) {
  const streak = await prisma.streaks.findFirst({
    where: {authorId: userId}
  });

  const today = new Date();

  // If user has no streak record, create first streak
  if (!streak) {
    await prisma.streaks.create({
      data: {
        authorId: userId,
        current: 1,
        longest: 1,
        lastUpdated: today
      }
    });
    return;
  }

  const daysDiff = streak.lastUpdated
    ? differenceInCalendarDays(today, streak.lastUpdated)
    : Infinity;

  if (daysDiff === 0) {
    // Already updated today
    return;
  } else if (daysDiff === 1) {
    // Continue streak
    const updatedStreak = await prisma.streaks.update({
      where: {id: streak.id},
      data: {
        current: streak.current + 1,
        lastUpdated: today,
        longest: Math.max(streak.longest, streak.current + 1)
      }
    });
    return updatedStreak;
  } else {
    // Missed a day — reset streak
    const resetStreak = await prisma.streaks.update({
      where: {id: streak.id},
      data: {
        current: 1,
        lastUpdated: today
      }
    });
  }
}
