import { Types } from 'mongoose';

export type TBooking = {
  classSchedule: Types.ObjectId;
  trainee: Types.ObjectId;
  trainer: Types.ObjectId;
  bookingDate: Date;
};
