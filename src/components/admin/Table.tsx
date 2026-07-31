import { useEffect, useRef } from 'react';
import type {
  HTMLAttributes,
  ReactNode,
  TableHTMLAttributes,
  TdHTMLAttributes,
} from 'react';

export function TableCard({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-admin-border bg-white shadow-sm">
      {children}
    </div>
  );
}

export function TableScroll({ children }: { children: ReactNode }) {
  return <div className="overflow-x-auto">{children}</div>;
}

export function Table(props: TableHTMLAttributes<HTMLTableElement>) {
  return <table className="w-full text-left text-sm" {...props} />;
}

export function TableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-admin-maroon/90 text-admin-gold">{children}</thead>
  );
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="divide-y divide-stone-100">{children}</tbody>;
}

export function TableRow({
  className = '',
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`group transition-colors hover:bg-stone-50 ${className}`}
      {...props}
    />
  );
}

export function TableEmptyRow({
  colSpan,
  children,
}: {
  colSpan: TdHTMLAttributes<HTMLTableCellElement>['colSpan'];
  children: ReactNode;
}) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-6 py-8 text-center text-stone-500">
        {children}
      </td>
    </tr>
  );
}

export function TableLoading({
  children = 'Đang tải dữ liệu...',
}: {
  children?: ReactNode;
}) {
  return <div className="p-8 text-center text-stone-500">{children}</div>;
}

export function TableError({ message }: { message: string }) {
  return (
    <div className="bg-red-50 p-4 text-center text-sm text-red-600">
      Lỗi tải dữ liệu: {message}
    </div>
  );
}

export function TableCheckbox({
  checked,
  indeterminate = false,
  onChange,
  ariaLabel,
}: {
  checked: boolean;
  indeterminate?: boolean;
  onChange: (checked: boolean) => void;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      onClick={(e) => e.stopPropagation()}
      aria-label={ariaLabel}
      className="h-4 w-4 rounded border-stone-300 text-[#4D0000] focus:ring-[#E75739]"
    />
  );
}
