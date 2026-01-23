import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET user profile
export async function GET() {
  const userId = 1 // 🔐 replace with logged-in user id later

  const [rows]: any = await pool.query(
    'SELECT name, email, role, phone FROM users WHERE id=?',
    [userId]
  )

  if (rows.length === 0) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 })
  }

  return NextResponse.json(rows[0])
}

// UPDATE user profile
export async function PUT(req: Request) {
  const userId = 1 // 🔐 replace with session/JWT later
  const { name, phone } = await req.json()

  await pool.query(
    'UPDATE users SET name=?, phone=? WHERE id=?',
    [name, phone, userId]
  )

  return NextResponse.json({ message: 'Profile updated' })
}
