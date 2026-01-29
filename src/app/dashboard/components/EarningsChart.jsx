'use client'

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

const data = [
  { day: 'Sun', value: 80 },
  { day: 'Mon', value: 120 },
  { day: 'Tue', value: 90 },
  { day: 'Wed', value: 160 },
  { day: 'Thu', value: 210 },
  { day: 'Fri', value: 140 },
  { day: 'Sat', value: 140 },
]

export default function EarningsChart() {
  return (
    <div className="bg-white p-6 rounded-lg shadow w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-800">Earnings</h3>
        <span className="text-sm text-gray-500">Weekly</span>
      </div>

      {/* ✅ Fixed height container */}
      <div className="h-[220px] min-h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis hide />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#06b6d4"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
