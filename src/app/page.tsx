'use client'

import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  // Simple client-side "logout" simulation
  const handleLogout = () => {
    // TODO: clear auth tokens/cookies in real app
    router.push('/login')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Your E-Solution!</h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700 transition"
        >
          Sign In
        </button>
      </div>
    </div>
  )
}
