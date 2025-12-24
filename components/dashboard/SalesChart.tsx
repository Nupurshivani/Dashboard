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
import { TrendingUp } from 'lucide-react';
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
  { date: 'Dec 01', current: 95000, previous: 82000 },
  { date: 'Dec 04', current: 102000, previous: 88000 },
  { date: 'Dec 07', current: 108000, previous: 91000 },
  { date: 'Dec 10', current: 115000, previous: 95000 },
  { date: 'Dec 13', current: 121000, previous: 99000 },
  { date: 'Dec 16', current: 118000, previous: 103000 },
  { date: 'Dec 19', current: 125000, previous: 107000 },
  { date: 'Dec 22', current: 132000, previous: 110000 },
  { date: 'Dec 24', current: 128000, previous: 108000 },
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
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-medium mb-2">NET SALES</p>
        <p className="text-lg font-semibold text-[#6366f1] mb-1">
          ${(payload[0].value / 1000).toFixed(1)}K
        </p>
        <p className="text-xs text-gray-500">{payload[0].payload.date}, 2024</p>
        {payload[1] && (
          <p className="text-xs text-orange-500 mt-2">
            Previous: ${(payload[1].value / 1000).toFixed(1)}K
          </p>
        )}
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
  const title = period === 'monthly' ? 'DECEMBER SALES' : '2025 ANNUAL SALES';
  const totalValue = period === 'monthly' ? '$127,854' : '$1.53M';
  const changePercent = period === 'monthly' ? '18.2%' : '9.0%';
  const dateRange = period === 'monthly' 
    ? { start: 'Dec 01, 2025', end: 'Dec 24, 2025' }
    : { start: 'Jan 2025', end: 'Dec 2025' };

  return (
    <Card className="h-full">
      <CardHeader className="border-b border-gray-100 pb-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-[10px] lg:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {title}
            </h3>
            <div className="flex items-baseline gap-2 lg:gap-3">
              <span className="text-2xl lg:text-3xl font-bold text-gray-900">{totalValue}</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-700">
                <TrendingUp className="h-3 w-3" />
                {changePercent}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
            <Select value={period} onValueChange={(value: 'monthly' | 'yearly') => setPeriod(value)}>
              <SelectTrigger className="w-[120px] lg:w-[130px] h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Select value={productFilter} onValueChange={setProductFilter}>
              <SelectTrigger className="w-[140px] lg:w-[150px] h-9 text-sm">
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
              <SelectTrigger className="w-[140px] lg:w-[150px] h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-categories">All Categories</SelectItem>
                <SelectItem value="category-1">Category 1</SelectItem>
                <SelectItem value="category-2">Category 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-4 lg:gap-6 mt-3 lg:mt-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-[#6366f1]" />
            <span className="text-xs lg:text-sm text-gray-600 font-medium">This period</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-full bg-orange-400" />
            <span className="text-xs lg:text-sm text-gray-600 font-medium">Last period</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <ResponsiveContainer width="100%" height={280} className="lg:h-[320px]">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fb923c" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
            <XAxis
              dataKey="date"
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
              dataKey="previous"
              stroke="#fb923c"
              strokeWidth={2}
              fill="url(#colorPrevious)"
            />
            <Area
              type="monotone"
              dataKey="current"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#colorCurrent)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex justify-between text-xs text-gray-500 mt-2 px-4">
          <span>{dateRange.start}</span>
          <span>{dateRange.end}</span>
        </div>
      </CardContent>
    </Card>
  );
}
