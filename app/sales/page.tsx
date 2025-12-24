'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingBag,
  Users,
  Target,
  Calendar,
  BarChart3,
  ShoppingCart,
} from 'lucide-react';
import Link from 'next/link';

const salesMetrics = [
  {
    title: 'TOTAL REVENUE',
    value: '$1.48M',
    change: '+22.8%',
    isPositive: true,
    comparison: '+$275K',
    comparisonText: 'vs last quarter',
    icon: DollarSign,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'SALES COUNT',
    value: '8,432',
    change: '+18.2%',
    isPositive: true,
    comparison: '+1,298 sales',
    comparisonText: 'vs last quarter',
    icon: ShoppingBag,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    title: 'AVG ORDER VALUE',
    value: '$175.50',
    change: '+4.2%',
    isPositive: true,
    comparison: '+$7.08',
    comparisonText: 'vs last quarter',
    icon: Target,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    title: 'NEW CUSTOMERS',
    value: '3,847',
    change: '+28.5%',
    isPositive: true,
    comparison: '+853 users',
    comparisonText: 'vs last quarter',
    icon: Users,
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-600',
  },
];

const revenueData = [
  { month: 'Jan', revenue: 98000, target: 95000 },
  { month: 'Feb', revenue: 105000, target: 100000 },
  { month: 'Mar', revenue: 112000, target: 108000 },
  { month: 'Apr', revenue: 118000, target: 115000 },
  { month: 'May', revenue: 125000, target: 120000 },
  { month: 'Jun', revenue: 132000, target: 128000 },
  { month: 'Jul', revenue: 128000, target: 135000 },
  { month: 'Aug', revenue: 138000, target: 140000 },
  { month: 'Sep', revenue: 145000, target: 145000 },
  { month: 'Oct', revenue: 152000, target: 150000 },
  { month: 'Nov', revenue: 148000, target: 155000 },
  { month: 'Dec', revenue: 158000, target: 160000 },
];

const categoryData = [
  { name: 'Electronics & Tech', value: 38, amount: 562400, color: '#6366f1' },
  { name: 'Fashion & Apparel', value: 24, amount: 355200, color: '#8b5cf6' },
  { name: 'Home & Living', value: 18, amount: 266400, color: '#ec4899' },
  { name: 'Sports & Outdoors', value: 12, amount: 177600, color: '#f59e0b' },
  { name: 'Beauty & Health', value: 8, amount: 118400, color: '#10b981' },
];

const topProducts = [
  { name: 'Apple iPhone 15 Pro Max', sales: 289, revenue: '$346,611', trend: '+28%' },
  { name: 'Sony WH-1000XM5 Headphones', sales: 456, revenue: '$182,395', trend: '+35%' },
  { name: 'MacBook Air M3 13-inch', sales: 167, revenue: '$216,933', trend: '+22%' },
  { name: 'Logitech MX Master 3S Mouse', sales: 823, revenue: '$82,277', trend: '+45%' },
  { name: 'Samsung Galaxy Watch 6', sales: 94, revenue: '$32,899', trend: '+12%' },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-900 mb-2">{payload[0].payload.month}</p>
        <p className="text-sm text-[#6366f1]">
          Revenue: ${(payload[0].value / 1000).toFixed(1)}K
        </p>
        {payload[1] && (
          <p className="text-sm text-orange-500">
            Target: ${(payload[1].value / 1000).toFixed(1)}K
          </p>
        )}
      </div>
    );
  }
  return null;
};

