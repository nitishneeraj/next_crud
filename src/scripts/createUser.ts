import bcrypt from 'bcryptjs'
import pool from '../lib/db'

async function createUser() {
  const email = 'admin@gmail.com'
  const password = '123456'
  const name = 'Admin User'

  const hashedPassword = await bcrypt.hash(password, 10)

  await pool.query(
    'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
    [email, hashedPassword, name]
  )

  console.log('✅ User created successfully')
  process.exit(0)
}

createUser()
