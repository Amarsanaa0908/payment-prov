import Layout from "../components/Layout"
import PaymentModalDemo from "../components/PaymentModalDemo"

export default function PaymentDemo() {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Payment Modal Demo</h1>
        <PaymentModalDemo />
      </div>
    </Layout>
  )
}
