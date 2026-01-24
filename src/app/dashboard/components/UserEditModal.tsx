'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

type Props = {
  userId: number
  onClose: () => void
  onUpdated: () => void
}

export default function UserEditModal({ userId, onClose, onUpdated }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    role: '',
  })
  const [loading, setLoading] = useState(true)

  // 🔹 Fetch user details
  useEffect(() => {
    fetch(`/api/sub-users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setForm({
          name: data.name,
          email: data.email,
          role: data.role,
        })
        setLoading(false)
      })
  }, [userId])

  // 🔹 Update user
  const handleUpdate = async () => {
    const res = await fetch(`/api/sub-users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) {
      alert('Update failed')
      return
    }

    onUpdated()
    onClose()
  }

  if (loading) return null

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-96 p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit User</h2>

        <div className="space-y-3">
          <input
            className="border p-2 w-full rounded"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border p-2 w-full rounded bg-gray-100"
            value={form.email}
            disabled
          />

          <input
            className="border p-2 w-full rounded"
            placeholder="Role"
            value={form.role}
            onChange={e => setForm({ ...form, role: e.target.value })}
          />

          <button
            onClick={handleUpdate}
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Update User
          </button>
        </div>
      </div>
    </div>
  )
}
