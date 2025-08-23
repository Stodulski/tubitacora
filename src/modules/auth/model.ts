import prisma from '../../db/config'
import { UserWithPassword } from './types/auth.types'

import { ApiError } from '../../middlewares/errorHandler'

export const findUserWithPassword = async (
  email: string
): Promise<UserWithPassword> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      select: { email: true, password: true, id: true }
    })
    // if no user exists, return error
    if (!user) throw new ApiError(401, 'Usuario incorrecto.')
    return user
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Server error.')
  }
}

export const checkEmail = async (email: string): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      select: { id: true }
    })
    if (user) throw new ApiError(401, 'Email ocupado.')
  } catch (error: any) {
    console.log(error)
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Server error.')
  }
}

export const checkDni = async (dni: string): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        dni
      },
      select: { id: true }
    })
    if (user) throw new ApiError(401, 'DNI ocupado.')
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Server error.')
  }
}

export const createUser = async (
  password: string,
  dni: string,
  birthdate: string,
  name: string,
  lastname: string,
  email: string
): Promise<{ id: number }> => {
  try {
    const user = await prisma.user.create({
      data: { password, dni, birthdate, name, lastname, email },
      select: { id: true }
    })
    return user
  } catch (error: any) {
    if (error.code === 'P2000') {
      throw new ApiError(401, 'Alguno de los campos es incorrecto.')
    }
    if (error instanceof ApiError) {
      throw error
    }
    throw new ApiError(500, 'Server error.')
  }
}
