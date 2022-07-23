import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

const baseRole: Prisma.RoleCreateInput[] = [
	{
		name: 'Developer',
		description: 'God-mode role for development',
		permissions: 'developer',
	},
	{
		name: 'User',
		description: 'Simple user role after authorization',
	},
]

const main = async() => {
	console.log('🦕 Start seeding ...')
	for (const r of baseRole) {
		const fRole = await prisma.role.findFirst({ where: { name: r.name } })
		if (!fRole) {
			const role = await prisma.role.create({ data: r })
			console.log('🦕 Role created!', role.id, role.name)
		}
		console.log('🦕 Skip role', fRole?.id, fRole?.name)
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
