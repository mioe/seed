import Fastify from 'fastify'
import { join } from 'path'
import autoLoad from '@fastify/autoload'
import type { FastifyInstance } from 'fastify'
import type { Server, IncomingMessage, ServerResponse } from 'http'

/**
 * Init serve
 */
const fastify: FastifyInstance<
	Server,
	IncomingMessage,
	ServerResponse
> = Fastify({
	logger: true,
})

/**
 * Auto-routing
 */
fastify.register(autoLoad, {
	dir: join(__dirname, 'routes'),
})

/**
 * Start app
 */
fastify.listen({ port: 3001 }, (err, address) => {
	if (err) {
		console.error(err)
		process.exit(1)
	}
})
