'use client';

import { useEffect, useState } from 'react';
import { adminApi } from '@/lib/adminApi';
import { Button, useToast, XMarkIcon } from '@/components/admin';

export function SettingsPage() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [globalDisclaimerEnabled, setGlobalDisclaimerEnabled] = useState(false);
  const [globalDisclaimerText, setGlobalDisclaimerText] = useState('');
  const [homeBannerTitle, setHomeBannerTitle] = useState('');
  const [homeBannerSubtitle, setHomeBannerSubtitle] = useState('');
  const [homeBannerImageId, setHomeBannerImageId] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    let cancelled = false;
    adminApi
      .getSettings()
      .then((res) => {
        if (cancelled) return;
        setGlobalDisclaimerEnabled(res.globalDisclaimerEnabled);
        setGlobalDisclaimerText(res.globalDisclaimerText ?? '');
        setHomeBannerTitle(res.homeBannerTitle ?? '');
        setHomeBannerSubtitle(res.homeBannerSubtitle ?? '');
        setHomeBannerImageId(res.homeBannerImageId ?? '');
      })
      .catch((e) => {
        if (!cancelled) {
          toast.show(
            e instanceof Error ? e.message : 'Không tải được cài đặt',
            'error',
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function onSave() {
    setSaving(true);
    try {
      await adminApi.updateSettings({
        globalDisclaimerEnabled,
        globalDisclaimerText: globalDisclaimerText || null,
        homeBannerTitle: homeBannerTitle || null,
        homeBannerSubtitle: homeBannerSubtitle || null,
        homeBannerImageId: homeBannerImageId || null,
      });
      toast.show('Đã lưu cài đặt');
    } catch (e) {
      toast.show(e instanceof Error ? e.message : 'Lưu thất bại', 'error');
    } finally {
      setSaving(false);
    }
  }

  async function onUploadBanner(file: File) {
    try {
      if (file.size > 5 * 1024 * 1024) throw new Error('File quá lớn (>5MB)');

      const formData = new FormData();
      formData.append('file', file);
      const res = (await adminApi.uploadMedia(formData)) as {
        id: string;
        url: string;
      };

      if (!res?.id) throw new Error('Upload succeeded but no ID returned');
      setHomeBannerImageId(res.id);
      setPreviewUrl(res.url);
    } catch (err: unknown) {
      toast.show(
        err instanceof Error ? err.message || 'Upload failed' : 'Upload failed',
        'error',
      );
    }
  }

  if (loading) {
    return <div className="p-8 text-center text-stone-500">Đang tải...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#4D0000]">
            Cài đặt hệ thống
          </h1>
          <p className="text-sm text-stone-600">
            Cấu hình cảnh báo y tế và banner trang chủ
          </p>
        </div>
        <Button onClick={onSave} loading={saving}>
          Lưu cài đặt
        </Button>
      </div>

      {/* Cảnh báo y tế */}
      <div className="rounded-xl border border-[#E5E1DA] bg-white p-6 shadow-sm space-y-4">
        <h3 className="font-semibold text-[#4D0000]">
          Cảnh báo y tế toàn site
        </h3>
        <label className="flex items-center gap-2 text-sm text-stone-700">
          <input
            type="checkbox"
            checked={globalDisclaimerEnabled}
            onChange={(e) => setGlobalDisclaimerEnabled(e.target.checked)}
            className="h-4 w-4 accent-[#4D0000]"
          />
          Bật cảnh báo y tế mặc định
        </label>
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">
            Nội dung cảnh báo
          </label>
          <textarea
            value={globalDisclaimerText}
            onChange={(e) => setGlobalDisclaimerText(e.target.value)}
            rows={3}
            disabled={!globalDisclaimerEnabled}
            placeholder="VD: Thông tin chỉ mang tính tham khảo, không thay thế tư vấn y khoa."
            className="w-full rounded-lg border-stone-200 px-3 py-2 text-sm focus:border-[#4D0000] focus:ring-[#4D0000] disabled:bg-stone-50 disabled:text-stone-400"
          />
        </div>
      </div>

      {/* Banner trang chủ */}
      <div className="rounded-xl border border-[#E5E1DA] bg-white p-6 shadow-sm space-y-4">
        <h3 className="font-semibold text-[#4D0000]">Banner trang chủ</h3>
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">
            Tiêu đề banner
          </label>
          <input
            value={homeBannerTitle}
            onChange={(e) => setHomeBannerTitle(e.target.value)}
            placeholder="Nhập tiêu đề banner trang chủ..."
            className="w-full rounded-lg border-stone-200 py-2 text-sm focus:border-[#4D0000] focus:ring-[#4D0000]"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">
            Phụ đề banner
          </label>
          <input
            value={homeBannerSubtitle}
            onChange={(e) => setHomeBannerSubtitle(e.target.value)}
            placeholder="Nhập phụ đề banner trang chủ..."
            className="w-full rounded-lg border-stone-200 py-2 text-sm focus:border-[#4D0000] focus:ring-[#4D0000]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-stone-700">
            Ảnh banner
          </label>
          <div className="flex flex-col gap-3">
            {previewUrl && (
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-stone-200 bg-stone-50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    setHomeBannerImageId('');
                    setPreviewUrl('');
                  }}
                  className="absolute top-2 right-2 p-1 bg-white/80 rounded-full hover:bg-white text-red-600"
                  title="Xóa ảnh"
                >
                  <XMarkIcon className="w-4 h-4" />
                </button>
              </div>
            )}

            {homeBannerImageId && !previewUrl && (
              <p className="text-xs text-stone-400">
                Đã có ảnh banner (tải ảnh mới bên dưới để xem trước và thay
                thế).
              </p>
            )}

            <div className="flex gap-2">
              <input
                type="file"
                id="banner-upload"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onUploadBanner(file);
                }}
              />
              <label
                htmlFor="banner-upload"
                className="flex-1 cursor-pointer rounded-lg border border-dashed border-stone-300 px-4 py-3 text-center text-sm text-stone-600 hover:border-[#4D0000] hover:bg-stone-50 transition-colors"
              >
                <span className="font-medium text-[#4D0000]">Tải ảnh lên</span>{' '}
                hoặc kéo thả vào đây
                <p className="text-xs text-stone-400 mt-1">
                  PNG, JPG, WEBP (Max 5MB)
                </p>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
