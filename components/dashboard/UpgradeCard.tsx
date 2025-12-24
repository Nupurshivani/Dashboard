'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap } from 'lucide-react';

export default function UpgradeCard() {
  return (
    <Card className="h-full">
      <CardHeader className="border-b border-gray-100 pb-4">
        <div>
          <p className="text-[10px] lg:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            UPGRADE
          </p>
          <h3 className="text-lg lg:text-xl font-bold text-gray-900">Premium Plan</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4 lg:p-6">
        <p className="text-xs lg:text-sm text-gray-600 mb-5 lg:mb-6 leading-relaxed">
          Supercharge your sales management and unlock your full potential for extraordinary success.
        </p>

        <div className="space-y-5 lg:space-y-6 mb-5 lg:mb-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs lg:text-sm font-semibold text-gray-700">Performance</span>
              <span className="text-xs lg:text-sm font-bold text-gray-900">79%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                style={{ width: '79%' }}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs lg:text-sm font-semibold text-gray-700">Tools</span>
              <span className="text-xs lg:text-sm font-bold text-gray-900">30+</span>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="h-1.5 bg-blue-100 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        <Button className="w-full bg-[#6366f1] hover:bg-[#5558e3] h-9 lg:h-10 font-semibold">
          <Zap className="mr-2 h-4 w-4" />
          Upgrade
        </Button>

        <p className="text-[10px] lg:text-xs text-gray-500 text-center mt-3 lg:mt-4 font-medium">
          Cancel anytime • No hidden fees
        </p>
      </CardContent>
    </Card>
  );
}
