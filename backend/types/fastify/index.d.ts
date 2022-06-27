import type { onRequestHookHandler } from 'fastify'
import type { PrismaClient } from '@prisma/client'

declare module 'fastify' {
	export interface FastifyInstance {
		prisma: PrismaClient
		authenticate: onRequestHookHandler
	}
}
