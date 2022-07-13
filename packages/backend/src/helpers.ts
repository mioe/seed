import type { HookHandlerDoneFunction } from 'fastify'

export const checkPermissions = (
	done: HookHandlerDoneFunction,
	validPermission: string,
	userPermissions: string[] = [],
) => {
	if (userPermissions.includes(validPermission)) {
		done()
	} else {
		throw new Error('Access denied')
	}
}
