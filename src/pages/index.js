import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle, CreditCard, Globe, Shield, Smartphone, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="fixed inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
      </div>

      <header className="relative z-10 bg-black/50 backdrop-blur-xl border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25 animate-pulse">
              <CreditCard className="w-6 h-6 text-black" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PayFlow
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="#services"
              className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
            >
              Бидний тухай
            </Link>
            <Link
              href="#contact"
              className="text-gray-300 hover:text-cyan-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
            >
              Холбогдох
            </Link>
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300">
              <Link href={"/login"}>Нэвтрэх</Link>
            </Button>
          </nav>
        </div>
      </header>

      <section className="relative z-10 py-32 lg:py-40">
        <div className="container mx-auto px-4 text-center">
          <div className="relative">
            <Badge className="mb-8 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm animate-bounce">
              ⚡ Trusted by 10,000+ Businesses
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold text-balance mb-8 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,255,255,0.3)]">
              Next-Gen Payment
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Solutions
              </span>
            </h1>
            <p className="text-xl text-gray-300 text-pretty mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience lightning-fast, ultra-secure payment processing with cutting-edge technology. Built for the
              future of commerce.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-bold px-8 py-4 text-lg shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
              >
                Get Started <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                size="lg"
                className="bg-transparent border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>
      </section>

      <section id="services" className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Complete Payment Ecosystem
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to accept payments and scale your business globally
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300">
                  <Globe className="w-8 h-8 text-cyan-400" />
                </div>
                <CardTitle className="text-white text-xl">Online Payments</CardTitle>
                <CardDescription className="text-gray-400">
                  Accept payments globally with our quantum-secure checkout
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">Multi-currency support</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">AI-powered optimization</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-cyan-400" />
                    <span className="text-gray-300">Real-time fraud detection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(147,51,234,0.2)] group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-300">
                  <Smartphone className="w-8 h-8 text-purple-400" />
                </div>
                <CardTitle className="text-white text-xl">Smart POS</CardTitle>
                <CardDescription className="text-gray-400">
                  Next-generation point-of-sale with AR integration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">Contactless & biometric</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">Smart inventory sync</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    <span className="text-gray-300">Predictive analytics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border border-pink-500/20 hover:border-pink-400/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)] group">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300">
                  <Zap className="w-8 h-8 text-pink-400" />
                </div>
                <CardTitle className="text-white text-xl">Auto Subscriptions</CardTitle>
                <CardDescription className="text-gray-400">
                  AI-driven subscription management and optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-pink-400" />
                    <span className="text-gray-300">Dynamic pricing models</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-pink-400" />
                    <span className="text-gray-300">Churn prediction</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-pink-400" />
                    <span className="text-gray-300">Customer lifecycle automation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Why Choose PayFlow?
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-all duration-300">
                    <Shield className="w-7 h-7 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">Quantum Security</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Military-grade encryption with quantum-resistant algorithms and zero-trust architecture
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-300">
                    <Zap className="w-7 h-7 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">Instant Processing</h3>
                    <p className="text-gray-400 leading-relaxed">
                      Sub-second transaction processing with 99.99% uptime SLA
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6 group">
                  <div className="w-14 h-14 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all duration-300">
                    <Users className="w-7 h-7 text-pink-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-white">AI Support</h3>
                    <p className="text-gray-400 leading-relaxed">
                      24/7 AI-powered support with human experts available instantly
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-black/60 backdrop-blur-xl rounded-3xl p-10 border border-cyan-500/20 shadow-2xl shadow-cyan-500/10">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Start Today
                </h3>
                <p className="text-gray-400">Join the payment revolution</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl border border-cyan-500/20">
                  <span className="text-gray-300">Setup Fee</span>
                  <span className="font-bold text-cyan-400 text-xl">$0</span>
                </div>
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20">
                  <span className="text-gray-300">Monthly Fee</span>
                  <span className="font-bold text-purple-400 text-xl">$0</span>
                </div>
                <div className="flex items-center justify-between p-5 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 rounded-2xl border border-pink-500/20">
                  <span className="text-gray-300">Transaction Fee</span>
                  <span className="font-bold text-pink-400 text-xl">1.9% + 20¢</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-bold py-4 text-lg shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 mt-6">
                  Launch Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Trusted Globally
            </h2>
            <p className="text-xl text-gray-400">What industry leaders say about us</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black/40 backdrop-blur-xl border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,255,255,0.2)]">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg shadow-yellow-400/25"
                    ></div>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  &quot;PayFlow revolutionized our payment infrastructure. Revenue increased 300% in 6 months.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                    <span className="font-bold text-black">JD</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">John Davis</p>
                    <p className="text-sm text-gray-400">CEO, TechCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(147,51,234,0.2)]">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg shadow-yellow-400/25"
                    ></div>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  &quot;The most advanced payment platform we have ever used. Setup took minutes, not weeks.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="font-bold text-black">SM</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">Sarah Miller</p>
                    <p className="text-sm text-gray-400">Founder, InnovateLab</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black/40 backdrop-blur-xl border border-pink-500/20 hover:border-pink-400/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]">
              <CardContent className="p-8">
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-lg shadow-yellow-400/25"
                    ></div>
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  &quot;PayFlow&apos;s AI insights helped us optimize our pricing strategy and boost conversions.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="font-bold text-black">MR</span>
                  </div>
                  <div>
                    <p className="font-bold text-white">Mike Rodriguez</p>
                    <p className="text-sm text-gray-400">CTO, FutureCommerce</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join thousands of forward-thinking businesses already using PayFlow next-generation payment
            infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-black font-bold px-10 py-5 text-xl shadow-2xl shadow-cyan-500/25 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              className="bg-transparent border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 hover:text-cyan-300 px-10 py-5 text-xl backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-black/80 backdrop-blur-xl border-t border-cyan-500/20 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <CreditCard className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  PayFlow
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">The future of payment processing is here.</p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-cyan-400">Products</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Online Payments
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Smart POS
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Auto Subscriptions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-purple-400">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-purple-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-pink-400">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-pink-400 transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-cyan-500/20 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2024 PayFlow. Powering the future of commerce.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
