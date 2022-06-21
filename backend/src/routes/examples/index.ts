import { schema } from './schema'
import { handler } from './handler'
import type { FastifyPluginAsync } from 'fastify'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const examples: FastifyPluginAsync = async(fastify, opts): Promise<void> => {
	fastify.get('/', { schema }, handler)
}

export default examples
