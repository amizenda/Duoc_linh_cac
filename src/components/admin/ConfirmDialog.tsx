'use client';

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';
import { Button } from './Button';

type ConfirmOptions = {
  danger?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
};

type ConfirmFn = (
  message: string,
  options?: ConfirmOptions,
) => Promise<boolean>;

type ConfirmState = {
  message: string;
  options: ConfirmOptions;
  resolve: (value: boolean) => void;
};

const ConfirmContext = createContext<ConfirmFn | null>(null);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<ConfirmState | null>(null);

  const confirmAction = useCallback<ConfirmFn>((message, options = {}) => {
    return new Promise<boolean>((resolve) => {
      setState({ message, options, resolve });
    });
  }, []);

  const settle = (value: boolean) => {
    state?.resolve(value);
    setState(null);
  };

  return (
    <ConfirmContext.Provider value={confirmAction}>
      {children}
      {state && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-lg bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <p className="p-6 text-sm text-stone-700">{state.message}</p>
            <div className="flex justify-end gap-2 rounded-b-lg border-t border-stone-100 bg-stone-50 px-6 py-4">
              <Button variant="outline" onClick={() => settle(false)}>
                {state.options.cancelLabel ?? 'Hủy'}
              </Button>
              <Button
                variant={state.options.danger ? 'danger' : 'secondary'}
                onClick={() => settle(true)}
              >
                {state.options.confirmLabel ?? 'Xác nhận'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmFn {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return ctx;
}
