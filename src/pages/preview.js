"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Code, Download, Eye, Monitor, RefreshCw, Settings, Share, Smartphone, Tablet } from "lucide-react"
import { useState } from "react"

// Sample page templates
const pageTemplates = {
  landing: {
    name: "Landing Page",
    description: "Modern landing page with hero section",
    html: `
      <div style="font-family: system-ui, sans-serif; margin: 0; padding: 0;">
        <header style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4rem 2rem; text-align: center;">
          <h1 style="font-size: 3rem; margin: 0 0 1rem 0; font-weight: bold;">Welcome to Our Platform</h1>
          <p style="font-size: 1.25rem; margin: 0 0 2rem 0; opacity: 0.9;">Build amazing experiences with our powerful tools</p>
          <button style="background: white; color: #667eea; padding: 1rem 2rem; border: none; border-radius: 0.5rem; font-size: 1.1rem; font-weight: 600; cursor: pointer;">Get Started</button>
        </header>
        <section style="padding: 4rem 2rem; text-align: center; background: #f8fafc;">
          <h2 style="font-size: 2.5rem; margin: 0 0 2rem 0; color: #1e293b;">Features</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto;">
            <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h3 style="color: #667eea; margin: 0 0 1rem 0;">Fast & Reliable</h3>
              <p style="color: #64748b; margin: 0;">Lightning-fast performance with 99.9% uptime guarantee.</p>
            </div>
            <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h3 style="color: #667eea; margin: 0 0 1rem 0;">Secure</h3>
              <p style="color: #64748b; margin: 0;">Enterprise-grade security with end-to-end encryption.</p>
            </div>
            <div style="background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <h3 style="color: #667eea; margin: 0 0 1rem 0;">Scalable</h3>
              <p style="color: #64748b; margin: 0;">Grows with your business from startup to enterprise.</p>
            </div>
          </div>
        </section>
      </div>
    `,
  },
  dashboard: {
    name: "Dashboard",
    description: "Clean admin dashboard layout",
    html: `
      <div style="font-family: system-ui, sans-serif; margin: 0; padding: 0; background: #f1f5f9; min-height: 100vh;">
        <header style="background: white; padding: 1rem 2rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
          <h1 style="margin: 0; color: #1e293b; font-size: 1.5rem;">Dashboard</h1>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <span style="color: #64748b;">Welcome back, Admin</span>
            <div style="width: 2rem; height: 2rem; background: #667eea; border-radius: 50%;"></div>
          </div>
        </header>
        <main style="padding: 2rem;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h3 style="margin: 0 0 0.5rem 0; color: #64748b; font-size: 0.875rem; font-weight: 500;">Total Users</h3>
              <p style="margin: 0; font-size: 2rem; font-weight: bold; color: #1e293b;">12,345</p>
              <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem; color: #10b981;">+12% from last month</p>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h3 style="margin: 0 0 0.5rem 0; color: #64748b; font-size: 0.875rem; font-weight: 500;">Revenue</h3>
              <p style="margin: 0; font-size: 2rem; font-weight: bold; color: #1e293b;">$45,231</p>
              <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem; color: #10b981;">+8% from last month</p>
            </div>
            <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
              <h3 style="margin: 0 0 0.5rem 0; color: #64748b; font-size: 0.875rem; font-weight: 500;">Orders</h3>
              <p style="margin: 0; font-size: 2rem; font-weight: bold; color: #1e293b;">1,234</p>
              <p style="margin: 0.5rem 0 0 0; font-size: 0.75rem; color: #ef4444;">-2% from last month</p>
            </div>
          </div>
          <div style="background: white; padding: 1.5rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h3 style="margin: 0 0 1rem 0; color: #1e293b; font-size: 1.125rem;">Recent Activity</h3>
            <div style="space-y: 1rem;">
              <div style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #1e293b;">New user registered</span>
                <span style="color: #64748b; font-size: 0.875rem;">2 minutes ago</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9;">
                <span style="color: #1e293b;">Order #1234 completed</span>
                <span style="color: #64748b; font-size: 0.875rem;">5 minutes ago</span>
              </div>
              <div style="display: flex; justify-content: space-between; padding: 0.75rem 0;">
                <span style="color: #1e293b;">Payment received</span>
                <span style="color: #64748b; font-size: 0.875rem;">10 minutes ago</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    `,
  },
  ecommerce: {
    name: "E-commerce",
    description: "Product showcase page",
    html: `
      <div style="font-family: system-ui, sans-serif; margin: 0; padding: 0;">
        <nav style="background: white; padding: 1rem 2rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
          <h1 style="margin: 0; color: #1e293b; font-size: 1.5rem; font-weight: bold;">Store</h1>
          <div style="display: flex; gap: 1rem;">
            <button style="background: none; border: none; color: #64748b; cursor: pointer;">Cart (0)</button>
            <button style="background: #667eea; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; cursor: pointer;">Login</button>
          </div>
        </nav>
        <main style="padding: 2rem;">
          <section style="text-align: center; margin-bottom: 3rem;">
            <h2 style="font-size: 2.5rem; margin: 0 0 1rem 0; color: #1e293b;">Featured Products</h2>
            <p style="color: #64748b; font-size: 1.125rem;">Discover our best-selling items</p>
          </section>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto;">
            <div style="background: white; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="height: 200px; background: linear-gradient(45deg, #f3f4f6, #e5e7eb);"></div>
              <div style="padding: 1.5rem;">
                <h3 style="margin: 0 0 0.5rem 0; color: #1e293b;">Premium Headphones</h3>
                <p style="margin: 0 0 1rem 0; color: #64748b; font-size: 0.875rem;">High-quality wireless headphones with noise cancellation</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 1.25rem; font-weight: bold; color: #1e293b;">$199</span>
                  <button style="background: #667eea; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; cursor: pointer;">Add to Cart</button>
                </div>
              </div>
            </div>
            <div style="background: white; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="height: 200px; background: linear-gradient(45deg, #fef3c7, #fde68a);"></div>
              <div style="padding: 1.5rem;">
                <h3 style="margin: 0 0 0.5rem 0; color: #1e293b;">Smart Watch</h3>
                <p style="margin: 0 0 1rem 0; color: #64748b; font-size: 0.875rem;">Track your fitness and stay connected</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 1.25rem; font-weight: bold; color: #1e293b;">$299</span>
                  <button style="background: #667eea; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; cursor: pointer;">Add to Cart</button>
                </div>
              </div>
            </div>
            <div style="background: white; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <div style="height: 200px; background: linear-gradient(45deg, #ddd6fe, #c4b5fd);"></div>
              <div style="padding: 1.5rem;">
                <h3 style="margin: 0 0 0.5rem 0; color: #1e293b;">Laptop Stand</h3>
                <p style="margin: 0 0 1rem 0; color: #64748b; font-size: 0.875rem;">Ergonomic aluminum laptop stand</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 1.25rem; font-weight: bold; color: #1e293b;">$79</span>
                  <button style="background: #667eea; color: white; padding: 0.5rem 1rem; border: none; border-radius: 0.25rem; cursor: pointer;">Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    `,
  },
  checkout: {
    name: "Checkout Page",
    description: "E-commerce checkout page with payment form",
    html: `
      <div style="font-family: system-ui, sans-serif; margin: 0; padding: 0; background: #f8fafc; min-height: 100vh;">
        <header style="background: white; padding: 1rem 2rem; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
          <h1 style="margin: 0; color: #1e293b; font-size: 1.5rem; font-weight: bold;">Shoposuga</h1>
          <div style="display: flex; gap: 1rem; align-items: center;">
            <span style="color: #64748b; font-size: 0.875rem;">Secure Checkout</span>
            <div style="width: 1rem; height: 1rem; background: #10b981; border-radius: 50%;"></div>
          </div>
        </header>
        <main style="max-width: 1200px; margin: 0 auto; padding: 2rem; display: grid; grid-template-columns: 1fr 400px; gap: 3rem;">
          <div style="background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
            <h2 style="margin: 0 0 1.5rem 0; color: #1e293b; font-size: 1.5rem;">Checkout</h2>
            <form>
              <div style="margin-bottom: 1.5rem;">
                <h3 style="margin: 0 0 1rem 0; color: #374151; font-size: 1.125rem;">Contact Information</h3>
                <input type="email" placeholder="Email address" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; margin-bottom: 1rem; font-size: 1rem;" />
                <label style="display: flex; align-items: center; gap: 0.5rem; color: #6b7280; font-size: 0.875rem;">
                  <input type="checkbox" />
                  Email me with news and offers
                </label>
              </div>
              
              <div style="margin-bottom: 1.5rem;">
                <h3 style="margin: 0 0 1rem 0; color: #374151; font-size: 1.125rem;">Shipping Address</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
                  <input type="text" placeholder="First name" style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 1rem;" />
                  <input type="text" placeholder="Last name" style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 1rem;" />
                </div>
                <input type="text" placeholder="Address" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; margin-bottom: 1rem; font-size: 1rem;" />
                <div style="display: grid; grid-template-columns: 1fr 1fr 100px; gap: 1rem;">
                  <input type="text" placeholder="City" style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 1rem;" />
                  <select style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 1rem;">
                    <option>State</option>
                    <option>CA</option>
                    <option>NY</option>
                    <option>TX</option>
                  </select>
                  <input type="text" placeholder="ZIP" style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 1rem;" />
                </div>
              </div>

              <div style="margin-bottom: 1.5rem;">
                <h3 style="margin: 0 0 1rem 0; color: #374151; font-size: 1.125rem;">Payment</h3>
                <div style="border: 1px solid #d1d5db; border-radius: 0.375rem; padding: 1rem;">
                  <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                    <label style="display: flex; align-items: center; gap: 0.5rem; color: #374151;">
                      <input type="radio" name="payment" checked />
                      Credit Card
                    </label>
                    <label style="display: flex; align-items: center; gap: 0.5rem; color: #374151;">
                      <input type="radio" name="payment" />
                      PayPal
                    </label>
                  </div>
                  <input type="text" placeholder="Card number" style="width: 100%; padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; margin-bottom: 1rem; font-size: 1rem;" />
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <input type="text" placeholder="MM / YY" style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 1rem;" />
                    <input type="text" placeholder="CVC" style="padding: 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 1rem;" />
                  </div>
                </div>
              </div>

              <button type="submit" style="width: 100%; background: #3b82f6; color: white; padding: 1rem; border: none; border-radius: 0.375rem; font-size: 1.1rem; font-weight: 600; cursor: pointer;">
                Complete Order
              </button>
            </form>
          </div>

          <div style="background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); height: fit-content;">
            <h3 style="margin: 0 0 1rem 0; color: #1e293b; font-size: 1.25rem;">Order Summary</h3>
            <div style="border-bottom: 1px solid #e5e7eb; padding-bottom: 1rem; margin-bottom: 1rem;">
              <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                <div style="width: 60px; height: 60px; background: #f3f4f6; border-radius: 0.375rem;"></div>
                <div style="flex: 1;">
                  <h4 style="margin: 0 0 0.25rem 0; color: #1e293b; font-size: 0.875rem;">Premium Headphones</h4>
                  <p style="margin: 0; color: #6b7280; font-size: 0.75rem;">Wireless, Noise Cancelling</p>
                  <div style="display: flex; justify-content: space-between; margin-top: 0.5rem;">
                    <span style="color: #6b7280; font-size: 0.875rem;">Qty: 1</span>
                    <span style="color: #1e293b; font-weight: 600;">$199.00</span>
                  </div>
                </div>
              </div>
              <div style="display: flex; gap: 1rem;">
                <div style="width: 60px; height: 60px; background: #fef3c7; border-radius: 0.375rem;"></div>
                <div style="flex: 1;">
                  <h4 style="margin: 0 0 0.25rem 0; color: #1e293b; font-size: 0.875rem;">Smart Watch</h4>
                  <p style="margin: 0; color: #6b7280; font-size: 0.75rem;">Fitness Tracker</p>
                  <div style="display: flex; justify-content: space-between; margin-top: 0.5rem;">
                    <span style="color: #6b7280; font-size: 0.875rem;">Qty: 1</span>
                    <span style="color: #1e293b; font-weight: 600;">$299.00</span>
                  </div>
                </div>
              </div>
            </div>
            <div style="space-y: 0.5rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="color: #6b7280;">Subtotal</span>
                <span style="color: #1e293b;">$498.00</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="color: #6b7280;">Shipping</span>
                <span style="color: #1e293b;">$9.99</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span style="color: #6b7280;">Tax</span>
                <span style="color: #1e293b;">$40.64</span>
              </div>
              <div style="border-top: 1px solid #e5e7eb; padding-top: 0.5rem; display: flex; justify-content: space-between; font-weight: 600; font-size: 1.125rem;">
                <span style="color: #1e293b;">Total</span>
                <span style="color: #1e293b;">$548.63</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    `,
  },
}

