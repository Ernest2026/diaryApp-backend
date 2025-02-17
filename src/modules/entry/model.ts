import { EntryStatus, IEntryDb } from '@/types/dbmodel';
import { Schema, model } from 'mongoose';

const EntrySchema = new Schema<IEntryDb>(
  {
    _id: {
      type: Number,
      required: true,
      default: Date.now,
    },
    title: {
      type: String,
      // required: [true, 'Enter title'],
    },
    content: {
      type: String,
    },
    editorContent: {
      type: String,
    },
    mood: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(EntryStatus),
      default: EntryStatus.SYNCED,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
      default: new Date(),
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
