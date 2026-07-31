'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/adminApi';
import type {
  AdminContentResponse,
  Category,
  AdminContentUpdateInput,
} from '@/types';
import { useRouter } from 'next/navigation';
import TiptapEditor from '@/components/TiptapEditor';
import {
  ArrowLeftIcon,
  Button,
  useConfirm,
  useToast,
  XMarkIcon,
} from '@/components/admin';

export function ContentEditor({ id }: { id: string }) {
  const router = useRouter();
  const toast = useToast();
  const confirmAction = useConfirm();
  const [data, setData] = useState<AdminContentResponse | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{
    title?: string;
    slug?: string;
    categoryId?: string;
  }>({});

  // Form states
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [html, setHtml] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [coverImageId, setCoverImageId] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [coverAlt, setCoverAlt] = useState('');
  const [publishedAt, setPublishedAt] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');

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
    let mounted = true;
    setLoading(true);

    Promise.all([adminApi.getContent(id), adminApi.listCategories()])
      .then(([res, cats]) => {
        if (mounted) {
          setData(res);
          setCategories(cats);
          setTitle(res.title);
          setSlug(res.slug);
          setHtml(res.html || '');
          setExcerpt(res.excerpt || '');
          setCategoryId(res.categoryId);
          setCoverImageId(res.coverImageId || '');
          setCoverImageUrl(res.coverImage?.url || '');
          setCoverAlt(res.coverAlt || '');
          setPublishedAt(
            res.publishedAt
              ? new Date(res.publishedAt).toISOString().slice(0, 16)
              : '',
          );
          setAuthorName(res.authorName || '');
          setAuthorId(res.authorId || '');
          setMetaTitle(res.metaTitle || '');
          setMetaDescription(res.metaDescription || '');
        }
      })
      .catch((err) => {
        if (mounted)
          setError(err instanceof Error ? err.message : 'Load failed');
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  function validateFields() {
    const errs: { title?: string; slug?: string; categoryId?: string } = {};
    if (!title.trim()) errs.title = 'Vui lòng nhập tiêu đề';
    if (!slug.trim()) errs.slug = 'Vui lòng nhập slug';
    if (!categoryId) errs.categoryId = 'Vui lòng chọn chuyên mục';
    return errs;
  }

  const handleSave = async () => {
    const errs = validateFields();
    setFieldErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setError(null);
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

      const payload: AdminContentUpdateInput = {
        title,
        slug,
        html,
        excerpt,
        categoryId,
        coverImageId: finalCoverImageId || null,
        coverAlt: coverAlt || null,
        publishedAt: publishedAt ? new Date(publishedAt).toISOString() : null,
        createdById: authorId || null,
        authorName: authorName || null,
        metaTitle,
        metaDescription,
      };

      const updated = await adminApi.updateContent(id, payload);
      setData(updated);
      toast.show('Đã cập nhật thành công!');
    } catch (e) {
      toast.show(e instanceof Error ? e.message : 'Update failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePublish = async () => {
    // Validate required fields for publishing
    const missing = [];
    if (!title) missing.push('Tiêu đề');
    if (!slug) missing.push('Slug');
    if (!coverImageId) missing.push('Ảnh Thumbnail');
    if (!coverAlt) missing.push('Mô tả ảnh / Alt Text');
    if (!metaTitle) missing.push('Meta Title');
    if (!metaDescription) missing.push('Meta Description');

    if (missing.length > 0) {
      toast.show(
        `Không thể xuất bản. Thiếu thông tin: ${missing.join(', ')}`,
        'error',
      );
      return;
    }

    const ok = await confirmAction(
      'Bạn có chắc chắn muốn xuất bản nội dung này?',
    );
    if (!ok) return;
    setSubmitting(true);
    try {
      const published = await adminApi.publishContent(id);
      setData(published);
      toast.show('Đã xuất bản bài viết');
    } catch (e) {
      toast.show(e instanceof Error ? e.message : 'Publish failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnpublish = async () => {
    const ok = await confirmAction('Gỡ bỏ nội dung cập nhật khỏi website?', {
      danger: true,
      confirmLabel: 'Gỡ bài',
    });
    if (!ok) return;
    setSubmitting(true);
    try {
      const unpublished = await adminApi.unpublishContent(id);
      setData(unpublished);
      toast.show('Đã gỡ bài viết');
    } catch (e) {
      toast.show(e instanceof Error ? e.message : 'Unpublish failed', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const ok = await confirmAction(
      'Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác.',
      { danger: true, confirmLabel: 'Xóa' },
    );
    if (!ok) return;
    setSubmitting(true);
    try {
      await adminApi.deleteContent(id);
      toast.show('Đã xóa bài viết');
      router.push('/admin/contents');
    } catch (e) {
      toast.show(e instanceof Error ? e.message : 'Xóa thất bại', 'error');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-stone-500">Đang tải nội dung...</div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-center text-red-600">
        Không tìm thấy nội dung hoặc có lỗi xảy ra: {error}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sticky top-4 z-10 bg-[#FDFBF7]/80 backdrop-blur-md p-4 rounded-xl border border-[#E5E1DA] shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="rounded-full p-2 text-stone-500 hover:bg-stone-100 hover:text-stone-900"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-[#4D0000] line-clamp-1">
              {title || 'Không có tiêu đề'}
            </h1>
            <div className="flex items-center gap-2 text-xs">
              <span
                className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${
                  data.status === 'PUBLISHED'
                    ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                    : 'bg-yellow-50 text-yellow-800 ring-1 ring-inset ring-yellow-600/20'
                }`}
              >
                {data.status === 'PUBLISHED' ? 'Đã xuất bản' : 'Bản nháp'}
              </span>
              <span className="text-stone-400">|</span>
              <span className="text-stone-500">
                Last updated:{' '}
                {new Date(
                  data.updatedAt || data.createdAt || Date.now(),
                ).toLocaleString('vi-VN')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="danger" onClick={handleDelete} disabled={submitting}>
            Xóa bài viết
          </Button>
          {data.status === 'PUBLISHED' ? (
            <Button
              variant="danger"
              onClick={handleUnpublish}
              disabled={submitting}
            >
              Gỡ bài
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={handlePublish}
              disabled={submitting}
            >
              Xuất bản
            </Button>
          )}

          <Button onClick={handleSave} loading={submitting}>
            Lưu thay đổi
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-[#E5E1DA] bg-white p-6 shadow-sm space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
                Tiêu đề bài viết
              </label>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setFieldErrors((p) => ({ ...p, title: undefined }));
                }}
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
              <TiptapEditor content={html} onChange={setHtml} />
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
            <h3 className="font-semibold text-[#4D0000]">Cấu hình chung</h3>

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
                {categories.map((c) => (
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

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">
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
            </div>
          </div>

          {/* Simple meta info display */}
          <div className="rounded-xl border border-[#E5E1DA] bg-white p-5 shadow-sm space-y-2 text-xs text-stone-500">
            <p>
              <strong>Ngày tạo:</strong>{' '}
              {new Date(data.createdAt || Date.now()).toLocaleString()}
            </p>
            <p>
              <strong>Ngày cập nhật:</strong>{' '}
              {new Date(
                data.updatedAt || data.createdAt || Date.now(),
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
