import { z, ZodSchema } from 'zod'
import { Request, Response, NextFunction } from 'express'

const validateSchema = (schema: ZodSchema<any>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)
    if (!result.success) {
      res.status(400).json({message: result.error.issues[0].message})
      return
    }
    req.body = result.data
    next()
  }
}

export default validateSchema
