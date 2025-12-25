'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

export default function UpgradeCard() {
  return (
    <Card className="h-full bg-gray-50/50 border-gray-200">
      <CardContent className="p-4 space-y-3">
        {/* First Inner Box - Header with title and button */}
        <div className="bg-white rounded-lg border border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                UPGRADE
              </p>
              <h3 className="text-base font-semibold text-gray-900">Premium Plan</h3>
            </div>
            <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] h-7 px-4 text-xs font-medium rounded-full">
              Upgrade
            </Button>
          </div>
        </div>

        {/* Second Inner Box - Container for description and stats */}
        <div className="bg-white rounded-lg border border-gray-200 p-3 space-y-3">
          {/* Description Box */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
            <p className="text-xs text-gray-500 leading-relaxed">
              Supercharge your sales management and unlock your full potential for extraordinary success.
            </p>
          </div>

          {/* Stats Box */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
            <div className="grid grid-cols-2 divide-x divide-gray-200">
              <div className="pr-4">
                <p className="text-xs text-gray-500 mb-1">Performance</p>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">79%</span>
                </div>
              </div>

              <div className="pl-4">
                <p className="text-xs text-gray-500 mb-1">Tools</p>
                <p className="text-sm font-semibold text-gray-900">30+</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
