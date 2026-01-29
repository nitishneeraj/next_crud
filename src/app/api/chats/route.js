import { NextResponse } from 'next/server'

export async function GET() {
  // Dummy data (replace with DB later)
  const chats = [
    {
      id: 1,
      user: 'Rahul',
      message: 'Hello, I need help',
      time: '10:15 AM',
    },
    {
      id: 2,
      user: 'Amit',
      message: 'Report is not generating',
      time: '10:20 AM',
    },
    {
      id: 3,
      user: 'Neha',
      message: 'Login issue',
      time: '10:30 AM',
    },
  ]

  return NextResponse.json(chats)
}
