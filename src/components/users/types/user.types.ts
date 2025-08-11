export type User = {
  username: string
  email: string
  passwordHash: string
}

export type SecureUserResponse = {
  id: number
  username: string
}

export type InsecureUserResponse = {
  id: number
  username: string
  passwordHash: string
}
