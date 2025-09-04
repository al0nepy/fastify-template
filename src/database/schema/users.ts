import { pgTable, serial, varchar, timestamp } from 'drizzle-orm/pg-core'

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  login: varchar('login', { length: 50 }),
  email: varchar('email').notNull().unique(),
  password: varchar('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export default users
