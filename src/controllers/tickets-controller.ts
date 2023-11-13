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

  res.status(httpStatus.OK).send(ticket);
}

async function insertNewTicketUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { ticketTypeId } = req.body as TicketBody;

  const ticket = await ticketService.insertNewTicketUser(userId, ticketTypeId);

  res.status(httpStatus.CREATED).send(ticket);
}

type TicketBody = {
  ticketTypeId: number;
};

export { getTicketTypes, getUserTicket, insertNewTicketUser };
