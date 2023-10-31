import { env } from "@/env"

const JWTConfig = {
	secret: {
		accessToken: env.ACCESS_TOKEN_SECRET,
		refreshToken: env.REFRESH_TOKEN_SECRET
	},
	validity: {
		accessToken: env.ACCESS_TOKEN_VALIDITY_PERIOD,
		refreshToken: env.REFRESH_TOKEN_VALIDITY_PERIOD,
		otp: env.OTP_VALIDITY_PERIOD
	}
}

export default JWTConfig
