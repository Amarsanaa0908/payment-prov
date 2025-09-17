import { ArrowRight, Clock, Heart, MapPin, Trophy, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior Full Stack Engineer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      description:
        "Build scalable payment infrastructure and user-facing applications using React, Node.js, and distributed systems.",
    },
    {
      title: "Product Manager - Payments",
      department: "Product",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Drive product strategy for our core payment processing platform and merchant-facing tools.",
    },
    {
      title: "Security Engineer",
      department: "Security",
      location: "Remote",
      type: "Full-time",
      description:
        "Ensure the security of our payment infrastructure and implement best practices for financial data protection.",
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "New York, NY / Remote",
      type: "Full-time",
      description: "Help our enterprise customers maximize value from PayFlow's payment solutions and drive adoption.",
    },
  ]

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance plus wellness stipend",
    },
    {
      icon: Zap,
      title: "Growth & Learning",
      description: "$2,000 annual learning budget and conference attendance support",
    },
    {
      icon: Users,
      title: "Work-Life Balance",
      description: "Flexible PTO, remote work options, and family leave policies",
    },
    {
      icon: Trophy,
      title: "Equity & Compensation",
      description: "Competitive salary, equity package, and performance bonuses",
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
              <Link href="/careers" className="text-cyan-400">
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
            Join Our Team
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Help us build the future of payments. Work with cutting-edge technology and make a real impact on businesses
            worldwide.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Why Work at PayFlow?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl border border-gray-800 bg-black/50 backdrop-blur-sm hover:border-cyan-500/50 transition-all duration-300"
              >
                <benefit.icon className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold mb-3 text-white">{benefit.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">Open Positions</h2>
          <div className="space-y-6">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="bg-gray-900/50 rounded-2xl border border-gray-800 p-8 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">{job.title}</h3>
                      <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
                        {job.department}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 mb-4 text-gray-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{job.description}</p>
                  </div>
                  <div className="mt-6 lg:mt-0 lg:ml-8">
                    <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25">
                      Apply Now
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">Our Culture</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                At PayFlow, we believe in fostering an environment where innovation thrives, diverse perspectives are
                valued, and every team member can do their best work.
              </p>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Remote-first culture with flexible working arrangements</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Collaborative environment with cross-functional teams</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Commitment to diversity, equity, and inclusion</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>Continuous learning and professional development</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="w-full h-80 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl border border-cyan-500/30 backdrop-blur-sm flex items-center justify-center">
                <Users className="w-24 h-24 text-cyan-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Do not See the Right Role?</h2>
          <p className="text-xl text-gray-300 mb-8">
            We are always looking for talented individuals to join our team. Send us your resume and let us know how
            you would like to contribute.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25"
          >
            Get in Touch
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
