"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Download, Eye, MousePointer, Users } from "lucide-react"
import { useState } from "react"
import {
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts"

const trafficData = [
  { date: "Jan 1", visitors: 1200, pageViews: 2400, bounceRate: 45 },
  { date: "Jan 3", visitors: 1100, pageViews: 2200, bounceRate: 48 },
  { date: "Jan 5", visitors: 1600, pageViews: 3200, bounceRate: 38 },
  { date: "Jan 7", visitors: 1750, pageViews: 3500, bounceRate: 35 },
]

const deviceData = [
  { name: "Desktop", value: 65, color: "var(--color-chart-1)" },
  { name: "Mobile", value: 28, color: "var(--color-chart-2)" },
  { name: "Tablet", value: 7, color: "var(--color-chart-3)" },
]

const geographicData = [
  { country: "United States", visitors: 2450, percentage: 35 },
  { country: "United Kingdom", visitors: 1680, percentage: 24 },
  { country: "Canada", visitors: 980, percentage: 14 },
  { country: "Germany", visitors: 720, percentage: 10 },
  { country: "Others", visitors: 1190, percentage: 17 },
]

const topPages = [
  { page: "/dashboard", views: 12500, uniqueViews: 8900, avgTime: "3:45" },
  { page: "/analytics", views: 8900, uniqueViews: 6200, avgTime: "4:12" },
  { page: "/orders", views: 7200, uniqueViews: 5100, avgTime: "2:30" },
  { page: "/settings", views: 4800, uniqueViews: 3600, avgTime: "5:20" },
]

const conversionData = [
  { step: "Landing", users: 10000, rate: 100 },
  { step: "Product View", users: 7500, rate: 75 },
  { step: "Add to Cart", users: 3000, rate: 30 },
  { step: "Purchase", users: 450, rate: 4.5 },
]

export default function Analytics() {
  const [timeRange, setTimeRange] = useState("7d")

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-2 border-b gap-3">
        <h1 className="text-2xl font-bold text-black">Analytics</h1>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9,750</div>
            <p className="text-xs text-muted-foreground">+12.5% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19,500</div>
            <p className="text-xs text-muted-foreground">+8.2% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42.1%</div>
            <p className="text-xs text-muted-foreground">-3.1% from last period</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3:24</div>
            <p className="text-xs text-muted-foreground">+0:15 from last period</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Traffic Overview</CardTitle>
          <CardDescription className="text-sm">Visitor trends and page views over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              visitors: {
                label: "Visitors",
                color: "hsl(var(--chart-1))",
              },
              pageViews: {
                label: "Page Views",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[250px] sm:h-[350px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trafficData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} tickMargin={5} />
                <YAxis fontSize={12} tickMargin={5} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="var(--color-chart-1)"
                  strokeWidth={2}
                  name="Visitors"
                />
                <Line
                  type="monotone"
                  dataKey="pageViews"
                  stroke="var(--color-chart-2)"
                  strokeWidth={2}
                  name="Page Views"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Device Breakdown</CardTitle>
            <CardDescription className="text-sm">Traffic distribution by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                desktop: {
                  label: "Desktop",
                  color: "hsl(var(--chart-1))",
                },
                mobile: {
                  label: "Mobile",
                  color: "hsl(var(--chart-2))",
                },
                tablet: {
                  label: "Tablet",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[200px] sm:h-[250px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Geographic Analytics</CardTitle>
            <CardDescription className="text-sm">Top countries by visitor count</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {geographicData.map((country, index) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-chart-1 flex-shrink-0" />
                    <span className="text-sm font-medium truncate">{country.country}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {country.visitors.toLocaleString()}
                    </span>
                    <span className="text-xs sm:text-sm font-medium">{country.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Top Pages</CardTitle>
            <CardDescription className="text-sm">Most visited pages and engagement metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topPages.map((page, index) => (
                <div
                  key={page.page}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">{page.page}</p>
                    <p className="text-xs text-muted-foreground">
                      {page.views.toLocaleString()} views • {page.uniqueViews.toLocaleString()} unique
                    </p>
                  </div>
                  <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-0">
                    <p className="text-sm font-medium">{page.avgTime}</p>
                    <p className="text-xs text-muted-foreground">avg. time</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Conversion Funnel</CardTitle>
            <CardDescription className="text-sm">User journey and conversion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {conversionData.map((step, index) => (
                <div key={step.step} className="flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-chart-1 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium truncate">{step.step}</span>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="text-xs sm:text-sm text-muted-foreground">{step.users.toLocaleString()}</span>
                    <span className="text-xs sm:text-sm font-medium">{step.rate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
