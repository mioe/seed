import fp from 'fastify-plugin'
import { PrismaClient } from '@prisma/client'
import type { FastifyPluginAsync } from 'fastify'

// Use TypeScript module augmentation to declare the type of server.prisma to be PrismaClient
declare module 'fastify' {
	interface FastifyInstance {
		prisma: PrismaClient
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const prismaPlugin: FastifyPluginAsync = fp(async(server, opts) => {
	const prisma = new PrismaClient()
	await prisma.$connect()

	// Make Prisma Client available through the fastify server instance: server.prisma
	server.decorate('prisma', prisma)
	server.addHook('onClose', async(server) => {
		await server.prisma.$disconnect()
	})
})

export default prismaPlugin
