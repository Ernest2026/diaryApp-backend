import config from "@/config";
import AuthService from "@/modules/user/service";
import { Chance } from "chance";

const chance = new Chance();

export async function generateUser() {
  return await AuthService.create({
    fullname: chance.name(),
    email: chance.email(),
    password: chance.string({ length: 10 }),
    updatedAt: new Date()
  });
}
