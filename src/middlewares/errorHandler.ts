import { Request, Response, NextFunction } from 'express'

// Error instance
export class ApiError extends Error {
  status: number
  constructor (status: number, message: string) {
    super(message)
    this.status = status
  }
}

// Middleware error handler
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err ? err.status : 500
  const message = err ? err.message : 'Server error.'
  res.status(status).json({ data: { message: message } })
}
