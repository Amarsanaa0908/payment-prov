"use client"

import { apiList, callGet } from "@/axios/api"
import { useEffect, useState } from "react"

export default function PayoutPage() {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchPayouts = async () => {
            try {
                const res = await callGet(`${apiList.delivery}/method/most/payout`)
                setData(res.items || []);
            } catch (error) {
                console.log('Error fetching order:', error)
            }
        }

        fetchPayouts()
    }, [])

    return (
        <div className="text-black">
            <h1>bye lalaraa</h1>
            {
                data && data.map((el, i) => {
                    return (
                        <div className="flex" key={i}>
                            <div
  key={i}
  className="grid grid-cols-4 gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow"
>
  {/* Identity */}
  <div className="col-span-4 flex items-center justify-between border-b border-gray-100 pb-3">
    <span className="text-base font-semibold text-gray-800">{el.name}</span>
    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
      {el.bankCode}
    </span>
  </div>

  {/* Account Info */}
  <div className="flex flex-col">
    <span className="text-xs text-gray-400">Дансны дугаар</span>
    <span className="mt-1 text-sm font-medium text-gray-700">{el.accountNumber}</span>
  </div>
  <div className="flex flex-col">
    <span className="text-xs text-gray-400">Дансны нэр</span>
    <span className="mt-1 text-sm font-medium text-gray-700">{el.accountName}</span>
  </div>

  {/* Financials */}
  <div className="flex flex-col">
    <span className="text-xs text-gray-400">Нийт дүн</span>
    <span className="mt-1 text-sm font-semibold text-gray-900">{el.total}</span>
  </div>
  <div className="flex flex-col">
    <span className="text-xs text-gray-400">Төлбөр</span>
    <span className="mt-1 text-sm font-semibold text-green-600">{el.payment}</span>
  </div>

  {/* Fees */}
  <div className="flex flex-col">
    <span className="text-xs text-gray-400">Most шимтгэл</span>
    <span className="mt-1 text-sm text-gray-700">{el.mostFee}</span>
  </div>
  <div className="flex flex-col">
    <span className="text-xs text-gray-400">Ami шимтгэл</span>
    <span className="mt-1 text-sm text-gray-700">{el.amiFee}</span>
  </div>
</div>
                    </div>
                    )
                })
            }

            <h1>Hi lalaraa</h1>
        </div>
    )   
}