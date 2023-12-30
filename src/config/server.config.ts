import { env } from "../env";

const ServerConfig = {
  port: env.PORT,
  node_env: env.NODE_ENV,
  database_url: env.DATABASE_URL,
  hosturl: env.HOSTURL
}

export default ServerConfig
