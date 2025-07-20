import { z } from 'zod';
import { Gender } from './admin.constant';

export const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    admin: z.object({
      name: z.string(),
      gender: z.enum([...Gender] as [string, ...string[]]),
      dateOfBirth: z.string().optional(),
      phoneNumber: z.string(),
      email: z.string().email(),
      address: z.string().optional(),
    }),
  }),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: z.string().optional(),
      gender: z.enum([...Gender] as [string, ...string[]]).optional(),
      dateOfBirth: z.string().optional(),
      phoneNumber: z.string().optional(),
      email: z.string().email().optional(),
      address: z.string().optional(),
    }),
  }),
});
