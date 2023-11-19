import { Schema, model } from "mongoose";

const EntrySchema = new Schema(
  {
    title: { type: String },
    emoji: { type: String },
    text: { type: String },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

export default model("Entry", EntrySchema);
