import faker from '@faker-js/faker';
import { bookingService } from '@/services';
import { bookingRepository } from '@/repositories';

jest.mock('@/utils/validate-utils', () => {
  return {
    validateUserTicket: () => {
      return 'validateUserTicket mock';
    },
  };
});

describe('booking service unit tests', () => {
  describe('validateRoomBooking function', () => {
    describe('status param is set to "bookRoomsById" (POST /booking endpoint)', () => {
      it('should throw notFoundError when room is not found', async () => {
        jest.spyOn(bookingRepository, 'findByRoomId').mockImplementationOnce(() => {
          return undefined;
        });

        const roomId = faker.datatype.number();
        const userId = faker.datatype.number();

        try {
          await bookingService.bookRoomsById(roomId, userId);
        } catch (response) {
          expect(bookingRepository.findByRoomId).toBeCalled();
          expect(response).toEqual({
            name: 'NotFoundError',
            message: 'Room not found.',
          });
        }
      });

      it('should throw cannotProocedBookingError when user already has booking of requested room', async () => {
        const roomId = faker.datatype.number();
        const userId = faker.datatype.number();
        const date = faker.date.future();

        jest.spyOn(bookingRepository, 'findByRoomId').mockImplementationOnce((): any => {
          return {
            id: roomId,
            name: faker.name.firstName(),
            capacity: faker.datatype.number(),
            hotelId: faker.datatype.number(),
            createdAt: date,
            updatedAt: date,
          };
        });

        jest.spyOn(bookingRepository, 'getBookingByRoomAndUserId').mockImplementationOnce((): any => {
          return {
            id: faker.datatype.number(),
            userId,
            roomId,
            createdAt: date,
            updatedAt: date,
          };
        });

        try {
          await bookingService.bookRoomsById(roomId, userId);
        } catch (response) {
          expect(bookingRepository.findByRoomId).toBeCalled();
          expect(bookingRepository.getBookingByRoomAndUserId).toBeCalled();
          expect(response).toEqual({
            name: 'CannotProocedBookingError',
            message: 'Cannot prooced booking request.',
          });
        }
      });

      it('should throw roomCapacityExceedError when requested room has exceed capacity', async () => {
        const roomCapacity = faker.datatype.number();
        const roomId = faker.datatype.number();
        const userId = faker.datatype.number();
        const date = faker.date.future();

        jest.spyOn(bookingRepository, 'findByRoomId').mockImplementationOnce((): any => {
          return {
            id: roomId,
            name: faker.name.firstName(),
            capacity: roomCapacity,
            hotelId: faker.datatype.number(),
            createdAt: date,
            updatedAt: date,
          };
        });

        jest.spyOn(bookingRepository, 'getBookingByRoomAndUserId').mockImplementationOnce((): any => {
          return undefined;
        });

        jest.spyOn(bookingRepository, 'getBookingsCounterByRoomId').mockImplementationOnce((): any => {
          return roomCapacity;
        });

        try {
          await bookingService.bookRoomsById(roomId, userId);
        } catch (response) {
          expect(bookingRepository.findByRoomId).toBeCalled();
          expect(bookingRepository.getBookingByRoomAndUserId).toBeCalled();
          expect(bookingRepository.getBookingsCounterByRoomId).toBeCalled();
          expect(response).toEqual({
            name: 'RoomCapacityExceedError',
            message: 'Room maximum capacity exceed!',
          });
        }
      });
    });
  });
});
