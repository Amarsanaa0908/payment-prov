"use client"

import { useRouter } from 'next/router'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog'
import { Card, CardContent } from './ui/card'
import { QRCodeCanvas } from 'qrcode.react'
import { Button } from './ui/button'

export default function TokiModal({isOpen, onClose, data, price, slug}) {

    const router = useRouter()
    

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold text-black">Toki ашиглаж төлбөр төлөх</DialogTitle>
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
              </CardContent>
            </Card>

          {/* Action Buttons */}
         

          {/* Payment Status */}
          <div className="text-center">
            <div className="text-xs text-gray-500">Төлбөр төлсөн тохиолдолд захиалга автоматаар баталгаажна</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
