interface RecipientSummaryProps {
  accountHolder: string;
  upiId: string;
}

export default function RecipientSummary({
  accountHolder,
  upiId,
}: RecipientSummaryProps) {
  return (
    <div className="border border-[var(--color-border)] bg-[#F4F4F2] p-4">
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#888888]">
            BENEFICIARY
          </span>
        </div>
        <p className="truncate font-display text-sm font-bold text-[#111111] mt-0.5">
          {accountHolder}
        </p>
        <p className="truncate font-mono text-xs text-[#555555]">
          {upiId}
        </p>
      </div>
    </div>
  );
}
