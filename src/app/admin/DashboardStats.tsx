'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/adminApi';

type Stats = {
  total: number;
  published: number;
  draft: number;
  leads: number;
};

type StatTile = { label: string; value: number | null };

export function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      adminApi.listContents('?pageSize=1'),
      adminApi.listContents('?pageSize=1&status=PUBLISHED'),
      adminApi.listContents('?pageSize=1&status=DRAFT'),
      adminApi.listLeads('?pageSize=1'),
    ])
      .then(([total, published, draft, leads]) => {
        if (cancelled) return;
        setStats({
          total: total.total,
          published: published.total,
          draft: draft.total,
          leads: leads.total,
        });
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const tiles: StatTile[] = [
    { label: 'Tổng bài viết', value: stats?.total ?? null },
    { label: 'Đã xuất bản', value: stats?.published ?? null },
    { label: 'Bản nháp', value: stats?.draft ?? null },
    { label: 'Lượt liên hệ', value: stats?.leads ?? null },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {tiles.map((tile) => (
        <div
          key={tile.label}
          className="rounded-xl border border-admin-border bg-white p-4 shadow-sm"
        >
          <div className="text-2xl font-bold text-admin-orange">
            {error ? '—' : (tile.value ?? '…')}
          </div>
          <div className="mt-1 text-sm text-admin-maroon">{tile.label}</div>
        </div>
      ))}
    </div>
  );
}
