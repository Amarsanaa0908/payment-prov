"use client"

import {
    ArrowDownRight,
    ArrowUpRight,
    CheckCircle,
    Clock,
    DollarSign,
    Download,
    RefreshCw,
    Search,
    TrendingDown,
    TrendingUp,
    XCircle,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function PaymentHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState("30")

  const transactions = [
    {
      id: "TXN-2024-001234",
      date: "2024-12-15",
      time: "14:32:15",
      amount: 1250.0,
      currency: "USD",
      type: "payment",
      status: "completed",
      customer: "Acme Corp",
      method: "card",
      description: "Monthly subscription payment",
    },
    {
      id: "TXN-2024-001235",
      date: "2024-12-15",
      time: "13:45:22",
      amount: -50.0,
      currency: "USD",
      type: "refund",
      status: "completed",
      customer: "John Doe",
      method: "card",
      description: "Refund for order #12345",
    },
    {
      id: "TXN-2024-001236",
      date: "2024-12-15",
      time: "12:18:45",
      amount: 750.0,
      currency: "USD",
      type: "payment",
      status: "pending",
      customer: "Tech Solutions Inc",
      method: "bank_transfer",
      description: "Invoice payment #INV-2024-567",
    },
    {
      id: "TXN-2024-001237",
      date: "2024-12-14",
      time: "16:22:10",
      amount: 2100.0,
      currency: "USD",
      type: "payment",
      status: "completed",
      customer: "Global Enterprises",
      method: "card",
      description: "Annual subscription renewal",
    },
    {
      id: "TXN-2024-001238",
      date: "2024-12-14",
      time: "11:55:33",
      amount: 450.0,
      currency: "USD",
      type: "payment",
      status: "failed",
      customer: "StartupXYZ",
      method: "card",
      description: "Payment processing fee",
    },
  ]

  const stats = [
    {
      title: "Total Volume",
      value: "$45,230",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Successful Payments",
      value: "1,234",
      change: "+8.2%",
      trend: "up",
      icon: CheckCircle,
    },
    {
      title: "Failed Payments",
      value: "23",
      change: "-15.3%",
      trend: "down",
      icon: XCircle,
    },
    {
      title: "Pending Payments",
      value: "12",
      change: "+5.1%",
      trend: "up",
      icon: Clock,
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-400" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-400" />
      case "refunded":
        return <RefreshCw className="w-4 h-4 text-blue-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400"
      case "failed":
        return "bg-red-500/20 text-red-400"
      case "refunded":
        return "bg-blue-500/20 text-blue-400"
      default:
        return "bg-gray-500/20 text-gray-400"
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
            <div className="flex space-x-8">
              <Link href="/dashboard" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Dashboard
              </Link>
              <Link href="/billing" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Billing
              </Link>
              <Link href="/subscriptions" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Subscriptions
              </Link>
              <Link href="/payment-history" className="text-cyan-400">
                Payments
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Payment History
          </h1>
          <p className="text-gray-400">Track and manage all your payment transactions</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="w-8 h-8 text-cyan-400" />
                <div
                  className={`flex items-center gap-1 text-sm ${stat.trend === "up" ? "text-green-400" : "text-red-400"}`}
                >
                  {stat.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
              <p className="text-gray-400 text-sm">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 backdrop-blur-sm mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
                <option value="refunded">Refunded</option>
              </select>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              <button className="px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 backdrop-blur-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black/50 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Transaction ID</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Date & Time</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Method</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-white">{transaction.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-300">
                      <div>
                        <p>{transaction.date}</p>
                        <p className="text-xs text-gray-400">{transaction.time}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300">{transaction.customer}</td>
                    <td className="px-6 py-4 text-sm">
                      <div
                        className={`flex items-center gap-1 ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}
                      >
                        {transaction.amount > 0 ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        <span className="font-medium">
                          {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300 capitalize">
                      {transaction.method.replace("_", " ")}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}
                      >
                        {getStatusIcon(transaction.status)}
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-300 max-w-xs truncate">{transaction.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-gray-400 text-sm">Showing 1 to 5 of 1,234 transactions</p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 border border-gray-700 text-gray-300 rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-colors">
              Previous
            </button>
            <button className="px-3 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg">1</button>
            <button className="px-3 py-2 border border-gray-700 text-gray-300 rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-colors">
              2
            </button>
            <button className="px-3 py-2 border border-gray-700 text-gray-300 rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-colors">
              3
            </button>
            <button className="px-3 py-2 border border-gray-700 text-gray-300 rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
