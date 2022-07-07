import { FromSchema } from 'json-schema-to-ts'
import type { FastifySchema } from 'fastify'

export const roleCreateInputBody = {
	type: 'object',
	properties: {
		name: { type: 'string' },
		description: { type: 'string' },
		permissions: { type: 'array', items: { type: 'string' } },
	},
	examples: [
		{
			name: 'New random role',
			description: 'Description role',
			permissions: ['role::read', 'role::create'],
		},
		{
			name: 'New random role2',
			description: 'Description role2',
			permissions: ['role::read', 'role::create'],
		},
	],
	required: ['name'],
} as const

export type RoleCreateInputBody = FromSchema<typeof roleCreateInputBody>

export const roleCreateSchema: FastifySchema = {
	tags: ['Role'],
	description: 'Create new role',
	body: roleCreateInputBody,
}
