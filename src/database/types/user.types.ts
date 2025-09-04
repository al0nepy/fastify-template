import users from '../schema/users.js'

export type TUser = typeof users.$inferSelect
export type TNewUser = typeof users.$inferInsert
