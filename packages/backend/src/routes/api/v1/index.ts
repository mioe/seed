import {
	signUpSchema,
	protectedSchema,
} from './schema'
import type { FastifyPluginAsync, FastifyReply } from 'fastify'
import type { Prisma } from '@prisma/client'

const generateNewTokens = async(reply: FastifyReply) => {
	const [token, refreshToken] = await Promise.all([
		reply.jwtSign({ username: 'misha misha' }),
		reply.jwtSign({ username: 'dd' }, { expiresIn: '3d' }),
	])
	return {
		token,
		refreshToken,
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const routes: FastifyPluginAsync = async(fastify, opts) => {
	fastify.post('/sign-up', {
		schema: signUpSchema,
	},
	async(request, reply) => {
		const {
			redis,
			prisma,
		} = fastify
		const bodyData = request.body as Prisma.UserCreateInput

		try {
			const user = await prisma.user.create({ data: bodyData })
			console.log('🦕 user', user)
		} catch (err) {
			fastify.log.error('user', err)
		}

		const { token, refreshToken } = await generateNewTokens(reply)
		// redis.set('hello', 'world', (err) => {
		// reply.send(err || { token, refreshToken })
		// })

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
	async(_, reply) => {
		const { token, refreshToken } = await generateNewTokens(reply)
		reply.send({ token, refreshToken })
	})

	fastify.get('/protected', {
		onRequest: [fastify.authenticate],
		schema: protectedSchema,
	},
	async(request, reply) => {
		reply.send({ user: request.user })
	})
}

export default routes
