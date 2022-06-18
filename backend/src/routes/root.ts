import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async(fastify, opts): Promise<void> => {
	fastify.get('/', async(request, reply) => {
		fastify.log.info('🦕 hello world')
		reply.send({ root: true })
	})
}

export default root
