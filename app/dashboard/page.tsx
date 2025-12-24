'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import MetricCards from '@/components/dashboard/MetricCards';
import SalesChart from '@/components/dashboard/SalesChart';
import ConversionRate from '@/components/dashboard/ConversionRate';
import UpgradeCard from '@/components/dashboard/UpgradeCard';
import ProductList from '@/components/dashboard/ProductList';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Calendar, BarChart3, ShoppingCart, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Dashboard() {
  const [timePeriod, setTimePeriod] = useState('monthly');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900">Dashboard</h1>
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
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative text-[#6366f1]"
          >
            <BarChart3 className="h-4 w-4" />
            Overview
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6366f1]" />
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
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-all relative text-gray-600 hover:text-gray-900"
          >
            <TrendingUp className="h-4 w-4" />
            Sales
          </Link>
        </div>

        <MetricCards />

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          <div className="xl:col-span-2">
            <SalesChart />
          </div>
          <div className="xl:col-span-1">
            <ConversionRate />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 lg:gap-6">
          <div className="xl:col-span-1">
            <UpgradeCard />
          </div>
          <div className="xl:col-span-2">
            <ProductList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
