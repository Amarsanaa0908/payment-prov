"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel, FieldError } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle, Phone } from "lucide-react"
import { apiList, callPost } from "@/axios/api"



export function StorePayModal({isOpen, onClose, setOpenModal, data, id, slug, delivery}) {
  const [open, setOpen] = useState(false)
  const [phone, setPhone] = useState("")
  const [state, setState] = useState("input")
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    // Basic validation
    if (!phone.trim()) {
      setError("Please enter your mobile phone number")
      return
    }

    // Simple phone validation (at least 10 digits)
    const digitsOnly = phone.replace(/\D/g, "")
    if (digitsOnly.length !== 8) {
      setError("Please enter a valid phone number")
      return
    }

    setError("")
    setState("loading")

    try {
      // Simulate API request - replace with your actual API call
      callPost(`${apiList.merchant}/storepay`, {
        id: id,
        lastName: data.lastName,
        firstName: data.firstName,
        address: data.address,
        detail: data.detail,
        city: data.city,
        additionalPhone: data.additionalPhone,
        phone: data.phone,
        delivery: delivery,
        merchantId: slug,
        email: data.email,
      })

      // On success, show the check payment button
      setState("success")
    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.log(err)
      setState("input")
    }
  }

  const handleCheckPayment = () => {
    // Add your check payment logic here
    console.log("Checking payment for:", phone)
    // You can redirect, make another API call, or handle as needed
  }

  const handleOpenChange = (isOpen) => {
    setOpen(isOpen)
    if (!isOpen) {
      // Reset state when modal closes
      setTimeout(() => {
        setPhone("")
        setState("input")
        setError("")
      }, 200)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="bg-white">
      {/* <DialogTrigger asChild>
        <Button>Start Payment</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className={"bg-white text-black"}>
            {state === "success" ? "Request Sent!" : "Утасны дугаараа оруулна уу"}
          </DialogTitle>
          <DialogDescription>
            {state === "success"
              ? "Таны хүсэлт амжилттай илгээгдсэн."
              : "Таны утасруу мэдэгдэл илгээх болно."}
          </DialogDescription>
        </DialogHeader>

        {state === "success" ? (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle className="size-8 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Төлбөрийн хүсэлт <strong>{phone}</strong> дугаар луу илгээсэн
            </p>
          </div>
        ) : (
          <Field>
            <FieldLabel className="text-black" htmlFor="phone">Утасны дугаар</FieldLabel>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="9911-1111"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value)
                  if (error) setError("")
                }}
                className="pl-10 text-black"
                disabled={state === "loading"}
              />
            </div>
            {error && <FieldError>{error}</FieldError>}
          </Field>
        )}

        <DialogFooter>
          {state === "success" ? (
            <Button onClick={handleCheckPayment} className="w-full sm:w-auto">
              Төлбөр шалгах
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={state === "loading"}
              className="w-full sm:w-auto"
            >
              {state === "loading" ? (
                <>
                  <Spinner className="mr-2" />
                  Түр хүлээнэ үү...
                </>
              ) : (
                "Хүсэлт илгээх"
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
