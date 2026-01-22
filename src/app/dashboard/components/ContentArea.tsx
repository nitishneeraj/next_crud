'use client'
import UserProfile from './UserProfile'
import Reports from './Reports'
import Settings from './Settings'
import Home from './Home'
import SubUsers from './SubUsers'

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
       case 'sub-users':        
        return <SubUsers />
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
