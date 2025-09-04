import { FastifyRequest } from 'fastify'

import { LOG_LEVELS } from '@/constants/log-level.js'

import type { LoggerOptions } from 'pino'
import 'dotenv/config'

export function getLoggerConfig(): LoggerOptions {
  const isTTY = process.stdout.isTTY
  const level = isTTY ? LOG_LEVELS.INFO : process.env.LOG_LEVEL
  const logger: LoggerOptions = {
    level,
  }

  if (isTTY) {
    logger.transport = {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    }
  } else {
    logger.redact = ['req.headers.authorization']
    logger.serializers = {
      req: (request: FastifyRequest) => ({ method: request.method, url: request.url }),
    }
  }

  return logger
}
