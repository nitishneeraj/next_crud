'use client'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

type Props = {
  userId: number
  onClose: () => void
}

type User = {
  id: number
  name: string
  email: string
  role: string
  created_at: string
}

export default function UserViewModal({ userId, onClose }: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/sub-users/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setLoading(false)
      })
  }, [userId])

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-[420px] rounded-xl shadow-lg p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Sub User Details
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <div className="space-y-3 text-sm">
            <div>
              <b>ID:</b> {user?.id}
            </div>
            <div>
              <b>Name:</b> {user?.name}
            </div>
            <div>
              <b>Email:</b> {user?.email}
            </div>
            <div>
              <b>Role:</b> {user?.role}
            </div>
            <div>
              <b>Created:</b>{' '}
              {new Date(user!.created_at).toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
