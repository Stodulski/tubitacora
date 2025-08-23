import { ApiError } from '../../middlewares/errorHandler'
import * as authModel from './model'
import bcrypt from 'bcrypt'
import { UserWithPassword } from './types/auth.types'

const comparePassword = async (password: string, passwordHash: string) => {
  const result = await bcrypt.compare(password, passwordHash)
  return result
}

const hashPassword = async (password: string) => {
  const result = await bcrypt.hash(password, 10)
  return result
}

export const login = async (
  email: string,
  password: string
): Promise<UserWithPassword> => {
  try {
    // Find user searching by username, if exists return username & password
    const user = await authModel.findUserWithPassword(email)
    // Compare password
    const passwordResult = await comparePassword(
      password.toLowerCase(),
      user.password
    )
    if (!passwordResult) throw new ApiError(401, 'Contraseña incorrecta.')
    return user
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Server error.')
  }
}

export const register = async (
  password: string,
  dni: string,
  birthdate: string,
  name: string,
  lastname: string,
  rePassword: string,
  email: string
): Promise<{ id: number }> => {
  try {
    await authModel.checkUser(email)
    console.log(password, rePassword)
    if (password.toLowerCase() !== rePassword.toLowerCase()) {
      throw new ApiError(401, 'Las contraseñas no coinciden.')
    }
    const hashedPassword = await hashPassword(password.toLowerCase())
    const user = await authModel.createUser(
      hashedPassword,
      dni,
      birthdate,
      name,
      lastname,
      email
    )
    return user
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Server error.')
  }
}
