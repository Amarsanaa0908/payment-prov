"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Clock, Download, Filter, MoreHorizontal, Package, Search, XCircle } from "lucide-react"
import { useState } from "react"

// Sample orders data
const ordersData = [
  {
    id: "#3210",
    customer: "John Doe",
    email: "john@example.com",
    amount: 250.0,
    status: "completed",
    date: "2024-01-15",
    items: 3,
    payment: "Credit Card",
  },
  {
    id: "#3209",
    customer: "Jane Smith",
    email: "jane@example.com",
    amount: 180.5,
    status: "processing",
    date: "2024-01-14",
    items: 2,
    payment: "PayPal",
  },
  {
    id: "#3208",
    customer: "Bob Johnson",
    email: "bob@example.com",
    amount: 320.75,
    status: "shipped",
    date: "2024-01-13",
    items: 5,
    payment: "Credit Card",
  },
  {
    id: "#3207",
    customer: "Alice Brown",
    email: "alice@example.com",
    amount: 95.25,
    status: "pending",
    date: "2024-01-12",
    items: 1,
    payment: "Bank Transfer",
  },
  {
    id: "#3206",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    amount: 450.0,
    status: "completed",
    date: "2024-01-11",
    items: 4,
    payment: "Credit Card",
  },
  {
    id: "#3205",
    customer: "Diana Davis",
    email: "diana@example.com",
    amount: 125.8,
    status: "cancelled",
    date: "2024-01-10",
    items: 2,
    payment: "PayPal",
  },
  {
    id: "#3204",
    customer: "Frank Miller",
    email: "frank@example.com",
    amount: 275.3,
    status: "processing",
    date: "2024-01-09",
    items: 3,
    payment: "Credit Card",
  },
  {
    id: "#3203",
    customer: "Grace Lee",
    email: "grace@example.com",
    amount: 199.99,
    status: "shipped",
    date: "2024-01-08",
    items: 2,
    payment: "Apple Pay",
  },
]

const statusConfig = {
  pending: { label: "Pending", color: "bg-orange-100 text-orange-800", icon: Clock },
  processing: { label: "Processing", color: "bg-blue-100 text-blue-800", icon: Package },
  shipped: { label: "Shipped", color: "bg-purple-100 text-purple-800", icon: Package },
  completed: { label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-red-100 text-red-800", icon: XCircle },
}

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  // Filter and sort orders
  const filteredOrders = ordersData
    .filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === "date") return new Date(b.date) - new Date(a.date)
      if (sortBy === "amount") return b.amount - a.amount
      if (sortBy === "customer") return a.customer.localeCompare(b.customer)
      return 0
    })

  // Calculate summary stats
  const totalOrders = ordersData.length
  const pendingOrders = ordersData.filter((order) => order.status === "pending").length
  const processingOrders = ordersData.filter((order) => order.status === "processing").length
  const completedOrders = ordersData.filter((order) => order.status === "completed").length

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-2 border-b gap-3">
        <h1 className="text-2xl font-bold text-black">Orders</h1>
        <Button>
          <Download className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Export Orders</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">All time orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Processing</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processingOrders}</div>
            <p className="text-xs text-muted-foreground">Being prepared</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedOrders}</div>
            <p className="text-xs text-muted-foreground">Successfully delivered</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">Order Management</CardTitle>
          <CardDescription className="text-sm">Search, filter, and manage all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date">Sort by Date</SelectItem>
                    <SelectItem value="amount">Sort by Amount</SelectItem>
                    <SelectItem value="customer">Sort by Customer</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  <span className="sm:hidden">Filters</span>
                  <span className="hidden sm:inline">More Filters</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="mt-6">
            <div className="rounded-md border">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[800px]">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-sm">
                        Order ID
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-sm">
                        Customer
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-sm">
                        Amount
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-sm">
                        Status
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-sm">
                        Date
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-sm">
                        Items
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-sm">
                        Payment
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground text-sm">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => {
                      const StatusIcon = statusConfig[order.status].icon
                      return (
                        <tr key={order.id} className="border-b transition-colors hover:bg-muted/50">
                          <td className="p-4 align-middle">
                            <div className="font-medium text-sm">{order.id}</div>
                          </td>
                          <td className="p-4 align-middle">
                            <div>
                              <div className="font-medium text-sm">{order.customer}</div>
                              <div className="text-xs text-muted-foreground truncate max-w-[150px]">{order.email}</div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="font-medium text-sm">${order.amount.toFixed(2)}</div>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge className={`${statusConfig[order.status].color} text-xs`}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusConfig[order.status].label}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="text-xs">{new Date(order.date).toLocaleDateString()}</div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="text-xs">{order.items} items</div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="text-xs">{order.payment}</div>
                          </td>
                          <td className="p-4 align-middle">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Details</DropdownMenuItem>
                                <DropdownMenuItem>Edit Order</DropdownMenuItem>
                                <DropdownMenuItem>Update Status</DropdownMenuItem>
                                <DropdownMenuItem>Send Invoice</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-8">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No orders found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
