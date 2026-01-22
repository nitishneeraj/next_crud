'use client'

import { useState } from 'react'

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.checked })
  }

  const handleSave = () => {
    alert('Settings saved successfully!')
    // TODO: Save to backend / localStorage
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-lg">
      <h2 className="text-2xl font-semibold mb-6">Settings</h2>

      <div className="space-y-6">
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
            className="h-5 w-5"
          />
          Enable Email Notifications
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="darkMode"
            checked={settings.darkMode}
            onChange={handleChange}
            className="h-5 w-5"
          />
          Enable Dark Mode
        </label>

        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
        >
          Save Settings
        </button>
      </div>
    </div>
  )
}
