"use client"

import { destroyTokens } from "@/lib/auth"
import { BarChart3, Eye, LayoutDashboard, LogOut, Menu, Settings, ShoppingCart, User, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"

const navigation = [
  { name: "Хянах самбар", href: "/dashboard", icon: LayoutDashboard },
  { name: "Аналитик", href: "/analytics", icon: BarChart3 },
  { name: "Захиалга", href: "/orders", icon: ShoppingCart },
  { name: "Тохиргоо", href: "/settings", icon: Settings },
  { name: "Дэлгүүр", href: "/preview", icon: Eye },
]

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    destroyTokens()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? "block" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Админ самбар</h2>
            <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-md hover:bg-gray-100">
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          <div className="flex flex-col h-full">
            <nav className="p-4 space-y-2 flex-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = router.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="p-4 border-t border-gray-200 space-y-2">
              <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Admin User</p>
                  <p className="text-xs text-gray-500">admin@example.com</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-700 hover:bg-red-50 hover:text-red-900 transition-colors w-full"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:bg-white lg:border-r lg:border-gray-200 lg:shadow-sm">
        <div className="flex items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Админ самбар</h2>
        </div>
        <div className="flex flex-col h-full">
          <nav className="p-4 space-y-2 flex-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = router.pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
          <div className="p-4 border-t border-gray-200 space-y-2">
             <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-red-700 hover:bg-red-50 hover:text-red-900 transition-colors w-full"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
            <div className="flex items-center gap-3 px-3 py-2 text-sm text-gray-700">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@example.com</p>
              </div>
            </div>
           
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm lg:hidden">
          <button
            type="button"
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Админ самбар</h1>
        </div>

        {/* Page content */}
        <main className="min-h-screen bg-gray-50">{children}</main>
      </div>
    </div>
  )
}
