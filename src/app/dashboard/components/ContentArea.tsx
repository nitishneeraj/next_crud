'use client'
import UserProfile from './UserProfile'
import Reports from './Reports'
import Settings from './Settings'
import Home from './Home'

export default function ContentArea({ active }: { active: string }) {
  const renderContent = () => {
    switch (active) {
      case 'home':
        return <Home />
      case 'profile':
        return <UserProfile />
      case 'settings':
        return <Settings />
      case 'reports':
       return <Reports />
      default:
        return <p>Select a menu item.</p>
    }
  }

  return (
    <div className="flex-1 p-8 bg-gray-100 min-h-screen">
      {renderContent()}
    </div>
  )
}
