import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import { FastifyDynamicSwaggerOptions } from '@fastify/swagger'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default fp<FastifyDynamicSwaggerOptions>(async(fastify, opts) => {
	fastify.register(swagger, {
		openapi: {
			info: {
				title: 'Fastify REST API',
				description: 'Use JSON Schema & TypeScript for better DX',
				version: '0.0.1',
			},
			servers: [
				{
					url: 'http://localhost:3001',
				},
			],
			components: {
				securitySchemes: {
					bearerAuth: {
						type: 'http',
						scheme: 'bearer',
						bearerFormat: 'JWT',
					},
				},
			},
			security: [{
				bearerAuth: [],
			}],
		},
		hideUntagged: true,
		exposeRoute: true,
	})
})
