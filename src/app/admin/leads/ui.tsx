'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';
import type { AdminLead, AdminLeadListResponse } from '@/types';
import {
  Button,
  buttonVariants,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  Pagination,
  Table,
  TableBody,
  TableCard,
  TableEmptyRow,
  TableError,
  TableHead,
  TableLoading,
  TableRow,
  TableScroll,
  UserIcon,
} from '@/components/admin';

function LeadDetailModal({
  lead,
  onClose,
}: {
  lead: AdminLead;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b p-6 pb-4">
          <h2 className="text-xl font-bold text-[#4D0000]">Chi tiết Lead</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-stone-100 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-stone-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-stone-500 mb-1">Họ và tên</p>
              <p className="font-semibold text-stone-900">{lead.fullName}</p>
            </div>
            <div>
              <p className="text-sm text-stone-500 mb-1">Thời gian tạo</p>
              <p className="font-medium text-stone-900">
                {new Date(lead.createdAt || Date.now()).toLocaleString('vi-VN')}
              </p>
            </div>
            <div>
              <p className="text-sm text-stone-500 mb-1">Số điện thoại</p>
              <p className="font-medium text-stone-900">{lead.phone}</p>
            </div>
            <div>
              <p className="text-sm text-stone-500 mb-1">Email</p>
              <p className="font-medium text-stone-900">{lead.email || '-'}</p>
            </div>
          </div>

          <div className="border-t border-stone-100 pt-4">
            <p className="text-sm text-stone-500 mb-2">Chủ đề (Topic)</p>
            <p className="font-medium text-[#4D0000] text-lg">
              {lead.topic || 'Không có chủ đề'}
            </p>
          </div>

          <div>
            <p className="text-sm text-stone-500 mb-2">Nội dung tin nhắn</p>
            <div className="rounded-lg bg-stone-50 p-4 text-stone-700 whitespace-pre-wrap leading-relaxed border border-stone-100">
              {lead.message}
            </div>
          </div>
        </div>
        <div className="bg-stone-50 px-6 py-4 flex justify-end rounded-b-lg">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  );
}

