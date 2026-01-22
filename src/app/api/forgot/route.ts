export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import pool from '@/lib/db'
import bcrypt from 'bcryptjs'

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

    if (!email) {
      return NextResponse.json(
        { message: 'Email required' },
        { status: 400 }
      )
    }

     // 🔐 Generate new password
    const newPassword = crypto.randomBytes(6).toString('hex')

    // 🔐 Hash password before saving
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    // 🔁 Update DB
    const [result]: any = await pool.query(
      'UPDATE users SET password=? WHERE email=?',
      [hashedPassword, email]
    )

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: 'Email not found' },
        { status: 404 }
      )
    }

    const token = crypto.randomBytes(32).toString('hex')
    const expiry = new Date(Date.now() + 15 * 60 * 1000)

    await pool.query(
      'UPDATE users SET reset_token=?, reset_token_expiry=? WHERE email=?',
      [token, expiry, email]
    )

    await transporter.sendMail({
      from: `"Kleeto Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your New Password',
      html: `
        <p>Hello,</p>
        <p>Your password has been reset.</p>
        <p><b>New Password:</b> ${newPassword}</p>
        <p>Please login and change your password immediately.</p>
      `,
    })

    return NextResponse.json({ message: 'New password sent to email' })
  } catch (err) {
    console.error('FORGOT ERROR:', err)
    return NextResponse.json({ message: 'Password reset failed' }, { status: 500 })
  }
}
