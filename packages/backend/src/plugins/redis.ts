import fp from 'fastify-plugin'
import type { FastifyPluginCallback } from 'fastify'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const redisPlugin: FastifyPluginCallback = fp(async(fastify: any, opts: any, done: any) => {
	fastify.register(import('@fastify/redis'), {
		host: '127.0.0.1',
		password: process.env.REDIS_PASSWORD,
		port: '63790',
	})
	done()
})

export default redisPlugin
