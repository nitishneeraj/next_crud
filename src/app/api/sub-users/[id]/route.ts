import { NextResponse } from 'next/server'
import pool from '@/lib/db'

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // ✅ IMPORTANT: await params
    const { id } = await context.params

    console.log('👉 RAW PARAM:', id)

    const userId = Number(id)
    console.log('👉 PARSED ID:', userId)

    // ❌ Validation
    if (!id || Number.isNaN(userId) || userId <= 0) {
      return NextResponse.json(
        { error: 'Invalid ID received', received: id },
        { status: 400 }
      )
    }

    // ✅ Delete query
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
