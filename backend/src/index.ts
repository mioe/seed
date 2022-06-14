import Fastify from 'fastify'
import { join } from 'path'
import autoLoad from '@fastify/autoload'

const fastify = Fastify({
  logger: true
})

// Will load all routes under src/routes
fastify.register(autoLoad, {
  dir: join(__dirname, 'routes')
})

const start = async () => {
  try {
    await fastify.listen(3000)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
