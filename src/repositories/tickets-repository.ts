import { Enrollment, Ticket, TicketType } from '@prisma/client';
import { prisma } from '@/config';
import { CreateTicket } from '@/services';

function allTicketsType(): Promise<TicketType[]> {
  return prisma.ticketType.findMany();
}

function getTicketTypeById(id: number) {
  return prisma.ticketType.findFirst({
    where: { id },
  });
}

function getEnrollmentByUserId(userId: number): Promise<Enrollment> {
  return prisma.enrollment.findUnique({
    where: {
      userId,
    },
  });
}

function getTicketByEnrollmentId(enrollmentId: number): Promise<Ticket> {
  return prisma.ticket.findUnique({
    where: { enrollmentId },
  });
}

async function createTicket(ticket: CreateTicket): Promise<CreateTicket> {
  const result = await prisma.ticket.create({
    data: ticket,
    include: { TicketType: true },
  });

  return result;
}

export const ticketRepository = {
  allTicketsType,
  getEnrollmentByUserId,
  getTicketByEnrollmentId,
  getTicketTypeById,
  createTicket,
};
