import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET sub users
export async function GET() {
  const [rows] = await pool.query(
    'SELECT id, name, email, role FROM sub_users ORDER BY id DESC'
  )
  return NextResponse.json(rows)
}

// ADD sub user
export async function POST(req: Request) {
  const { name, email, role, parent_user_id } = await req.json()

  if (!name || !email || !role) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  try {
    await pool.query(
      'INSERT INTO sub_users (parent_user_id, name, email, role) VALUES (?, ?, ?, ?)',
      [parent_user_id, name, email, role]
    )

    return NextResponse.json({ success: true })
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json({ error: 'DB error' }, { status: 500 })
  }
}
