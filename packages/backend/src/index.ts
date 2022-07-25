import Fastify from 'fastify'
import { join } from 'path'
import autoload from '@fastify/autoload'
import 'dotenv/config'
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
	logger: {
		transport: {
			target: 'pino-pretty',
			options: {
				destination: 1,
				colorize: true,
				translateTime: 'mm-dd-yy HH:MM:ss Z',
				ignore: 'pid,hostname',
			},
		},
	},
})

/**
 * Auto-install plugins
 */
fastify.register(autoload, {
	dir: join(__dirname, 'plugins'),
})

/**
 * Auto-routing
 */
fastify.register(autoload, {
	dir: join(__dirname, 'routes'),
})

/**
 * Start app
 */
fastify.listen({ port: 3001 }, (err, address) => {
	console.log('🦕 Server listening at', address)
	if (err) {
		console.error(err)
		process.exit(1)
	}
})
