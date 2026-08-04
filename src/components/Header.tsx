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
          className="hidden items-center gap-8 xl:gap-12 text-[16px] font-medium uppercase leading-[25px] tracking-wide text-[#771010] lg:flex"
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
        className={`fixed inset-x-0 top-[80px] bottom-0 z-40 flex flex-col overflow-y-auto bg-[#F9FFDC] transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav
          className="flex flex-col text-[16px] font-bold uppercase text-[#771010]"
          style={{ fontFamily: 'var(--font-saira)' }}
        >
          {NAV_LINKS.map((link, index) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                aria-current={active ? 'page' : undefined}
                style={{
                  transitionDelay: isOpen ? `${80 + index * 60}ms` : '0ms',
                }}
                className={`group flex items-center justify-between border-b border-[#771010]/10 px-6 py-5 transition-all duration-300 ease-out ${
                  isOpen
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-6 opacity-0'
                } ${active ? 'border-l-4 border-l-[#D4AF37] bg-[#771010]/5 text-[#9A0009]' : 'border-l-4 border-l-transparent hover:bg-[#771010]/5'}`}
              >
                <span>{link.label}</span>
                <span
                  aria-hidden="true"
                  className={`text-[#D4AF37] transition-transform group-hover:translate-x-1 ${active ? 'translate-x-1' : ''}`}
                >
                  →
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Contact & Social Block */}
        <div
          style={{
            transitionDelay: isOpen ? `${80 + NAV_LINKS.length * 60}ms` : '0ms',
          }}
          className={`mt-auto flex flex-col items-center gap-4 border-t border-[#D4AF37]/40 px-6 py-8 transition-all duration-300 ease-out ${
            isOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <a
            href="tel:0366659999"
            className="text-[15px] font-semibold text-[#771010]"
            style={{ fontFamily: 'var(--font-saira)' }}
          >
            Tư vấn: 0366659999
          </a>
          <a
            href="mailto:duoclinhcac@gmail.com"
            className="text-[13px] text-[#771010]/70"
          >
            duoclinhcac@gmail.com
          </a>

          <div className="mt-2 flex items-center gap-5 text-[#771010]">
            <a href="#" aria-label="Facebook">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M21 7.2c-.6.3-1.2.4-1.9.5.7-.4 1.2-1 1.4-1.8-.6.4-1.3.7-2.1.9A3.3 3.3 0 0 0 12.8 8c0 .3 0 .6.1.9-2.7-.1-5.1-1.4-6.8-3.4-.3.5-.4 1-.4 1.6 0 1.1.6 2.1 1.5 2.7-.5 0-1-.2-1.5-.4v.1c0 1.6 1.2 2.9 2.7 3.2-.3.1-.6.1-.9.1-.2 0-.4 0-.6-.1.4 1.4 1.7 2.4 3.2 2.4A6.6 6.6 0 0 1 3 18.4 9.3 9.3 0 0 0 8 19.9c6 0 9.3-5 9.3-9.3v-.4c.7-.4 1.2-1 1.7-1.6z" />
              </svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 4.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM18 6.5a.8.8 0 1 1-.8-.8.8.8 0 0 1 .8.8z" />
              </svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M6.9 6.8a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.1 21h3.6V9H3.1v12zM9 9h3.4v1.6h.1c.5-.9 1.7-1.9 3.6-1.9 3.8 0 4.5 2.5 4.5 5.7V21H17V15c0-1.4 0-3.1-1.9-3.1-1.9 0-2.2 1.5-2.2 3V21H9V9z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
