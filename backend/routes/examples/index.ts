import { FastifyPluginAsync } from 'fastify'

const examples: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return 'Hi there!'
  })
}

export default examples
