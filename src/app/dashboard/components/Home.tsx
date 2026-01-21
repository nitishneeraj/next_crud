'use client'

export default function Home() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Total Users</p>
          <h3 className="text-3xl font-bold mt-2">1,245</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Reports Generated</p>
          <h3 className="text-3xl font-bold mt-2">342</h3>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-500">Active Sessions</p>
          <h3 className="text-3xl font-bold mt-2">18</h3>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Activity</h3>
        <ul className="space-y-3">
          <li className="text-gray-700">✔ User logged in</li>
          <li className="text-gray-700">✔ Profile updated</li>
          <li className="text-gray-700">✔ Report generated</li>
        </ul>
      </div>
    </div>
  )
}
