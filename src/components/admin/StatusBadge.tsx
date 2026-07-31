import type { PublishStatus } from '@/types';

export function StatusBadge({ status }: { status: PublishStatus }) {
  if (status === 'PUBLISHED') {
    return (
      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
        Xuất bản
      </span>
    );
  }
  if (status === 'DRAFT') {
    return (
      <span className="inline-flex items-center rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
        Nháp
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600 ring-1 ring-inset ring-stone-500/10">
      {status}
    </span>
  );
}
