'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TrendingUp, RefreshCw } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const monthlyData = [
  { date: 'Aug 01, 2024', current: 10000, previous: 12000 },
  { date: 'Aug 05, 2024', current: 15000, previous: 14000 },
  { date: 'Aug 08, 2024', current: 18000, previous: 15000 },
  { date: 'Aug 12, 2024', current: 22300, previous: 19000 },
  { date: 'Aug 15, 2024', current: 20000, previous: 17000 },
  { date: 'Aug 18, 2024', current: 23000, previous: 18000 },
  { date: 'Aug 22, 2024', current: 21000, previous: 16000 },
  { date: 'Aug 25, 2024', current: 19000, previous: 15000 },
  { date: 'Aug 28, 2024', current: 17000, previous: 14000 },
  { date: 'Aug 31, 2024', current: 16000, previous: 13000 },
];

const yearlyData = [
  { date: 'Jan', current: 980000, previous: 850000 },
  { date: 'Feb', current: 1050000, previous: 920000 },
  { date: 'Mar', current: 1120000, previous: 980000 },
  { date: 'Apr', current: 1180000, previous: 1050000 },
  { date: 'May', current: 1250000, previous: 1120000 },
  { date: 'Jun', current: 1320000, previous: 1180000 },
  { date: 'Jul', current: 1280000, previous: 1240000 },
  { date: 'Aug', current: 1380000, previous: 1290000 },
  { date: 'Sep', current: 1450000, previous: 1350000 },
  { date: 'Oct', current: 1520000, previous: 1420000 },
  { date: 'Nov', current: 1480000, previous: 1390000 },
  { date: 'Dec', current: 1580000, previous: 1450000 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const currentData = payload.find((p: any) => p.dataKey === 'current');
    const previousData = payload.find((p: any) => p.dataKey === 'previous');
    
    return (
      <div className="bg-white p-3 rounded-xl shadow-lg border border-gray-200">
        <p className="text-xs font-semibold text-gray-900 mb-2">NET SALES</p>
        <div className="space-y-1">
          {currentData && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500" />
              <p className="text-sm font-semibold text-gray-900">
                ${(currentData.value / 1000).toFixed(1)}K
              </p>
              <span className="text-xs text-gray-500">— {currentData.payload.date}</span>
            </div>
          )}
          {previousData && (
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <p className="text-sm font-semibold text-gray-900">
                ${(previousData.value / 1000).toFixed(1)}K
              </p>
              <span className="text-xs text-gray-500">— {previousData.payload.date}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

export default function SalesChart() {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');
  const [productFilter, setProductFilter] = useState('all-products');
  const [categoryFilter, setCategoryFilter] = useState('all-categories');

  const data = period === 'monthly' ? monthlyData : yearlyData;
  const title = 'OVERALL SALES';
  const totalValue = '$83,125';
  const changePercent = '7.7%';
  const dateRange = period === 'monthly' 
    ? { start: 'Aug 01, 2024', end: 'Aug 31, 2024' }
    : { start: 'Jan 2025', end: 'Dec 2025' };

  return (
    <Card className="h-full border border-gray-100 bg-gray-50/30 rounded-2xl shadow-sm">
      <CardContent className="p-4 space-y-4">
        {/* First inner box - Header with title, value, and filters */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
          {/* Top section - Title, value, and icon */}
          <div className="p-5 flex items-start justify-between border-b border-gray-100">
            <div>
              <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2.5">
                {title}
              </h3>
              <div className="flex items-baseline gap-2.5">
                <span className="text-[32px] font-bold text-gray-900 leading-none">{totalValue}</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                  <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
                  {changePercent}
                </span>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <RefreshCw className="h-4 w-4 text-purple-500" strokeWidth={2} />
            </button>
          </div>
          
          {/* Bottom section - Filters and legend */}
          <div className="px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Select value={productFilter} onValueChange={setProductFilter}>
                <SelectTrigger className="h-8 px-3 rounded-full bg-gray-50 border-gray-200 text-sm font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-products">All Products</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="h-8 px-3 rounded-full bg-gray-50 border-gray-200 text-sm font-medium">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-categories">All Categories</SelectItem>
                  <SelectItem value="category-1">Category 1</SelectItem>
                  <SelectItem value="category-2">Category 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-xs text-gray-600 font-medium">This period</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="text-xs text-gray-600 font-medium">Last period</span>
              </div>
            </div>
          </div>
        </div>

        {/* Second inner box - Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={true} horizontal={false} />
              <XAxis
                dataKey="date"
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
                dataKey="previous"
                stroke="#fbbf24"
                strokeWidth={2.5}
                fill="transparent"
              />
              <Area
                type="monotone"
                dataKey="current"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                fill="url(#colorCurrent)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
