import { Types } from 'mongoose';

export type TClassSchedule = {
  trainer: Types.ObjectId;
  trainee: Types.ObjectId[];
  startTime: string;
  endTime: string;
  maxTrainees: number;
  classScheduleDate: Date;
};
export type TSchedule = {
  startTime: string;
  endTime: string;
};
