"use client"

import {
    Calendar,
    CheckCircle,
    CreditCard,
    DollarSign,
    Download,
    Edit,
    FileText,
    Plus,
    Settings,
    Trash2,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const billingHistory = [
    {
      id: "INV-2024-001",
      date: "2024-12-01",
      amount: 2450.0,
      status: "paid",
      description: "Monthly subscription + transaction fees",
    },
    {
      id: "INV-2024-002",
      date: "2024-11-01",
      amount: 1890.0,
      status: "paid",
      description: "Monthly subscription + transaction fees",
    },
    {
      id: "INV-2024-003",
      date: "2024-10-01",
      amount: 2100.0,
      status: "paid",
      description: "Monthly subscription + transaction fees",
    },
  ]

  const paymentMethods = [
    {
      id: 1,
      type: "card",
      last4: "4242",
      brand: "Visa",
      expiry: "12/26",
      isDefault: true,
    },
    {
      id: 2,
      type: "card",
      last4: "5555",
      brand: "Mastercard",
      expiry: "08/25",
      isDefault: false,
    },
  ]

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
              <Link href="/billing" className="text-cyan-400">
                Billing
              </Link>
              <Link href="/subscriptions" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Subscriptions
              </Link>
              <Link href="/payment-history" className="text-gray-300 hover:text-cyan-400 transition-colors">
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
            Billing & Invoices
          </h1>
          <p className="text-gray-400">Manage your billing information and view payment history</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-800">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: "overview", label: "Overview", icon: DollarSign },
                { id: "invoices", label: "Invoices", icon: FileText },
                { id: "payment-methods", label: "Payment Methods", icon: CreditCard },
                { id: "settings", label: "Settings", icon: Settings },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-cyan-500 text-cyan-400"
                      : "border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300"
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Current Bill */}
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 text-white">Current Bill</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 rounded-lg border border-gray-700 bg-black/50">
                  <DollarSign className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white mb-1">$2,450.00</p>
                  <p className="text-gray-400">Current Month</p>
                </div>
                <div className="text-center p-6 rounded-lg border border-gray-700 bg-black/50">
                  <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white mb-1">Dec 31</p>
                  <p className="text-gray-400">Next Bill Date</p>
                </div>
                <div className="text-center p-6 rounded-lg border border-gray-700 bg-black/50">
                  <FileText className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                  <p className="text-3xl font-bold text-white mb-1">3</p>
                  <p className="text-gray-400">Pending Invoices</p>
                </div>
              </div>
            </div>

            {/* Usage Summary */}
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 text-white">Usage Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-lg border border-gray-700 bg-black/50">
                  <div>
                    <p className="text-white font-medium">Transaction Processing</p>
                    <p className="text-gray-400 text-sm">12,450 transactions</p>
                  </div>
                  <p className="text-white font-bold">$1,245.00</p>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg border border-gray-700 bg-black/50">
                  <div>
                    <p className="text-white font-medium">Monthly Subscription</p>
                    <p className="text-gray-400 text-sm">Pro Plan</p>
                  </div>
                  <p className="text-white font-bold">$99.00</p>
                </div>
                <div className="flex justify-between items-center p-4 rounded-lg border border-gray-700 bg-black/50">
                  <div>
                    <p className="text-white font-medium">Additional Features</p>
                    <p className="text-gray-400 text-sm">Advanced analytics, API access</p>
                  </div>
                  <p className="text-white font-bold">$50.00</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invoices Tab */}
        {activeTab === "invoices" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Invoice History</h2>
              <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
                <Download className="w-4 h-4 mr-2" />
                Download All
              </button>
            </div>

            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 backdrop-blur-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black/50 border-b border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Invoice ID</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Description</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Amount</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {billingHistory.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-white">{invoice.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{invoice.date}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{invoice.description}</td>
                        <td className="px-6 py-4 text-sm font-medium text-white">${invoice.amount.toFixed(2)}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Paid
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                            Download PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === "payment-methods" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Payment Methods</h2>
              <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </button>
            </div>

            <div className="grid gap-6">
              {paymentMethods.map((method) => (
                <div key={method.id} className="bg-gray-900/50 rounded-2xl border border-gray-800 p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">
                          {method.brand} •••• {method.last4}
                        </p>
                        <p className="text-gray-400 text-sm">Expires {method.expiry}</p>
                      </div>
                      {method.isDefault && (
                        <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-medium rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-8">
            <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold mb-6 text-white">Billing Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Billing Email</label>
                  <input
                    type="email"
                    defaultValue="billing@company.com"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
                  <input
                    type="text"
                    defaultValue="Acme Corporation"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tax ID</label>
                  <input
                    type="text"
                    defaultValue="12-3456789"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Billing Address</label>
                  <textarea
                    rows={3}
                    defaultValue="123 Business St&#10;Suite 100&#10;San Francisco, CA 94105"
                    className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors resize-none"
                  />
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
