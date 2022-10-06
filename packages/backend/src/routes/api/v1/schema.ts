import { FromSchema } from 'json-schema-to-ts'
import { FastifySchema } from 'fastify'

export const signUpBody = {
	type: 'object',
	properties: {
		username: { type: 'string' },
		email: { type: 'string' },
		password: { type: 'string' },
	},
	required: [
		'username',
		'email',
		'password',
	],
	examples: [
		{
			username: `Example-${Date.now()}`,
			email: `example+${Date.now()}@gmail.com`,
			password: 'qazwsxedc',
		},
	],
} as const

export type TSignUpBody = FromSchema<typeof signUpBody>

export const signUpSchema: FastifySchema = {
	tags: ['Authentication with JWT'],
	description: 'Sing Up',
	body: signUpBody,
}
