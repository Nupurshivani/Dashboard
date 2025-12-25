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
  RefreshCw,
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
        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {salesMetrics.map((metric) => (
            <Card key={metric.title} className="relative overflow-hidden border border-gray-100 bg-gray-50/30 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                {/* Inner box containing title, icon, value, and badge */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 mb-4 shadow-sm">
                  {/* Top row: Title and Icon */}
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide">
                      {metric.title}
                    </p>
                    <div className={`p-2.5 rounded-lg ${metric.iconBg}`}>
                      <metric.icon className={`h-5 w-5 ${metric.iconColor}`} strokeWidth={2} />
                    </div>
                  </div>

                  {/* Value and badge row */}
                  <div className="flex items-baseline gap-2.5">
                    <h3 className="text-[28px] font-bold text-gray-900 leading-none">
                      {metric.value}
                    </h3>
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md ${
                        metric.isPositive ? 'bg-cyan-100 text-cyan-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      <TrendingUp className={`h-3 w-3 ${metric.isPositive ? '' : 'rotate-180'}`} strokeWidth={2.5} />
                      {metric.change}
                    </span>
                  </div>
                </div>

                {/* Outer box content: Comparison text */}
                <div className="flex items-center justify-between px-1">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{metric.comparison}</span>{' '}
                    <span className="text-gray-500">{metric.comparisonText}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Chart */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          <div className="xl:col-span-2">
            <Card className="h-full border border-gray-100 bg-gray-50/30 rounded-2xl shadow-sm">
              <CardContent className="p-4 space-y-4">
                {/* First inner box - Header with title, value */}
                <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                  {/* Top section - Title, value, and icon */}
                  <div className="p-5 flex items-start justify-between border-b border-gray-100">
                    <div>
                      <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2.5">
                        DECEMBER REVENUE
                      </h3>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-[32px] font-bold text-gray-900 leading-none">$158,000</span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                          <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
                          6.8%
                        </span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                      <RefreshCw className="h-4 w-4 text-purple-500" strokeWidth={2} />
                    </button>
                  </div>
                  
                  {/* Bottom section - Legend */}
                  <div className="px-5 py-4 flex items-center justify-end">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <span className="text-xs text-gray-600 font-medium">Revenue</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                        <span className="text-xs text-gray-600 font-medium">Target</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Second inner box - Chart */}
                <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
                  <ResponsiveContainer width="100%" height={280} className="lg:h-[300px]">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={true} horizontal={false} />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 11 }}
                      dy={8}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#9ca3af', fontSize: 11 }}
                      tickFormatter={(value) => `$${value / 1000}K`}
                      dx={-8}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="target"
                      stroke="#fbbf24"
                      strokeWidth={2.5}
                      fill="transparent"
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8b5cf6"
                      strokeWidth={2.5}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Distribution */}
          <div className="xl:col-span-1">
            <Card className="h-full border border-gray-100 bg-gray-50/30 rounded-2xl shadow-sm">
              <CardContent className="p-4 space-y-4">
                {/* First inner box - Header */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
                        SALES BY CATEGORY
                      </h3>
                      <div className="flex items-baseline gap-2.5">
                        <span className="text-[28px] font-bold text-gray-900 leading-none">$1.48M</span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-100 text-cyan-700">
                          <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
                          22.8%
                        </span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-purple-100 flex-shrink-0">
                      <BarChart3 className="h-5 w-5 text-purple-600" strokeWidth={2} />
                    </div>
                  </div>
                </div>

                {/* Second inner box - Category Metrics */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <div className="space-y-4">
                    {categoryData.map((category) => (
                      <div key={category.name}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <span className="text-sm font-medium text-gray-700">{category.name}</span>
                          </div>
                          <span className="text-sm font-bold text-gray-900">${(category.amount / 1000).toFixed(0)}K</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${category.value}%`,
                                backgroundColor: category.color,
                              }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-gray-600 w-10 text-right">
                            {category.value}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Top Products */}
        <Card className="bg-gray-50/50 border-gray-200">
          <CardContent className="p-4 space-y-3">
            {/* First Inner Box - Header Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    Top Selling Products
                  </h3>
                  <p className="text-xs text-gray-500">Best performers this month</p>
                </div>
                <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-100 to-blue-100">
                  <p className="text-xs font-semibold text-purple-700">Top 5</p>
                </div>
              </div>
            </div>

            {/* Second Inner Box - Products List */}
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <div className="space-y-2">
                {topProducts.map((product, index) => (
                  <div
                    key={product.name}
                    className="group relative p-3 rounded-lg border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-white to-gray-50/50 hover:from-purple-50/30 hover:to-blue-50/30"
                  >
                    <div className="flex items-center gap-4">
                      {/* Rank Badge */}
                      <div className="relative">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          index === 0 
                            ? 'bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg shadow-orange-200' 
                            : index === 1
                            ? 'bg-gradient-to-br from-gray-300 to-gray-400 shadow-md shadow-gray-200'
                            : index === 2
                            ? 'bg-gradient-to-br from-amber-600 to-amber-700 shadow-md shadow-amber-200'
                            : 'bg-gradient-to-br from-purple-500 to-blue-600 shadow-md shadow-purple-200'
                        }`}>
                          <span className="text-white font-bold text-sm">#{index + 1}</span>
                        </div>
                        {index === 0 && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                            <span className="text-[10px]">👑</span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-purple-700 transition-colors">
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-500">{product.sales} units</span>
                          <span className="text-gray-300">•</span>
                          <span className="text-xs font-medium text-gray-700">Volume Leader</span>
                        </div>
                      </div>

                      {/* Revenue and Trend */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="text-right">
                          <p className="font-bold text-gray-900 text-base">
                            {product.revenue}
                          </p>
                          <p className="text-xs text-gray-500">revenue</p>
                        </div>
                        <div className="w-px h-8 bg-gray-200"></div>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-100">
                          <TrendingUp className="h-3.5 w-3.5" strokeWidth={2.5} />
                          {product.trend}
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
