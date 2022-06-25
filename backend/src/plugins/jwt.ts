import fp from 'fastify-plugin'
import { readFileSync } from 'fs'
import type { FastifyPluginCallback } from 'fastify'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jwtPlugin: FastifyPluginCallback = fp(async(fastify, opts, done) => {
	fastify.register(import('@fastify/jwt'), {
		secret: {
			private: {
				key:  readFileSync('../config/private.pem', 'utf8'),
				passphrase: process.env.SECRET_KEY,
			},
			public: readFileSync('../config/public.pem', 'utf8'),
		},
		sign: { algorithm: 'RS256' },
	})

	fastify.decorate('authenticate', async(request, reply) => {
		try {
			await request.jwtVerify()
		} catch (err) {
			reply.send(err)
		}
	})

	done()
})

export default jwtPlugin
