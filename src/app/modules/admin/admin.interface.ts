import { Model } from 'mongoose';
import { Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';
export type TAdmin = {
  id: string;
  user: Types.ObjectId;
  name: string;
  gender: TGender;
  dateOfBirth?: string;
  phoneNumber: string;
  email: string;
  address?: string;
  isDeleted: boolean;
};
export interface AdminModel extends Model<TAdmin> {
  isUserExists(id: string): Promise<TAdmin | null>;
}
