'use client'

export default function Reports() {
  const reports = [
    { id: 1, name: 'User Activity Report', date: '2026-01-15' },
    { id: 2, name: 'Login History Report', date: '2026-01-16' },
    { id: 3, name: 'System Usage Report', date: '2026-01-17' },
  ]

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Reports</h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 border">Report Name</th>
            <th className="p-3 border">Date</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id} className="hover:bg-gray-50">
              <td className="p-3 border">{report.name}</td>
              <td className="p-3 border">{report.date}</td>
              <td className="p-3 border">
                <button className="text-blue-600 hover:underline">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
