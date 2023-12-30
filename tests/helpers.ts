import { UserType } from "@/types/dbmodel";
import { chance } from "./setup"
import UserService from "@/modules/user/service"

export async function generateRandomUser() {
  return UserService.create({
    fullname: chance.name(),
    email: chance.email(),
    password: chance.string({ length: 10 }),
    updatedAt: new Date(),
  })
}

export async function deleteGeneratedUser(email: string) {
  return UserService.deleteUser({email});
}