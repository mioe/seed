import fp from 'fastify-plugin'
import { FastifyPluginAsync } from 'fastify'
import cookie, { FastifyCookieOptions } from '@fastify/cookie'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const fastifyCookie: FastifyPluginAsync = fp(async(server, opts) => {
	server.register(cookie, {
		secret: process.env.COOKIE_SIGNATURE,
		parseOptions: {
			secure: true,
			httpOnly: true,
		},
	} as FastifyCookieOptions)
})

export default fastifyCookie
