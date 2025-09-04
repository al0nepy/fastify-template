import fastifySwagger from '@fastify/swagger'
import scalarApiReference from '@scalar/fastify-api-reference'
import { Type } from '@sinclair/typebox'
import { FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

const ErrorResponse = Type.Object({
  error: Type.String(),
  message: Type.String(),
  statusCode: Type.Number(),
})

export default fp(async function (fastify: FastifyInstance): Promise<void> {
  fastify.addSchema({
    $id: 'ErrorResponse',
    ...ErrorResponse,
  })

  await fastify.register(fastifySwagger, {
    hideUntagged: true,
    openapi: {
      info: {
        title: 'Fastify Open local API',
        description: 'Open local API',
        version: '0.1.0',
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            description: 'JWT (email, password)',
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
    },
  })

  await fastify.register(scalarApiReference, {
    routePrefix: '/api/docs',
  })
})
