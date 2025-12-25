'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Search, RefreshCw, Package, Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const initialProducts = [
  {
    id: 1,
    name: 'Rompl Backtracking',
    price: '$119.99',
    stock: 25,
    sold: 320,
    active: true,
  },
];

export default function ProductList() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, active: !product.active }
        : product
    ));
  };

  return (
    <Card className="h-full bg-gray-50/50 border-gray-200">
      <CardContent className="p-4 space-y-3">
        {/* First Inner Box - Header Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-3 space-y-3">
          {/* Product List Title Section */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
                  PRODUCT LIST
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-gray-900">390</span>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-gray-200 text-gray-600">
                    +12
                  </span>
                </div>
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8 hover:bg-white border-gray-300">
                <RefreshCw className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Search Bar Section */}
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <Input
                placeholder="Search product..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 h-8 bg-white border-gray-300 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Second Inner Box - Table Section */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Table Headers Section */}
          <div className="bg-gray-50 border-b border-gray-200 px-3 py-2">
            <div className="grid grid-cols-5 gap-4">
              <div className="font-medium text-gray-500 text-xs">Product Info</div>
              <div className="font-medium text-gray-500 text-xs">Price</div>
              <div className="font-medium text-gray-500 text-xs">Stock</div>
              <div className="font-medium text-gray-500 text-xs">Sold</div>
              <div className="font-medium text-gray-500 text-xs text-center">Active</div>
            </div>
          </div>

          {/* Table Data Section */}
          <div className="bg-white">
            {filteredProducts.map((product) => (
              <div key={product.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50/50 transition-colors px-3 py-2.5">
                <div className="grid grid-cols-5 gap-4 items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                      <Package className="h-3 w-3 text-gray-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-gray-700 text-xs truncate">{product.name}</p>
                    </div>
                  </div>
                  <div className="font-medium text-gray-900 text-xs">{product.price}</div>
                  <div className="text-gray-600 text-xs">{product.stock}</div>
                  <div className="text-gray-600 text-xs">{product.sold}</div>
                  <div className="flex justify-center">
                    <Switch 
                      checked={product.active} 
                      onCheckedChange={() => handleToggle(product.id)}
                      className="scale-75"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
