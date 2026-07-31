import type { Metadata } from 'next';
import { Be_Vietnam_Pro } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local';
import bannerImage from '@/assets/banner/banner-bai-dang.png';
import backgroundImage from '@/assets/background/background-baidang.png';
import titleBanner from '@/assets/banner/title-banner.png';
import { AutoScroll, PostCard, SearchInput } from '@/components';
import {
  fetchCategories,
  fetchContentList,
  fetchFeaturedContents,
} from '@/lib/api';
import type { Category } from '@/types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Bài đăng',
  description: 'Danh sách bài đăng.',
};

// 2. Cấu hình font
const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

const bigShouldersDisplay = localFont({
  src: [
    {
      path: '../../../assets/fonts/BigShouldersDisplay-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../assets/fonts/BigShouldersStencil_18pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-big-shoulders-display',
  display: 'swap',
});

const ITEMS_PER_PAGE = 6;

const CATEGORY_COLORS = ['#F9FFDC', '#FFF9A7', '#D7F9FA', '#FFD6E0'];

export default async function PostListPage(props: {
  searchParams: Promise<{ page?: string; query?: string; category?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || '';
  const categorySlug = searchParams?.category || '';

  const [categories, contentRes, featuredPosts] = await Promise.all([
    fetchCategories().catch((err) => {
      console.error('Failed to load categories', err);
      return [] as Category[];
    }),
    fetchContentList({
      page: currentPage,
      pageSize: ITEMS_PER_PAGE,
      q: query,
      category: categorySlug,
    }).catch((err) => {
      console.error('Failed to load contents', err);
      return { items: [], total: 0, page: 1, pageSize: ITEMS_PER_PAGE };
    }),
    fetchFeaturedContents().catch((err) => {
      console.error('Failed to load featured contents', err);
      return [];
    }),
  ]);

  const posts = contentRes.items;
  const pageSize = contentRes.pageSize || ITEMS_PER_PAGE;
  const totalPages = Math.ceil(contentRes.total / pageSize);

  const buildPageHref = (page: number) => {
    const params = new URLSearchParams();
    if (query) params.set('query', query);
    if (categorySlug) params.set('category', categorySlug);
    params.set('page', page.toString());
    return `?${params.toString()}`;
  };

  const renderPaginationLinks = () => {
    if (totalPages <= 1) return null;
    const links = [];

    const createLink = (page: number) => {
      const isActive = page === currentPage;
      return (
        <Link
          key={page}
          href={buildPageHref(page)}
          scroll={false}
          className={`w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-full text-[14px] lg:text-[16px] font-bold transition-colors ${
            isActive
              ? 'bg-[#E75739] text-[#F8FEDC]'
              : 'text-[#760000] hover:bg-[#760000]/10'
          }`}
          style={{ fontFamily: 'var(--font-big-shoulders-display)' }}
        >
          {page}
        </Link>
      );
    };

    const renderEllipsis = (key: string) => (
      <span
        key={key}
        className="w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center text-[14px] lg:text-[16px] font-bold text-[#760000]/60"
        style={{ fontFamily: 'var(--font-big-shoulders-display)' }}
      >
        ...
      </span>
    );

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        links.push(createLink(i));
      }
    } else {
      // Always show first page
      links.push(createLink(1));

      if (currentPage > 3) {
        links.push(renderEllipsis('start-ellipsis'));
      }

      // Show current page range
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage === 1) end = Math.min(totalPages - 1, start + 2);
      if (currentPage === totalPages) start = Math.max(2, end - 2);

      for (let i = start; i <= end; i++) {
        links.push(createLink(i));
      }

      if (currentPage < totalPages - 2) {
        links.push(renderEllipsis('end-ellipsis'));
      }

      // Always show last page
      links.push(createLink(totalPages));
    }

    return links;
  };

  return (
    <div className="">
      <AutoScroll />
      <div className="w-full">
        <Image
          src={bannerImage}
          alt="Banner bài đăng"
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      <section
        id="post-list-top"
        className="relative w-full overflow-hidden bg-[#4D0000]/90"
      >
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover object-center pointer-events-none opacity-100"
          style={{
            maskImage:
              'linear-gradient(to bottom, black 95%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 95%, transparent 100%)',
          }}
          priority
        />

        <div className="relative z-10 mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-10 py-10 lg:py-16 flex flex-col items-center gap-8 lg:gap-10">
          {/* Title Banner */}
          <div className="relative w-full max-w-[400px] lg:max-w-[569px] mx-auto aspect-[569/320] flex items-center justify-center p-6">
            <Image
              src={titleBanner}
              alt="Title Banner"
              fill
              className="object-contain -z-10"
              priority
            />
            <h1
              className={`${bigShouldersDisplay.className} text-[28px] lg:text-[32px] text-center uppercase leading-tight mr-2 lg:mr-4`}
              style={{
                fontWeight: 600,
                letterSpacing: '-0.03em',
                color: '#FDE3B1',
              }}
            >
              BÀI ĐĂNG
            </h1>
          </div>

          {/* Content Panel */}
          <div className="w-full rounded-2xl lg:rounded-3xl bg-[#F8FEDC] border border-[#760000]/25 shadow-[0_10px_30px_rgba(0,0,0,0.25)] p-4 sm:p-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
            {/* Search + Category tabs */}
            <div
              className={`flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between ${beVietnamPro.className}`}
            >
              <div className="w-full sm:max-w-xs">
                <SearchInput />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isSelected = category.slug === categorySlug;
                  const params = new URLSearchParams();
                  if (!isSelected) params.set('category', category.slug);
                  if (query) params.set('query', query);
                  return (
                    <Link
                      key={category.id}
                      href={`?${params.toString()}`}
                      scroll={false}
                      className={`px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors ${
                        isSelected
                          ? 'bg-[#E75739] text-[#F8FEDC]'
                          : 'bg-[#760000]/10 text-[#AF0000] hover:bg-[#760000]/20'
                      }`}
                    >
                      {category.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Featured posts */}
            {featuredPosts.length > 0 && (
              <div
                className={`flex flex-col gap-3 border-t border-[#760000]/10 pt-6 ${beVietnamPro.className}`}
              >
                <h2 className="uppercase font-black text-[14px] text-[#AF0000]">
                  Bài viết nổi bật
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {featuredPosts.slice(0, 3).map((post) => (
                    <Link
                      key={post.id}
                      href={`/bai-dang/${post.slug}`}
                      className="group flex items-center gap-3 rounded-lg border border-[#760000]/15 bg-white/40 p-2 hover:bg-white/70 transition-colors"
                    >
                      <div className="relative w-14 h-14 shrink-0 rounded-md overflow-hidden bg-stone-200">
                        {post.coverImage?.url && (
                          <Image
                            src={post.coverImage.url}
                            alt={post.coverAlt || post.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                          />
                        )}
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-[12px] font-bold text-[#AF0000] line-clamp-2 leading-snug group-hover:underline">
                          {post.title}
                        </span>
                        <span className="text-[11px] text-[#760000]/70 italic">
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString(
                                'vi-VN',
                              )
                            : ''}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Post grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 border-t border-[#760000]/10 pt-6">
              {posts.length > 0 ? (
                posts.map((post, index) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    badgeTextColor={
                      CATEGORY_COLORS[index % CATEGORY_COLORS.length]
                    }
                  />
                ))
              ) : (
                <p
                  className={`col-span-full text-center text-[#760000]/70 py-10 ${beVietnamPro.className}`}
                >
                  Không tìm thấy bài viết phù hợp.
                </p>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav
                aria-label="Phân trang"
                className={`flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-[#760000]/15 ${beVietnamPro.className}`}
              >
                {currentPage > 1 && (
                  <Link
                    href={buildPageHref(currentPage - 1)}
                    scroll={false}
                    className="px-3 py-2 text-[14px] font-bold text-[#760000] hover:underline"
                  >
                    ‹ Trang trước
                  </Link>
                )}
                <div className="flex items-center gap-1">
                  {renderPaginationLinks()}
                </div>
                {currentPage < totalPages && (
                  <Link
                    href={buildPageHref(currentPage + 1)}
                    scroll={false}
                    className="px-3 py-2 text-[14px] font-bold text-[#760000] hover:underline"
                  >
                    Trang sau ›
                  </Link>
                )}
              </nav>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