export default function Preview() {
  const [selectedTemplate, setSelectedTemplate] = useState("landing")
  const [deviceSize, setDeviceSize] = useState("desktop")
  const [customHtml, setCustomHtml] = useState("")
  const [previewMode, setPreviewMode] = useState("template")

  const getDeviceStyles = () => {
    switch (deviceSize) {
      case "mobile":
        return { width: "375px", height: "667px" }
      case "tablet":
        return { width: "768px", height: "1024px" }
      default:
        return { width: "100%", height: "600px" }
    }
  }

  const getPreviewContent = () => {
    if (previewMode === "custom" && customHtml) {
      return customHtml
    }
    return pageTemplates[selectedTemplate]?.html || ""
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-black" />
          <h1 className="text-2xl font-bold text-black">Page Preview</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        {/* Controls Panel */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Preview Settings
            </CardTitle>
            <CardDescription>Configure preview options and templates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={previewMode} onValueChange={setPreviewMode}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="template">Templates</TabsTrigger>
                <TabsTrigger value="custom">Custom</TabsTrigger>
              </TabsList>

              <TabsContent value="template" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select Template</label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(pageTemplates).map(([key, template]) => (
                        <SelectItem key={key} value={key}>
                          {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">{pageTemplates[selectedTemplate]?.description}</p>
                </div>
              </TabsContent>

              <TabsContent value="custom" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Custom HTML</label>
                  <Textarea
                    placeholder="Enter your HTML code here..."
                    value={customHtml}
                    onChange={(e) => setCustomHtml(e.target.value)}
                    rows={10}
                    className="font-mono text-xs"
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="space-y-2">
              <label className="text-sm font-medium">Device Size</label>
              <div className="flex gap-1">
                <Button
                  variant={deviceSize === "desktop" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDeviceSize("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={deviceSize === "tablet" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDeviceSize("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={deviceSize === "mobile" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setDeviceSize("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{deviceSize}</Badge>
                <span className="text-xs text-muted-foreground">
                  {deviceSize === "desktop" && "1200px+"}
                  {deviceSize === "tablet" && "768px"}
                  {deviceSize === "mobile" && "375px"}
                </span>
              </div>
            </div>

            <Button className="w-full" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Preview
            </Button>
          </CardContent>
        </Card>

        {/* Preview Panel */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Live Preview
              {previewMode === "template" && <Badge variant="outline">{pageTemplates[selectedTemplate]?.name}</Badge>}
            </CardTitle>
            <CardDescription>
              {previewMode === "template"
                ? `Previewing ${pageTemplates[selectedTemplate]?.name} template`
                : "Previewing custom HTML content"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div
                className="border border-border rounded-lg overflow-hidden bg-white shadow-lg transition-all duration-300"
                style={getDeviceStyles()}
              >
                <div className="w-full h-full">
                  <iframe
                    srcDoc={getPreviewContent()}
                    className="w-full h-full border-0"
                    title="Page Preview"
                    sandbox="allow-scripts allow-same-origin"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Template Gallery */}
      {previewMode === "template" && (
        <Card>
          <CardHeader>
            <CardTitle>Template Gallery</CardTitle>
            <CardDescription>Browse and select from available page templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(pageTemplates).map(([key, template]) => (
                <div
                  key={key}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedTemplate === key ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedTemplate(key)}
                >
                  <div className="aspect-video bg-muted rounded mb-3 flex items-center justify-center">
                    <Code className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-medium mb-1">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  {selectedTemplate === key && (
                    <Badge className="mt-2" size="sm">
                      Selected
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
