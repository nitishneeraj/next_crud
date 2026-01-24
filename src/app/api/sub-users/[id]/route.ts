import { NextResponse } from 'next/server'
import pool from '@/lib/db'

/* =======================
   GET SINGLE USER (VIEW)
   ======================= */
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const userId = Number(id)

    if (!id || Number.isNaN(userId) || userId <= 0) {
      return NextResponse.json(
        { error: 'Invalid ID' },
        { status: 400 }
      )
    }

    const [rows]: any = await pool.query(
      'SELECT id, name, email, role, created_at FROM sub_users WHERE id = ?',
      [userId]
    )

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(rows[0])
  } catch (err: any) {
    console.error('❌ GET ERROR:', err)
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    )
  }
}

/* =======================
   DELETE USER
   ======================= */
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params
    const userId = Number(id)

    if (!id || Number.isNaN(userId) || userId <= 0) {
      return NextResponse.json(
        { error: 'Invalid ID received', received: id },
        { status: 400 }
      )
    }

    const [result]: any = await pool.query(
      'DELETE FROM sub_users WHERE id = ?',
      [userId]
    )

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
      deletedId: userId,
    })
  } catch (err: any) {
    console.error('❌ DELETE ERROR:', err)

    return NextResponse.json(
      {
        error: 'Delete failed',
        mysqlError: err.message,
        code: err.code,
      },
      { status: 500 }
    )
  }
}
