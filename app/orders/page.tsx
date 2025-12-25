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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {orderStats.map((stat) => (
            <Card key={stat.title} className="relative overflow-hidden border border-gray-100 bg-gray-50/30 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                {/* Inner box containing title, icon, value, and badge */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 mb-4 shadow-sm">
                  {/* Top row: Title and Icon */}
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                      {stat.title}
                    </p>
                    <div className={`p-2.5 rounded-lg ${stat.iconBg}`}>
                      <stat.icon className={`h-5 w-5 ${stat.iconColor}`} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Value and badge row */}
                  <div className="flex items-baseline gap-2.5">
                    <h3 className="text-[28px] font-bold text-gray-900 leading-none">
                      {stat.value}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md ${
                        stat.isPositive ? 'bg-cyan-100 text-cyan-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      <TrendingUp className={`h-3 w-3 ${stat.isPositive ? '' : 'rotate-180'}`} strokeWidth={2.5} />
                      {stat.change}
                    </span>
                  </div>
                </div>

                {/* Outer box content: Comparison text */}
                <div className="flex items-center justify-between px-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{stat.comparison}</span>{' '}
                    <span className="text-gray-500">{stat.comparisonText}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orders Table */}
        <Card className="h-full bg-gray-50/50 border-gray-200">
          <CardContent className="p-4 space-y-3">
            {/* First Inner Box - Header Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-3 space-y-3">
              {/* Recent Orders Title Section */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      RECENT ORDERS
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-bold text-gray-900">{orders.length}</span>
                      <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-cyan-100 text-cyan-700">
                        Total
                      </span>
                    </div>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[130px] h-8 text-xs border-gray-300">
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

              {/* Search Bar Section */}
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                  <Input
                    placeholder="Search orders by ID or customer..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-8 bg-white border-gray-300 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Second Inner Box - Table Section */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              {/* Table Headers Section */}
              <div className="bg-gray-50 border-b border-gray-200 px-3 py-2">
                <div className="grid grid-cols-7 gap-3">
                  <div className="font-medium text-gray-500 text-xs">Order ID</div>
                  <div className="font-medium text-gray-500 text-xs">Customer</div>
                  <div className="font-medium text-gray-500 text-xs">Date</div>
                  <div className="font-medium text-gray-500 text-xs">Items</div>
                  <div className="font-medium text-gray-500 text-xs">Total</div>
                  <div className="font-medium text-gray-500 text-xs">Status</div>
                  <div className="font-medium text-gray-500 text-xs">Payment</div>
                </div>
              </div>

              {/* Table Data Section */}
              <div className="bg-white">
                {orders.map((order) => (
                  <div key={order.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50/50 transition-colors px-3 py-2.5">
                    <div className="grid grid-cols-7 gap-3 items-center">
                      <div className="font-semibold text-xs text-[#6366f1]">{order.id}</div>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-semibold text-[10px]">
                            {order.customer.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900 text-xs truncate">{order.customer}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-700 text-xs">
                        <Calendar className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        <span className="truncate">{order.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-900 font-medium text-xs">
                        <Package className="h-3 w-3 text-gray-400 flex-shrink-0" />
                        {order.items}
                      </div>
                      <div className="font-bold text-gray-900 text-xs">{order.total}</div>
                      <div>{getStatusBadge(order.status)}</div>
                      <div>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                          order.payment === 'Paid' 
                            ? 'bg-green-50 text-green-700' 
                            : order.payment === 'Pending'
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-gray-50 text-gray-700'
                        }`}>
                          {order.payment}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
