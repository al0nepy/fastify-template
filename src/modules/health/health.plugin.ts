import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

import { healthRoutes } from './health.routes.js'

const healthModule: FastifyPluginAsyncTypebox = async (app: FastifyInstance): Promise<void> => {
  app.register(healthRoutes, { prefix: '/health' })
}

export default fp(healthModule, { name: 'health-module' })
