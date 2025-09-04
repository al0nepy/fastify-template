import path from 'node:path'

import { fastifyAutoload } from '@fastify/autoload'

import type { FastifyInstance, FastifyPluginOptions } from 'fastify'

export default async function buildApp(fastify: FastifyInstance, options_: FastifyPluginOptions) {
  await fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, 'plugins/external'),
    options: { ...options_ },
  })

  await fastify.register(fastifyAutoload, {
    dir: path.join(import.meta.dirname, '/modules'),
    dirNameRoutePrefix: false,
    options: { prefix: '/' },
  })
}
