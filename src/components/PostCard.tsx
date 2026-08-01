import Image from 'next/image';
import Link from 'next/link';
import { Be_Vietnam_Pro } from 'next/font/google';
import type { ContentSummary } from '@/types';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '600', '700', '900'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

type PostCardProps = {
  post: ContentSummary;
  badgeTextColor: string;
  className?: string;
};

export function PostCard({
  post,
  badgeTextColor,
  className = '',
}: PostCardProps) {
  return (
    <Link
      href={`/bai-dang/${post.slug}`}
      className={`group flex flex-col bg-[#F8FEDC] rounded-xl lg:rounded-2xl border border-[#760000]/20 shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${className}`}
    >
      <div className="relative w-full aspect-video overflow-hidden bg-stone-200">
        {post.coverImage?.url ? (
          <Image
            src={post.coverImage.url}
            alt={post.coverAlt || post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-stone-400 text-xs">
            Chưa có ảnh
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 p-4 lg:p-5 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className="px-2.5 py-0.5 rounded-full bg-[#E75739] text-[10px] font-semibold"
            style={{ color: badgeTextColor }}
          >
            {post.category?.name || 'Chung'}
          </span>
          <span className="text-[11px] text-[#760000]/60">
            {post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString('vi-VN')
              : ''}
          </span>
        </div>
        <h3
          className={`${beVietnamPro.className} font-black uppercase text-[15px] lg:text-[16px] text-[#760000] leading-snug line-clamp-2 group-hover:underline`}
        >
          {post.title}
        </h3>
        <p className="text-[13px] text-[#760000]/80 leading-relaxed line-clamp-3 flex-1">
          {post.excerpt || '...'}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2 border-t border-[#760000]/10 text-[11px] text-[#760000]/70">
          <span>Tác giả: {post.authorName || 'Ẩn danh'}</span>
          <span className="font-bold text-[#760000] group-hover:underline">
            Đọc thêm →
          </span>
        </div>
      </div>
    </Link>
  );
}
