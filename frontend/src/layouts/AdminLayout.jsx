import { Outlet } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import Sidebar from '../components/admin/Sidebar'

export default function AdminLayout() {
  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-sm font-medium text-gray-500">Admin Panel</h2>
          <div className="flex items-center gap-3">
            
            <a  href="/"
              className="text-sm text-indigo-600 font-medium hover:text-indigo-800 no-underline"
            >
              ← Back to Site
            </a>
            <UserButton afterSignOutUrl="/admin" />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}