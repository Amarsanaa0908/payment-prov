import { Database, Eye, Lock, Shield } from "lucide-react"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            >
              PayFlow
            </Link>
            <div className="flex space-x-8">
              <Link href="/" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-cyan-400 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Your privacy is our priority. Learn how we collect, use, and protect your information.
          </p>
          <p className="text-gray-400">Last updated: December 15, 2024</p>
        </div>
      </section>

      {/* Privacy Highlights */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">Privacy at a Glance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur-sm">
              <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-3 text-white">Data Protection</h3>
              <p className="text-gray-300 text-sm">Enterprise-grade security for all your data</p>
            </div>
            <div className="text-center p-6 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur-sm">
              <Eye className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-3 text-white">Transparency</h3>
              <p className="text-gray-300 text-sm">Clear information about data usage</p>
            </div>
            <div className="text-center p-6 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur-sm">
              <Lock className="w-12 h-12 text-pink-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-3 text-white">Your Control</h3>
              <p className="text-gray-300 text-sm">Full control over your personal information</p>
            </div>
            <div className="text-center p-6 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur-sm">
              <Database className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-3 text-white">Minimal Data</h3>
              <p className="text-gray-300 text-sm">We only collect what is necessary</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">1. Information We Collect</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    We collect information you provide directly to us, such as when you create an account, use our
                    services, or contact us for support.
                  </p>
                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">Personal Information:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Name, email address, and contact information</li>
                    <li>Business information and tax identification numbers</li>
                    <li>Payment and banking information for processing transactions</li>
                    <li>Identity verification documents as required by law</li>
                  </ul>
                  <h3 className="text-xl font-semibold text-white mt-6 mb-3">Usage Information:</h3>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Transaction data and payment processing information</li>
                    <li>Device information and IP addresses</li>
                    <li>Usage patterns and feature interactions</li>
                    <li>Customer support communications</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">2. How We Use Your Information</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>We use the information we collect to provide, maintain, and improve our services:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Process payments and transactions securely</li>
                    <li>Verify your identity and prevent fraud</li>
                    <li>Provide customer support and respond to inquiries</li>
                    <li>Comply with legal and regulatory requirements</li>
                    <li>Improve our services and develop new features</li>
                    <li>Send important service updates and notifications</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">3. Information Sharing</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. We may share your
                    information only in these limited circumstances:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations or court orders</li>
                    <li>With trusted service providers who assist in our operations</li>
                    <li>To protect our rights, property, or safety</li>
                    <li>In connection with a business transfer or acquisition</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">4. Data Security</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    We implement industry-standard security measures to protect your information, including encryption,
                    secure data centers, and regular security audits.
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>End-to-end encryption for all sensitive data</li>
                    <li>PCI DSS Level 1 compliance for payment processing</li>
                    <li>Regular security assessments and penetration testing</li>
                    <li>Multi-factor authentication and access controls</li>
                    <li>24/7 monitoring and incident response procedures</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">5. Your Rights</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>You have the following rights regarding your personal information:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Access and review your personal information</li>
                    <li>Correct inaccurate or incomplete information</li>
                    <li>Delete your account and associated data</li>
                    <li>Export your data in a portable format</li>
                    <li>Opt out of marketing communications</li>
                    <li>File a complaint with regulatory authorities</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 text-white">6. Contact Us</h2>
                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                  <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-800">
                    <p>
                      <strong className="text-white">Email:</strong> privacy@payflow.com
                    </p>
                    <p>
                      <strong className="text-white">Address:</strong> 123 Innovation Drive, San Francisco, CA 94105
                    </p>
                    <p>
                      <strong className="text-white">Phone:</strong> +1 (555) 123-4567
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
