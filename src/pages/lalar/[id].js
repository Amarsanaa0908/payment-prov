"use client";

import { useState, useEffect, useCallback } from "react";

// Add to your next.config.js fonts or layout.tsx:
// import { DM_Mono, Syne } from "next/font/google"

const PLANS = [
  { months: 1,  label: "1 Month",   price: 49000,  savings: null },
  { months: 3,  label: "3 Months",  price: 129000, savings: "Save 12%", popular: true },
  { months: 12, label: "12 Months", price: 449000, savings: "Save 24%" },
];

const HISTORY = [
  { id: "#INV-2025-0041", plan: "Pro · 3mo", amount: 129000, date: "Feb 3, 2025", status: "paid" },
  { id: "#INV-2024-0038", plan: "Pro · 3mo", amount: 129000, date: "Nov 3, 2024", status: "paid" },
  { id: "#INV-2024-0031", plan: "Pro · 1mo", amount: 49000,  date: "Aug 14, 2024", status: "paid" },
];

const fmt = (n) => n.toLocaleString("en");

function addMonths(date, months) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

const CURRENT_EXPIRY = new Date("2025-05-03");

export default function BillingPage() {
  const [selected, setSelected] = useState(3);
  const [modalOpen, setModalOpen] = useState(false);
  const [polling, setPolling] = useState(false);

  const plan = PLANS.find((p) => p.months === selected);
  const newExpiry = addMonths(CURRENT_EXPIRY, selected);

  console.log("asdasds")

  // Poll payment status
  const pollPayment = useCallback(async (invoiceId) => {
    setPolling(true);
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/billing/invoice/${invoiceId}/status`);
        const data = await res.json();
        if (data.status === "paid") {
          clearInterval(interval);
          setPolling(false);
          setModalOpen(false);
          // router.refresh() or show success toast
        }
      } catch {
        // continue polling
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePay = async () => {
    setModalOpen(true);
    try {
      const res = await fetch("/api/billing/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ months: selected, price: plan.price }),
      });
      const data = await res.json();
      // data.invoiceId, data.qpayUrl, data.qpayQr
      pollPayment(data.invoiceId);
    } catch (err) {
      console.error(err);
    }
  };

  // Close modal on escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setModalOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="min-h-screen bg-[#070809] text-slate-200 font-['Syne',sans-serif]">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-emerald-500/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-12 pb-20">

        {/* Nav */}
        <nav className="flex items-center justify-between mb-14">
          <span className="font-['DM_Mono',monospace] text-sm text-slate-200 tracking-wide">
            atlas<span className="text-cyan-400">_</span>
          </span>
          <span className="font-['DM_Mono',monospace] text-xs text-slate-500 tracking-widest uppercase">
            thedeely.com
          </span>
        </nav>

        {/* Page title */}
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-100 mb-1">Billing</h1>
          <p className="font-['DM_Mono',monospace] text-xs text-slate-500 tracking-wide">
             manage your subscription and payments
          </p>
        </div>

        {/* Current plan */}
        <div className="relative bg-[#0e1012] border border-[#2a2f35] rounded-xl p-7 mb-8 overflow-hidden">
          {/* top accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 via-emerald-300 to-cyan-400" />
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-['DM_Mono',monospace] text-[10px] tracking-[0.15em] uppercase text-slate-500 mb-2">
                Current Plan
              </p>
              <p className="text-xl font-bold text-slate-100 mb-1">Pro Monthly</p>
              <p className="font-['DM_Mono',monospace] text-xs text-slate-500">
                Expires{" "}
                <span className="text-yellow-400">May 3, 2025</span>
                {" "}· 28 days remaining
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 font-['DM_Mono',monospace] text-[11px] tracking-wide uppercase whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </div>
          </div>
        </div>

        {/* Section label */}
        <p className="font-['DM_Mono',monospace] text-[10px] tracking-[0.15em] uppercase text-slate-500 mb-4">
          Extend or change plan
        </p>

        {/* Plan selector */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {PLANS.map((p) => (
            <button
              key={p.months}
              onClick={() => setSelected(p.months)}
              className={`relative text-left rounded-xl p-5 border transition-all duration-150
                ${selected === p.months
                  ? "border-cyan-400 bg-cyan-500/[0.08]"
                  : "border-[#1c1f23] bg-[#0e1012] hover:border-[#2a2f35] hover:-translate-y-px"
                }`}
            >
              {p.popular && (
                <span className="absolute -top-px left-1/2 -translate-x-1/2 bg-cyan-400 text-[#070809] font-['DM_Mono',monospace] text-[9px] font-medium tracking-widest px-2.5 py-0.5 rounded-b-md">
                  POPULAR
                </span>
              )}
              {selected === p.months && (
                <span className="absolute top-3 right-3 font-['DM_Mono',monospace] text-[11px] text-cyan-400">✓</span>
              )}
              <p className="font-['DM_Mono',monospace] text-[10px] tracking-widest uppercase text-slate-500 mb-2">
                {p.label}
              </p>
              <p className="text-2xl font-extrabold tracking-tight text-slate-100">
                {fmt(p.price)}
                <span className="text-sm font-normal text-slate-500 font-['DM_Mono',monospace]"> ₮</span>
              </p>
              {p.savings && (
                <p className="font-['DM_Mono',monospace] text-[10px] text-emerald-400 mt-1.5">{p.savings}</p>
              )}
            </button>
          ))}
        </div>

        {/* Invoice preview */}
        <div className="bg-[#0e1012] border border-[#2a2f35] rounded-xl overflow-hidden mb-5">
          {/* header */}
          <div className="flex items-center justify-between px-7 py-4 border-b border-[#1c1f23]">
            <span className="font-['DM_Mono',monospace] text-[11px] tracking-widest uppercase text-slate-500">
              Invoice Preview
            </span>
            <span className="font-['DM_Mono',monospace] text-[11px] text-[#2a2f35]">#INV-2025-0042</span>
          </div>

          {/* rows */}
          {[
            { key: "Merchant",     val: "thedeely.com",    accent: false },
            { key: "Plan",         val: `Pro · ${plan.label}`, accent: true },
            { key: "Current expiry", val: "May 3, 2025",   accent: false },
            { key: "New expiry",   val: newExpiry,          accent: true },
          ].map((row) => (
            <div key={row.key} className="flex items-center justify-between px-7 py-3.5 border-b border-[#1c1f23] last:border-0 hover:bg-white/[0.01] transition-colors">
              <span className="font-['DM_Mono',monospace] text-xs text-slate-500">{row.key}</span>
              <span className={`font-['DM_Mono',monospace] text-xs ${row.accent ? "text-cyan-400" : "text-slate-200"}`}>
                {row.val}
              </span>
            </div>
          ))}

          {/* total */}
          <div className="flex items-center justify-between px-7 py-5 bg-cyan-500/[0.04] border-t border-cyan-500/20">
            <span className="text-sm font-bold text-slate-100 tracking-wide">Total</span>
            <span className="text-2xl font-extrabold tracking-tight text-cyan-400">
              {fmt(plan.price)}
              <span className="text-xs font-normal font-['DM_Mono',monospace]"> ₮</span>
            </span>
          </div>
        </div>

        {/* Pay button */}
        <button
          onClick={handlePay}
          className="w-full py-4 bg-cyan-400 hover:bg-cyan-300 active:bg-cyan-500 text-[#070809] font-bold text-sm tracking-wide rounded-xl flex items-center justify-center gap-2.5 transition-all duration-150 hover:-translate-y-px"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M2 10h20" stroke="currentColor" strokeWidth="2"/>
          </svg>
          Pay with QPay
        </button>

        {/* Payment history */}
        <div className="mt-12">
          <p className="font-['DM_Mono',monospace] text-[10px] tracking-[0.15em] uppercase text-slate-500 mb-4">
            Payment history
          </p>
          <div className="bg-[#0e1012] border border-[#1c1f23] rounded-xl overflow-hidden">
            <table className="w-full font-['DM_Mono',monospace] text-xs">
              <thead>
                <tr className="border-b border-[#1c1f23]">
                  {["Invoice", "Plan", "Amount", "Date", "Status"].map((h) => (
                    <th key={h} className="text-left px-5 py-3 text-[10px] tracking-widest uppercase text-slate-500 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {HISTORY.map((row) => (
                  <tr key={row.id} className="border-b border-[#1c1f23] last:border-0 hover:bg-white/[0.01] transition-colors">
                    <td className="px-5 py-4 text-slate-300">{row.id}</td>
                    <td className="px-5 py-4 text-slate-400">{row.plan}</td>
                    <td className="px-5 py-4 text-slate-300">{fmt(row.amount)} ₮</td>
                    <td className="px-5 py-4 text-slate-400">{row.date}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 text-[10px] tracking-wide uppercase">
                        <span className="w-1 h-1 rounded-full bg-emerald-400" />
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* QPay Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div className="bg-[#0e1012] border border-[#2a2f35] rounded-2xl p-9 w-[340px] text-center">
            <p className="font-['DM_Mono',monospace] text-[10px] tracking-[0.15em] uppercase text-slate-500 mb-5">
              Scan with QPay app
            </p>

            {/* QR — replace src with actual QPay QR URL from your API */}
            <div className="w-44 h-44 bg-white rounded-lg mx-auto mb-5 flex items-center justify-center">
              <span className="font-['DM_Mono',monospace] text-[10px] text-gray-400">QR loads here</span>
              {/* <Image src={qpayQrUrl} width={176} height={176} alt="QPay QR" /> */}
            </div>

            <p className="text-2xl font-extrabold text-slate-100 mb-2">{fmt(plan.price)} ₮</p>
            <p className="font-['DM_Mono',monospace] text-xs text-slate-500 leading-relaxed mb-6">
              Open QPay → Scan QR<br/>
              Payment confirms automatically
            </p>

            {polling && (
              <div className="flex items-center justify-center gap-2 font-['DM_Mono',monospace] text-xs text-slate-500 mb-5">
                <span className="w-3 h-3 border-2 border-[#2a2f35] border-t-cyan-400 rounded-full animate-spin" />
                waiting for payment...
              </div>
            )}

            <button
              onClick={() => setModalOpen(false)}
              className="w-full py-2.5 border border-[#2a2f35] hover:border-slate-400 text-slate-500 hover:text-slate-200 rounded-lg font-['DM_Mono',monospace] text-xs tracking-wide transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}