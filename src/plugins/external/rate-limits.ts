import { fastifyRateLimit } from '@fastify/rate-limit'
import fp from 'fastify-plugin'

import type { FastifyInstance } from 'fastify'

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    await fastify.register(fastifyRateLimit, {
      max: fastify.config.RATE_LIMIT_MAX,
      timeWindow: '1 minute',
    })
  },
  { name: 'rate-limit' },
)
