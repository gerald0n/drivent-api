import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTicketTypes, getUserTicket } from '@/controllers';

const ticketRouter = Router();

ticketRouter.all('/*', authenticateToken);
ticketRouter.get('/types', getTicketTypes);
ticketRouter.get('/', getUserTicket);
ticketRouter.post('/tickets');

export { ticketRouter };
