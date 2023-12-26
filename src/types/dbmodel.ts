import { Document } from 'mongodb';
import { Types } from 'mongoose'

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

export interface IUserDb {
  _id: Types.ObjectId;
  fullname: string;
  email: string;
  password: string;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
  entriesId?: Types.ObjectId | null;
  settingId?: types.ObjectId | null;
}

export interface IEntryDb {
  _id: Types.ObjectId;
  title: string;
  emoji: string;
  text: string;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEntryPayload {
  title: string;
  emoji: string;
  text: string;
  updatedAt: Date;
  userId: string
}
