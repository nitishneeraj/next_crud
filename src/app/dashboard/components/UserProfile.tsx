'use client'

import { useState } from 'react'

export default function UserProfile() {
  const [form, setForm] = useState({
    name: 'Nitish Kumar',
    email: 'nitish@example.com',
    phone: '9876543210',
    role: 'Admin',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = () => {
    alert('Profile updated successfully!')
    // TODO: API call to save profile
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl">
      <h2 className="text-2xl font-semibold mb-6">User Profile</h2>

      <div className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-3 border rounded"
        />

        <input
          name="email"
          value={form.email}
          disabled
          className="w-full p-3 border rounded bg-gray-100 cursor-not-allowed"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-3 border rounded"
        />

        <input
          name="role"
          value={form.role}
          disabled
          className="w-full p-3 border rounded bg-gray-100 cursor-not-allowed"
        />

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}
