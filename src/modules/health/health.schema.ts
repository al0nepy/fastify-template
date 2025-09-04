import { Type } from '@sinclair/typebox'

export const healthResponseSchema = {
  response: {
    200: Type.Object({
      msg: Type.String(),
    }),
  },
}
