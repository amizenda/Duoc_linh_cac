'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';
import type { AdminMeResponse } from '@/types';

export function AdminActions() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [me, setMe] = useState<AdminMeResponse | null>(null);

  useEffect(() => {
    if (pathname?.startsWith('/admin/login')) return;
    adminApi
      .me()
      .then(setMe)
      .catch(() => setMe(null));
  }, [pathname]);

  // Hide logout on login page
  if (pathname?.startsWith('/admin/login')) return null;

  async function onLogout() {
    setLoading(true);
    try {
      await adminApi.logout();
      window.location.href = '/admin/login';
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {me && (
        <div className="hidden sm:flex flex-col items-end leading-tight">
          <span className="text-sm font-medium text-admin-maroon">
            {me.email}
          </span>
          <span className="text-xs text-admin-maroon/60 uppercase">
            {me.role}
          </span>
        </div>
      )}
      <button
        type="button"
        onClick={onLogout}
        disabled={loading}
        className="group flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-admin-maroon hover:bg-admin-maroon/90 hover:text-admin-gold transition-all disabled:opacity-60 border border-admin-maroon/20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
        >
          <path
            fillRule="evenodd"
            d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-.943a.75.75 0 10-1.004-1.114l-2.5 2.25a.75.75 0 000 1.114l2.5 2.25a.75.75 0 101.004-1.114l-1.048-.943h9.546A.75.75 0 0019 10z"
            clipRule="evenodd"
          />
        </svg>
        {loading ? 'Đang thoát...' : 'Thoát admin'}
      </button>
    </div>
  );
}
