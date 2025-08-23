import * as authService from './service'

import { Request, Response, NextFunction } from 'express'
import { signToken } from './helpers/jwt'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body
    const user = await authService.login(email, password)
    const token = signToken(user.id)
    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      path: '/'
    })
    res.status(200).json({
      data: {
        message: 'Logged in.',
        user: { id: user.id }
      }
    })
  } catch (error) {
    next(error)
  }
}

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, dni, birthdate, name, lastname, rePassword } =
      req.body
    const user = await authService.register(
      password,
      dni,
      birthdate,
      name,
      lastname,
      rePassword,
      email
    )
    const token = signToken(user.id)
    res.cookie('token', token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
      path: '/'
    })
    res.status(201).json({
      data: {
        message: 'register successfully.',
        user: { id: user.id }
      }
    })
  } catch (error) {
    next(error)
  }
}

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    path: '/'
  })
  res.status(200).json({ data: { message: 'Logged out.' } })
}
