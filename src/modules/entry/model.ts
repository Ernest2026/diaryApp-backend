import { EntryStatus, IEntryDb } from '../../types/dbmodel';
import { Schema, model } from 'mongoose';

const EntrySchema = new Schema<IEntryDb>(
  {
    _id: {
      type: Number,
      required: true,
      default: () => Date.now(), // explicit, safer
    },
    title: {
      type: String,
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
      default: () => new Date(),
    },
    updatedAt: {
      type: Date,
      default: () => new Date(),
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    versionKey: false, // 👈 removes __v cleanly
    toJSON: {
      transform(_, ret) {
        return ret; // 👈 no deletes needed
      },
    },
  }
);

const EntryModel = model<IEntryDb>('Entry', EntrySchema);
export default EntryModel;
