import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import pool from '@/lib/db'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password required' },
        { status: 400 }
      )
    }

    // 🔍 Find user
    const [rows]: any = await pool.query(
      'SELECT id, email, password FROM users WHERE email = ? LIMIT 1',
      [email]
    )

    if (rows.length === 0) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    const user = rows[0]

    // 🔐 Compare password
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      )
    }

    // ✅ Success
    // ✅ CREATE SESSION COOKIE (SECURE VERSION)
    const res = NextResponse.json({
      message: 'Login successful',
      userId: user.id,
    })

    // 🔐 Set session cookie
    res.cookies.set({
      name: 'session_user',
      value: JSON.stringify({
        id: user.id,
        email: user.email,
      }),
      httpOnly: true,                 // client JS can't read
      secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
      sameSite: 'lax',                // middleware compatible
      path: '/',                      // 🔴 MUST
      maxAge: 60 * 60 * 24,            // 1 day
    })

    return res



  } catch (error) {
    console.error('LOGIN ERROR:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
