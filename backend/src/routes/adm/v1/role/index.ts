import type { FastifyPluginAsync } from 'fastify'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const role: FastifyPluginAsync = async(fastify, opts): Promise<void> => {
	fastify.get('/', {
		onRequest: [fastify.authenticate],
	},
	async(request, reply) => {
		console.log('🦕 msg', request.user)
		reply.send({ hi: 'hi' })
	})
}

export default role
