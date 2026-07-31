'use client';

import { useState, useEffect } from 'react';
import type { AdminContentCreateInput, Category } from '@/types';
import { adminApi } from '@/lib/adminApi';
import { useRouter } from 'next/navigation';
import TiptapEditor from '@/components/TiptapEditor';
import { Button, useToast, XMarkIcon } from '@/components/admin';

export function NewContentForm() {
  const router = useRouter();
  const toast = useToast();

  // Form states
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [html, setHtml] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImageId, setCoverImageId] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverAlt, setCoverAlt] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

  const [authorName, setAuthorName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    title?: string;
    slug?: string;
    categoryId?: string;
  }>({});

  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pendingPreviewUrl, setPendingPreviewUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (pendingPreviewUrl) URL.revokeObjectURL(pendingPreviewUrl);
    };
  }, [pendingPreviewUrl]);

  function handleFileSelected(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      toast.show('File quá lớn (>5MB)', 'error');
      return;
    }
    if (pendingPreviewUrl) URL.revokeObjectURL(pendingPreviewUrl);
    setPendingFile(file);
    setPendingPreviewUrl(URL.createObjectURL(file));
  }

  useEffect(() => {
    adminApi
      .listCategories()
      .then(setCategories)
      .catch((err) => console.error('Failed to load categories', err));
  }, []);

  // Auto-generate slug from title if slug is empty
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug) {
      const newSlug = val
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      // Auto-append timestamp if slug likely exists or just on safe side
      const uniqueSlug = `${newSlug}-${Date.now().toString().slice(-4)}`;
      setSlug(uniqueSlug);
    }
  };

  function validateFields() {
    const errs: { title?: string; slug?: string; categoryId?: string } = {};
    if (!title.trim()) errs.title = 'Vui lòng nhập tiêu đề';
    if (!slug.trim()) errs.slug = 'Vui lòng nhập slug';
    if (!categoryId) errs.categoryId = 'Vui lòng chọn chuyên mục';
    return errs;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateFields();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setError(null);
    setLoading(true);

    try {
      let finalCoverImageId = coverImageId;
      if (pendingFile) {
        const formData = new FormData();
        formData.append('file', pendingFile);
        const res = (await adminApi.uploadMedia(formData)) as {
          id: string;
          url: string;
        };
        if (!res?.id) throw new Error('Upload succeeded but no ID returned');
        finalCoverImageId = res.id;
        setCoverImageId(res.id);
        setCoverImageUrl(res.url);
        URL.revokeObjectURL(pendingPreviewUrl);
        setPendingFile(null);
        setPendingPreviewUrl('');
      }

      const payload: AdminContentCreateInput = {
        categoryId,
        title,
        slug,
        html: html || '<p>Nội dung mới...</p>',
        excerpt,
        coverImageId: finalCoverImageId || undefined,
        coverAlt: coverAlt || undefined,
        publishedAt: publishedAt
          ? new Date(publishedAt).toISOString()
          : undefined,
        createdById: authorId || undefined,
        authorName: authorName || undefined,
        metaTitle,
        metaDescription,
      };
      // API returns the created object directly on success, NOT { ok: true }
      const res = await adminApi.createContent(payload);
      toast.show('Đã tạo bài viết mới');
      router.push(`/admin/contents/${res.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Create failed');
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sticky top-4 z-10 bg-[#FDFBF7]/80 backdrop-blur-md p-4 rounded-xl border border-[#E5E1DA] shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-[#4D0000]">Tạo bài viết mới</h1>
          <p className="text-sm text-stone-500">
            Điền thông tin để tạo bài viết mới
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            Hủy bỏ
          </Button>
          <Button onClick={onSubmit} loading={loading}>
            Tạo bài viết
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-[#E5E1DA] bg-white p-6 shadow-sm space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
                Tiêu đề bài viết <span className="text-red-500">*</span>
              </label>
              <input
                required
                value={title}
                onChange={(e) => {
                  handleTitleChange(e.target.value);
                  setFieldErrors((p) => ({ ...p, title: undefined }));
                }}
                placeholder="Nhập tiêu đề..."
                className={`w-full rounded-lg px-4 py-2.5 text-lg font-semibold ${
                  fieldErrors.title
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                    : 'border-stone-200 focus:border-[#4D0000] focus:ring-[#4D0000]'
                }`}
              />
              {fieldErrors.title && (
                <p className="text-xs text-red-600">{fieldErrors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
                Mô tả ngắn (Excerpt)
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                rows={3}
                placeholder="Tóm tắt nội dung..."
                className="w-full rounded-lg border-stone-200 px-3 py-2 text-sm focus:border-[#4D0000] focus:ring-[#4D0000]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
                Nội dung (HTML/Markdown)
              </label>
              <div className="flex flex-col min-h-[500px]">
                <TiptapEditor content={html} onChange={setHtml} />
              </div>
            </div>

            {/* SEO Fields */}
            <div className="pt-4 border-t border-stone-100 space-y-4">
              <h3 className="font-semibold text-stone-800">SEO Meta Data</h3>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    Meta Title
                  </label>
                  <input
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full rounded-lg border-stone-200 py-2 text-sm focus:border-[#4D0000] focus:ring-[#4D0000]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-stone-700">
                    Meta Description
                  </label>
                  <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    rows={2}
                    className="w-full rounded-lg border-stone-200 py-2 text-sm focus:border-[#4D0000] focus:ring-[#4D0000]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <div className="rounded-xl border border-[#E5E1DA] bg-white p-5 shadow-sm space-y-4">
            <h3 className="font-semibold text-[#4D0000]">Cấu hình</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
                Chuyên mục <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={categoryId}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                  setFieldErrors((p) => ({ ...p, categoryId: undefined }));
                }}
                className={`w-full rounded-lg bg-white py-2 text-sm text-stone-700 ${
                  fieldErrors.categoryId
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                    : 'border-stone-200 focus:border-[#4D0000] focus:ring-[#4D0000]'
                }`}
              >
                <option value="">Chọn chuyên mục</option>
                {categories?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              {fieldErrors.categoryId && (
                <p className="text-xs text-red-600">{fieldErrors.categoryId}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
                Slug - Đường dẫn URL
              </label>
              <input
                value={slug}
                onChange={(e) => {
                  setSlug(e.target.value);
                  setFieldErrors((p) => ({ ...p, slug: undefined }));
                }}
                className={`w-full rounded-lg py-2 text-sm text-stone-600 ${
                  fieldErrors.slug
                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                    : 'border-stone-200 focus:border-[#4D0000] focus:ring-[#4D0000]'
                }`}
              />
              {fieldErrors.slug && (
                <p className="text-xs text-red-600">{fieldErrors.slug}</p>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-stone-700">
                Ảnh Thumbnail
              </label>

              <div className="flex flex-col gap-3">
                {/* Preview: ảnh đang chờ upload ưu tiên hơn ảnh đã lưu */}
                {(pendingPreviewUrl || coverImageId) && (
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-stone-200 bg-stone-50">
                    <div className="flex items-center justify-center h-full text-xs text-stone-400">
                      {pendingPreviewUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={pendingPreviewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : coverImageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={coverImageUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : null}
                    </div>
                    <button
                      onClick={() => {
                        if (pendingPreviewUrl) {
                          URL.revokeObjectURL(pendingPreviewUrl);
                          setPendingFile(null);
                          setPendingPreviewUrl('');
                        } else {
                          setCoverImageId('');
                          setCoverImageUrl('');
                        }
                      }}
                      className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white text-red-600"
                      title="Xóa ảnh"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {pendingPreviewUrl && (
                  <p className="text-xs text-stone-500 italic">
                    Ảnh sẽ được tải lên khi bạn lưu.
                  </p>
                )}

                <div className="flex gap-2">
                  <input
                    type="file"
                    id="thumbnail-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileSelected(file);
                    }}
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleFileSelected(file);
                    }}
                    className={`flex-1 cursor-pointer rounded-lg border border-dashed px-4 py-3 text-center text-sm transition-colors ${
                      isDragging
                        ? 'border-[#4D0000] bg-stone-50 text-stone-700'
                        : 'border-stone-300 text-stone-600 hover:border-[#4D0000] hover:bg-stone-50'
                    }`}
                  >
                    <span className="font-medium text-[#4D0000]">
                      Tải ảnh lên
                    </span>{' '}
                    hoặc kéo thả vào đây
                    <p className="text-xs text-stone-400 mt-1">
                      PNG, JPG, WEBP (Max 5MB)
                    </p>
                  </label>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-stone-700">
                    Mô tả ảnh (Alt Text)
                  </label>
                  <input
                    value={coverAlt}
                    onChange={(e) => setCoverAlt(e.target.value)}
                    placeholder="Mô tả ảnh cho SEO..."
                    className="w-full rounded-lg border-stone-200 py-2 text-sm text-stone-600 focus:border-[#4D0000] focus:ring-[#4D0000]"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
                Tên tác giả (Author Name)
              </label>
              <input
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Nhập tên tác giả hiển thị..."
                className="w-full rounded-lg border-stone-200 py-2 text-sm text-stone-600 focus:border-[#4D0000] focus:ring-[#4D0000]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
                Tác giả (Author ID - Optional)
              </label>
              <input
                value={authorId}
                onChange={(e) => setAuthorId(e.target.value)}
                placeholder="Để trống = User hiện tại"
                className="w-full rounded-lg border-stone-200 py-2 text-sm text-stone-600 focus:border-[#4D0000] focus:ring-[#4D0000]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
                Ngày xuất bản
              </label>
              <input
                type="datetime-local"
                value={publishedAt}
                onChange={(e) => setPublishedAt(e.target.value)}
                className="w-full rounded-lg border-stone-200 py-2 text-sm text-stone-600 focus:border-[#4D0000] focus:ring-[#4D0000]"
              />
              <p className="text-xs text-stone-400">
                Để trống = Chưa xuất bản (Draft)
              </p>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="fixed bottom-4 right-4 max-w-sm rounded-lg bg-red-100 p-4 text-sm text-red-800 shadow-lg border border-red-200 animate-in slide-in-from-bottom-2">
          <strong>Lỗi:</strong> {error}
          <button onClick={() => setError(null)} className="ml-2 underline">
            Đóng
          </button>
        </div>
      )}
    </div>
  );
}
