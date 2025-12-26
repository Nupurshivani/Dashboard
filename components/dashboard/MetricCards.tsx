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
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="12" cy="8" rx="7" ry="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M5 8V12C5 13.657 8.134 15 12 15C15.866 15 19 13.657 19 12V8" stroke="currentColor" strokeWidth="2"/>
        <path d="M5 12V16C5 17.657 8.134 19 12 19C15.866 19 19 17.657 19 16V12" stroke="currentColor" strokeWidth="2"/>
        <circle cx="8" cy="17" r="2.5" fill="currentColor" opacity="0.3"/>
      </svg>
    ),
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
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="2"/>
        <rect x="8" y="14" width="2" height="4" fill="currentColor"/>
        <rect x="11" y="11" width="2" height="7" fill="currentColor"/>
        <rect x="14" y="9" width="2" height="9" fill="currentColor"/>
      </svg>
    ),
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    title: 'TOTAL ORDER',
    value: '11,294',
    change: '0.5%',
    isPositive: true,
    comparison: '+1,450',
    comparisonText: 'from last month',
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2L3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6L18 2H6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="12" r="0.8" fill="currentColor"/>
        <circle cx="15" cy="12" r="0.8" fill="currentColor"/>
        <path d="M9.5 14C9.5 14 10.5 15 12 15C13.5 15 14.5 14 14.5 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
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
    icon: () => (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="1.5" fill="currentColor"/>
      </svg>
    ),
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
                  {typeof metric.icon === 'function' ? (
                    <div className={metric.iconColor}>
                      <metric.icon />
                    </div>
                  ) : (
                    <metric.icon className={`h-5 w-5 ${metric.iconColor}`} strokeWidth={2} />
                  )}
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
