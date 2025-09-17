"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Check, CheckCircle, Copy, Download } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function OrderConfirmationPage() {
  const [copied, setCopied] = useState(false)
  const [orderData, setOrderData] = useState({
    orderId: "PF-2024-001234",
    amount: "$299.99",
    currency: "USD",
    paymentMethod: "Visa ending in 4242",
    customerEmail: "customer@example.com",
    customerName: "John Doe",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    items: [
      { name: "PayFlow Pro Plan", quantity: 1, price: "$199.99" },
      { name: "Advanced Analytics Add-on", quantity: 1, price: "$99.99" },
      { name: "Priority Support", quantity: 1, price: "$0.00" },
    ],
  })

  useEffect(() => {
    // In a real app, you'd get order data from URL params or API
    const urlParams = new URLSearchParams(window.location.search)
    const orderId = urlParams.get("order_id")
    if (orderId) {
      setOrderData((prev) => ({ ...prev, orderId }))
    }
  }, [])

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderData.orderId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="text-2xl font-bold text-black">
              PayFlow
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/dashboard" className="text-gray-600 hover:text-black transition-colors">
                Dashboard
              </Link>
              <Link href="/payment-history" className="text-gray-600 hover:text-black transition-colors">
                Transactions
              </Link>
              <Link href="/billing" className="text-gray-600 hover:text-black transition-colors">
                Billing
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Success message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500 mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">Payment Successful!</h1>
          <p className="text-xl text-gray-600 mb-2">Thank you for choosing PayFlow</p>
          <p className="text-gray-500">Your order has been confirmed and is being processed</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order details */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-black">Order Details</h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Order ID</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-black">{orderData.orderId}</span>
                    <Button variant="ghost" size="sm" onClick={copyOrderId} className="h-8 w-8 p-0 hover:bg-gray-100">
                      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-semibold text-xl text-green-600">{orderData.amount}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="text-black">{orderData.paymentMethod}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Date</span>
                  <span className="text-black">{orderData.date}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Customer</span>
                  <div className="text-right">
                    <div className="text-black">{orderData.customerName}</div>
                    <div className="text-sm text-gray-500">{orderData.customerEmail}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order items */}
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-6 text-black">Products Purchased</h2>

              <div className="space-y-4">
                {orderData.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="text-black font-medium">{item.name}</div>
                      <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                    </div>
                    <div className="text-black font-semibold">{item.price}</div>
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-black">Total</span>
                    <span className="text-green-600">{orderData.amount}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300">
            <Download className="w-5 h-5 mr-2" />
            Download Receipt
          </Button>

          <Link href="/dashboard">
            <Button
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 bg-transparent"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Next steps */}
        <Card className="mt-12 bg-gray-50 border border-gray-200">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-black">What is Next?</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">1</span>
                </div>
                <h4 className="font-semibold text-black mb-2">Email Confirmation</h4>
                <p className="text-sm text-gray-600">
                  You will receive a confirmation email with your receipt and account details.
                </p>
              </div>

              <div className="p-4">
                <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">2</span>
                </div>
                <h4 className="font-semibold text-black mb-2">Account Setup</h4>
                <p className="text-sm text-gray-600">
                  Your PayFlow account is being activated. You can start using our services immediately.
                </p>
              </div>

              <div className="p-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white font-bold">3</span>
                </div>
                <h4 className="font-semibold text-black mb-2">Get Started</h4>
                <p className="text-sm text-gray-600">
                  Access your dashboard to configure payment settings and start processing transactions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
