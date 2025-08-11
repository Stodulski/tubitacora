import { Client, Pool } from 'pg'

const connectionString = process.env.DB_URI 

export const client = new Client({ connectionString, ssl: { rejectUnauthorized: false } })
export const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } })
