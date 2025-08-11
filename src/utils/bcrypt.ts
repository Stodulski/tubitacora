import bcrypt from 'bcrypt'
import ApiError from './apiError'

export const encryptPassword = async (password: string): Promise<string> => {
  try {
    const salt = 10
    const passwordHash = await bcrypt.hash(password, salt)
    return passwordHash
  } catch (error) {
    throw new ApiError(500, 'Error encrypting password')
  }
}

export const comparePassword = async (
  password: string,
  passwordHash: string
): Promise<Boolean> => {
  try {
    const result = await bcrypt.compare(password, passwordHash)
    return result
  } catch (error) {
    console.log(error)
    throw new ApiError(401, "Passwords don't match")
  }
}
