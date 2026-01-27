import { NextResponse } from 'next/server'
import * as XLSX from 'xlsx'
import pool from '@/lib/db'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const workbook = XLSX.read(buffer, { type: 'buffer' })

    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]

    const rows: any[] = XLSX.utils.sheet_to_json(sheet)

    if (rows.length === 0) {
      return NextResponse.json(
        { error: 'Empty file' },
        { status: 400 }
      )
    }

    const values = rows.map(r => [
      r.name,
      r.email,
      r.role,
      1, // parent_user_id
    ])

    await pool.query(
      `INSERT INTO sub_users (name, email, role, parent_user_id)
       VALUES ?`,
      [values]
    )

    return NextResponse.json({
      success: true,
      inserted: values.length,
    })
  } catch (err: any) {
    console.error('❌ EXCEL IMPORT ERROR:', err)
    return NextResponse.json(
      { error: 'Import failed' },
      { status: 500 }
    )
  }
}
