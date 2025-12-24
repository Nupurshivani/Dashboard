'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrendingUp, BarChart3 } from 'lucide-react';

const conversionData = [
  { label: 'Website visitors', percentage: 100, value: 87654, color: 'bg-blue-500' },
  { label: 'Product page views', percentage: 42, value: 36815, color: 'bg-purple-500' },
  { label: 'Add to cart', percentage: 12.5, value: 10956, color: 'bg-pink-500' },
  { label: 'Completed purchases', percentage: 3.24, value: 2840, color: 'bg-green-500' },
];

export default function ConversionRate() {
  return (
    <Card className="h-full">
      <CardHeader className="border-b border-gray-100 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-[10px] lg:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              CONVERSION RATE
            </h3>
            <div className="flex items-baseline gap-2 lg:gap-3">
              <span className="text-2xl lg:text-3xl font-bold text-gray-900">3.24%</span>
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-700">
                <TrendingUp className="h-3 w-3" />
                +0.8%
              </span>
            </div>
          </div>
          <div className="p-2.5 lg:p-3 rounded-xl bg-indigo-50 flex-shrink-0">
            <BarChart3 className="h-4 w-4 lg:h-5 lg:w-5 text-indigo-600" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <div className="space-y-5 lg:space-y-6">
          {conversionData.map((item, index) => (
            <div key={item.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs lg:text-sm font-semibold text-gray-700">{item.label}</span>
                <span className="text-xs lg:text-sm font-bold text-gray-900">{item.value.toLocaleString()}</span>
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 lg:gap-3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.percentage * 6.67}%` }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gray-600 w-8 lg:w-10 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 lg:mt-6 pt-5 lg:pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs lg:text-sm">
            <span className="text-gray-600 font-medium">Average time to purchase</span>
            <span className="font-bold text-gray-900">2.4 days</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
