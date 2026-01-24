'use client'
import { useEffect, useMemo, useState } from 'react'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import UserViewModal from './UserViewModal'
import UserEditModal from './UserEditModal'


type SubUser = {
  id: number
  name: string
  email: string
  role: string
}

export default function SubUsers() {
  const [users, setUsers] = useState<SubUser[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', email: '', role: '' })

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 2

  const parent_user_id = 1

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


  //delete logic
  const handleDelete = async (id: number) => {
    console.log('🔥 Frontend ID:', id, typeof id)
    if (!confirm('Are you sure you want to delete this user?')) return

    console.log('🗑 Deleting ID:', id)

    try {
      const res = await fetch(`/api/sub-users/${id}`, {
        method: 'DELETE',
      })

      const data = await res.json()
      console.log('📥 Delete response:', data)

      if (!res.ok) {
        alert(data.error || 'Delete failed')
        return
      }

      alert('User deleted successfully ✅')
      fetchUsers()
    } catch (err) {
      console.error('🔥 Delete error:', err)
      alert('Server error')
    }
  }



  // 🔍 Search logic
  const filteredUsers = useMemo(() => {
    return users.filter(u =>
      `${u.name} ${u.email} ${u.role}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [users, search])

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / pageSize)
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  // Reset page on search
  useEffect(() => {
    setPage(1)
  }, [search])

  return (
    <div className="bg-white rounded-xl shadow p-6">

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Sub Users List
        </h1>

        <input
          placeholder="🔍 Search name, email or role"
          className="border px-4 py-2 rounded-lg w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>



      {/* ➕ Add User */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h2 className="font-medium text-gray-700 mb-3">Add Sub User</h2>

        <div className="flex gap-3">
          <input
            className="border p-2 rounded-lg w-1/4 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border p-2 rounded-lg w-1/4 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="border p-2 rounded-lg w-1/4 focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />

          <button
            onClick={addUser}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 rounded-lg transition"
          >
            + Add
          </button>
        </div>
      </div>


      {/* 📋 Table */}
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 w-16 text-center">#</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-center w-32">Action</th>
          </tr>
        </thead>

        <tbody>
          {paginatedUsers.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-6 text-gray-500">
                No records found
              </td>
            </tr>
          )}

          {paginatedUsers.map((u, index) => (
            <tr
              key={u.id}
              className="hover:bg-gray-50 transition"
            >
              <td className="p-3 text-center text-gray-600">
                {(page - 1) * pageSize + index + 1}
              </td>
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">
                <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                  {u.role}
                </span>
              </td>
              <td className="p-3 text-center">
                <div className="flex justify-center gap-3">
                  <Eye
                    size={18}
                    className="text-blue-600 cursor-pointer hover:scale-110"
                    onClick={() => setSelectedId(u.id)}
                  />
                  <Pencil
                    size={18}
                    className="text-green-600 cursor-pointer hover:scale-110"
                    onClick={() => setEditId(u.id)}
                  />
                  <Trash2
                    size={18}
                    className="text-red-600 cursor-pointer hover:scale-110"
                    onClick={() => handleDelete(u.id)}
                  />
                </div>
              </td>


            </tr>
          ))}
        </tbody>
      </table>

        {/* Open Modalb View */}
      {selectedId && (
          <UserViewModal
            userId={selectedId}
            onClose={() => setSelectedId(null)}
          />
        )}

        {/* Open Modal Edit */}
        {editId && (
          <UserEditModal
            userId={editId}
            onClose={() => setEditId(null)}
            onUpdated={fetchUsers}
          />
        )}


      {/* 📄 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-4 py-1 border rounded-lg disabled:opacity-40"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page <b>{page}</b> of <b>{totalPages}</b>
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-1 border rounded-lg disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}

    </div>
  )
}
