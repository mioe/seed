import type { FastifyPluginAsync } from 'fastify'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const role: FastifyPluginAsync = async(fastify, opts): Promise<void> => {
	fastify.post('/sign-up', { }, (_, reply) => {
		const token = fastify.jwt.sign({ username: 'misha misha' })
		reply.send({ token })
	})

	fastify.get('/protected', {
		onRequest: [fastify.authenticate],

	},
	async(request, reply) => {
		reply.send({ user: request.user })
	})


	fastify.get('/', {
		onRequest: [fastify.authenticate],
	},
	async(request, reply) => {
		console.log('🦕 msg', request.user)
		reply.send({ hi: 'hi' })
	})
}

export default role
