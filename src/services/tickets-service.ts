import { notFoundError } from '@/errors';
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

export const ticketService = {
  getTicketTypes,
  getTicketByUserId,
};
