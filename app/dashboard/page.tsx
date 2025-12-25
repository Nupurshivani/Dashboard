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
import { Download, Calendar, BarChart3, ShoppingCart, TrendingUp, FileText, Star, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Dashboard() {
  const [timePeriod, setTimePeriod] = useState('monthly');

  return (
    <DashboardLayout>
      <div className="space-y-6">
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
