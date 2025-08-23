import { Request } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number
      }
    }
  }
}

export interface AuthenticatedRequest extends Request {
  user?: { id: number }
}

export type UserWithPassword = {
  email: string
  password: string
  id: number
}
