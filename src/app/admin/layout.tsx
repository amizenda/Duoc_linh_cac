import type { ReactNode } from 'react';
import { Be_Vietnam_Pro } from 'next/font/google';
import { AdminShell } from './AdminShell';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className={beVietnamPro.className}>
      <AdminShell>{children}</AdminShell>
    </div>
  );
}
