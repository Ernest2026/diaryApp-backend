import { Document } from 'mongodb';
import { Types } from 'mongoose'

export enum EntryStatus {
  DRAFT = 'draft',
  SYNCED = 'synced',
  EDITED_AFTER_SYNC = 'edited_after_sync',
  DELETED = 'deleted',
}

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
  settingId?: Types.ObjectId | null;
}

export interface IUserPayload {
  fullname: string;
  email: string;
  password: string;
}

export interface IEntryDb {
  _id: Number;
  title: string;
  content: string;
  editorContent: string;
  mood: string;
  status: EntryStatus
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IEntryPayload {
  _id?: Number;
  title: string;
  content: string;
  editorContent: string;
  mood: string;
  status: EntryStatus
  userId?: Types.ObjectId;
  createdAt?: Date;
  updatedAt: Date;
}
