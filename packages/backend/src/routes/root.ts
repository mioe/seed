import type { FastifyPluginAsync } from 'fastify'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const root: FastifyPluginAsync = async(fastify, opts): Promise<void> => {
	fastify.get('/', async(request, reply) => {
		reply.send({ root: true })
	})
}

export default root
