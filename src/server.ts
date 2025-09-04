/* eslint-disable unicorn/no-process-exit */
import { TypeBoxValidatorCompiler, type TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { fastify, type FastifyInstance } from 'fastify'
import fp from 'fastify-plugin'

import buildApp from '@/app.js'
import { getLoggerConfig } from '@/utils/logger-config.js'

const app: FastifyInstance = fastify({
  logger: getLoggerConfig(),
  ajv: {
    customOptions: {
      coerceTypes: 'array',
      removeAdditional: 'all',
      useDefaults: true,
      allErrors: false,
    },
  },
})
  .setValidatorCompiler(TypeBoxValidatorCompiler)
  .withTypeProvider<TypeBoxTypeProvider>()

async function init() {
  app.register(fp(buildApp))
  await app.ready()

  try {
    await app.listen({ host: '0.0.0.0', port: app.config.PORT })
  } catch (error) {
    app.log.error(error)
    process.exit(1)
  }
}

async function shutdown(signal: string) {
  try {
    app.log.info(`Received ${signal}. Initiating graceful shutdown...`)
    await app.close()

    app.log.info('Server has been shut down gracefully.')
    process.exit(0)
  } catch (error) {
    app.log.error('Error during shutdown:', error)
    process.exit(1)
  }
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))

init()
