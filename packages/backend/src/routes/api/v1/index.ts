import {
	signUpSchema,
} from './schema'
import { SIMPLE_ROLE_NAME } from '../../../common/constants/const'
import { FastifyPluginAsync, FastifyReply } from 'fastify'
import { FastifyRedis } from '@fastify/redis'
import { Prisma } from '@prisma/client'
import { createHmac } from 'node:crypto'
import { v4 as uuidv4 } from 'uuid'

const encodeRefreshToken = (token: string, userId: string) => {
	const separator = '-'
	const a = token.split(separator)
	const b = userId.split(separator)
	return `${a[0]}${separator}${b[4]}${separator}${a[1]}${separator}${b[3]}${separator}${a[2]}${separator}${b[2]}${separator}${a[3]}${separator}${b[1]}${separator}${a[4]}${separator}${b[0]}`
}

const decodeRefreshToken = (token: string) => {
	const separator = '-'
	const a = token.split(separator)
	return {
		userId: `${a[0]}${separator}${a[2]}${separator}${a[4]}${separator}${a[6]}${separator}${a[8]}`,
		refreshToken: `${a[9]}${separator}${a[7]}${separator}${a[5]}${separator}${a[3]}${separator}${a[1]}`,
	}
}

const generateNewTokens = async(
	reply: FastifyReply,
	redis: FastifyRedis,
	currentUser: Prisma.UserCreateInput,
	fingerprint: string,
	prefix: string | undefined = 'user',
) => {
	const accessToken = await reply.jwtSign({
		id: currentUser.id,
		username: currentUser.username,
		email: currentUser.email,
	})
	const refreshToken = uuidv4()
	redis.set(`${prefix}:${currentUser.id}:${refreshToken}`, fingerprint, (err) => {
		if (err) { throw new Error(`🦕 ${err}`) }
	})
	return {
		accessToken,
		refreshToken: encodeRefreshToken(refreshToken, currentUser.id as string),
	}
}

interface SignUpBody {
	body: Prisma.UserCreateInput
	fingerprint: string,
}

let CACHE_SIMPLE_ROLE_ID: number | undefined = undefined

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

		try {
			if (!CACHE_SIMPLE_ROLE_ID) {
				const fSimpleRole = await prisma.role.findFirst({
					where: { name: SIMPLE_ROLE_NAME },
				})
				if (!fSimpleRole) {
					throw new Error('🦕 Simple Role doesn\'t exist')
				}
				fastify.log.info('🦕 Cache for Simple Role created!')
				CACHE_SIMPLE_ROLE_ID = fSimpleRole.id
			}

			const bodyRequest = request.body as SignUpBody
			const hashPassword = createHmac('sha256', process.env.PASSWORD_SECRET as string)
				.update(bodyRequest.body.password)
				.digest('hex')
			const bodyData = {
				...bodyRequest.body,
				password: hashPassword,
				Role: {
					connect: {
						id: CACHE_SIMPLE_ROLE_ID,
					},
				},
			} as Prisma.UserCreateInput

			const currentUser = await prisma.user.create({ data: bodyData }) as any
			const { accessToken, refreshToken } = await generateNewTokens(
				reply,
				redis,
				currentUser,
				bodyRequest.fingerprint,
			)
			reply
				.setCookie('accessToken', accessToken, {
					domain: 'localhost',
					path: '/api',
					signed: true,
				})
				.send({ accessToken, refreshToken })
		} catch (err) {
			fastify.log.error(err)
			throw new Error(`🦕 Something went wrong\n ${err}`)
		}
	})

	// fastify.post('/sign-in', {
	// 	schema: signUpSchema,
	// },
	// (_, reply) => {
	// 	const token = fastify.jwt.sign({ username: 'misha misha' })
	// 	reply.send({ token })
	// })

	// fastify.post('/sign-out', {
	// 	schema: signUpSchema,
	// },
	// (_, reply) => {
	// 	const token = fastify.jwt.sign({ username: 'misha misha' })
	// 	reply.send({ token })
	// })

	// fastify.post('/refresh-token', {
	// 	onRequest: [fastify.authenticate],
	// 	schema: signUpSchema,
	// },
	// async(_, reply) => {
	// 	const { token, refreshToken } = await generateNewTokens(reply)
	// 	reply.send({ token, refreshToken })
	// })

	// fastify.get('/protected', {
	// 	onRequest: [fastify.authenticate],
	// },
	// async(request, reply) => {
	// 	reply.send({ user: request.user })
	// })
}

export default routes
