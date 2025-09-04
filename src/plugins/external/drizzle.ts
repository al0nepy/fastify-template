import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import fp from 'fastify-plugin'
import postgres from 'postgres'

import * as schema from '@/database/schema/index.js'

import type { FastifyInstance } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    database: PostgresJsDatabase<typeof schema>
  }
}

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    const queryClient: postgres.Sql = postgres(fastify.config.DATABASE_URL)
    const database: PostgresJsDatabase<typeof schema> = drizzle({
      client: queryClient,
      connection: {
        ssl: false,
      },
      schema,
    })

    fastify.decorate('database', database)

    fastify.addHook('onClose', async () => {
      await queryClient.end()
      fastify.log.info('DATABASE CONNECTION CLOSED')
    })
  },
  {
    name: 'drizzle',
    dependencies: ['env'],
  },
)
