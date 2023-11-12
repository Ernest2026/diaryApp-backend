import { env } from "../env";

const ServerConfig = {
  port: env.PORT,
  database_url: env.DATABASE_URL
}

export default ServerConfig
