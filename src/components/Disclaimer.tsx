export default function Disclaimer() {
  return (
    <div className="border border-[#C8C8C4] bg-white p-4 sm:p-5">
      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#111111] font-bold mb-1.5">
        <span className="text-[#FA5438]">!</span>
        <span>A QUICK REALITY CHECK</span>
      </div>
      <p className="text-xs leading-relaxed text-[#666666]">
        Scan each QR code one by one like a civilized human being. Double check the payee name in your UPI app. If your bank freezes your account because you spammed 20 transfers of ₹1,999 in three minutes, you didn&apos;t get that idea from us.
      </p>
    </div>
  );
}
