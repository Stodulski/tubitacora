import { ApiError } from './errorHandler'
import { Response, NextFunction } from 'express'
import { verifyToken } from '../modules/auth/helpers/jwt'
import { AuthenticatedRequest } from '../modules/auth/types/auth.types'

// Middleware verify session
const verifySession = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token as string
  try {
    const decoded = verifyToken(token) as { id:number }
    console.log(decoded)
    req.user = decoded
    next()
  } catch (error) {
    throw new ApiError(401, 'Unauthorized.')
  }
}

export default verifySession
