import env, { type FastifyEnvOptions } from '@fastify/env'
import fp from 'fastify-plugin'

import { LOG_LEVELS } from '@/constants/log-level.js'

import type { FastifyInstance } from 'fastify'

declare module 'fastify' {
  export interface FastifyInstance {
    config: {
      PORT: number
      DATABASE_URL: string
      SECRET: string
      RATE_LIMIT_MAX: number
      LOG_LEVEL: string
    }
  }
}

const schema = {
  type: 'object',
  required: ['DATABASE_URL'],
  properties: {
    PORT: {
      type: 'number',
      default: 3000,
    },
    DATABASE_URL: {
      type: 'string',
      default: 'localhost',
    },
    SECRET: {
      type: 'string',
      default: 'secret',
    },
    RATE_LIMIT_MAX: {
      type: 'number',
      default: 100,
    },
    LOG_LEVEL: {
      type: 'string',
      default: LOG_LEVELS.SILENT,
    },
  },
}

const environmentConfig: FastifyEnvOptions = {
  confKey: 'config',
  schema,
  dotenv: true,
  data: process.env,
}

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    await fastify.register(env, environmentConfig)
  },
  { name: 'env' },
)
