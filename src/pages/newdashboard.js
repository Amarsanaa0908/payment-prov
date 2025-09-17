"use client"

import {
    Activity,
    AlertTriangle,
    ArrowUpRight,
    BarChart3,
    Bell,
    Calendar,
    CheckCircle,
    Clock,
    CreditCard,
    DollarSign,
    LogOut,
    MoreHorizontal,
    PieChart,
    Search,
    Settings,
    TrendingUp,
    Users,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState("30d")

  const stats = [
    {
      title: "Total Revenue",
      value: "$124,350",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      color: "cyan",
    },
    {
      title: "Transactions",
      value: "8,234",
      change: "+8.2%",
      trend: "up",
      icon: Activity,
      color: "purple",
    },
    {
      title: "Active Customers",
      value: "1,456",
      change: "+15.3%",
      trend: "up",
      icon: Users,
      color: "pink",
    },
    {
      title: "Success Rate",
      value: "98.2%",
      change: "+0.8%",
      trend: "up",
      icon: CheckCircle,
      color: "green",
    },
  ]

  const recentTransactions = [
    {
      id: "TXN-001",
      customer: "Acme Corp",
      amount: 2450.0,
      status: "completed",
      time: "2 minutes ago",
      method: "card",
    },
    {
      id: "TXN-002",
      customer: "Tech Solutions",
      amount: 1200.0,
      status: "completed",
      time: "15 minutes ago",
      method: "bank_transfer",
    },
    {
      id: "TXN-003",
      customer: "StartupXYZ",
      amount: 750.0,
      status: "pending",
      time: "1 hour ago",
      method: "card",
    },
    {
      id: "TXN-004",
      customer: "Global Inc",
      amount: 3200.0,
      status: "completed",
      time: "2 hours ago",
      method: "card",
    },
  ]

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Payment Received",
      message: "New payment of $2,450 from Acme Corp",
      time: "5 minutes ago",
    },
    {
      id: 2,
      type: "warning",
      title: "High Risk Transaction",
      message: "Transaction flagged for manual review",
      time: "1 hour ago",
    },
    {
      id: 3,
      type: "info",
      title: "Monthly Report Ready",
      message: "Your November payment report is available",
      time: "2 hours ago",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "failed":
        return "bg-red-500/20 text-red-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case "info":
        return <Clock className="w-5 h-5 text-blue-400" />
      default:
        return <Bell className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              PayFlow
            </Link>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors w-64"
                />
              </div>
              <button className="relative p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center text-sm font-bold text-black">
                  JD
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-medium">John Doe</span>
                  <button className="text-gray-400 hover:text-cyan-400 transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-gray-900/50 border-r border-gray-800 min-h-screen">
          <nav className="p-6">
            <div className="space-y-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-3 text-cyan-400 bg-cyan-500/10 rounded-lg font-medium"
              >
                <BarChart3 className="w-5 h-5" />
                Dashboard
              </Link>
              <Link
                href="/payment-history"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <Activity className="w-5 h-5" />
                Transactions
              </Link>
              <Link
                href="/billing"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <CreditCard className="w-5 h-5" />
                Billing
              </Link>
              <Link
                href="/subscriptions"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <Calendar className="w-5 h-5" />
                Subscriptions
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <PieChart className="w-5 h-5" />
                Analytics
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <Users className="w-5 h-5" />
                Customers
              </Link>
              <Link
                href="#"
                className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5" />
                Settings
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700">
              <button className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-gray-800/50 rounded-lg transition-colors w-full">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John!</h1>
              <p className="text-gray-400">Here is what is happening with your payments today.</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      stat.color === "cyan"
                        ? "bg-cyan-500/20"
                        : stat.color === "purple"
                          ? "bg-purple-500/20"
                          : stat.color === "pink"
                            ? "bg-pink-500/20"
                            : "bg-green-500/20"
                    }`}
                  >
                    <stat.icon
                      className={`w-6 h-6 ${
                        stat.color === "cyan"
                          ? "text-cyan-400"
                          : stat.color === "purple"
                            ? "text-purple-400"
                            : stat.color === "pink"
                              ? "text-pink-400"
                              : "text-green-400"
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-1 text-sm text-green-400">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.title}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Transactions */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white">Recent Transactions</h2>
                  <Link
                    href="/payment-history"
                    className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center gap-1"
                  >
                    View all
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-gray-700 bg-black/50 hover:bg-gray-800/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <DollarSign className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{transaction.customer}</p>
                          <p className="text-gray-400 text-sm">{transaction.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">${transaction.amount.toFixed(2)}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div>
              <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 backdrop-blur-sm">
                <h2 className="text-xl font-bold text-white mb-6">Notifications</h2>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex gap-3 p-3 rounded-lg bg-black/50">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{notification.title}</p>
                        <p className="text-gray-400 text-xs mt-1">{notification.message}</p>
                        <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 py-2 text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 backdrop-blur-sm">
              <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center gap-3 p-4 rounded-lg border border-gray-700 bg-black/50 hover:border-cyan-500 hover:bg-gray-800/50 transition-all duration-300 text-left">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Create Payment Link</p>
                    <p className="text-gray-400 text-sm">Generate a payment link</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-4 rounded-lg border border-gray-700 bg-black/50 hover:border-purple-500 hover:bg-gray-800/50 transition-all duration-300 text-left">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">View Analytics</p>
                    <p className="text-gray-400 text-sm">Detailed payment insights</p>
                  </div>
                </button>
                <button className="flex items-center gap-3 p-4 rounded-lg border border-gray-700 bg-black/50 hover:border-pink-500 hover:bg-gray-800/50 transition-all duration-300 text-left">
                  <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Manage Customers</p>
                    <p className="text-gray-400 text-sm">View customer details</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
