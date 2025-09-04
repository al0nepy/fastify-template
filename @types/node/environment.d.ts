declare global {
  namespace NodeJS {
    // eslint-disable-next-line unicorn/prevent-abbreviations
    interface ProcessEnv {
      PORT: number
      LOG_LEVEL: string
      DATABASE_URL: string
      SECRET: string
      RATE_LIMIT_MAX: number
      LOG_LEVEL: string
    }
  }
}

export {}
