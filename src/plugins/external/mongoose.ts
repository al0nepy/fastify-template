import fp from 'fastify-plugin'
import mongoose from 'mongoose'

import type { FastifyInstance } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    database: typeof mongoose
  }
}

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    try {
      await mongoose.createConnection(fastify.config.DATABASE_URL)
      fastify.log.info('MongoDB connected successfully')
    } catch (error) {
      fastify.log.error(error)
      throw new Error('Database connection failed')
    }

    fastify.decorate('database', mongoose)

    fastify.addHook('onClose', async () => {
      await fastify.database.connection.close()
      fastify.log.info('DATABASE CONNECTION CLOSED')
    })
  },
  {
    name: 'mongoose',
    dependencies: ['env'],
  },
)
