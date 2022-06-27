import {
	signUpSchema,
	protectedSchema,
} from './schema'
import type { FastifyPluginAsync } from 'fastify'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const apiV1: FastifyPluginAsync = async(fastify, opts) => {
	fastify.post('/sign-up', {
		schema: signUpSchema,
	},
	(_, reply) => {
		// @ts-ignore
		const token = fastify.jwt.sign({ username: 'misha misha' })
		reply.send({ token })
	})

	fastify.get('/protected', {
		onRequest: [fastify.authenticate],
		schema: protectedSchema,
	},
	async(request, reply) => {
		reply.send({ user: request.user })
	})
}

export default apiV1
