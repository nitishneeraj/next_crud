'use client'

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { month: 'Jan', thisMonth: 400, lastMonth: 300 },
  { month: 'Feb', thisMonth: 250, lastMonth: 150 },
  { month: 'Mar', thisMonth: 300, lastMonth: 420 },
  { month: 'Apr', thisMonth: 280, lastMonth: 460 },
  { month: 'May', thisMonth: 350, lastMonth: 410 },
  { month: 'Jun', thisMonth: 480, lastMonth: 450 },
  { month: 'Jul', thisMonth: 320, lastMonth: 430 },
]

export default function MonthlySpendingChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">
          Your Spending
        </h3>
        <span className="text-sm text-gray-500">Monthly</span>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <Tooltip />
            <Bar
              dataKey="thisMonth"
              fill="#06b6d4"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="lastMonth"
              fill="#f59e0b"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
