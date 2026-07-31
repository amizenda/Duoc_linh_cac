'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { adminApi } from '@/lib/adminApi';
import type {
  AdminContentListResponse,
  Category,
  PublishStatus,
} from '@/types';
import {
  Button,
  buttonVariants,
  FunnelIcon,
  MagnifyingGlassIcon,
  Pagination,
  PencilSquareIcon,
  PlusIcon,
  StatusBadge,
  Table,
  TableBody,
  TableCard,
  TableCheckbox,
  TableEmptyRow,
  TableError,
  TableHead,
  TableLoading,
  TableRow,
  TableScroll,
  TrashIcon,
  useConfirm,
  useToast,
} from '@/components/admin';

type BulkAction = 'delete' | 'publish' | 'unpublish';

export function ContentsPage() {
  const sp = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const toast = useToast();
  const confirmAction = useConfirm();

  const [data, setData] = useState<AdminContentListResponse | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<BulkAction | null>(null);

  // Search params
  const categoryId = sp.get('categoryId') ?? '';
  const status = (sp.get('status') as PublishStatus | null) ?? '';
  const page = parseInt(sp.get('page') ?? '1', 10);
  const pageSize = parseInt(sp.get('pageSize') ?? '5', 10);
  const search = sp.get('q') ?? '';

  useEffect(() => {
    adminApi.listCategories().then(setCategories).catch(console.error);
  }, []);

  // Local state for search input
  const [searchTerm, setSearchTerm] = useState(search);

  // Sync local search term with URL param
  useEffect(() => {
    setSearchTerm(search);
  }, [search]);

  const queryParams = useMemo(() => {
    const q = new URLSearchParams();
    if (categoryId && categoryId !== '') q.set('categoryId', categoryId);
    if (status) q.set('status', status);
    if (search) q.set('q', search);
    q.set('page', page.toString());
    q.set('pageSize', pageSize.toString());
    return q;
  }, [categoryId, status, page, pageSize, search]);

  const loadContents = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    adminApi
      .listContents(`?${queryParams.toString()}`)
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
    return loadContents();
  }, [loadContents]);

  useEffect(() => {
    setSelectedIds(new Set());
  }, [data]);

  const allSelected =
    !!data &&
    data.items.length > 0 &&
    data.items.every((i) => selectedIds.has(i.id));
  const someSelected = !!data && data.items.some((i) => selectedIds.has(i.id));

  const toggleAll = (checked: boolean) => {
    setSelectedIds(checked ? new Set(data?.items.map((i) => i.id)) : new Set());
  };

  const toggleOne = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const BULK_FN: Record<BulkAction, (id: string) => Promise<unknown>> = {
    delete: adminApi.deleteContent,
    publish: adminApi.publishContent,
    unpublish: adminApi.unpublishContent,
  };
  const BULK_VERB: Record<BulkAction, string> = {
    delete: 'xóa',
    publish: 'xuất bản',
    unpublish: 'gỡ',
  };
  const BULK_CONFIRM_MESSAGE: Record<BulkAction, (count: number) => string> = {
    delete: (n) =>
      `Xóa ${n} bài viết đã chọn? Hành động này không thể hoàn tác.`,
    publish: (n) => `Xuất bản ${n} bài viết đã chọn?`,
    unpublish: (n) => `Gỡ ${n} bài viết đã chọn?`,
  };

  async function runBulk(action: BulkAction) {
    const ids = Array.from(selectedIds);
    if (ids.length === 0) return;

    const ok = await confirmAction(BULK_CONFIRM_MESSAGE[action](ids.length), {
      danger: action === 'delete' || action === 'unpublish',
      confirmLabel: action === 'delete' ? 'Xóa' : undefined,
    });
    if (!ok) return;

    setBulkAction(action);
    const results = await Promise.allSettled(
      ids.map((id) => BULK_FN[action](id)),
    );
    const succeeded = results.filter((r) => r.status === 'fulfilled').length;
    const failed = results.length - succeeded;
    setBulkAction(null);
    setSelectedIds(new Set());
    loadContents();
    toast.show(
      failed === 0
        ? `Đã ${BULK_VERB[action]} ${succeeded}/${results.length} mục`
        : `Đã ${BULK_VERB[action]} ${succeeded}/${results.length} mục, ${failed} lỗi`,
      failed === 0 ? 'success' : 'error',
    );
  }

  const handleDelete = async (id: string) => {
    const ok = await confirmAction(
      'Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác.',
      { danger: true, confirmLabel: 'Xóa' },
    );
    if (!ok) return;
    try {
      await adminApi.deleteContent(id);
      toast.show('Đã xóa bài viết');
      loadContents();
    } catch (e) {
      toast.show(e instanceof Error ? e.message : 'Xóa thất bại', 'error');
    }
  };

  const handleFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(queryParams.toString());
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    newParams.set('page', '1'); // Reset pagination
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4D0000]">
            Quản lý Bài viết
          </h1>
          <p className="text-sm text-stone-600">
            Danh sách các bài viết tin tức
          </p>
        </div>
        <Link
          href="/admin/contents/new"
          className={buttonVariants({ variant: 'primary' })}
        >
          <PlusIcon className="h-5 w-5" />
          Tạo bài viết mới
        </Link>
      </div>

      {/* Bulk actions toolbar */}
      {selectedIds.size > 0 && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-admin-border bg-admin-cream px-4 py-3">
          <span className="text-sm font-medium text-[#4D0000]">
            {selectedIds.size} mục đã chọn
          </span>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              loading={bulkAction === 'publish'}
              disabled={bulkAction !== null && bulkAction !== 'publish'}
              onClick={() => runBulk('publish')}
            >
              Xuất bản đã chọn
            </Button>
            <Button
              variant="outline"
              size="sm"
              loading={bulkAction === 'unpublish'}
              disabled={bulkAction !== null && bulkAction !== 'unpublish'}
              onClick={() => runBulk('unpublish')}
            >
              Gỡ đã chọn
            </Button>
            <Button
              variant="danger"
              size="sm"
              loading={bulkAction === 'delete'}
              disabled={bulkAction !== null && bulkAction !== 'delete'}
              onClick={() => runBulk('delete')}
            >
              Xóa đã chọn
            </Button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="rounded-xl border border-[#E5E1DA] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-stone-500">
              <FunnelIcon className="h-5 w-5" />
              <span className="text-sm font-medium">Bộ lọc:</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={categoryId}
                onChange={(e) => handleFilter('categoryId', e.target.value)}
                className="rounded-lg border-stone-200 py-1.5 text-sm focus:border-[#4D0000] focus:ring-[#4D0000]"
              >
                <option value="">Tất cả chuyên mục</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={status}
                onChange={(e) => handleFilter('status', e.target.value)}
                className="rounded-lg border-stone-200 py-1.5 text-sm focus:border-[#4D0000] focus:ring-[#4D0000]"
              >
                <option value="">Tất cả trạng thái</option>
                <option value="PUBLISHED">Đã xuất bản</option>
                <option value="DRAFT">Nháp</option>
                <option value="ARCHIVED">Lưu trữ</option>
              </select>
            </div>
          </div>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="relative w-full max-w-sm"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-stone-400" />
            </div>
            <input
              type="search"
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full rounded-lg border-stone-200 py-1.5 pl-10 text-sm focus:border-[#4D0000] focus:ring-[#4D0000]"
            />
          </form>
        </div>
      </div>

      {/* Content Table */}
      <TableCard>
        {loading && !data && <TableLoading />}

        {error && <TableError message={error} />}

        {!loading && !error && data && (
          <TableScroll>
            <Table>
              <TableHead>
                <tr>
                  <th className="w-10 px-4 py-3">
                    <TableCheckbox
                      checked={allSelected}
                      indeterminate={someSelected && !allSelected}
                      onChange={toggleAll}
                      ariaLabel="Chọn tất cả"
                    />
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 font-semibold">
                    Tiêu đề
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 font-semibold">
                    Chuyên mục
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 font-semibold">
                    Trạng thái
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 font-semibold">
                    Cập nhật
                  </th>
                  <th className="whitespace-nowrap px-6 py-3 font-semibold text-right">
                    Thao tác
                  </th>
                </tr>
              </TableHead>
              <TableBody>
                {data.items.length === 0 ? (
                  <TableEmptyRow colSpan={6}>
                    Không tìm thấy bài viết nào.
                  </TableEmptyRow>
                ) : (
                  data.items.map((item) => (
                    <TableRow key={item.id}>
                      <td className="px-4 py-4">
                        <TableCheckbox
                          checked={selectedIds.has(item.id)}
                          onChange={(checked) => toggleOne(item.id, checked)}
                          ariaLabel={`Chọn ${item.title}`}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/admin/contents/${item.id}`}
                          className="font-medium text-[#4D0000] hover:text-[#E75739] hover:underline"
                        >
                          {item.title}
                        </Link>
                        <div
                          className="mt-1 text-xs text-stone-400 font-mono truncate max-w-xs"
                          title={item.slug}
                        >
                          /{item.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-800">
                          {item.category?.name || '—'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-6 py-4 text-stone-500">
                        {new Date(
                          item.updatedAt || item.createdAt || Date.now(),
                        ).toLocaleDateString('vi-VN')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/contents/${item.id}`}
                            className={buttonVariants({ variant: 'ghost' })}
                            title="Sửa"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </Link>
                          <Button
                            variant="ghost"
                            className="hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDelete(item.id)}
                            title="Xóa"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </Button>
                        </div>
                      </td>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableScroll>
        )}

        {/* Pagination */}
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
    </div>
  );
}
