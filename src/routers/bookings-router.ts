import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { bookRooms, changeBooking, getBooking } from '@/controllers';
import { bookingSchema } from '@/schemas/bookings-schemas';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('/', getBooking)
  .post('/', validateBody(bookingSchema), bookRooms)
  .put('/:bookingId', validateBody(bookingSchema), changeBooking);

export { bookingRouter };
