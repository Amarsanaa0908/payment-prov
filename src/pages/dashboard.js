import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, BarChart3, DollarSign, Package, ShoppingCart, TrendingUp, Users } from "lucide-react"

// Sample data for charts
const revenueData = [
  { month: "Jan", revenue: 4000, orders: 240 },
  { month: "Mar", revenue: 5000, orders: 300 },
  { month: "May", revenue: 6000, orders: 389 },
  { month: "Jun", revenue: 5500, orders: 349 },
]

const userActivityData = [
  { day: "Mon", active: 120, new: 15 },
  { day: "Wed", active: 180, new: 18 },
  { day: "Fri", active: 170, new: 20 },
  { day: "Sun", active: 110, new: 8 },
]

const recentOrders = [
  { id: "#3210", customer: "John Doe", amount: "$250.00", status: "Completed" },
  { id: "#3209", customer: "Jane Smith", amount: "$180.50", status: "Processing" },
  { id: "#3208", customer: "Bob Johnson", amount: "$320.75", status: "Shipped" },
  { id: "#3207", customer: "Alice Brown", amount: "$95.25", status: "Pending" },
]

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-2 px-4 py-2 border-b">
        <h1 className="text-2xl font-bold text-black">Хянах самбар</h1>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Нийт орлого</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Идэхвтэй хэрэглэгч</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Нийт захиалга</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      {/* <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Revenue Overview</CardTitle>
            <CardDescription className="text-sm">Monthly revenue and order trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
                orders: {
                  label: "Orders",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[250px] sm:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" fontSize={12} tickMargin={5} />
                  <YAxis fontSize={12} tickMargin={5} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="var(--color-chart-1)"
                    strokeWidth={2}
                    name="Revenue ($)"
                  />
                  <Line type="monotone" dataKey="orders" stroke="var(--color-chart-2)" strokeWidth={2} name="Orders" />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">User Activity</CardTitle>
            <CardDescription className="text-sm">Daily active and new users</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                active: {
                  label: "Active Users",
                  color: "hsl(var(--chart-3))",
                },
                new: {
                  label: "New Users",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[250px] sm:h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={userActivityData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" fontSize={12} tickMargin={5} />
                  <YAxis fontSize={12} tickMargin={5} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="active" fill="var(--color-chart-3)" name="Active Users" />
                  <Bar dataKey="new" fill="var(--color-chart-4)" name="New Users" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div> */}

      {/* Recent Activity Section */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Шинэ захиалгууд</CardTitle>
            <CardDescription className="text-sm">Сүүлийн захиалга болон тэдний төлөв</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2"
                >
                  <div className="flex items-center gap-3">
                    <Package className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <div>
                      <p className="font-medium text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.customer}</p>
                    </div>
                  </div>
                  <div className="flex sm:flex-col items-start sm:items-end gap-2 sm:gap-0 ml-7 sm:ml-0">
                    <p className="font-medium text-sm">{order.amount}</p>
                    <p
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Completed"
                          ? "text-green-700 bg-green-100"
                          : order.status === "Processing"
                            ? "text-blue-700 bg-blue-100"
                            : order.status === "Shipped"
                              ? "text-purple-700 bg-purple-100"
                              : "text-orange-700 bg-orange-100"
                      }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            <CardDescription className="text-sm">Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full p-2 sm:p-3 text-left border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm font-medium">Manage Users</span>
              </div>
            </button>
            <button className="w-full p-2 sm:p-3 text-left border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Package className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm font-medium">View All Orders</span>
              </div>
            </button>
            <button className="w-full p-2 sm:p-3 text-left border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm font-medium">Generate Report</span>
              </div>
            </button>
            <button className="w-full p-2 sm:p-3 text-left border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <Activity className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm font-medium">System Status</span>
              </div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
