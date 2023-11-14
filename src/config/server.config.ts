import { env } from "../env";

const ServerConfig = {
  port: env.PORT,
  database_url: env.DATABASE_URL,
  hosturl: env.HOSTURL
}

export default ServerConfig
