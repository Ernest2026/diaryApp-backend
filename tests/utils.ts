import { prisma } from "@/utils/database"
import { chance } from "./setup"
import config from "@/config"

export async function generateUser() {
  return await prisma.user.create({
    data: {
      name: `${chance.first()} ${chance.last()}`,
      email: chance.email({ domain: 'localhost.lan' }),
      imageUrl: chance.url({ domain: `localhost:${config.server.port}` }),
      password: chance.string({ length: 10 })
    }
  })
}
