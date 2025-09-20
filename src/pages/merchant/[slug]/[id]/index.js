"use client"

import { apiList, callGet, callPost } from "@/axios/api"
import PaymentModal from "@/components/PaymentModal"
import formatNumberWithCommas from "@/lib/math"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function DeelyCheckout() {
  const router = useRouter()
  const { id, slug } = router.query
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    city: "",
    phone: "",
    deliveryOption: "free",
    paymentMethod: "qpay",
  })
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }} = useForm()
  const [selected, setSelected] = useState('free')
  const [data, setData] = useState()
  const [price, setPrice] = useState()
  const [paymentData, setPaymentData] = useState()
  const [openModal, setOpenModal] = useState()

  useEffect(() => {
    if (id && slug) {
        callGet(`${apiList.merchant}/${slug}/${id}`).then((res) => {
            setData(res?.data)
            if (selected === 'free')  {
                setPrice(res?.data?.amount);
            } else {
                setPrice(Number(res?.data?.amount) + 20000)
            }
        })
    }
  }, [id, slug, selected])

  const handlePayment = (values) => {
    setLoading(true)
    callPost(`${apiList.merchant}/update`, {
        id: id,
        email: values.email,
        lastName: values.lastName,
        firstName: values.firstName,
        address: values.address,
        detail: values.detail,
        city: values.city,
        additionalPhone: values.additionalPhone,
        phone: values.phone,
        delivery: selected,
        merchantId: slug
    }).then((res) => {
        setLoading(false)
        if (res?.status) {
            setOpenModal(true);
            setPaymentData(res?.data)
        } else {
          toast.error(res?.msg[0])          
        }
    })
  }

  if (!data || typeof price === 'undefined') {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <p className="text-gray-500 text-sm">Түр хүлээнэ үү...</p>
    </div>
  )
}


  return (
    <>
    <PaymentModal onClose={() => setOpenModal(false)} isOpen={openModal} setOpenModal={setOpenModal} data={paymentData && paymentData} price={price} slug={slug} />
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-black">
              <span className={`text-[${data?.color}]`}>{data?.name}</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Checkout Form */}
          <div className="space-y-8">
            <form onSubmit={handleSubmit(handlePayment)} className="space-y-8">
              {/* Contact Information */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Холбоо барих мэдээлэл</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    placeholder="И-мэйл"
                    {...register('email', { required: true})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    required
                  />
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-600">
                      Цаашид и-мэйл ээр мэдээлэл авмаар байна
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Хүргэлтийн мэдээлэл</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Овог"
                      {...register('lastName', {required: true})}
                      className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      required
                    />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Нэр"
                      {...register('firstName', {required: true})}
                      className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    placeholder="Хаяг"
                    {...register('address', {required: true})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    required
                  />
                  <input
                    type="text"
                    name="apartment"
                    placeholder="Орцны кодтой бол оруулна уу"
                    {...register('detail', {required: true})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="Хот"
                      {...register('city', {required: true})}
                      className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                      required
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Нэмэлт утасны дугаар (optional)"
                      {...register('additionalPhone', {required: true})}
                      className="px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Утасны дугаар"
                    {...register('phone', {required: true})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                    required
                  />
                </div>

                {/* Delivery Options */}
                <div className="">
                <span className='flex flex-col-reverse lg:flex-row justify-between items-center'>
                  <h2 className="text-lg font-semibold text-gray-900">Хүргэлтийн мэдээлэл</h2>
                </span>
               <label
                  className={`flex items-start p-4! border rounded-t-lg cursor-pointer ${
                    selected === "free"
                    ? "border-red-500"
                    : "border-gray-300"
                  }`}
                >
                  <input
                  type="radio"
                  name="delivery"
                  value="paid"
                  checked={selected === "free"}
                  onChange={() => setSelected("free")}
                  className="mt-1 mr-3 accent-blue-600"
                  />
                  <div className="flex justify-between w-full">
                    <span className='text-sm font-medium text-gray-800 flex-1'>
                      Энгийн хүргэлт
                      <p className='text-xs text-gray-500'>
                        24-48 цагийн хооронд хүргэгдэнэ
                      </p>
                    </span>
                    <span className="text-sm font-semibold text-blue-600 mt-1">
                      ҮНЭГҮЙ
                    </span>
                  </div>
                </label>
                <label
                  className={`flex items-start p-4! border rounded-b-lg cursor-pointer ${
                    selected === "paid"
                    ? "border-red-500"
                    : "border-gray-300"
                  }`}
                >
                  <input
                  type="radio"
                  name="delivery"
                  value="paid"
                  checked={selected === "paid"}
                  onChange={() => setSelected("paid")}
                  className="mt-1 mr-3 accent-blue-600"
                  />
                  <div className="flex justify-between w-full">
                    <span className='text-sm font-medium text-gray-800 flex-1'>
                      UB Cab хүргэлт
                      <p className='text-xs text-gray-500'>
                        Зөвхөн ажлын цагаар
                      </p>
                    </span>
                    <span className="text-sm font-semibold text-blue-600 mt-1">
                      20,000
                    </span>
                  </div>
                </label>
              </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Төлбөрийн хэлбэр</h2>
                <div className="border border-gray-300 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="payment"
                        value="qpay"
                        defaultChecked
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-900">Qpay</span>
                    </div>
                    <div className="w-8 h-8 bg-blue-900 rounded flex items-center justify-center">
                      <Image alt="qpay-logo" src="/qpay.jpg" width={2000} height={2000} />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full bg-black hover:bg-blue-500 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200`}
              >
                Төлбөр төлөх
              </button>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:pl-8">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-8">
              <div className="space-y-4">
                {data?.lineItems && data.lineItems.map((el, i) => {
                    return (
                    <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <figure className="relative h-16 w-16">
                                <Image
                                alt={el.name} 
                                className="w-full h-full object-cover border rounded-md" 
                                width={2000} 
                                height={2000} 
                                src={el.image}
                                />

                        <p className="absolute -top-2 -right-2 w-4 h-4 flex justify-center items-center rounded-full bg-gray-400 text-white">
                            {el.quantity}
                        </p>
                    </figure>

                    <span className="text-black">
                        {el.name}
                        {/* <p className="text-black text-xs">{el}</p> */}
                    </span>
                </div>

                <label className="text-black">
                    ₮ {el.price}
                </label>
                </div>
                    )
                })}
                
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Нийт</span>
                  <span className="font-medium text-black">{formatNumberWithCommas(price)} MNT</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Хүргэлт</span>
                  <span className="font-medium text-black">{selected === 'free' ? 'Үнэгүй' : '20,000 MNT'} </span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Нийт</span>
                  <span className="text-lg font-semibold text-gray-900">₮ {price} MNT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}
