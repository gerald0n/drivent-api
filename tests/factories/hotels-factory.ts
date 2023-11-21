import faker from '@faker-js/faker';
import { prisma } from '@/config';

export async function createHotel() {
  return await prisma.hotel.create({
    data: {
      image: faker.image.imageUrl(),
      name: faker.name.middleName(),
    },
  });
}

export async function createRoomWithHotelId(hotelId: number) {
  return prisma.room.create({
    data: {
      name: '1',
      capacity: 5,
      hotelId: hotelId,
    },
  });
}