export function LeadsPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [data, setData] = useState<AdminLeadListResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedLead, setSelectedLead] = useState<AdminLead | null>(null);
  const [exporting, setExporting] = useState(false);

  const page = parseInt(sp.get('page') ?? '1', 10);
  const pageSize = parseInt(sp.get('pageSize') ?? '5', 10);
  const search = sp.get('q') ?? '';
  const from = sp.get('from') ?? '';
  const to = sp.get('to') ?? '';

  const [searchTerm, setSearchTerm] = useState(search);

  useEffect(() => {
    setSearchTerm(search);
  }, [search]);

  const queryParams = useMemo(() => {
    const q = new URLSearchParams();
    if (search) q.set('q', search);
    if (from) q.set('from', from);
    if (to) q.set('to', to);
    q.set('page', page.toString());
    q.set('pageSize', pageSize.toString());
    return q;
  }, [search, from, to, page, pageSize]);

  const loadLeads = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    adminApi
      .listLeads(`?${queryParams.toString()}`)
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((e) => {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [queryParams]);

  useEffect(() => {
    return loadLeads();
  }, [loadLeads]);

  const handleFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(queryParams.toString());
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1');
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilter('q', searchTerm);
  };

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(queryParams.toString());
    newParams.set('page', newPage.toString());
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handlePageSizeChange = (newSize: number) => {
    const newParams = new URLSearchParams(queryParams.toString());
    newParams.set('pageSize', newSize.toString());
    newParams.set('page', '1');
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const exportHref = (() => {
    const p = new URLSearchParams();
    if (from) p.set('from', from);
    if (to) p.set('to', to);
    const qs = p.toString();
    return `/api/admin/leads/export${qs ? `?${qs}` : ''}`;
  })();

  function handleExportClick() {
    setExporting(true);
    window.setTimeout(() => setExporting(false), 2500);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4D0000]">
            Danh sách Leads (Liên hệ)
          </h1>
          <p className="text-sm text-stone-600">
            Khách hàng quan tâm và để lại thông tin.
          </p>
        </div>
        <a
          href={exportHref}
          onClick={handleExportClick}
          className={`${buttonVariants({ variant: 'outline' })} ${
            exporting ? 'pointer-events-none opacity-60' : ''
          }`}
        >
          {exporting ? (
            <svg
              className="h-4 w-4 animate-spin text-stone-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4 text-stone-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
          )}
          {exporting ? 'Đang xuất...' : 'Xuất Excel'}
        </a>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-[#E5E1DA] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-stone-500">
              <FunnelIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Bộ lọc:</span>
            </div>
            <label className="flex items-center gap-1.5 text-sm text-stone-600">
              Từ ngày
              <input
                type="date"
                value={from}
                onChange={(e) => handleFilter('from', e.target.value)}
                className="rounded-lg border-stone-200 py-1.5 text-sm focus:border-[#4D0000] focus:ring-[#4D0000]"
              />
            </label>
            <label className="flex items-center gap-1.5 text-sm text-stone-600">
              Đến ngày
              <input
                type="date"
                value={to}
                onChange={(e) => handleFilter('to', e.target.value)}
                className="rounded-lg border-stone-200 py-1.5 text-sm focus:border-[#4D0000] focus:ring-[#4D0000]"
              />
            </label>
          </div>

          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full max-w-sm"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-stone-400" />
            </div>
            <input
              type="search"
              placeholder="Tìm theo tên, SĐT, email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border-stone-200 py-1.5 pl-10 text-sm focus:border-[#4D0000] focus:ring-[#4D0000]"
            />
          </form>
        </div>
      </div>

      <TableCard>
        {loading && !data && <TableLoading />}

        {error && <TableError message={error} />}

        {!loading && !error && data && (
          <TableScroll>
            <Table>
              <TableHead>
                <tr>
                  <th className="whitespace-nowrap px-6 py-3 font-semibold w-[22%]">
                    Tên khách hàng
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 font-semibold w-[23%]">
                    Liên hệ
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 font-semibold w-[30%]">
                    Nội dung tư vấn
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 font-semibold w-[15%]">
                    Thời gian
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 font-semibold text-right w-[10%]">
                    Thao tác
                  </th>
                </tr>
              </TableHead>
              <TableBody>
                {data.items.length === 0 ? (
                  <TableEmptyRow colSpan={5}>Chưa có leads nào.</TableEmptyRow>
                ) : (
                  data.items.map((lead) => (
                    <TableRow
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="cursor-pointer"
                    >
                      <td className="px-6 py-4 align-top">
                        <div className="flex items-start gap-3">
                          <div className="mt-1 rounded-full bg-stone-100 p-1.5 text-stone-400 group-hover:bg-stone-200 group-hover:text-stone-600 transition-colors">
                            <UserIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium text-[#4D0000] group-hover:underline decoration-stone-300 underline-offset-2">
                              {lead.fullName}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 align-top">
                        <div className="font-mono text-sm font-medium text-stone-700">
                          {lead.phone}
                        </div>
                        <div className="text-xs text-stone-500 mt-0.5">
                          {lead.email || '-'}
                        </div>
                      </td>

                      <td className="px-6 py-4 align-top">
                        <div className="font-medium text-sm text-[#4D0000] mb-1">
                          {lead.topic || 'Không có chủ đề'}
                        </div>
                        {lead.message && (
                          <p
                            className="line-clamp-2 text-xs text-stone-500 max-w-md leading-relaxed"
                            title={lead.message}
                          >
                            {lead.message}
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4 align-top text-stone-500 whitespace-nowrap text-xs">
                        {new Date(lead.createdAt || Date.now()).toLocaleString(
                          'vi-VN',
                        )}
                      </td>
                      <td className="px-6 py-4 align-top text-right">
                        <Button
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          title="Xem"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </Button>
                      </td>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableScroll>
        )}

        {data && (
          <Pagination
            page={page}
            pageSize={pageSize}
            total={data.total}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </TableCard>

      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}
