import { env } from "../env";

const ServerConfig = {
  port: env.PORT,
  node_env: env.NODE_ENV,
  database_url: env.DATABASE_URL,
}

export default ServerConfig
