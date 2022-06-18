import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async(fastify, opts): Promise<void> => {
	fastify.get('/', async(request, reply) => {
		reply.send({ root: true })
	})
}

export default root
