'use client';

import { type ReactNode } from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  labelSuffix?: string;
  error?: string;
  children: ReactNode;
}

export default function FormField({
  id,
  label,
  labelSuffix,
  error,
  children,
}: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block font-mono text-xs uppercase tracking-wider text-[#333333] font-semibold"
        >
          {label}
        </label>
        {labelSuffix && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#888888]">
            [{labelSuffix}]
          </span>
        )}
      </div>
      {children}
      {error && (
        <p
          className="flex items-center gap-1.5 font-mono text-[11px] text-[#E04B2E]"
          role="alert"
          id={`${id}-error`}
        >
          <span className="font-bold">!</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
