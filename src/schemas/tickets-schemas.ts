import Joi from 'joi';

type Ticket = {
  ticketTypeId: number;
};

export const ticketSchema = Joi.object<Ticket>({
  ticketTypeId: Joi.number(),
});
