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
    name: 'Apple iPhone 15 Pro Max',
    price: '$1,199.00',
    stock: 45,
    sold: 289,
    active: true,
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5 Headphones',
    price: '$399.99',
    stock: 78,
    sold: 456,
    active: true,
  },
  {
    id: 3,
    name: 'MacBook Air M3 13-inch',
    price: '$1,299.00',
    stock: 12,
    sold: 167,
    active: true,
  },
  {
    id: 4,
    name: 'Samsung Galaxy Watch 6',
    price: '$349.99',
    stock: 8,
    sold: 94,
    active: false,
  },
  {
    id: 5,
    name: 'Logitech MX Master 3S Mouse',
    price: '$99.99',
    stock: 156,
    sold: 823,
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
    <Card className="h-full">
      <CardHeader className="border-b border-gray-100 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] lg:text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              PRODUCT LIST
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl lg:text-3xl font-bold text-gray-900">{filteredProducts.length}</span>
              {searchQuery && (
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-50 text-gray-600">
                  of {products.length}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9 hover:bg-gray-50">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-9 bg-gray-50 border-gray-200 text-sm"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700 text-xs lg:text-sm">Product Info</TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs lg:text-sm">Price</TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs lg:text-sm">Stock</TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs lg:text-sm">Sold</TableHead>
                <TableHead className="font-semibold text-gray-700 text-xs lg:text-sm text-center">Active</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
                  <TableCell className="py-3 lg:py-4">
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="w-9 h-9 lg:w-10 lg:h-10 rounded-lg bg-gradient-to-br from-gray-100 to-gray-50 flex items-center justify-center flex-shrink-0">
                        <Package className="h-4 w-4 lg:h-5 lg:w-5 text-gray-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 text-xs lg:text-sm truncate">{product.name}</p>
                        <p className="text-[10px] lg:text-xs text-gray-500">ID: #{product.id.toString().padStart(3, '0')}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-bold text-gray-900 text-xs lg:text-sm">{product.price}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex px-2 lg:px-2.5 py-1 rounded-full text-[10px] lg:text-xs font-semibold ${
                        product.stock > 50
                          ? 'bg-green-50 text-green-700'
                          : product.stock > 20
                          ? 'bg-yellow-50 text-yellow-700'
                          : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-700 font-semibold text-xs lg:text-sm">{product.sold}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center">
                      <Switch 
                        checked={product.active} 
                        onCheckedChange={() => handleToggle(product.id)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
