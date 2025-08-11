import { Request, Response, NextFunction } from 'express'
import {
  createSession,
  login,
  register,
  logout
} from '../services/localAuth.service'
import ApiError from '../../../utils/apiError'
import { UserLogin, UserRegister } from '../types/auth.types'
import sendAuthCookies from '../../../utils/sendAuthCookies'



export const localLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body as UserLogin
    const result = await login({ email, password })
    const generatedTokens = await createSession(result)
    sendAuthCookies(res, generatedTokens)
    res.status(200).json({
      data: {
        id: result.id,
        username: result.username
      }
    })
  } catch (error) {
    next(error)
  }
}

export const localRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password } = req.body as UserRegister
    const result = await register({ username, email, password })
    const generatedTokens = await createSession(result)
    sendAuthCookies(res, generatedTokens)
    res.status(200).json({
      data: {
        id: result.id,
        username: result.username
      }
    })
  } catch (error) {
    next(error)
  }
}

export const sessionLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refreshToken
    await logout(token)
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })
    res.status(200).json({ message: 'Logged out successfully' })
  } catch (error) {
    next(error)
  }
}
