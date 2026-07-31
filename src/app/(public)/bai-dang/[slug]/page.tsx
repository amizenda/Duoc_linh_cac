import type { Metadata } from 'next';
import { Breadcrumb, Disclaimer, PostCard, RichText } from '@/components';
import { fetchContentDetail, fetchFeaturedContents } from '@/lib/api';
import { ContentSummary } from '@/types';
import { breadcrumbJsonLd, getRequestOrigin, safeJsonLd } from '../../_seo';
import localFont from 'next/font/local';
import { Be_Vietnam_Pro } from 'next/font/google';
import Image from 'next/image';
import bannerImage from '@/assets/banner/banner-bai-dang.png';
import backgroundImage from '@/assets/background/background-baidang.png';
import contentBox from '@/assets/boxes/content-box.png';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  try {
    const content = await fetchContentDetail(slug);
    const title = content.metaTitle || content.title;
    const description = content.metaDescription || content.excerpt || undefined;
    const image = content.coverImage?.url || undefined; // Updated to use coverImage url

    return {
      title,
      description,
      openGraph: image
        ? { title, description, images: [image] }
        : { title, description },
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    return {
      title: 'Bài đăng không tồn tại',
    };
  }
}

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
      path: '../../../../assets/fonts/BigShouldersDisplay-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../../../assets/fonts/BigShouldersStencil_18pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-big-shoulders-display',
  display: 'swap',
});

// Helper for category colors
const CATEGORY_COLORS = ['#F9FFDC', '#FFF9A7', '#D7F9FA', '#FFD6E0'];
function getCategoryColor(index: number) {
  return CATEGORY_COLORS[index % CATEGORY_COLORS.length];
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let content;
  try {
    content = await fetchContentDetail(slug);
  } catch (err) {
    console.error('Failed to fetch content:', err);
    return (
      <div className="min-h-screen pt-32 text-center text-white">
        Không tìm thấy bài viết
      </div>
    );
  }

  // Fetch related posts (random 3 with same category)
  let relatedPosts: ContentSummary[] = [];
  try {
    if (content.category?.slug) {
      // Fetch 4 to account for current post potentially being included
      const posts = await fetchFeaturedContents(content.category.slug, 4);
      // Ensure we don't show current post
      relatedPosts = posts.filter((p) => p.id !== content.id).slice(0, 3);
    }
  } catch (err) {
    console.error('Failed to fetch related posts:', err);
    relatedPosts = [];
  }

  const displayPost = content; // Alias for easier refactoring if needed

  const crumbs = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Bài đăng', href: '/bai-dang' },
    {
      label: displayPost.title,
      href: `/bai-dang/${displayPost.slug}`,
    },
  ];

  const origin = await getRequestOrigin();
  const canonical = `${origin}/bai-dang/${content.slug}`;

  const breadcrumbLd = breadcrumbJsonLd({ origin, items: crumbs });
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.title,
    mainEntityOfPage: canonical,
    datePublished: content.publishedAt ?? undefined,
    dateModified: content.updatedAt ?? undefined,
    image: content.coverImage?.url || undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Dược Linh Các',
    },
  };

  return (
    <div className={`${bigShouldersDisplay.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={safeJsonLd(breadcrumbLd)}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={safeJsonLd(articleLd)}
      />
      <div className="w-full">
        <Image
          src={bannerImage}
          alt="Banner dịch vụ"
          className="w-full h-auto object-cover"
          priority
        />
      </div>
      <article className="relative w-full min-h-screen overflow-hidden bg-[#4D0000]/90 flex flex-col items-center">
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

        {/* Content Box */}
        <div className="relative z-10 box-border flex flex-col items-center w-[90%] xl:w-[1167px] mt-10 md:mt-[224px] pt-10 pb-10 md:pt-[118px] md:pb-[118px] px-4 md:px-0 gap-6 md:gap-[32px]">
          <Image
            src={contentBox}
            alt="Content Box"
            fill
            className="object-fill -z-10"
          />

          <div className="w-full xl:w-[955px] md:mb-[20px]">
            <Breadcrumb items={crumbs} />
          </div>

          {/* Title */}
          <div
            className={`flex items-center justify-center uppercase text-[#BA0B00] w-full xl:w-[955px] text-[24px] md:text-[60.7788px] leading-tight md:leading-[73px] text-center font-semibold`}
            style={{
              fontFamily: 'var(--font-big-shoulders-display)',
              letterSpacing: '-0.03em',
              flexShrink: 0,
            }}
          >
            {displayPost.title}
          </div>

          {/* Metadata */}
          <div className="flex items-center justify-center gap-3 md:gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <span
                className={`text-[#760000] ${beVietnamPro.className} text-[12px] md:text-[14px]`}
              >
                Chuyên mục:
              </span>
              <div className="relative">
                <div className="bg-[#E75739] rounded-[10px] px-3 py-1">
                  <span
                    className={`${beVietnamPro.className} text-[11px] md:text-[12px] font-bold`}
                    style={{ color: getCategoryColor(0) }}
                  >
                    {displayPost.category?.name || 'Sức khỏe'}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-[1px] h-[20px] bg-[#4D0000]/90"></div>
            <div
              className={`text-[#760000] ${beVietnamPro.className} text-[12px] md:text-[14px]`}
            >
              Ngày đăng:{' '}
              {displayPost.publishedAt
                ? new Date(displayPost.publishedAt).toLocaleDateString('vi-VN')
                : ''}
            </div>
            <div className="w-[1px] h-[20px] bg-[#4D0000]/90"></div>
            <div
              className={`text-[#760000] ${beVietnamPro.className} text-[12px] md:text-[14px]`}
            >
              Tác giả: {displayPost.authorName || 'Dược Linh Các'}
            </div>
          </div>

          {/* Body Content */}
          <div
            className={`w-full xl:w-[1029px] text-[#690F0C] ${beVietnamPro.className}`}
          >
            <Disclaimer content={content} />
            <RichText html={content.html} />
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="relative z-10 flex flex-col w-full xl:w-[1167px] mt-10 md:mt-[120px] gap-[30px] pb-[100px] px-4 md:px-0">
            <div
              className="text-[28px] md:text-[40px] font-extrabold uppercase leading-tight md:leading-[48px] text-left pl-[10px]"
              style={{
                fontFamily: 'var(--font-big-shoulders-display)',
                color: '#FFE7B6',
              }}
            >
              CÁC BÀI VIẾT LIÊN QUAN
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {relatedPosts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  badgeTextColor={
                    CATEGORY_COLORS[index % CATEGORY_COLORS.length]
                  }
                />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
