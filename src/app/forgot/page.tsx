'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'



export default function ForgotPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')

    const res = await fetch('/api/forgot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()
    setMsg(data.message)
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form onSubmit={submit} className="p-6 bg-white shadow rounded w-96">
        <h2 className="text-xl mb-4">Forgot Password</h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-2 w-full mb-4"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button
          className="bg-blue-600 text-white w-full p-2 rounded"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send reset link'}
        </button>

        {/* 🔙 Back Button */}
      <button
        type="button"
        onClick={() => router.push('/login')}
        className="w-full border border-gray-300 p-2 rounded text-gray-700 hover:bg-gray-100"
      >
        Back to Login
      </button>

        {msg && <p className="mt-3 text-sm text-center">{msg}</p>}
      </form>
    </div>
  )
}
