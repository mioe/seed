import Fastify from 'fastify'
// import { join } from 'path'
// import autoLoad from '@fastify/autoload'

const fastify = Fastify({
  logger: true
})

// Will load all routes under src/routes
// fastify.register(autoLoad, {
//   dir: join(__dirname, 'routes')
// })

fastify.listen({ port: 3001 })
