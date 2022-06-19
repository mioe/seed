import { FastifyPluginAsync } from 'fastify'
import { schema } from './schema'
import { handler } from './handler'

const examples: FastifyPluginAsync = async(fastify, opts): Promise<void> => {
	fastify.get('/', { schema }, handler)
}

export default examples
