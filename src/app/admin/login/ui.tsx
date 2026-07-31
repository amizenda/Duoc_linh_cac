'use client';

import { useState } from 'react';
import { adminApi } from '@/lib/adminApi';
import {
  Button,
  PasswordEyeIcon,
  PasswordEyeSlashIcon,
} from '@/components/admin';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await adminApi.login({ email, password });
      if (!response?.ok) {
        throw new Error(
          response?.error || 'Đăng nhập thất bại. Vui lòng thử lại.',
        );
      } else {
        window.location.href = '/admin';
      }
    } catch (err: unknown) {
      let message =
        err instanceof Error
          ? err.message
          : 'Đăng nhập thất bại. Vui lòng thử lại.';

      // Dịch các lỗi phổ biến từ Backend sang Tiếng Việt
      if (message === 'Invalid credentials' || message === 'Unauthorized') {
        message = 'Email hoặc mật khẩu không chính xác.';
      } else if (message === 'Account disabled') {
        message = 'Tài khoản này đã bị vô hiệu hóa.';
      } else if (message.includes('Too Many Requests')) {
        message = 'Bạn đã nhập sai quá nhiều lần. Vui lòng đợi 1 phút.';
      }

      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-stone-700">
            Email quản trị
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-stone-900 placeholder-stone-400 focus:border-[#E75739] focus:outline-none focus:ring-1 focus:ring-[#E75739] disabled:bg-stone-50 disabled:text-stone-500"
            placeholder="admin@duoclinhcac.com"
            type="email"
            autoComplete="email"
            disabled={loading}
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-semibold text-stone-700">
            Mật khẩu
          </label>
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              className="w-full rounded-lg border border-stone-200 px-4 py-2.5 pr-10 text-stone-900 placeholder-stone-400 focus:border-[#E75739] focus:outline-none focus:ring-1 focus:ring-[#E75739] disabled:bg-stone-50 disabled:text-stone-500"
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? (
                <PasswordEyeSlashIcon className="h-5 w-5" />
              ) : (
                <PasswordEyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100 flex items-start gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 shrink-0 mt-0.5"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <Button type="submit" variant="secondary" size="lg" loading={loading}>
        ĐĂNG NHẬP HỆ THỐNG
      </Button>
    </form>
  );
}
