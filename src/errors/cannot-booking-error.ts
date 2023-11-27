import { ApplicationError } from '@/protocols';

export function cannotBookError(): ApplicationError {
  return {
    name: 'CannotBookingError',
    message: 'Cannot booking room',
  };
}
