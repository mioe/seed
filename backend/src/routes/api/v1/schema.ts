import { FromSchema } from 'json-schema-to-ts'
import type { FastifySchema } from 'fastify'

export const signUpBody = {
	$id: 'post',
	type: 'object',
	properties: {
		username: { type: 'string' },
		password: { type: 'string' },
	},
	required: ['username', 'password'],
} as const

export type TSignUpBody = FromSchema<typeof signUpBody>

export const signUpSchema: FastifySchema = {
	tags: ['jwt authentication'],
	description: 'Sing Up',
	body: signUpBody,
	response: {
		200: {
			token: { type: 'string' },
		},
	},
}


export const protectedSchema: FastifySchema = {
	tags: ['jwt authentication'],
	description: 'Testing protected route',
	response: {
		200: {
			user: { type: 'string' },
		},
	},
}
