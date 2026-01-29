'use client'

import { useEffect, useState } from 'react'
import SpendingChart from './SpendingChart'
import EarningsChart from './EarningsChart'
import MonthlySpendingChart from './MonthlySpendingChart'

export default function Home() {
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/chats')
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setChats(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold text-gray-800">
        Dashboard Overview
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Users</p>
          <h3 className="text-3xl font-bold mt-2">1,245</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Reports Generated</p>
          <h3 className="text-3xl font-bold mt-2">342</h3>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Active Sessions</p>
          <h3 className="text-3xl font-bold mt-2">18</h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Earnings Line Chart */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <EarningsChart />
        </div>

        {/* Spending Donut Chart */}
        <div className="bg-white p-6 rounded-xl shadow">
          <SpendingChart />
        </div>
      </div>

      {/* Monthly Spending + Chats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Spending Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-1">
          <MonthlySpendingChart />
        </div>

        {/* User Chats */}
        <div className="bg-white p-6 rounded-xl shadow lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            User Chats
          </h3>

          {loading ? (
            <p className="text-gray-500">Loading chats...</p>
          ) : chats.length === 0 ? (
            <p className="text-gray-500">No chats found</p>
          ) : (
            <ul className="space-y-4 max-h-80 overflow-y-auto">
              {chats.map(chat => (
                <li
                  key={chat.id}
                  className="flex justify-between border-b pb-3"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {chat.user}
                    </p>
                    <p className="text-sm text-gray-600">
                      {chat.message}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {chat.time}
                  </span>
                </li>
              ))}

            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
