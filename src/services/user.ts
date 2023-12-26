import UserModel from '@/models/user'

async function findByEmail(email: string) {
  return UserModel.findOne({ email });
}

const UserService = {
  findByEmail,
}

export default UserService;
