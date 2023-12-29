import UserModel from '@/models/user'
import { IUserPayload } from '@/types/dbmodel';

async function create(payload: IUserPayload) {
  return UserModel.create(Object.assign(payload, { updatedAt: new Date() }));
}

async function findByEmail(email: string) {
  return UserModel.findOne({ email });
}

const UserService = {
  create,
  findByEmail
}

export default UserService;
