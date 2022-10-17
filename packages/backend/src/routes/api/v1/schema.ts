import { FromSchema } from 'json-schema-to-ts'
import { FastifySchema } from 'fastify'

export const signUpBody = {
	type: 'object',
	properties: {
		body: {
			properties: {
				username: { type: 'string' },
				email: { type: 'string' },
				password: { type: 'string' },
			},
		},
		fingerprint: { type: 'string' },
	},
	required: [
		'body',
		'fingerprint',
	],
	examples: [
		{
			body:{
				username: `Example-${Date.now()}`,
				email: `example+${Date.now()}@gmail.com`,
				password: 'qazwsxedc',
			},
			fingerprint: '0427ef4bd35f736f37e25034cb1d934c::Mac OS(10.15.7)::Chrome(106.0.0.0)::Blink',
		},
	],
} as const

export type TSignUpBody = FromSchema<typeof signUpBody>

export const signUpSchema: FastifySchema = {
	tags: ['Authentication with JWT'],
	description: 'Sing Up',
	body: signUpBody,
}
