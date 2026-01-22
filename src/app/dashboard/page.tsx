'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from './components/Sidebar'
import ContentArea from './components/ContentArea'

export default function DashboardPage() {
  const router = useRouter()
  const [activeMenu, setActiveMenu] = useState('home')

  const handleLogout = () => {
    // clear login session / localStorage here
    router.push('/login')
  }

  return (
    <div className="flex">
      <Sidebar onSelect={setActiveMenu} />
      <div className="flex-1 flex flex-col">
        <div className="flex justify-end p-4 bg-white shadow">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
        <ContentArea active={activeMenu} />
      </div>
    </div>
  )
}
