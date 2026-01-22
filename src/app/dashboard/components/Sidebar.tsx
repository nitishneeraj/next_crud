'use client'

import { useState } from 'react'

type MenuItem = {
  id: string
  label: string
}

export default function Sidebar({ onSelect }: { onSelect: (id: string) => void }) {
  const menuItems: MenuItem[] = [
    { id: 'home', label: 'Home' },
    { id: 'profile', label: 'Profile' },
    { id: 'sub-users', label: 'Sub Users' }, 
    { id: 'reports', label: 'Reports' },
    { id: 'settings', label: 'Settings' },
  ]

  const [active, setActive] = useState('home')

  const handleClick = (id: string) => {
    setActive(id)
    onSelect(id)
  }

  return (
    <div className="w-64 bg-gray-800 min-h-screen text-white flex flex-col">
      <h1 className="text-2xl font-bold text-center my-6">Dashboard</h1>
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={`p-4 text-left hover:bg-gray-700 transition ${
            active === item.id ? 'bg-gray-700 font-semibold' : ''
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}
