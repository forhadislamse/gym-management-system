import { Model } from 'mongoose';
import { Types } from 'mongoose';
import { TGender } from '../admin/admin.interface';

export type TTrainee = {
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
export interface TraineeModel extends Model<TTrainee> {
  isUserExists(id: string): Promise<TTrainee | null>;
}
