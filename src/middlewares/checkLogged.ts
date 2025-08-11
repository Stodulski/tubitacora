import { Request, Response, NextFunction } from 'express'
import ApiError from '../utils/apiError'
import { verifySession } from '../components/auth/services/localAuth.service'
import { createSession } from '../components/auth/services/localAuth.service'
import sendAuthCookies from '../utils/sendAuthCookies'

declare global {
 namespace Express{
    interface Request{
      user?: number
    }
 }
}

export const checkLogged = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken
    if (!accessToken && !refreshToken) throw new ApiError(401, 'Unauthorized.')
    const sessionResult = await verifySession(refreshToken, accessToken)
    if (sessionResult.usedRefresh) {
      const generatedTokens = await createSession(sessionResult.decoded)
      sendAuthCookies(res, generatedTokens)
    }
    req.user = sessionResult.decoded.id
    next()
  } catch (error) {
    next(error)
  }
}