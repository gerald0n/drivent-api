import { CreateBookingParams, UpdateBookingParams } from '@/protocols';
import { prisma } from '@/config';

async function create({ roomId, userId }: CreateBookingParams) {
  return prisma.booking.create({
    data: { roomId, userId },
  });
}

async function findByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: { roomId },
    include: { Room: true },
  });
}

async function findByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: { userId },
    include: { Room: true },
  });
}

async function getBookingByRoomAndUserId(roomId: number, userId: number) {
  return await prisma.booking.findFirst({
    where: {
      userId: userId,
      roomId: roomId,
    },
  });
}

async function upsertBooking({ id, roomId, userId }: UpdateBookingParams) {
  return prisma.booking.upsert({
    where: { id },
    create: { roomId, userId },
    update: { roomId },
  });
}

async function getBookingsCounterByRoomId(roomId: number) {
  const counter = await prisma.booking.aggregate({
    _count: { id: true },
    where: { roomId: roomId },
    orderBy: { id: 'asc' },
  });

  const bookingsCounter = counter._count.id;
  return bookingsCounter;
}

export const bookingRepository = {
  create,
  findByRoomId,
  findByUserId,
  upsertBooking,
  getBookingByRoomAndUserId,
  getBookingsCounterByRoomId,
};
