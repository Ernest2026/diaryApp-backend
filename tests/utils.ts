import { prisma } from "@/utils/database_"
import Chance from 'chance'
import config from "@/config"

const chance = new Chance();

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
