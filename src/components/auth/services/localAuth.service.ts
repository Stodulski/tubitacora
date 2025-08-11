import ApiError from '../../../utils/apiError'
import {
  verifyAccessToken,
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken
} from '../../../utils/jwt'

import { VerifySession, SessionTokens, UserPayload } from '../types/auth.types'

import { comparePassword, encryptPassword } from '../../../utils/bcrypt'

import { UserRegister, UserLogin } from '../types/auth.types'

import {
  createUser,
  checkEmail,
  findUserByEmailWithPassword
} from '../../users/models'
import { SecureUserResponse } from '../../users/types/user.types'
import { saveToken, updateToken } from '../models/localAuth.model'

export const verifySession = async (
  refreshToken: string,
  accessToken: string
): Promise<VerifySession> => {
  try {
    const access = verifyAccessToken(accessToken)
    if (access) return { decoded: access, usedRefresh: false }
    const refresh = await verifyRefreshToken(refreshToken)
    if (!refresh) throw new ApiError(401, 'Unauthorized.')
    return { decoded: refresh, usedRefresh: true }
  } catch (error) {
    throw new ApiError(500, 'Server error.')
  }
}

export const createSession = async (
  payload: UserPayload
): Promise<SessionTokens> => {
  try {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const newAccessToken = signAccessToken(payload)
    const newRefreshToken = signRefreshToken(payload)
    await saveToken(newRefreshToken, payload.id, expiresAt)
    return { newAccessToken, newRefreshToken }
  } catch (error) {
    throw new ApiError(500, 'Server error.')
  }
}

export const register = async ({
  username,
  email,
  password
}: UserRegister): Promise<SecureUserResponse> => {
  try {
    const existEmail = await checkEmail(email)
    if (existEmail) throw new ApiError(400, 'Email in use.')
    const passwordHash = await encryptPassword(password)
    const user = await createUser({ username, email, passwordHash })
    return user
  } catch (error: any) {
    throw new ApiError(error.status, error.message)
  }
}

export const login = async ({
  email,
  password
}: UserLogin): Promise<UserPayload> => {
  try {
    const user = await findUserByEmailWithPassword(email)
    const result = await comparePassword(password, user.passwordHash)
    if (!result) throw new ApiError(404, 'Invalid password.')
    return {
      username: user.username,
      id: user.id
    }
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw new ApiError(error.status, error.message)
    }
    throw new ApiError(500, 'Server error.')
  }
}

export const logout = async (token: string): Promise<void>=>{
  try {
    await updateToken(false, token)
  } catch (error) {
      throw new ApiError(500, "server error.")
  }
}
