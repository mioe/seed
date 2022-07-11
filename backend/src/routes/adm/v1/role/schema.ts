import { FromSchema } from 'json-schema-to-ts'
import { RolePermissions } from '../../../../permissions'
import type { FastifySchema } from 'fastify'

/** Schema */
export const roleSchema = {
	$id: 'role',
	type: 'object',
	properties: {
		id: { type: 'number' },
		name: { type: 'string' },
		description: { type: 'string' },
		permissions: { type: 'array', items: { type: 'string' } },
		createdAt: { type: 'string' },
		updatedAt: { type: 'string' },
	},
	examples: [
		{
			name: 'Role manager',
			description: 'View, create, update and remove role',
			permissions: [
				RolePermissions.View,
				RolePermissions.Create,
				RolePermissions.Update,
				RolePermissions.Remove,
			],
		},
		{
			name: 'View role',
			description: 'Only view role',
			permissions: [
				RolePermissions.View,
			],
		},
	],
	required: ['name'],
} as const
export type Body = FromSchema<typeof roleSchema>

/** Params */
const paramsSchema = {
	type: 'object',
	required: ['id'],
	properties: {
		id: { type: 'number' },
	},
	additionalProperties: false,
} as const
export type Params = FromSchema<typeof paramsSchema>

/** Response schema */
const replySchema = {
	type: 'object',
	properties: {
		roles: {
			type: 'array',
			items: { $ref: 'role#' },
		},
	},
	additionalProperties: false,
} as const
export type Reply = FromSchema<typeof replySchema, { references: [typeof roleSchema] }>

/** Get */
export const roleViewSchema: FastifySchema = {
	tags: ['Role'],
	description: 'Get role list',
	response: {
		200: {
			...replySchema,
		},
	},
}

/** Post */
export const roleCreateSchema: FastifySchema = {
	tags: ['Role'],
	description: 'Create new role',
	body: roleSchema,
}

/** Put */
export const roleUpdateSchema: FastifySchema = {
	tags: ['Role'],
	description: 'Update role',
	params: paramsSchema,
	body: roleSchema,
}

/** Delete */
export const roleRemoveSchema: FastifySchema = {
	tags: ['Role'],
	description: 'Remove role',
	params: paramsSchema,
}
