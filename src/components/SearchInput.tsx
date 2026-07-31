'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Be_Vietnam_Pro } from 'next/font/google';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['400', '500', '600', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

export function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    params.set('page', '1');
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <input
      type="text"
      className={`w-full h-11 rounded-lg border border-[#FDE3B1]/30 bg-[#4D0000]/90 text-[#FFF9A7] placeholder-[#FFF9A7]/60 px-4 text-sm outline-none focus:ring-2 focus:ring-[#E75739] focus:border-transparent transition ${beVietnamPro.className}`}
      placeholder="Tìm kiếm bài viết..."
      defaultValue={searchParams.get('query')?.toString()}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
    />
  );
}
