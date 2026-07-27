'use client';

import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import logo from '@/assets/logo/logo-header.png';

const NAV_LINKS = [
  { href: '/chung-benh', label: 'Các chứng bệnh' },
  { href: '/dich-vu', label: 'Sản phẩm - dịch vụ' },
  { href: '/linh-duoc', label: 'Linh dược' },
  { href: '/bai-dang', label: 'Bài đăng' },
  { href: '/lien-he', label: 'Liên hệ' },
];

// The bottom-right bracket is authored as its own mirrored path (rather than
// CSS-rotating the top-left one) so both read the same regardless of
// rotate/transform support. At this icon size a thin stroke is easy to
// misread as "cut off" at a glance — width/height match the viewBox 1:1
// (no downscaling) and the stroke is a bit heavier so the full "L" reads
// clearly rather than looking like a stray curve.
function CornerBracket({
  className,
  mirrored,
}: {
  className?: string;
  mirrored?: boolean;
}) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {mirrored ? (
        <>
          <path
            d="M30 6 L30 23 Q30 30 23 30 L6 30"
            stroke="#D4AF37"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="30" cy="2" r="1.75" fill="#D4AF37" />
          <circle cx="2" cy="30" r="1.75" fill="#D4AF37" />
        </>
      ) : (
        <>
          <path
            d="M2 26 L2 9 Q2 2 9 2 L26 2"
            stroke="#D4AF37"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="2" cy="30" r="1.75" fill="#D4AF37" />
          <circle cx="30" cy="2" r="1.75" fill="#D4AF37" />
        </>
      )}
    </svg>
  );
}

function NavDot() {
  return (
    <span
      className="h-[6px] w-[6px] shrink-0 rotate-45 bg-[#D4AF37]"
      aria-hidden="true"
    />
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 w-screen bg-gradient-to-b from-[#FFFDF2] via-[#F9FFDC] to-[#F3ECC7] z-50">
      <div className="absolute inset-x-0 top-0 h-[80px] lg:h-[105px] border-t-2 border-t-[#D4AF37] border-b-[3px] border-b-[#9A0009]" />

      <CornerBracket className="pointer-events-none absolute top-1.5 left-1.5 hidden lg:block" />
      {/* <CornerBracket
        mirrored
        className="pointer-events-none absolute bottom-1.5 right-1.5 hidden lg:block"
      /> */}

      <div className="relative mx-auto flex h-[80px] lg:h-[105px] w-full max-w-[1440px] items-center px-4 lg:justify-center">
        {/* Mobile Header: Logo + Hamburger */}
        <div className="flex w-full items-center justify-between lg:hidden z-50">
          <Link
            href="/"
            aria-label="Dược Linh Các"
            className="shrink-0"
            onClick={() => setIsOpen(false)}
          >
            <Image
              src={logo}
              alt="Dược Linh Các"
              priority
              className="h-auto w-auto max-h-[50px]"
            />
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#771010] focus:outline-none"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Desktop Nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-4 text-[16px] font-medium uppercase leading-[25px] tracking-wide text-[#771010] lg:flex lg:gap-6"
          style={{ fontFamily: 'var(--font-saira)' }}
        >
          <Link href="/" aria-label="Dược Linh Các" className="shrink-0 mr-2">
            <Image
              src={logo}
              alt="Dược Linh Các"
              priority
              className="h-auto w-auto max-h-[72px]"
            />
          </Link>

          {NAV_LINKS.map((link, index) => {
            const active = isActive(link.href);
            return (
              <Fragment key={link.href}>
                {index > 0 && <NavDot />}
                <Link
                  href={link.href}
                  className={`relative pb-1 transition-colors hover:text-[#5f0c0c] ${
                    active ? 'font-bold text-[#9A0009]' : ''
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {link.label}
                  {active && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#D4AF37]" />
                  )}
                </Link>
              </Fragment>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-x-0 top-[80px] bottom-0 z-40 flex flex-col items-center bg-[#F9FFDC] pt-10 transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav
          className="flex flex-col items-center gap-8 text-[18px] font-bold uppercase text-[#771010]"
          style={{ fontFamily: 'var(--font-saira)' }}
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`relative pb-1 hover:text-[#5f0c0c] ${active ? 'text-[#9A0009]' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {link.label}
                {active && (
                  <span className="absolute -bottom-1 left-1/2 h-[2px] w-6 -translate-x-1/2 bg-[#D4AF37]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
