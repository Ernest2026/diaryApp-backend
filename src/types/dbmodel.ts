import { Document } from 'mongodb';

export interface UserType extends Document {
  fullname?: string;
  email?: string;
  password?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  entriesId?: string;
  settingId?: string;
}