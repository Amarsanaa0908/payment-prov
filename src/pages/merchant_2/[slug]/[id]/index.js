"use client"

import { apiList, callGet, callGetList, callPost } from "@/axios/api"
import PaymentModal from "@/components/PaymentModal"
import { StorePayModal } from "@/components/StorePayModal"
import TokiModal from "@/components/TokiModal"
import { useMainContext } from "@/context/MainContext"
import formatNumberWithCommas from "@/lib/math"
import { User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function MerchantV2Checkout() {
  const router = useRouter()
  const { id, slug } = router.query
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }} = useForm()
  const [selected, setSelected] = useState({
    id: "",
    name: "",
    description: "",
    price: 0.0,
    store: ""
  })
  const [data, setData] = useState()
  const [price, setPrice] = useState()
  const [paymentData, setPaymentData] = useState()
  const [openModal, setOpenModal] = useState()
  const [delivery, setDelivery] = useState([])
  const [open, setOpen] = useState(false)
  const [tokiModal, setTokiModal] = useState(false)
  const [formValues, setFormValues] = useState()
  const [deliveryType, setDeliveryType] = useState("delivery");
const [selectedBranch, setSelectedBranch] = useState(null);
  const { userInfo } = useMainContext()

  const branches = [
    { id: "e-mart", name: "E-Mart", address: "Хан-Уул 15-р хороо"},
    { id: "hunnu-mall", name: "Hunnu Mall", address: "Хан-Уул дүүрэг 24-р хороо"},
    { id: "shangri-la", name: "Shangri-La", address: "Сүхбаатар дүүрэг 1-р хороо"}
  ]

  const payments = [
  { id: "qpay",     name: "QPay",     description: "QR код ашиглан төлөх", logo: "/qpay.jpg" },
  { id: "storepay", name: "StorePay", description: "100,000-с дээш дүнтэй захиалганд ашиглах боломжтой", logo: "https://play-lh.googleusercontent.com/MYmzdiAqg2vQPe19wsnkSrDvLyDzvi-d-i90xKKtxccOcQ3ADp76nTlJxGm7RlNYLGHEMKM6JzMqXOv-bpwbzA" },
  { id: "toki", name: "Toki", description :"QR код ашиглан төлөх", logo: "https://www.toki.mn/wp-content/uploads/2025/05/Asset-26-1.png"}
];

const availablePayments = payments.filter(
  (p) => p.id !== "storepay" || Number(data?.amount) >= 100000
);

const [selectedPayment, setSelectedPayment] = useState("qpay");

  // ❌ Remove price logic from here
useEffect(() => {
  if (!id || !slug) return;

  const fetchOrder = async () => {
    try {
      const res = await callGet(`${apiList.merchant}/${slug}/${id}`);
      setData(res?.data);
      
    } catch (error) {
      console.log('Error fetching order:', error);
    }
  };

  const fetchDelivery = async () => {
    try {
      const response = await callGet(`${apiList.delivery}/method/${slug}?filters=[["slug","${slug}"]]`);
      setDelivery(response.items || []);
      if (response?.items.length > 0) {
      const firstItem = response?.items[0];

      setSelected({
        id: firstItem.id || "",
        name: firstItem.name || "",
        description: firstItem.description || "",
        price: Number(firstItem.price || 0),
        store: firstItem.store || ""
      });
    }
    } catch (error) {
      console.log('Error fetching delivery:', error);
    }
  };

  const fetchBranches = async () => {
    try {
      const response = await callGet(`${apiList.merchant}/branches/${slug}`);
      setDelivery(response.items || []);
      if (response?.items.length > 0) {
      const firstItem = response?.items[0];

      setSelected({
        id: firstItem.id || "",
        name: firstItem.name || "",
        description: firstItem.description || "",
        price: Number(firstItem.price || 0),
        store: firstItem.store || ""
      });
    }
    } catch (error) {
      console.log('Error fetching delivery:', error);
    }
  }

  fetchOrder();
  fetchDelivery();
  fetchBranches()
}, [id, slug, deliveryType]);

