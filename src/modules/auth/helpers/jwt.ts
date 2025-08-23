import jwt, { JwtPayload } from 'jsonwebtoken'
import { ApiError } from '../../../middlewares/errorHandler'

export const signToken = (id: number): string => {
  const secret = process.env.JWT_SECRET as string
  const token = jwt.sign({id }, secret, {
    expiresIn: '1d'
  })
  return token
}

export const verifyToken = (token: string): JwtPayload | string => {
  const secret = process.env.JWT_SECRET as string
  try {
    const decoded = jwt.verify(token, secret)
    return decoded
  } catch (error) {
    throw new ApiError(401, 'Unauthorized.')
  }
}
