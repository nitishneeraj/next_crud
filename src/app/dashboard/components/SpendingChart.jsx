'use client'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { name: 'Shopping', value: 1200 },
  { name: 'Food', value: 900 },
  { name: 'Travel', value: 700 },
  { name: 'Health', value: 450 },
]

const COLORS = ['#06b6d4', '#a855f7', '#f43f5e', '#f59e0b']

export default function SpendingChart() {
  const total = data.reduce((sum, d) => sum + d.value, 0)

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Your Spending</h3>

      <div className="relative h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-gray-500 text-sm">Total balance</p>
          <p className="text-2xl font-bold">${total.toLocaleString()}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
        {data.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[i] }}
            />
            <span className="text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
