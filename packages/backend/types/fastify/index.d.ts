import { onRequestHookHandler } from 'fastify'
import { PrismaClient } from '@prisma/client'

declare module 'fastify' {
	export interface FastifyInstance {
		prisma: PrismaClient
		authenticate: onRequestHookHandler
	}
}
