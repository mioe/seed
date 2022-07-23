import { PrismaClient, Prisma } from '@prisma/client'
import { SIMPLE_ROLE_NAME, DEVELOPER_ROLE_PERMISSION } from '../src/common/constants/const'
const prisma = new PrismaClient()

const baseRole: Prisma.RoleCreateInput[] = [
	{
		name: 'Developer',
		description: 'God-mode role for development',
		permissions: DEVELOPER_ROLE_PERMISSION,
	},
	{
		name: SIMPLE_ROLE_NAME,
		description: 'Simple user role after authorization',
	},
]

const main = async() => {
	console.log('🥑 Start seeding ...')
	for (const r of baseRole) {
		const fRole = await prisma.role.findFirst({ where: { name: r.name } })
		if (!fRole) {
			const role = await prisma.role.create({ data: r })
			console.log('🦕 Role created!', role.id, role.name)
		} else {
			console.log('🦕 Skip role', fRole?.id, fRole?.name)
		}
	}
	console.log('🔥 Seeding finished')
}

main()
	.then(async() => { await prisma.$disconnect() })
	.catch(async(err) => {
		console.error(err)
		await prisma.$disconnect()
		process.exit(1)
	})
