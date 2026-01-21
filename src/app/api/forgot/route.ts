export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import pool from '@/lib/db'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER!,
    pass: process.env.EMAIL_PASS!,
  },
})

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    const token = crypto.randomBytes(32).toString('hex')
    const expiry = new Date(Date.now() + 15 * 60 * 1000)

    await pool.query(
      'UPDATE users SET reset_token=?, reset_token_expiry=? WHERE email=?',
      [token, expiry, email]
    )

    await transporter.sendMail({
      from: `"Kleeto Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Reset Password',
      html: `<p>Reset link sent</p>`,
    })

    return NextResponse.json({ message: 'Email sent' })
  } catch (err) {
    console.error('FORGOT ERROR:', err)
    return NextResponse.json({ message: 'Email failed' }, { status: 500 })
  }
}
