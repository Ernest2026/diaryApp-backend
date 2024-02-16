import EntryModel from "@/modules/entry/model";
import { IEntryPayload } from "@/types/dbmodel";
import { mongo } from "mongoose";

class Entry {
  // constructor(parameters) {
    
  // }

  async create(payload: IEntryPayload) {
    return EntryModel.create(payload);
  }
  
  async getByUserId({ limit, page, userId }: { limit?: string, page?: string, userId: string }) {
    return EntryModel.find({ userId: new mongo.ObjectId(userId) }).sort({ createdAt: "desc" });
    // return EntryModel.find({ userId: new mongo.ObjectId(userId) }).limit(limit).skip(page - 1).sort({ createdAt: "desc" });
  }
  
  async getById(id: string) {
    return EntryModel.findOne({ _id: new mongo.ObjectId(id) });
  }
  
  async countUserEntries({ userId }: { userId: string }) {
    return EntryModel.countDocuments({ userId: new mongo.ObjectId(userId) });
  }
  
  async updateById(id: string, payload: Partial<IEntryPayload>) {
    return EntryModel.updateOne({ _id: new mongo.ObjectId(id) }, payload);
  }
  
  async deleteById(id: string) {
    return EntryModel.deleteOne({ _id: new mongo.ObjectId(id) });
  }
}

export default new Entry()
