export const schema = {
	querystring: {
		name: { type: 'string' },
		excitement: { type: 'integer' },
	},
	response: {
		200: {
			type: 'object',
			properties: {
				hello: { type: 'string' },
			},
		},
	},
}
