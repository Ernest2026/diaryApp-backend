import { IEntryPayload } from "@/types/dbmodel";
import EntryModel from "@/models/entry";
import { mongo } from "mongoose";

export async function create(payload: IEntryPayload) {
  return EntryModel.create(payload);
}

export async function getByUserId({ limit, page, userId }: { limit: number, page: number, userId: string }) {
  return EntryModel.find({ userId: new mongo.ObjectId(userId) }).limit(limit).skip(page - 1).sort({ createdAt: "desc" });
}

export async function getById(id: string) {
  return EntryModel.findOne({ _id: new mongo.ObjectId(id) });
}

export async function countUserEntries({ userId }: { userId: string }) {
  return EntryModel.countDocuments({ userId: new mongo.ObjectId(userId) });
}

export async function updateById(id: string, payload: Partial<IEntryPayload>) {
  return EntryModel.updateOne({ _id: new mongo.ObjectId(id) }, payload);
}

export async function deleteById(id: string) {
  return EntryModel.deleteOne({ _id: new mongo.ObjectId(id) });
}
