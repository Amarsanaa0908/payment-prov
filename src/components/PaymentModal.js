"use client"

import { apiList, callGet } from "@/axios/api"
import { useRouter } from "next/router"
import { QRCodeCanvas } from "qrcode.react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"

export default function PaymentModal({ isOpen, onClose, data, price, slug }) {
  const router = useRouter()
  const [selectedMethod, setSelectedMethod] = useState("qr")
  const [loading, setLoading] = useState(false)

  // Generate QR code placeholder
  const qrCodeUrl = `/placeholder.svg?height=200&width=200&query=QR code for payment 50000 MNT`

  const checkPayment = () => {
    setLoading(true)
    callGet(`${apiList.merchant}/check/${slug}/${data?.orderId}`).then((res) => {
      if (res?.data === 'COMPLETED') {
        router.push(`/successful/${res?.data}`)
      } else {
        toast('Төлбөр төлөгдөөгүй байна')
      }
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-black">Төлбөр төлөх</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">
              {price} MNT
            </div>
            {/* <div className="text-sm text-gray-500 mt-1">Payment Amount</div> */}
          </div>
          <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div className="flex justify-center items-center">
                    <QRCodeCanvas value={data?.qrCode || ""} />

                    
                  </div>
                  
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="text-sm font-medium text-gray-900">QR уншуулж төлнө үү</div>
                  <div className="text-xs text-gray-500">Use your banking app to scan this QR code</div>
                </div>

                <div className="">
                  <ul className='sm:hidden flex justify-center flex-wrap gap-5'>
          {data &&
            data?.urls.map((el, i) => {
              return (
                <li key={i}>
                  <a href={el.link}>
                    <img alt={el.logo} width={50} height={50} src={el.logo} />
                  </a>
                </li>
              );
            })}
        </ul>
                </div>

              </CardContent>
            </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent text-black">
              Буцах
            </Button>
            <Button
              onClick={() => checkPayment()}
              className="flex-1 bg-black hover:bg-blue-700"
            >
              Төлбөр шалгах
            </Button>
          </div>

          {/* Payment Status */}
          <div className="text-center">
            <div className="text-xs text-gray-500">Төлбөр төлсөн тохиолдолд захиалга автоматаар баталгаажна</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
