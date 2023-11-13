import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import { ticketService } from '@/services/tickets-service';

async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  const allTicketTypes = await ticketService.getTicketTypes();

  res.status(httpStatus.OK).send(allTicketTypes);
}

async function getUserTicket(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const ticket = await ticketService.getTicketByUserId(userId);

  res.status(200).send(ticket);
}

export { getTicketTypes, getUserTicket };
