'use client'
import { useEffect, useState } from 'react'

type SubUser = {
  id: number
  name: string
  email: string
  role: string
}

export default function SubUsers() {
  const [users, setUsers] = useState<SubUser[]>([])
  const [form, setForm] = useState({ name: '', email: '', role: '' })
  const parent_user_id = 1 // 🔐 replace with logged-in user id

  const fetchUsers = async () => {
    const res = await fetch('/api/sub-users')
    const data = await res.json()
    setUsers(data)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const addUser = async () => {
    if (!form.name || !form.email || !form.role) return

    const res = await fetch('/api/sub-users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, parent_user_id }),
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error)
      return
    }

    setForm({ name: '', email: '', role: '' })
    fetchUsers()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sub Users List</h1>

      <div className="flex gap-3 mb-6">
        <input
          className="border p-2 rounded w-1/4"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 rounded w-1/4"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          className="border p-2 rounded w-1/4"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <button
          onClick={addUser}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      <table className="w-full border bg-white">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
