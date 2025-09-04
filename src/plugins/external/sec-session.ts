import { readFileSync } from 'node:fs'
import path from 'node:path'

import secSession from '@fastify/secure-session'
import fp from 'fastify-plugin'

import type { FastifyInstance } from 'fastify'

export default fp(
  async (fastify: FastifyInstance): Promise<void> => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    const keyFile = readFileSync(path.resolve(`${import.meta.dirname}/keys/sec-key-valid`))

    await fastify.register(secSession, {
      cookie: {
        path: '/',
        secure: true,
        sameSite: 'lax',
      },
      cookieName: 'sid',
      expiry: 7 * 24 * 60 * 60,
      key: keyFile,
    })
  },
  { name: 'sec-session' },
)
