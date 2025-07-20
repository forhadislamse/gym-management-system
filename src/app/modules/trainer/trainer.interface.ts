import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { TGender } from '../admin/admin.interface';

export type TTrainer = {
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
export interface TrainerModel extends Model<TTrainer> {
  isUserExists(id: string): Promise<TTrainer | null>;
}
