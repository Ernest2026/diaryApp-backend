import { chance } from "./setup"
import UserService from "@/services/user"

export async function generateRandomUser() {
  return UserService.create({
    fullname: chance.name(),
    email: chance.email(),
    password: chance.string({ length: 10 }),
  })
}
