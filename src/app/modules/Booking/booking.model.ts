import mongoose, { Schema } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    classSchedule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClassSchedule',

      required: [true, 'Class schedule is required'],
    },
    trainee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trainee',
      required: [true, 'Trainee is required'],
    },
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trainer',
      required: [true, 'Trainer is required'],
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = mongoose.model<TBooking>('Booking', bookingSchema);
