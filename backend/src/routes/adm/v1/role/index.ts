import {
	roleSchema,
	roleViewSchema,
	roleCreateSchema,
	roleUpdateSchema,
	roleRemoveSchema,
} from './schema'
import { checkPermissions } from '../../../../helpers'
import { RolePermissions } from '../../../../permissions'
import type { Prisma } from '@prisma/client'
import type { FastifyPluginAsync } from 'fastify'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const role: FastifyPluginAsync = async(fastify, opts): Promise<void> => {
	fastify.addSchema(roleSchema)

	fastify.get('/', {
		onRequest: [
			fastify.authenticate,
			(request, reply, done) => {
				checkPermissions(
					done,
					RolePermissions.View,
					request.user['permissions'],
				)
			},
		],
		schema: roleViewSchema,
	},
	async(request, reply) => {
		const roles = await fastify.prisma.role.findMany()
		reply.send({ roles })
	})

	fastify.post('/', {
		onRequest: [
			fastify.authenticate,
			(request, reply, done) => {
				checkPermissions(
					done,
					RolePermissions.Create,
					request.user['permissions'],
				)
			},
		],
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
		onRequest: [
			fastify.authenticate,
			(request, reply, done) => {
				checkPermissions(
					done,
					RolePermissions.Update,
					request.user['permissions'],
				)
			},
		],
		schema: roleUpdateSchema,
	},
	async(request, reply) => {
		const id = Number(request.params['id']) as number
		const body = request.body as Prisma.RoleUpdateInput
		const role = await fastify.prisma.role.update({
			where: { id },
			data: { ...body, updatedAt: new Date() },
		})
		reply.send({ role })
	})

	fastify.delete('/:id', {
		onRequest: [
			fastify.authenticate,
			(request, reply, done) => {
				checkPermissions(
					done,
					RolePermissions.Remove,
					request.user['permissions'],
				)
			},
		],
		schema: roleRemoveSchema,
	},
	async(request, reply) => {
		const id = Number(request.params['id']) as number
		await fastify.prisma.role.delete({ where: { id } })
		reply.send({ status: 'Success' })
	})
}

export default role
