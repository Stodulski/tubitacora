export type RefreshToken = {
  expiresAt: string
  isValid: boolean
  token: string
}

export type DecodedToken = {
  id: number
  username: string
  iat: number
  exp: number
}

export type UserLogin = {
  email: string
  password: string
}

export type UserRegister = {
  username: string
  email: string
  password: string
}

export type VerifySession = {
  decoded: UserPayload
  usedRefresh: boolean
}

export type SessionTokens = {
  newAccessToken: string
  newRefreshToken: string
}

export type UserPayload = {
  id: number
  username: string
}
