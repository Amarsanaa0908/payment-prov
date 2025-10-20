import { apiList, callPost } from "@/axios/api";
import PaymentModal from "@/components/Modals/PaymentModal";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

export default function DemoPage() {
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [paymentData, setPaymentData] = useState()

    const handleClick = () => {
    setLoading(true);
    callPost(`${apiList.payment}/ard`).then((res) => {
      setLoading(false);
      if (res.status) {
        setOpenModal(true)
        setPaymentData(res?.data)
      }
    })
  };

    return (
        <div>
            <PaymentModal isOpen={openModal} data={paymentData && paymentData} />

            <button onClick={() => handleClick()}>Click here</button>
        </div>
        
    )
}