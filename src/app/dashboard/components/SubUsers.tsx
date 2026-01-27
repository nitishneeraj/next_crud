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

  // const [search, setSearch] = useState('')
  // const [page, setPage] = useState(1)
  // const pageSize = 5

  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [search, setSearch] = useState('')
  const pageSize = 5

  const parent_user_id = 1

  // const fetchUsers = async () => {
  //   const res = await fetch('/api/sub-users')
  //   const data = await res.json()
  //   setUsers(data)
  // }
  const fetchUsers = async () => {
    const res = await fetch(
      `/api/sub-users?page=${page}&pageSize=${pageSize}&search=${search}`
    )
    const data = await res.json()

    setUsers(data.users)
    setTotal(data.total)
  }

  useEffect(() => {
    fetchUsers()
  }, [page, search])

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

      // alert('User deleted successfully ✅')
      fetchUsers()
    } catch (err) {
      console.error('🔥 Delete error:', err)
      alert('Server error')
    }
  }


  //excel upload logic
  const handleExcelUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/sub-users/import', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.error || 'Upload failed')
      return
    }

    alert(`✅ ${data.inserted} users imported`)
    fetchUsers()
  }

  //download CSV logic
  const downloadUsersCSV = () => {
  window.location.href = "/api/sub-users/download";
};





  // 🔍 Search logic
  const filteredUsers = useMemo(() => {
    return users.filter(u =>
      `${u.name} ${u.email} ${u.role}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  }, [users, search])

  // 📄 Pagination logic
  // const totalPages = Math.ceil(filteredUsers.length / pageSize)
  // const paginatedUsers = filteredUsers.slice(
  //   (page - 1) * pageSize,
  //   page * pageSize
  // )
  const totalPages = Math.ceil(total / pageSize)

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
          // onChange={(e) => setSearch(e.target.value)}
          onChange={e => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />
      </div>



      {/* ➕ Add Sub User */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Add Sub User
        </h2>

        <div className="grid grid-cols-4 gap-4 items-end">
          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Role (Admin / User)"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />

          <button
            onClick={addUser}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition font-medium"
          >
            + Add User
          </button>
        </div>
      </div>

      {/* 📤 Bulk Actions */}
      <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between gap-6">

        {/* Left: Upload Excel */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Bulk Upload (Excel)
          </h2>

          <p className="text-sm text-gray-500 mb-3">
            Upload an Excel file with columns: <b>name, email, role</b>
          </p>

          <div className="flex items-center gap-4">
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleExcelUpload}
              className="border p-2 rounded-lg w-72 text-sm"
            />

            <span className="text-xs text-gray-400">
              Max 5,000 users per upload
            </span>
          </div>
        </div>

        {/* Right: Download CSV */}
        <div className="flex flex-col items-end">
          <button
            onClick={downloadUsersCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition text-sm font-medium"
          >
            ⬇ Download All Users (CSV)
          </button>

          <span className="text-xs text-gray-400 mt-2">
            Downloads all existing users
          </span>
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
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-6 text-gray-500">
                No records found
              </td>
            </tr>
          )}

          {users.map((u, index) => (
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
