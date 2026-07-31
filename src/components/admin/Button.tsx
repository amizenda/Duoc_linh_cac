import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-admin-orange text-white hover:bg-admin-orange-hover shadow-sm rounded-lg',
  secondary:
    'bg-admin-maroon/90 text-admin-gold hover:bg-admin-maroon-hover shadow-sm rounded-lg',
  outline:
    'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50 rounded-lg',
  danger:
    'border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 rounded-lg',
  ghost: 'text-stone-400 hover:bg-stone-100 hover:text-admin-maroon rounded',
};

const SIZE_CLASSES: Record<Variant, Record<Size, string>> = {
  primary: {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'w-full px-4 py-3 text-sm',
  },
  secondary: {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'w-full px-4 py-3 text-sm',
  },
  outline: {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'w-full px-4 py-3 text-sm',
  },
  danger: {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'w-full px-4 py-3 text-sm',
  },
  ghost: { sm: 'p-1', md: 'p-1.5', lg: 'p-2' },
};

export function buttonVariants({
  variant = 'primary',
  size = 'md',
  className = '',
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
} = {}): string {
  return [
    'inline-flex items-center justify-center gap-2 font-medium transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-admin-orange focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[variant][size],
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`relative overflow-hidden ${buttonVariants({ variant, size, className })}`}
      disabled={disabled || loading}
      {...props}
    >
      <span className={loading ? 'opacity-0' : 'opacity-100'}>{children}</span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      )}
    </button>
  );
}
