import { pool } from '../../../db/config'
import ApiError from '../../../utils/apiError'
import { RefreshToken } from '../types/auth.types'

export const getToken = async (
  token: string
): Promise<RefreshToken | undefined> => {
  const query = `
    SELECT is_valid AS "isValid", expires_at AS "expiresAt", token FROM refresh_tokens WHERE token = ($1)
    `
  const values = [token]
  try {
    const result = await pool.query(query, values)
    return result.rows.length > 0 ? result.rows[0] : undefined
  } catch (error) {
    throw new ApiError(500, 'Server error.')
  }
}

export const saveToken = async (
  token: string,
  userId: number,
  expiresAt: Date
): Promise<void> => {
  const query = `
  INSERT INTO refresh_tokens (token, user_id, expires_at)
  VALUES($1, $2, $3)
  `
  const values = [token, userId, expiresAt]
  try {
    await pool.query(query, values)
  } catch (error) {
    throw new ApiError(500, 'Server error.')
  }
}
export const updateToken = async (
  isValid: boolean,
  token: string
): Promise<void> => {
  const query = `
  UPDATE refresh_tokens
  SET is_valid = $1
  WHERE token = $2
  `
  const values = [isValid, token]
  try {
    const result = await pool.query(query, values)
    if(result.rowCount === 0) throw new ApiError(404, "Token not found.")
  } catch (error) {
    throw new ApiError(500, 'Server error.')
  }
}
