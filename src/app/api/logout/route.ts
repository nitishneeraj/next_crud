import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' })

  // 🔥 CLEAR COOKIE PROPERLY
  res.cookies.set('session_user', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0, // 👈 this deletes cookie
  })

  return res
}
