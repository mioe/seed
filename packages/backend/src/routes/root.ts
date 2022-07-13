import type { FastifyPluginAsync } from 'fastify'
import { RolePermissions } from '@seed/shared/constants/permissions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const root: FastifyPluginAsync = async(fastify, opts): Promise<void> => {
	fastify.get('/', async(request, reply) => {
		fastify.log.info('🦕 msg', RolePermissions.View)
		fastify.log.info('🦕 hello world')
		reply.send({ root: true })
	})
}

export default root
