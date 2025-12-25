'use client';

import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const metrics = [
  {
    title: 'NEW NET INCOME',
    value: '$53,765',
    change: '10.5%',
    isPositive: true,
    comparison: '+$2,156',
    comparisonText: 'from last month',
    icon: DollarSign,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    title: 'AVERAGE SALES',
    value: '$12,680',
    change: '3.4%',
    isPositive: true,
    comparison: '+$2,350',
    comparisonText: 'from last month',
    icon: ShoppingBag,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    title: 'TOTAL ORDER',
    value: '11,294',
    change: '0.5%',
    isPositive: true,
    comparison: '+1,450',
    comparisonText: 'from last month',
    icon: Users,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    title: 'IMPRESSION',
    value: '456K',
    change: '10.2%',
    isPositive: false,
    comparison: '-89.4K',
    comparisonText: 'from last month',
    icon: TrendingUp,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
];

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {metrics.map((metric) => (
        <Card 
          key={metric.title} 
          className="relative overflow-hidden border border-gray-100 bg-gray-50/30 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
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
                    metric.isPositive
                      ? 'bg-cyan-100 text-cyan-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  <TrendingUp className={`h-3 w-3 ${metric.isPositive ? '' : 'rotate-180'}`} strokeWidth={2.5} />
                  {metric.change}
                </span>
              </div>
            </div>

            {/* Outer box content: Comparison text and arrow */}
            <div className="flex items-center justify-between px-1">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{metric.comparison}</span>{' '}
                <span className="text-gray-500">{metric.comparisonText}</span>
              </p>
              <button 
                className="text-gray-400 hover:text-gray-700 transition-colors"
                aria-label="View details"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
