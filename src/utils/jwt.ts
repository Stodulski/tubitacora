import jwt from 'jsonwebtoken'
import ApiError from './apiError'
import { getToken, updateToken } from '../components/auth/models/localAuth.model'
import { DecodedToken, UserPayload } from '../components/auth/types/auth.types'

export const signRefreshToken = ({ id, username }: UserPayload): string => {
  try {
    const secret = process.env.REFRESH_SECRET as string
    const payload = { id, username }
    const refreshToken = jwt.sign(payload, secret, { expiresIn: '7d' })
    return refreshToken
  } catch (error) {
    throw new ApiError(500, 'Server error.')
  }
}

export const signAccessToken = ({ id, username }: UserPayload): string => {
  try {
    const secret = process.env.ACCESS_SECRET as string
    const payload = { id, username }
    const accessToken = jwt.sign(payload, secret, { expiresIn: '15m' })
    return accessToken
  } catch (error) {
    throw new ApiError(500, 'Server error.')
  }
}

export const verifyRefreshToken = async (
  token: string
): Promise<UserPayload | false> => {
  try {
    const tokenVerify = await getToken(token)
    if (
      !tokenVerify ||
      !tokenVerify.isValid ||
      new Date().getTime() > new Date(tokenVerify.expiresAt).getTime()
    ) {
      await updateToken(false, token)
      return false
    }
    const secret = process.env.REFRESH_SECRET as string
    const decoded = jwt.verify(tokenVerify.token, secret) as DecodedToken
    return { id: decoded.id, username: decoded.username }
  } catch (error) {
    return false
  }
}

export const verifyAccessToken = (token: string): UserPayload | false => {
  try {
    const secret = process.env.ACCESS_SECRET as string
    const decoded = jwt.verify(token, secret) as DecodedToken
    return { id: decoded.id, username: decoded.username }
  } catch (error) {
    return false
  }
}
