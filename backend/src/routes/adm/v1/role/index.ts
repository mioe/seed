import { roleCreateSchema } from './schema'
import type { Prisma } from '@prisma/client'
import type { FastifyPluginAsync } from 'fastify'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const role: FastifyPluginAsync = async(fastify, opts): Promise<void> => {
	fastify.get('/', {
		onRequest: [fastify.authenticate],
	},
	async(request, reply) => {
		const roles = await fastify.prisma.role.findMany()
		reply.send({ roles })
	})

	fastify.post('/', {
		onRequest: [fastify.authenticate],
		schema: roleCreateSchema,
	},
	async(request, reply) => {
		const body = request.body as Prisma.RoleCreateInput
		const fRole = await fastify.prisma.role.findFirst({ where: { name: body.name }})
		if (!fRole) {
			const role = await fastify.prisma.role.create({ data: body })
			reply.send({ role })
		} else {
			throw new Error('Duplication role')
		}
	})

	fastify.put('/:id', {
		onRequest: [fastify.authenticate],
	},
	async(request, reply) => {
		const id = Number(request.params['id']) as number
		const body = request.body as Prisma.RoleUpdateInput
		const role = await fastify.prisma.role.update({ where: { id }, data: { ...body, updatedAt: new Date() } })
		reply.send({ role })
	})

	fastify.delete('/:id', {
		onRequest: [fastify.authenticate],
	},
	async(request, reply) => {
		const id = Number(request.params['id']) as number
		await fastify.prisma.role.delete({ where: { id } })
		reply.send({ status: 'Success' })
	})
}

export default role
