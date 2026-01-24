import { NextResponse } from 'next/server'
import pool from '@/lib/db'

// GET sub users
// export async function GET() {
//   const [rows] = await pool.query(
//     'SELECT id, name, email, role FROM sub_users ORDER BY id DESC'
//   )
//   return NextResponse.json(rows)
// }

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)

    const page = Number(searchParams.get('page') || 1)
    const pageSize = Number(searchParams.get('pageSize') || 5)
    const search = searchParams.get('search') || ''

    const offset = (page - 1) * pageSize

    let where = ''
    let params: any[] = []

    if (search) {
      where = 'WHERE name LIKE ? OR email LIKE ? OR role LIKE ?'
      params.push(`%${search}%`, `%${search}%`, `%${search}%`)
    }

    // 🔹 users
    const [users]: any = await pool.query(
      `
      SELECT id, name, email, role
      FROM sub_users
      ${where}
      ORDER BY id DESC
      LIMIT ? OFFSET ?
      `,
      [...params, pageSize, offset]
    )

    // 🔹 total count
    const [count]: any = await pool.query(
      `
      SELECT COUNT(*) as total
      FROM sub_users
      ${where}
      `,
      params
    )

    return NextResponse.json({
      users,
      total: count[0].total,
    })
  } catch (err) {
    console.error('GET ERROR:', err)
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    )
  }
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
