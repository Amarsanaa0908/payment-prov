import { AlertTriangle, CheckCircle2, Eye, Lock, Server, Shield } from "lucide-react"
import Link from "next/link"

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: Shield,
      title: "PCI DSS Level 1",
      description: "Highest level of payment card industry compliance",
    },
    {
      icon: Lock,
      title: "End-to-End Encryption",
      description: "All data encrypted in transit and at rest",
    },
    {
      icon: Server,
      title: "Secure Infrastructure",
      description: "Enterprise-grade cloud security with 99.99% uptime",
    },
    {
      icon: Eye,
      title: "24/7 Monitoring",
      description: "Continuous threat detection and response",
    },
    {
      icon: AlertTriangle,
      title: "Fraud Prevention",
      description: "Advanced ML-powered fraud detection systems",
    },
    {
      icon: CheckCircle2,
      title: "Regular Audits",
      description: "Third-party security assessments and penetration testing",
    },
  ]

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
            Security First
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Your trust is our foundation. Learn about the comprehensive security measures protecting your payments and
            data.
          </p>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Security Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityFeatures.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-cyan-400 mb-6" />
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Details */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-16">
            <div>
              <h2 className="text-4xl font-bold mb-8 text-white">Data Protection</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white">Encryption Standards</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>AES-256 encryption for data at rest</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>TLS 1.3 for data in transit</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Hardware Security Modules (HSMs)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Key rotation and management</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold text-white">Access Controls</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Multi-factor authentication (MFA)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Role-based access control (RBAC)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Principle of least privilege</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span>Regular access reviews</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-8 text-white">Compliance & Certifications</h2>
              <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 backdrop-blur-sm">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Industry Standards</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>• PCI DSS Level 1 Service Provider</li>
                      <li>• SOC 2 Type II Certified</li>
                      <li>• ISO 27001 Certified</li>
                      <li>• GDPR Compliant</li>
                      <li>• CCPA Compliant</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Regional Compliance</h3>
                    <ul className="space-y-3 text-gray-300">
                      <li>• PSD2 (Europe)</li>
                      <li>• Open Banking (UK)</li>
                      <li>• PIPEDA (Canada)</li>
                      <li>• LGPD (Brazil)</li>
                      <li>• PDPA (Singapore)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-8 text-white">Fraud Prevention</h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  Our advanced fraud prevention system uses machine learning and real-time analysis to protect your
                  transactions while minimizing false positives.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Real-time Scoring</h4>
                    <p className="text-sm">Every transaction is scored in real-time using 500+ risk factors</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Machine Learning</h4>
                    <p className="text-sm">AI models continuously learn from transaction patterns and fraud attempts</p>
                  </div>
                  <div className="bg-gray-900/50 rounded-lg border border-gray-800 p-6">
                    <h4 className="text-lg font-semibold text-white mb-3">Global Intelligence</h4>
                    <p className="text-sm">Shared threat intelligence from our global payment network</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-8 text-white">Infrastructure Security</h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  Our infrastructure is built on enterprise-grade cloud platforms with multiple layers of security
                  controls and redundancy.
                </p>
                <div className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-4">Network Security</h4>
                      <ul className="space-y-2">
                        <li>• DDoS protection and mitigation</li>
                        <li>• Web Application Firewall (WAF)</li>
                        <li>• Network segmentation and isolation</li>
                        <li>• Intrusion detection and prevention</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-4">Operational Security</h4>
                      <ul className="space-y-2">
                        <li>• 24/7 Security Operations Center (SOC)</li>
                        <li>• Incident response procedures</li>
                        <li>• Regular vulnerability assessments</li>
                        <li>• Automated security monitoring</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Contact */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Security Questions?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Our security team is here to help. Contact us for security inquiries or to report vulnerabilities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="mailto:security@payflow.com"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
            >
              Contact Security Team
            </Link>
            <Link
              href="mailto:security@payflow.com?subject=Vulnerability Report"
              className="inline-flex items-center px-8 py-4 border border-gray-600 text-gray-300 font-semibold rounded-full hover:border-cyan-500 hover:text-cyan-400 transition-all duration-300"
            >
              Report Vulnerability
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
