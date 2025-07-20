import { Schema, model } from 'mongoose';
import { TClassSchedule } from './classSchedule.interface';

const classScheduleSchema = new Schema<TClassSchedule>(
  {
    trainer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Trainer',
    },
    trainee: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Trainee',
      },
    ],
    startTime: {
      type: String,
      required: true,
    }, // You can validate HH:mm format optionally
    endTime: {
      type: String,
      required: true,
    },
    maxTrainees: {
      type: Number,
      default: 10,
    }, // you can fix it to 10 too
    classScheduleDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

export const ClassSchedule = model<TClassSchedule>(
  'ClassSchedule',
  classScheduleSchema,
);
