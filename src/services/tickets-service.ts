import { Ticket, TicketStatus } from '@prisma/client';
import { invalidDataError, notFoundError } from '@/errors';
import { ticketRepository } from '@/repositories/tickets-repository';

async function getTicketTypes() {
  const result = await ticketRepository.allTicketsType();

  return result;
}

async function getTicketByUserId(userId: number) {
  const enrollment = await ticketRepository.getEnrollmentByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await ticketRepository.getTicketByEnrollmentId(enrollment.id);

  if (!ticket) {
    throw notFoundError();
  }

  const ticketType = await ticketRepository.getTicketTypeById(ticket.ticketTypeId);

  if (!ticketType) {
    throw notFoundError();
  }

  return {
    ...ticket,
    TicketType: ticketType,
  };
}

async function insertNewTicketUser(userId: number, ticketTypeId: number) {
  if (!ticketTypeId) {
    throw invalidDataError('ticketTypeId');
  }

  const enrollment = await ticketRepository.getEnrollmentByUserId(userId);

  if (!enrollment) {
    throw notFoundError();
  }

  const ticketData: CreateTicket = {
    enrollmentId: enrollment.id,
    ticketTypeId,
    status: TicketStatus.RESERVED,
  };

  const ticket = await ticketRepository.createTicket(ticketData);

  return ticket;
}

export type CreateTicket = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

export const ticketService = {
  getTicketTypes,
  getTicketByUserId,
  insertNewTicketUser,
};