useEffect(() => {
  if (!data?.amount) return;

  const orderAmount = Number(data.amount);
  const FREE_SHIPPING_THRESHOLD = 50000;
  const SHIPPING_PRICE = 5000;

  // Override delivery price based on order amount
  const shippingPrice = orderAmount >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_PRICE;
  
  setSelected(prev => ({ ...prev, price: shippingPrice }));
  setPrice(orderAmount + shippingPrice);
}, [data]);

  const handlePayment = (values) => {
    setLoading(true)
    if (selectedPayment === 'storepay') {
      console.log("here")
      setOpen(true)
      setFormValues(values)
    } else {
      callPost(`${apiList.merchant}/update`, {
        id: id,
        lastName: values.lastName,
        firstName: values.firstName,
        address: values.address,
        detail: values.detail,
        city: values.city,
        additionalPhone: values.additionalPhone,
        phone: values.phone,
        delivery: selected.id,
        merchantId: slug,
        email: values.email,
        method: selectedPayment,
        deliveryType,
        store: deliveryType === "pickup" ? selectedBranch : null,
    }).then((res) => {
        setLoading(false)
        if (res?.status) {
          setPaymentData(res?.data)
          if (selectedPayment === 'toki') {
            setTokiModal(true) 
          } else {
            setOpenModal(true);
          }
        } else {
          toast.error(res?.msg[0])          
        }
    })
    }
  }

  console.log(tokiModal)

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
    <StorePayModal onClose={() => setOpen(false)} isOpen={open} setOpenModal={setOpen} id={id} slug={slug} data={formValues} delivery={selected.id} />
    <TokiModal onClose={() => setTokiModal(false)} isOpen={tokiModal} setOpenModal={setTokiModal} id={id} slug={slug} data={paymentData && paymentData} />
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          
          <div className="flex items-center justify-between">
            
            {/* Logo / Title */}
            <div className="flex-1 text-center">
              <a
                href={`https://${data?.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h1 className="text-3xl font-bold text-black">
                  <span style={{ color: data?.color }}>
                    {data?.name}
                  </span>
                </h1>
              </a>
            </div>

            {/* Login Button */}
            <Link
              href="/login"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            >
              <User className="w-5 h-5" />
            </Link>

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
                <div className="space-y-2">
                  <input
                    name="email"
                    placeholder="И-мэйл"
                    {...register('email')}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  />
                  {/* <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="newsletter"
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-600">
                      Цаашид и-мэйл ээр мэдээлэл авмаар байна
                    </label>
                  </div> */}
                </div>
              </div>

              <div>
               

                {/* Delivery Type */}
<div>
  <h2 className="text-lg font-semibold text-gray-900 mb-4">
    Захиалга авах төрөл
  </h2>

  <div className="grid grid-cols-2 gap-4 mb-6">

    {/* Delivery */}
    <label
      className={`border rounded-lg p-4 cursor-pointer transition ${
        deliveryType === "delivery"
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300"
      }`}
    >
      <input
        type="radio"
        name="deliveryType"
        value="delivery"
        checked={deliveryType === "delivery"}
        onChange={() => setDeliveryType("delivery")}
        className="hidden"
      />

      <div className="font-medium text-black">
        Хүргэлт
      </div>

      <p className="text-sm text-gray-500">
        Хаягаар хүргэнэ
      </p>
    </label>

    {/* Pickup */}
    <label
      className={`border rounded-lg p-4 cursor-pointer transition ${
        deliveryType === "pickup"
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300"
      }`}
    >
      <input
        type="radio"
        name="deliveryType"
        value="pickup"
        checked={deliveryType === "pickup"}
        onChange={() => setDeliveryType("pickup")}
        className="hidden"
      />

      <div className="font-medium text-black">
        Очиж авах
      </div>

      <p className="text-sm text-gray-500">
        Салбараас өөрөө авах
      </p>
    </label>
  </div>
</div>

{/* CUSTOMER INFO */}
<div>
  <h2 className="text-lg font-semibold text-gray-900 mb-4">
    {deliveryType === "delivery"
      ? "Хүргэлтийн мэдээлэл"
      : "Хэрэглэгчийн мэдээлэл"}
  </h2>

  <div className="space-y-4">

    {/* NAME */}
    <div className="grid grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Овог"
        {...register("lastName")}
        className="px-4 py-3 border border-gray-300 rounded-md text-black"
      />

      <input
        type="text"
        placeholder="Нэр"
        {...register("firstName", { required: true })}
        className="px-4 py-3 border border-gray-300 rounded-md text-black"
        required
      />
    </div>

    {/* ADDRESS ONLY FOR DELIVERY */}
    {deliveryType === "delivery" && (
      <>
        <input
          type="text"
          placeholder="Хаяг"
          {...register("address", { required: true })}
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-black"
          required
        />

        <input
          type="text"
          placeholder="Орцны кодтой бол оруулна уу"
          {...register("detail")}
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-black"
        />

        <input
          type="text"
          placeholder="Хот"
          {...register("city")}
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-black"
        />
      </>
    )}

    {/* PHONE */}
    <input
      type="tel"
      placeholder="Утасны дугаар"
      {...register("phone", { required: true })}
      className="w-full px-4 py-3 border border-gray-300 rounded-md text-black"
      required
    />
  </div>
</div>

{/* DELIVERY OPTIONS */}
{deliveryType === "delivery" && (
  <div className="space-y-4">

    <h2 className="text-lg font-semibold text-gray-900">
      Хүргэлтийн төрөл
    </h2>

    {delivery.map((el, i) => (
      <label
        key={i}
        className={`flex items-start p-4 border rounded-lg cursor-pointer ${
          selected?.id === el.id
            ? "border-blue-500"
            : "border-gray-300"
        }`}
      >
        <input
          type="radio"
          name="delivery"
          checked={selected?.id === el.id}
          onChange={() => setSelected(el)}
          className="mt-1 mr-3 accent-blue-600"
        />

        <div className="flex justify-between w-full">
          <span className="text-sm font-medium text-gray-800 flex-1">
            {el.name}

            <p className="text-xs text-gray-500">
              {el.description}
            </p>
          </span>

          <span className="text-sm font-semibold text-blue-600 mt-1">
            {el.price === "0"
              ? "Үнэгүй"
              : `${el.price}₮`}
          </span>
        </div>
      </label>
    ))}
  </div>
)}

{/* PICKUP BRANCHES */}
{deliveryType === "pickup" && (
  <div className="space-y-4">

    <h2 className="text-lg font-semibold text-gray-900">
      Салбар сонгох
    </h2>

    {branches.map((branch, i) => (
      <label
        key={i}
        className={`flex items-start p-4 border rounded-lg cursor-pointer ${
          selectedBranch === branch.name
            ? "border-blue-500"
            : "border-gray-300"
        }`}
      >
        <input
          type="radio"
          name="branch"
          checked={selectedBranch === branch.name}
          onChange={() => setSelectedBranch(branch.name)}
          className="mt-1 mr-3 accent-blue-600"
        />

        <div>
          <div className="font-medium text-black">
            {branch.name}
          </div>

          <div className="text-sm text-gray-500">
            {branch.address}
          </div>
        </div>
      </label>
    ))}
  </div>
)}
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Төлбөрийн хэлбэр</h2>
                {availablePayments.map((el, i) => (
  <label
    key={i}
    className={`flex items-center p-4 border rounded-lg cursor-pointer ${
      selectedPayment === el.id ? "border-blue-500" : "border-gray-300"
    }`}
  >
    <input
      type="radio"
      name="payment"
      value={el.id}
      checked={selectedPayment === el.id}
      onChange={() => setSelectedPayment(el.id)}
      className="mt-1 mr-3 accent-blue-600"
    />
    <div className="flex justify-between items-center w-full">
      <span className="text-sm font-medium text-gray-800 flex-1">
        {el.name}
        <p className="text-xs text-gray-500">{el.description}</p>
      </span>
      <div className="w-8 h-8 rounded overflow-hidden">
        <Image alt={`${el.name}-logo`} src={el.logo} width={32} height={32} />
      </div>
    </div>
  </label>
))}
              </div>

              <button
                type="submit"
                className={`w-full bg-black hover:bg-blue-500 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200`}
                disabled={loading}
              >
                {loading ? 'Уншиж байна...' : 'Төлбөр төлөх'}
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
                  <span className="text-gray-600">Хүргэлт</span>
                  <span className="font-medium text-black">
                    {deliveryType === "pickup"
                      ? "Үнэгүй"
                      : selected.price === 0
                        ? "Үнэгүй"
                        : `${formatNumberWithCommas(selected.price)} MNT`
                    }
                  </span>
                </div>
                {Number(data?.amount) < 50000 && (
                  <p className="text-xs text-gray-500">
                    ₮{formatNumberWithCommas(50000 - Number(data?.amount))} нэмж захиалбал хүргэлт үнэгүй
                  </p>
                )}
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Нийт</span>
                  <span className="font-medium text-black">{formatNumberWithCommas(price)} MNT</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Нийт</span>
                  <span className="text-lg font-semibold text-gray-900">₮ {formatNumberWithCommas(price)} MNT</span>
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
