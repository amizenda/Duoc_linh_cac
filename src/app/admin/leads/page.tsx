import type { Metadata } from 'next';
import { Suspense } from 'react';
import { LeadsPage } from './ui';

export const metadata: Metadata = {
  title: 'Leads (Admin)',
  description: 'Danh sách leads.',
};

export default function AdminLeadsPage() {
  return (
    <Suspense fallback={<p className="text-sm">Đang tải…</p>}>
      <LeadsPage />
    </Suspense>
  );
}
