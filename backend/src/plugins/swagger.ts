import fp from 'fastify-plugin'
import swagger, { FastifyDynamicSwaggerOptions } from '@fastify/swagger'

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
		},
		hideUntagged: true,
		exposeRoute: true,
	})
})
