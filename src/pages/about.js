import { ArrowRight, Award, Globe, Target, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
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
              <Link href="/about" className="text-cyan-400">
                About
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Contact
              </Link>
              <Link href="/careers" className="text-gray-300 hover:text-cyan-400 transition-colors">
                Careers
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            About PayFlow
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            We are revolutionizing the payment industry with cutting-edge technology, making transactions seamless,
            secure, and lightning-fast for businesses worldwide.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                To democratize payments by providing businesses of all sizes with enterprise-grade payment solutions
                that are simple to integrate, secure by design, and scalable for growth.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                We believe that every business deserves access to modern payment infrastructure without the complexity
                and high costs traditionally associated with payment processing.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl border border-cyan-500/30 backdrop-blur-sm flex items-center justify-center">
                <Target className="w-24 h-24 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300">
              <Users className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-white">Customer First</h3>
              <p className="text-gray-300 leading-relaxed">
                Every decision we make is guided by what is best for our customers and their success.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
              <Award className="w-16 h-16 text-purple-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-white">Excellence</h3>
              <p className="text-gray-300 leading-relaxed">
                We strive for excellence in everything we do, from code quality to customer support.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur-sm hover:border-pink-500/50 transition-all duration-300">
              <Globe className="w-16 h-16 text-pink-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4 text-white">Global Impact</h3>
              <p className="text-gray-300 leading-relaxed">
                Building payment solutions that work seamlessly across borders and cultures.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "CEO & Co-Founder",
                bio: "Former VP of Payments at Stripe, 15+ years in fintech",
              },
              {
                name: "Marcus Rodriguez",
                role: "CTO & Co-Founder",
                bio: "Ex-Google engineer, expert in distributed systems",
              },
              {
                name: "Aisha Patel",
                role: "Head of Security",
                bio: "Former cybersecurity lead at PayPal, PhD in Cryptography",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="text-center p-8 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur-sm"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full mx-auto mb-6 flex items-center justify-center text-2xl font-bold text-black">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">{member.name}</h3>
                <p className="text-cyan-400 mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Transform Your Payments?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of businesses already using PayFlow to streamline their payment operations.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
