import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
	clientPrefix: "",
	client: {},
	server: {
		NODE_ENV: z.enum(["production", "development", "test"]),
		PORT: z.coerce.number().min(0).max(65535),
		DATABASE_URL: z.string().url(),
	},
	/**
	 * Makes sure you explicitly access **all** environment variables
	 * from `server` and `client` in your `runtimeEnv`.
	 */
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		PORT: process.env.PORT,
		DATABASE_URL: process.env.DATABASE_URL,
	}
})
