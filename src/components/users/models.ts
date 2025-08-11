import { User, SecureUserResponse, InsecureUserResponse } from './types/user.types'
import { pool } from '../../db/config'
import ApiError from '../../utils/apiError'

export const createUser = async ({
  username,
  email,
  passwordHash
}: User): Promise<SecureUserResponse> => {
  const query = `
    INSERT INTO users (username, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, username
    `
  const values = [username, email, passwordHash]
  try {
    const result = await pool.query(query, values)
    return result.rows[0]
  } catch (error: any) {
    if (error.code === '23505') {
      throw new ApiError(409, 'Email in use.')
    }
    throw new ApiError(500, 'Error creating new user.')
  }
}

export const checkEmail = async (email: string): Promise<boolean> => {
  const query = `
    SELECT email FROM users WHERE email = ($1)
`
  const values = [email]
  try {
    const result = await pool.query(query, values)
    return result.rowCount ? true : false
  } catch (error) {
    throw new ApiError(500, 'Server error.')
  }
}

export const findUserByEmailWithPassword = async (email: string): Promise<InsecureUserResponse> => {
  const query = `
  SELECT password_hash AS "passwordHash", username, id FROM users WHERE email = ($1)
  `
  const values = [email]
  try {
    const result = await pool.query(query, values)
    if (!result.rows[0]) throw new ApiError(404, 'Email not found.')
    return result.rows[0]
  } catch (error) {
    throw new ApiError(500, 'Server error.')
  }
}
