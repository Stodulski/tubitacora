import { client } from './config'
const tables = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    token TEXT PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    is_valid BOOLEAN NOT NULL DEFAULT TRUE
);

`

const initializeTables = async () => {
  try {
    await client.connect()
    await client.query(tables)
    console.log('DB Connected')
  } catch (error) {
    console.log('Error initializing tables:', error)
  } finally {
    await client.end()
  }
}

initializeTables()
