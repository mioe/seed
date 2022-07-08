import fp from 'fastify-plugin'
import { readFileSync } from 'fs'
import { join } from 'path'
import type { FastifyPluginCallback } from 'fastify'

const PATH = join(__dirname, '../../config')

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const jwtPlugin: FastifyPluginCallback = fp(async(fastify, opts, done) => {
	fastify.register(import('@fastify/jwt'), {
		secret: {
			private: {
				key:  readFileSync(`${PATH}/private.pem`, 'utf8'),
				passphrase: process.env.SECRET_KEY,
			},
			public: readFileSync(`${PATH}/public.pem`, 'utf8'),
		},
		sign: {
			algorithm: 'RS256',
			expiresIn: '15m',
		},
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
