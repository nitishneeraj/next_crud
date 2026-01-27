import { NextResponse } from "next/server";
import pool from "@/lib/db"; // your DB connection

export async function GET() {
  const [rows] = await pool.query(
    "SELECT name, email, role FROM sub_users ORDER BY id ASC"
  );

  let csv = "Sr.No,Name,Email,Role\n";

  rows.forEach((u, index) => {
    csv += `${index + 1},"${u.name}","${u.email}","${u.role}"\n`;
  });

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=all_users.csv",
    },
  });
}
