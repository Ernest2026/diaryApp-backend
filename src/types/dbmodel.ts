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

export interface EntryType extends Document {
  title?: string;
  emoji?: string;
  text?: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId?: string;
}