export default function SalesPage() {
  const [timePeriod, setTimePeriod] = useState('yearly');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">Sales Analytics</h1>
            <p className="text-sm text-gray-500 mt-1">Track your sales performance and revenue</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Select value={timePeriod} onValueChange={setTimePeriod}>
              <SelectTrigger className="w-[130px] h-9">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-[#6366f1] hover:bg-[#5558e3] h-9">
              <Download className="mr-2 h-4 w-4" />
              Download
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
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative text-gray-600 hover:text-gray-900"
          >
            <ShoppingCart className="h-4 w-4" />
            Order
          </Link>
          <Link
            href="/sales"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative text-[#6366f1]"
          >
            <TrendingUp className="h-4 w-4" />
            Sales
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6366f1]" />
          </Link>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {salesMetrics.map((metric) => (
            <Card key={metric.title} className="relative overflow-hidden hover:shadow-md transition-all duration-200 border-gray-200">
              <CardContent className="p-5 lg:p-6">
                <div className="flex items-start justify-between mb-3 lg:mb-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] lg:text-xs font-semibold text-gray-500 tracking-wider mb-1.5 lg:mb-2 uppercase">
                      {metric.title}
                    </p>
                    <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 truncate">
                      {metric.value}
                    </h3>
                  </div>
                  <div className={`p-2.5 lg:p-3 rounded-xl ${metric.iconBg} flex-shrink-0 ml-2`}>
                    <metric.icon className={`h-4 w-4 lg:h-5 lg:w-5 ${metric.iconColor}`} />
                  </div>
                </div>

                <div className="flex items-center mb-3 lg:mb-4">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-700">
                    <TrendingUp className="h-3 w-3" />
                    {metric.change}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-gray-100">
                  <p className="text-xs lg:text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{metric.comparison}</span>{' '}
                    <span className="hidden sm:inline">{metric.comparisonText}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          <div className="xl:col-span-2">
            <Card className="h-full">
              <CardHeader className="border-b border-gray-100 pb-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h3 className="text-[10px] lg:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      DECEMBER REVENUE
                    </h3>
                    <div className="flex items-baseline gap-2 lg:gap-3">
                      <span className="text-2xl lg:text-3xl font-bold text-gray-900">$158,000</span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-700">
                        <TrendingUp className="h-3 w-3" />
                        6.8%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 lg:gap-6 mt-3 lg:mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#6366f1]" />
                    <span className="text-xs lg:text-sm text-gray-600 font-medium">Revenue</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-orange-400" />
                    <span className="text-xs lg:text-sm text-gray-600 font-medium">Target</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 lg:p-6">
                <ResponsiveContainer width="100%" height={280} className="lg:h-[320px]">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#fb923c" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 12 }}
                      tickFormatter={(value) => `$${value / 1000}K`}
                      dx={-10}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="target"
                      stroke="#fb923c"
                      strokeWidth={2}
                      fill="url(#colorTarget)"
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#6366f1"
                      strokeWidth={2}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Category Distribution */}
          <div className="xl:col-span-1">
            <Card className="h-full">
              <CardHeader className="border-b border-gray-100 pb-4">
                <h3 className="text-[10px] lg:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  SALES BY CATEGORY
                </h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl lg:text-3xl font-bold text-gray-900">$1.48M</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 lg:p-6">
                <div className="space-y-4">
                  {categoryData.map((category) => (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-xs lg:text-sm font-semibold text-gray-700">
                            {category.name}
                          </span>
                        </div>
                        <span className="text-xs lg:text-sm font-bold text-gray-900">
                          {category.value}%
                        </span>
                      </div>
                      <div className="relative">
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${category.value}%`,
                              backgroundColor: category.color,
                            }}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        ${(category.amount / 1000).toFixed(1)}K revenue
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Top Products */}
        <Card>
          <CardHeader className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base lg:text-lg font-bold text-gray-900">Top Selling Products</h3>
                <p className="text-xs lg:text-sm text-gray-500 mt-1">Best performers this month</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 lg:p-6">
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div
                  key={product.name}
                  className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="flex items-center gap-3 lg:gap-4 flex-1 min-w-0">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm lg:text-base">#{index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-xs lg:text-sm truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-gray-500">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
                    <span className="font-bold text-gray-900 text-sm lg:text-base">
                      {product.revenue}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-green-50 text-green-700">
                      <TrendingUp className="h-3 w-3" />
                      {product.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
