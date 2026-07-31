'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AdminActions } from './ui';
import { ConfirmProvider, ToastProvider } from '@/components/admin';

type NavItem = { label: string; href: string; icon: string };
type NavSection = { title?: string; items: NavItem[] };

const NAV_SECTIONS: NavSection[] = [
  { items: [{ label: 'Tổng quan', href: '/admin', icon: '📊' }] },
  {
    title: 'Quản lý',
    items: [
      { label: 'Nội dung', href: '/admin/contents', icon: '📝' },
      { label: 'Chuyên mục', href: '/admin/categories', icon: '🏷️' },
      { label: 'Leads (Liên hệ)', href: '/admin/leads', icon: '📬' },
    ],
  },
  {
    title: 'Hệ thống',
    items: [{ label: 'Cài đặt', href: '/admin/settings', icon: '⚙️' }],
  },
];

function isNavItemActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="p-4 space-y-2 text-sm font-medium">
      {NAV_SECTIONS.map((section, sectionIndex) => (
        <div key={section.title ?? `section-${sectionIndex}`}>
          {section.title && (
            <div className="px-4 py-2 mt-4 text-xs font-bold text-admin-orange uppercase tracking-wider">
              {section.title}
            </div>
          )}
          {section.items.map((item) => {
            const active = isNavItemActive(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`block px-4 py-2 rounded-md border-l-4 transition-colors ${
                  active
                    ? 'border-admin-orange bg-admin-gold/20 text-admin-gold font-bold'
                    : 'border-transparent hover:bg-admin-maroon-hover hover:text-admin-gold'
                }`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <div className="min-h-dvh bg-admin-cream">
      {/* Header */}
      <header className="border-b border-admin-orange/20 bg-white sticky top-0 z-50 shadow-sm">
        <div className="mx-auto flex w-full items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="lg:hidden -ml-1 p-2 text-admin-maroon"
              aria-label="Mở menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <Link
              href="/admin"
              className="flex items-center gap-2 text-lg font-bold text-admin-maroon"
            >
              <span className="text-2xl">🛡️</span>
              Admin · Dược Linh Các
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <AdminActions />
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Desktop sidebar */}
        <aside className="w-64 bg-admin-maroon/90 text-admin-gold hidden lg:block shrink-0 shadow-lg">
          <NavLinks />
        </aside>

        {/* Mobile drawer */}
        {isOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-72 bg-admin-maroon/95 text-admin-gold shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-4 border-b border-admin-gold/20">
            <span className="font-bold">Menu</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Đóng menu"
              className="p-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <NavLinks onNavigate={() => setIsOpen(false)} />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
            <ToastProvider>
              <ConfirmProvider>{children}</ConfirmProvider>
            </ToastProvider>
          </div>
        </main>
      </div>
    </div>
  );
}
