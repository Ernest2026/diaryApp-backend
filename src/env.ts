import 'dotenv/config';import dotenv from 'dotenv'
import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"

export const env = createEnv({
	clientPrefix: "",
	client: {},
	server: {
		NODE_ENV: z.enum(["production", "development", "test"]),
		PORT: z.coerce.number().min(0).max(65535),
		DATABASE_URL: z.string().url(),
		ACCESS_TOKEN_SECRET: z.string().min(32),
		REFRESH_TOKEN_SECRET: z.string().min(32),
		REFRESH_TOKEN_VALIDITY_PERIOD: z.coerce.number(),
		ACCESS_TOKEN_VALIDITY_PERIOD: z.coerce.number(),
		OTP_VALIDITY_PERIOD: z.coerce.number(),
	},
	/**
	 * Makes sure you explicitly access **all** environment variables
	 * from `server` and `client` in your `runtimeEnv`.
	 */
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		PORT: process.env.PORT,
		DATABASE_URL: process.env.DATABASE_URL,
		ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
		REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
		REFRESH_TOKEN_VALIDITY_PERIOD: process.env.REFRESH_TOKEN_VALIDITY_PERIOD,
		ACCESS_TOKEN_VALIDITY_PERIOD: process.env.ACCESS_TOKEN_VALIDITY_PERIOD,
		OTP_VALIDITY_PERIOD: process.env.OTP_VALIDITY_PERIOD,
	}
})
