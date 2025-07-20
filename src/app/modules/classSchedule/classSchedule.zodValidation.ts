import { z } from 'zod';

const timeStringSchema = z.string().refine(
  (time) => {
    const regex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // 00-09 10-19 20-23
    return regex.test(time);
  },
  {
    message: 'Invalid time format , expected "HH:MM" in 24 hours format',
  },
);
export const createClassScheduleValidationSchema = z.object({
  body: z
    .object({
      trainer: z.string(),
      trainee: z.array(z.string()),
      maxTrainees: z.number(),
      classScheduleDate: z.string().datetime(),
      startTime: timeStringSchema, // HH: MM   00-23: 00-59
      endTime: timeStringSchema,
    })
    .refine(
      (body) => {
        // startTime : 10:30  => 1970-01-01T10:30
        //endTime : 12:30  =>  1970-01-01T12:30
        // console.log(body);
        const start = new Date(`1970-01-01T${body.startTime}:00`);
        const end = new Date(`1970-01-01T${body.endTime}:00`);

        return end > start;
      },
      {
        message: 'Start time should be before End time !  ',
      },
    ),
});

export const assignTrainerValidationSchema = z.object({
  params: z.object({
    scheduleId: z.string({ required_error: 'Schedule ID is required' }),
  }),
  body: z.object({
    trainerId: z.string({ required_error: 'Trainer ID is required' }),
  }),
});
