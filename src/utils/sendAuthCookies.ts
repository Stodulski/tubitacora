import { Response } from 'express'
import { SessionTokens } from '../components/auth/types/auth.types'

const sendAuthCookies = (res: Response, generatedTokens: SessionTokens) => {
  res.cookie('refreshToken', generatedTokens.newRefreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
  res.cookie('accessToken', generatedTokens.newAccessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 15 * 60 * 1000
  })
}

export default sendAuthCookies
