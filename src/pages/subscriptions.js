"use client"

import { BarChart3, Calendar, Check, CreditCard, Settings, Shield, Users, X, Zap } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function SubscriptionsPage() {
  const [billingCycle, setBillingCycle] = useState("monthly")

  const plans = [
    {
      name: "Starter",
      price: { monthly: 29, yearly: 290 },
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 1,000 transactions/month",
        "Basic payment processing",
        "Email support",
        "Standard reporting",
        "API access",
      ],
      limitations: ["No advanced analytics", "No priority support"],
      popular: false,
    },
    {
      name: "Pro",
      price: { monthly: 99, yearly: 990 },
      description: "Ideal for growing businesses",
      features: [
        "Up to 10,000 transactions/month",
        "Advanced payment processing",
        "Priority support",
        "Advanced analytics",
        "Custom integrations",
        "Fraud protection",
        "Multi-currency support",
      ],
      limitations: ["No white-label options"],
      popular: true,
    },
    {
      name: "Enterprise",
      price: { monthly: 299, yearly: 2990 },
      description: "For large-scale operations",
      features: [
        "Unlimited transactions",
        "Enterprise payment processing",
        "24/7 dedicated support",
        "Custom analytics",
        "White-label solutions",
        "Advanced fraud protection",
        "Global payment methods",
        "Custom SLA",
      ],
      limitations: [],
      popular: false,
    },
  ]

  const currentPlan = "Pro"

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
              <Link href="/subscriptions" className="text-cyan-400">
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
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Subscription Plans
          </h1>
          <p className="text-gray-400 text-lg">Choose the perfect plan for your business needs</p>
        </div>

        {/* Current Plan Status */}
        <div className="mb-8 bg-gray-900/50 rounded-2xl border border-gray-800 p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Current Plan: {currentPlan}</h3>
                <p className="text-gray-400">Next billing date: January 15, 2025</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">Active</span>
              <button className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:border-cyan-500 hover:text-cyan-400 transition-colors">
                <Settings className="w-4 h-4 inline mr-2" />
                Manage
              </button>
            </div>
          </div>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900/50 rounded-lg p-1 border border-gray-800">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                billingCycle === "yearly"
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="ml-2 px-2 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-gray-900/50 rounded-2xl border backdrop-blur-sm p-8 ${
                plan.popular
                  ? "border-cyan-500 ring-1 ring-cyan-500/20"
                  : plan.name === currentPlan
                    ? "border-green-500 ring-1 ring-green-500/20"
                    : "border-gray-800"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              {plan.name === currentPlan && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Current Plan
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">${plan.price[billingCycle]}</span>
                  <span className="text-gray-400">/{billingCycle === "monthly" ? "month" : "year"}</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
                {plan.limitations.map((limitation, limitationIndex) => (
                  <div key={limitationIndex} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-400">{limitation}</span>
                  </div>
                ))}
              </div>

              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                  plan.name === currentPlan
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : plan.popular
                      ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:from-cyan-600 hover:to-purple-600 shadow-lg hover:shadow-cyan-500/25"
                      : "border border-gray-600 text-gray-300 hover:border-cyan-500 hover:text-cyan-400"
                }`}
                disabled={plan.name === currentPlan}
              >
                {plan.name === currentPlan ? "Current Plan" : `Upgrade to ${plan.name}`}
              </button>
            </div>
          ))}
        </div>

        {/* Usage & Limits */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
              Current Usage
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Transactions</span>
                  <span className="text-white font-medium">7,245 / 10,000</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full w-3/4"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">API Calls</span>
                  <span className="text-white font-medium">45,230 / 100,000</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full w-1/2"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Storage</span>
                  <span className="text-white font-medium">2.3 GB / 10 GB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full w-1/4"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
              <Calendar className="w-6 h-6 text-purple-400" />
              Billing Information
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 rounded-lg border border-gray-700 bg-black/50">
                <span className="text-gray-300">Next billing date</span>
                <span className="text-white font-medium">January 15, 2025</span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg border border-gray-700 bg-black/50">
                <span className="text-gray-300">Payment method</span>
                <span className="text-white font-medium flex items-center gap-2">
                  <CreditCard className="w-4 h-4" />
                  •••• 4242
                </span>
              </div>
              <div className="flex justify-between items-center p-4 rounded-lg border border-gray-700 bg-black/50">
                <span className="text-gray-300">Monthly cost</span>
                <span className="text-white font-medium">$99.00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add-ons */}
        <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold mb-6 text-white">Available Add-ons</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Advanced Analytics",
                price: 29,
                description: "Detailed transaction insights and custom reports",
                icon: BarChart3,
              },
              {
                name: "Priority Support",
                price: 49,
                description: "24/7 priority support with dedicated account manager",
                icon: Users,
              },
              {
                name: "Enhanced Security",
                price: 39,
                description: "Advanced fraud protection and security monitoring",
                icon: Shield,
              },
            ].map((addon, index) => (
              <div key={index} className="p-6 rounded-lg border border-gray-700 bg-black/50">
                <addon.icon className="w-8 h-8 text-cyan-400 mb-4" />
                <h4 className="text-lg font-bold text-white mb-2">{addon.name}</h4>
                <p className="text-gray-400 text-sm mb-4">{addon.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">${addon.price}/month</span>
                  <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300">
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
