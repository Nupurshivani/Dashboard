'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  Megaphone,
  Puzzle,
  Store,
  Tag,
  Settings,
  HelpCircle,
  Search,
  Mail,
  Bell,
  ChevronLeft,
  Menu,
  User,
  ArrowRight,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: ShoppingCart, label: 'Orders', href: '/orders' },
  { icon: Package, label: 'Products', href: '/products' },
  { icon: Users, label: 'Customers', href: '/customers' },
  { icon: BarChart3, label: 'Analytics', href: '/sales' },
  { icon: Megaphone, label: 'Marketing', href: '/marketing' },
];

const salesChannelItems = [
  { icon: Puzzle, label: 'Integrations', href: '/integrations' },
  { icon: Store, label: 'My Store', href: '/store' },
  { icon: Tag, label: 'Discounts', href: '/discounts' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');
  const pathname = usePathname();
  const router = useRouter();

  // Keyboard shortcut for command palette
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandPaletteOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const allCommands = [
    ...menuItems,
    ...salesChannelItems,
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: HelpCircle, label: 'Help Center', href: '/help' },
  ];

  const filteredCommands = allCommands.filter(item => 
    item.label.toLowerCase().includes(commandSearch.toLowerCase())
  );

  const filteredMenuItems = menuItems.filter(item => 
    item.label.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  const filteredSalesChannelItems = salesChannelItems.filter(item => 
    item.label.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50/50">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } fixed lg:sticky top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-50 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="flex items-center justify-between p-5 lg:p-6 border-b border-gray-200">
            {!sidebarCollapsed && (
              <Link href="/" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-base">M</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Metoric</span>
              </Link>
            )}
            {sidebarCollapsed && (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-sm mx-auto">
                <span className="text-white font-bold text-base">M</span>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden lg:flex p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft
                className={`h-4 w-4 transition-transform text-gray-600 ${
                  sidebarCollapsed ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>

          {/* Search Bar */}
          {!sidebarCollapsed && (
            <div className="px-4 py-4">
              <div 
                className="relative cursor-pointer" 
                onClick={() => setCommandPaletteOpen(true)}
              >
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                <Input
                  placeholder="Search"
                  value={sidebarSearch}
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  onFocus={() => setCommandPaletteOpen(true)}
                  className="pl-9 pr-12 bg-gray-50 border-gray-200 h-9 text-sm cursor-pointer"
                  readOnly
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-gray-500 bg-white border border-gray-200 rounded">
                    ⌘
                  </kbd>
                  <kbd className="px-1.5 py-0.5 text-[10px] font-medium text-gray-500 bg-white border border-gray-200 rounded">
                    K
                  </kbd>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-4">
              {!sidebarCollapsed && (
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">
                  Main Menu
                </p>
              )}
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-[#f0f1ff] text-[#6366f1] font-semibold'
                          : 'text-gray-700 hover:bg-gray-50 font-medium'
                      } ${sidebarCollapsed ? 'justify-center' : ''}`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!sidebarCollapsed && (
                        <span className="text-sm">{item.label}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="px-4 mt-8">
              {!sidebarCollapsed && (
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">
                  Sales Channel
                </p>
              )}
              <div className="space-y-1">
                {salesChannelItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium ${
                      sidebarCollapsed ? 'justify-center' : ''
                    }`}
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="text-sm">{item.label}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Bottom Links */}
          <div className="border-t border-gray-200 p-4 space-y-1">
            <Link
              href="/settings"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm">Settings</span>}
            </Link>
            <Link
              href="/help"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200 font-medium ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <HelpCircle className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm">Help Center</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 py-3.5 lg:py-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex-1" />

            <div className="flex items-center gap-2 lg:gap-3">
              {/* Messages Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-gray-100">
                    <Mail className="h-5 w-5 text-gray-600" />
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-blue-600 hover:bg-blue-600 text-[10px]">
                      3
                    </Badge>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold text-sm">Messages</h3>
                    <Badge variant="secondary" className="text-xs">3 new</Badge>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    <div className="divide-y">
                      <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="font-semibold text-sm text-gray-900">Sarah Wilson</p>
                              <span className="text-xs text-gray-500">2m ago</span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2">Hey! I wanted to discuss the Q4 sales report...</p>
                            <Badge className="mt-1.5 h-5 text-[10px] bg-blue-100 text-blue-700 hover:bg-blue-100">New</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="font-semibold text-sm text-gray-900">Michael Chen</p>
                              <span className="text-xs text-gray-500">1h ago</span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2">The new product inventory has been updated. Please review.</p>
                            <Badge className="mt-1.5 h-5 text-[10px] bg-blue-100 text-blue-700 hover:bg-blue-100">New</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 text-orange-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="font-semibold text-sm text-gray-900">Emma Rodriguez</p>
                              <span className="text-xs text-gray-500">3h ago</span>
                            </div>
                            <p className="text-xs text-gray-600 line-clamp-2">Meeting scheduled for tomorrow at 2 PM.</p>
                            <Badge className="mt-1.5 h-5 text-[10px] bg-blue-100 text-blue-700 hover:bg-blue-100">New</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 text-gray-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <p className="font-semibold text-sm text-gray-700">David Kim</p>
                              <span className="text-xs text-gray-500">5h ago</span>
                            </div>
                            <p className="text-xs text-gray-500 line-clamp-2">Thanks for the update on the analytics dashboard.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t">
                    <Button variant="ghost" className="w-full h-8 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                      View all messages
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Notifications Popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative h-9 w-9 hover:bg-gray-100">
                    <Bell className="h-5 w-5 text-gray-600" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="end">
                  <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    <Badge variant="secondary" className="text-xs">5 new</Badge>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    <div className="divide-y">
                      <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex gap-3">
                          <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <ShoppingCart className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 mb-0.5">New order received</p>
                            <p className="text-xs text-gray-600">Order #ORD-2025-2847 for $1,598.99</p>
                            <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex gap-3">
                          <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Package className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 mb-0.5">Low stock alert</p>
                            <p className="text-xs text-gray-600">MacBook Air M3 - Only 12 units left</p>
                            <p className="text-xs text-gray-500 mt-1">15 minutes ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex gap-3">
                          <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <Users className="h-4 w-4 text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 mb-0.5">New customer registered</p>
                            <p className="text-xs text-gray-600">Alexandra Mitchell joined your store</p>
                            <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex gap-3">
                          <div className="h-9 w-9 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <BarChart3 className="h-4 w-4 text-orange-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 mb-0.5">Revenue milestone reached</p>
                            <p className="text-xs text-gray-600">Monthly revenue exceeded $125K target</p>
                            <p className="text-xs text-gray-500 mt-1">3 hours ago</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                        <div className="flex gap-3">
                          <div className="h-9 w-9 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                            <Tag className="h-4 w-4 text-pink-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 mb-0.5">Promotion started</p>
                            <p className="text-xs text-gray-600">Winter Sale - 20% off electronics</p>
                            <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 border-t">
                    <Button variant="ghost" className="w-full h-8 text-xs font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50">
                      View all notifications
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
              
              <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
                <div className="h-9 w-9 rounded-full bg-[#6366f1] flex items-center justify-center ring-2 ring-gray-100">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50/50">
          <div className="p-4 lg:p-6 xl:p-8">{children}</div>
        </main>
      </div>

      {/* Command Palette */}
      <Dialog open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen}>
        <DialogContent className="sm:max-w-[550px] p-0 gap-0">
          <DialogHeader className="px-4 pt-4 pb-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search commands..."
                value={commandSearch}
                onChange={(e) => setCommandSearch(e.target.value)}
                className="pl-9 border-0 focus-visible:ring-0 text-base h-10"
                autoFocus
              />
            </div>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                No results found.
              </div>
            ) : (
              <div className="space-y-1">
                {filteredCommands.map((command) => {
                  const Icon = command.icon;
                  const isActive = pathname === command.href;
                  return (
                    <button
                      key={command.href}
                      onClick={() => {
                        router.push(command.href);
                        setCommandPaletteOpen(false);
                        setCommandSearch('');
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-colors ${
                        isActive
                          ? 'bg-indigo-50 text-indigo-700'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${
                          isActive ? 'text-indigo-600' : 'text-gray-500'
                        }`} />
                        <span className="font-medium text-sm">{command.label}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="px-4 py-3 border-t bg-gray-50 text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-white border border-gray-200 rounded">↑</kbd>
                <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-white border border-gray-200 rounded">↓</kbd>
                <span>navigate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-white border border-gray-200 rounded">Enter</kbd>
                <span>select</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-white border border-gray-200 rounded">Esc</kbd>
                <span>close</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
