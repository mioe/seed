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
	async(_, reply) => {
		const token = await reply.jwtSign({ username: 'misha misha' })
		const refreshToken = await reply.jwtSign({ username: 'dd' }, { expiresIn: '3d' })
		reply.send({ token, refreshToken })
	})

	fastify.post('/sign-in', {
		schema: signUpSchema,
	},
	(_, reply) => {
		const token = fastify.jwt.sign({ username: 'misha misha' })
		reply.send({ token })
	})

	fastify.post('/sign-out', {
		schema: signUpSchema,
	},
	(_, reply) => {
		const token = fastify.jwt.sign({ username: 'misha misha' })
		reply.send({ token })
	})

	fastify.post('/refresh-token', {
		onRequest: [fastify.authenticate],
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
