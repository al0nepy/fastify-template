import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  out: './src/database/migrations',
  schema: './src/database/schema/index.ts',
  dialect: 'postgresql',
  breakpoints: false,
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
