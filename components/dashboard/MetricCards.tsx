'use client';

import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const metrics = [
  {
    title: 'MONTHLY REVENUE',
    value: '$127,854',
    change: '+18.2%',
    isPositive: true,
    comparison: '+$19,642',
    comparisonText: 'vs last month',
    icon: DollarSign,
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    title: 'TOTAL SALES',
    value: '2,847',
    change: '+12.4%',
    isPositive: true,
    comparison: '+315 orders',
    comparisonText: 'vs last month',
    icon: ShoppingBag,
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    title: 'ACTIVE CUSTOMERS',
    value: '8,432',
    change: '+8.7%',
    isPositive: true,
    comparison: '+674 users',
    comparisonText: 'vs last month',
    icon: Users,
    iconBg: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    title: 'CONVERSION RATE',
    value: '3.24%',
    change: '+0.8%',
    isPositive: true,
    comparison: '+0.24%',
    comparisonText: 'vs last month',
    icon: TrendingUp,
    iconBg: 'bg-pink-50',
    iconColor: 'text-pink-600',
  },
];

export default function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {metrics.map((metric) => (
        <Card 
          key={metric.title} 
          className="relative overflow-hidden hover:shadow-md transition-all duration-200 border-gray-200"
        >
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
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                  metric.isPositive
                    ? 'bg-green-50 text-green-700'
                    : 'bg-red-50 text-red-700'
                }`}
              >
                {metric.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {metric.change}
              </span>
            </div>

            <div className="flex items-center justify-between pt-3 lg:pt-4 border-t border-gray-100">
              <p className="text-xs lg:text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{metric.comparison}</span>{' '}
                <span className="hidden sm:inline">{metric.comparisonText}</span>
              </p>
              <button 
                className="text-gray-400 hover:text-[#6366f1] transition-colors flex-shrink-0"
                aria-label="View details"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
