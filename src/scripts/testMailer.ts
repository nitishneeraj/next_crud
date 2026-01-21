import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()  // loads .env.local

async function testMailer() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // false for TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  try {
    await transporter.verify()   // <-- tests login
    console.log('✅ Login successful! Nodemailer can send emails.')
  } catch (err) {
    console.error('❌ Login failed:', err)
  }
}

testMailer()
