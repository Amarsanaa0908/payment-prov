"use client"

import { useState } from "react"
import PaymentModal from "./PaymentModal"
import { Button } from "./ui/button"

export default function PaymentModalDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="p-8">
      <div className="max-w-md mx-auto text-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Payment Modal Demo</h2>
        <p className="text-gray-600">Click the button below to test the responsive payment modal</p>
        <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          Open Payment Modal
        </Button>
      </div>

      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} amount="75,000" currency="MNT" />
    </div>
  )
}
