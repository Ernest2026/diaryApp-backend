import { IEntryDb } from '@/types/dbmodel';
import { Schema, model } from 'mongoose';

const EntrySchema = new Schema<IEntryDb>(
  {
    title: {
      type: String,
      required: [true, 'Enter title'],
    },
    emoji: {
      type: String,
      required: [true, 'Enter emoji'],
    },
    text: {
      type: String,
      required: [true, 'Enter text'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    toJSON: {
      transform: function(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  });

const EntryModel = model('Entry', EntrySchema);
export default EntryModel
