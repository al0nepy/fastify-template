import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'

import { healthResponseSchema } from './health.schema.js'

import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

export const healthRoutes: FastifyPluginAsyncTypebox = async (app: FastifyInstance): Promise<void> => {
  app.get('/', { schema: healthResponseSchema }, async (_request: FastifyRequest, reply: FastifyReply) => {
    return reply.code(200).send({ msg: 'Healthy!' })
  })
}
