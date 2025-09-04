import sensible from '@fastify/sensible'
import fp from 'fastify-plugin'

import type { FastifyInstance } from 'fastify'

export default fp(async (fastify: FastifyInstance): Promise<void> => {
  await fastify.register(sensible)
})
