import { TRole } from './user.interface';

export const Role: TRole[] = ['admin', 'trainer', 'trainee'];
export const USER_ROLE = {
  admin: 'admin',
  trainer: 'trainer',
  trainee: 'trainee',
} as const;
