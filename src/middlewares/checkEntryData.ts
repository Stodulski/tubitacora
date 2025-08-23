import { NextFunction, Request, Response } from 'express'
import { ZodSchema } from 'zod'
import { ApiError } from './errorHandler'

// Verify zod schema
const checkEntryData = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      throw new ApiError(401, result.error?.issues[0].message)
    }
    req.body = result.data
    next()
  }
}

export default checkEntryData