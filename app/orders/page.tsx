'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Download,
  Search,
  Filter,
  RefreshCw,
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  Calendar,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';

const orderStats = [
  {
    title: 'TOTAL ORDERS',
    value: '2,847',
    change: '+12.5%',
    isPositive: true,
    comparison: '+315 orders',
    comparisonText: 'vs last month',
    icon: ShoppingCart,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    title: 'PENDING ORDERS',
    value: '89',
    change: '-12.8%',
    isPositive: true,
    comparison: '-13 orders',
    comparisonText: 'vs last week',
    icon: Clock,
    iconBg: 'bg-orange-50',
    iconColor: 'text-orange-600',
  },
  {
    title: 'COMPLETED ORDERS',
    value: '2,634',
    change: '+14.2%',
    isPositive: true,
    comparison: '+327 orders',
    comparisonText: 'vs last month',
    icon: CheckCircle2,
    iconBg: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    title: 'TOTAL REVENUE',
    value: '$127.8K',
    change: '+18.2%',
    isPositive: true,
    comparison: '+$19.6K',
    comparisonText: 'vs last month',
    icon: DollarSign,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
];

const orders = [
  {
    id: '#ORD-2025-2847',
    customer: 'Alexandra Mitchell',
    date: 'Dec 24, 2025',
    items: 2,
    total: '$1,598.99',
    status: 'processing',
    payment: 'Paid',
  },
  {
    id: '#ORD-2025-2846',
    customer: 'Marcus Thompson',
    date: 'Dec 24, 2025',
    items: 1,
    total: '$399.99',
    status: 'completed',
    payment: 'Paid',
  },
  {
    id: '#ORD-2025-2845',
    customer: 'Sophia Chen',
    date: 'Dec 23, 2025',
    items: 3,
    total: '$1,849.97',
    status: 'shipped',
    payment: 'Paid',
  },
  {
    id: '#ORD-2025-2844',
    customer: 'James Rodriguez',
    date: 'Dec 23, 2025',
    items: 1,
    total: '$1,299.00',
    status: 'shipped',
    payment: 'Paid',
  },
  {
    id: '#ORD-2025-2843',
    customer: 'Emma Patterson',
    date: 'Dec 23, 2025',
    items: 4,
    total: '$749.96',
    status: 'completed',
    payment: 'Paid',
  },
  {
    id: '#ORD-2025-2842',
    customer: 'Daniel Kim',
    date: 'Dec 22, 2025',
    items: 1,
    total: '$349.99',
    status: 'cancelled',
    payment: 'Refunded',
  },
  {
    id: '#ORD-2025-2841',
    customer: 'Olivia Martinez',
    date: 'Dec 22, 2025',
    items: 5,
    total: '$2,247.95',
    status: 'completed',
    payment: 'Paid',
  },
  {
    id: '#ORD-2025-2840',
    customer: 'William Foster',
    date: 'Dec 21, 2025',
    items: 2,
    total: '$499.98',
    status: 'completed',
    payment: 'Paid',
  },
];

const getStatusBadge = (status: string) => {
  const styles = {
    completed: 'bg-green-50 text-green-700',
    processing: 'bg-blue-50 text-blue-700',
    shipped: 'bg-purple-50 text-purple-700',
    pending: 'bg-yellow-50 text-yellow-700',
    cancelled: 'bg-red-50 text-red-700',
  };

  const icons = {
    completed: CheckCircle2,
    processing: Clock,
    shipped: Truck,
    pending: Clock,
    cancelled: XCircle,
  };

  const Icon = icons[status as keyof typeof icons];
  const style = styles[status as keyof typeof styles];

  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}>
      <Icon className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">Orders</h1>
            <p className="text-sm text-gray-500 mt-1">Manage and track all your orders</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button variant="outline" size="icon" className="h-9 w-9 hover:bg-gray-100">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="outline" className="h-9">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button className="bg-[#6366f1] hover:bg-[#5558e3] h-9">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="flex gap-1 border-b border-gray-200">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative text-gray-600 hover:text-gray-900"
          >
            <BarChart3 className="h-4 w-4" />
            Overview
          </Link>
          <Link
            href="/orders"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative text-[#6366f1]"
          >
            <ShoppingCart className="h-4 w-4" />
            Order
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6366f1]" />
          </Link>
          <Link
            href="/sales"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative text-gray-600 hover:text-gray-900"
          >
            <TrendingUp className="h-4 w-4" />
            Sales
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {orderStats.map((stat) => (
            <Card key={stat.title} className="relative overflow-hidden hover:shadow-md transition-all duration-200 border-gray-200">
              <CardContent className="p-5 lg:p-6">
                <div className="flex items-start justify-between mb-3 lg:mb-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] lg:text-xs font-semibold text-gray-500 tracking-wider mb-1.5 lg:mb-2 uppercase">
                      {stat.title}
                    </p>
                    <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 truncate">
                      {stat.value}
                    </h3>
                  </div>
                  <div className={`p-2.5 lg:p-3 rounded-xl ${stat.iconBg} flex-shrink-0 ml-2`}>
                    <stat.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${stat.iconColor}`} />
                  </div>
                </div>

                <div className="flex items-center mb-3 lg:mb-4">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      stat.isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                    }`}
                  >
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-gray-100">
                  <p className="text-xs lg:text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{stat.comparison}</span>{' '}
                    <span className="hidden sm:inline">{stat.comparisonText}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orders Table */}
        <Card className="h-full">
          <CardHeader className="border-b border-gray-100 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-base lg:text-lg font-bold text-gray-900">Recent Orders</h3>
                <p className="text-xs lg:text-sm text-gray-500 mt-1">
                  Total {orders.length} orders
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[140px] h-9 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders by ID or customer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 bg-gray-50 border-gray-200 text-sm"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="font-semibold text-gray-700 text-xs lg:text-sm">Order ID</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs lg:text-sm">Customer</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs lg:text-sm">Date</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs lg:text-sm">Items</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs lg:text-sm">Total</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs lg:text-sm">Status</TableHead>
                    <TableHead className="font-semibold text-gray-700 text-xs lg:text-sm">Payment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                      <TableCell className="py-3 lg:py-4">
                        <span className="font-semibold text-xs lg:text-sm text-[#6366f1]">{order.id}</span>
                      </TableCell>
                      <TableCell className="py-3 lg:py-4">
                        <div className="flex items-center gap-2 lg:gap-3">
                          <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-xs">
                              {order.customer.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-semibold text-gray-900 text-xs lg:text-sm">{order.customer}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-700 text-xs lg:text-sm">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-gray-400" />
                          {order.date}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-900 font-semibold text-xs lg:text-sm">
                        <div className="flex items-center gap-1.5">
                          <Package className="h-3.5 w-3.5 text-gray-400" />
                          {order.items}
                        </div>
                      </TableCell>
                      <TableCell className="font-bold text-gray-900 text-xs lg:text-sm">{order.total}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          order.payment === 'Paid' 
                            ? 'bg-green-50 text-green-700' 
                            : order.payment === 'Pending'
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-gray-50 text-gray-700'
                        }`}>
                          {order.payment}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
