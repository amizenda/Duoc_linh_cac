'use client';

import { useEffect, useState } from 'react';
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/api/categories';
import type { Category } from '@/types';
import {
  Button,
  PencilSquareIcon,
  PlusIcon,
  Table,
  TableBody,
  TableCard,
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

export function CategoriesPage() {
  const toast = useToast();
  const confirmAction = useConfirm();
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', slug: '' });
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    listCategories()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  const handleCreate = async () => {
    try {
      await createCategory(formData.name, formData.slug);
      setIsFormOpen(false);
      setFormData({ name: '', slug: '' });
      loadData();
      toast.show('Đã tạo chuyên mục mới');
    } catch (e) {
      toast.show((e as Error).message, 'error');
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    try {
      await updateCategory(editingId, formData.name, formData.slug);
      setIsFormOpen(false);
      setEditingId(null);
      setFormData({ name: '', slug: '' });
      loadData();
      toast.show('Đã cập nhật chuyên mục');
    } catch (e) {
      toast.show((e as Error).message, 'error');
    }
  };

  const handleDelete = async (id: string) => {
    const ok = await confirmAction(
      'Bạn có chắc chắn muốn xóa chuyên mục này?',
      { danger: true, confirmLabel: 'Xóa' },
    );
    if (!ok) return;
    try {
      await deleteCategory(id);
      toast.show('Xóa thành công');
      loadData();
    } catch (e) {
      toast.show((e as Error).message, 'error');
    }
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setFormData({ name: cat.name, slug: cat.slug || '' });
    setIsFormOpen(true);
  };

  const startCreate = () => {
    setEditingId(null);
    setFormData({ name: '', slug: '' });
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4D0000]">
            Quản lý Chuyên mục
          </h1>
          <p className="text-sm text-stone-600">
            Danh sách các chuyên mục bài viết
          </p>
        </div>
        <Button onClick={startCreate}>
          <PlusIcon className="h-5 w-5" />
          Thêm chuyên mục
        </Button>
      </div>

      {isFormOpen && (
        <div className="rounded-xl border border-[#E5E1DA] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-semibold text-[#4D0000]">
            {editingId ? 'Chỉnh sửa chuyên mục' : 'Thêm chuyên mục mới'}
          </h2>
          <form
            onSubmit={handleSave}
            className="flex flex-col gap-4 sm:flex-row sm:items-end"
          >
            <div className="flex-1 space-y-1">
              <label className="text-sm font-medium text-stone-700">
                Tên chuyên mục
              </label>
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border-stone-200 focus:border-[#4D0000] focus:ring-[#4D0000]"
                placeholder="Nhập tên chuyên mục..."
              />
            </div>
            <div className="flex-1 space-y-1">
              <label className="text-sm font-medium text-stone-700">Slug</label>
              <input
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full rounded-lg border-stone-200 focus:border-[#4D0000] focus:ring-[#4D0000]"
                placeholder="Tự động tạo nếu để trống"
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" variant="secondary">
                {editingId ? 'Cập nhật' : 'Tạo mới'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsFormOpen(false)}
              >
                Hủy
              </Button>
            </div>
          </form>
        </div>
      )}

      <TableCard>
        {loading && <TableLoading>Đang tải...</TableLoading>}
        {error && <TableError message={error} />}

        {!loading && !error && (
          <TableScroll>
            <Table>
              <TableHead>
                <tr>
                  <th className="px-6 py-3 font-semibold">Tên chuyên mục</th>
                  <th className="px-6 py-3 font-semibold">Slug (Đường dẫn)</th>
                  <th className="px-6 py-3 font-semibold text-center">
                    Số bài viết
                  </th>
                  <th className="px-6 py-3 font-semibold text-right">
                    Thao tác
                  </th>
                </tr>
              </TableHead>
              <TableBody>
                {data.length === 0 ? (
                  <TableEmptyRow colSpan={4}>
                    Chưa có chuyên mục nào.
                  </TableEmptyRow>
                ) : (
                  data.map((item) => (
                    <TableRow key={item.id}>
                      <td className="px-6 py-4 font-medium text-[#4D0000]">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-stone-500">
                        {item.slug}
                      </td>
                      <td className="px-6 py-4 text-center text-stone-500">
                        {item.contentsCount}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            onClick={() => startEdit(item)}
                            title="Sửa"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </Button>
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
      </TableCard>
    </div>
  );
}
