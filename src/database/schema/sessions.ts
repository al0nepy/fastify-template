import { integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core'

import users from './users.js'

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  sessionToken: varchar('sessionToken', { length: 255 }).notNull().unique(),
  userId: integer('userId')
    .references(() => users.id)
    .notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
})
