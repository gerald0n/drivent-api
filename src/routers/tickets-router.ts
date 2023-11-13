import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketTypes, getUserTicket, insertNewTicketUser } from '@/controllers';
import { ticketSchema } from '@/schemas/tickets-schemas';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken);
ticketRouter.get('/types', getTicketTypes);
ticketRouter.get('/', getUserTicket);
ticketRouter.post('/', validateBody(ticketSchema), insertNewTicketUser);

export { ticketRouter };
