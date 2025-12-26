'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrendingUp, BarChart3 } from 'lucide-react';

const conversionData = [
  { label: 'Product views', percentage: 15, value: 6545, color: 'bg-blue-500' },
  { label: 'Add to cart', percentage: 8, value: 3491, color: 'bg-purple-500' },
  { label: 'Checkout initiated', percentage: 4, value: 1746, color: 'bg-pink-500' },
  { label: 'Completed purchases', percentage: 2.75, value: 1200, color: 'bg-green-500' },
];

export default function ConversionRate() {
  return (
    <Card className="h-full border border-gray-100 bg-gray-50/30 rounded-2xl shadow-sm">
      <CardContent className="p-4 space-y-4">
        {/* First inner box - Conversion Rate */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-2">
                CONVERSION RATE
              </h3>
              <div className="flex items-baseline gap-2.5">
                <span className="text-[28px] font-bold text-gray-900 leading-none">4.55%</span>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-cyan-100 text-cyan-700">
                  <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
                  6.8%
                </span>
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-purple-100 flex-shrink-0">
              <svg className="h-5 w-5 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3L8 3L8 21L3 21L3 3Z" fill="currentColor" opacity="0.3"/>
                <path d="M10 8L15 8L15 21L10 21L10 8Z" fill="currentColor" opacity="0.5"/>
                <path d="M17 13L22 13L22 21L17 21L17 13Z" fill="currentColor" opacity="0.7"/>
                <path d="M3 3L22 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="8" cy="3" r="1.5" fill="currentColor"/>
                <circle cx="15" cy="3" r="1.5" fill="currentColor"/>
                <circle cx="22" cy="3" r="1.5" fill="currentColor"/>
                <path d="M8 3L15 3L22 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Second inner box - Conversion Metrics */}
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="space-y-4">
            {conversionData.map((item) => (
              <div key={item.label} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900 mb-1">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.percentage}%</div>
                  </div>
                  <div className="text-sm font-bold text-gray-900">{item.value.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
