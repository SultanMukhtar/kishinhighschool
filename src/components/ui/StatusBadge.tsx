interface StatusBadgeProps {
  status: string;
  variant?: "success" | "danger" | "warning" | "neutral";
}

const variantStyles: Record<string, string> = {
  success: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  danger: "border-kishin-red/40 bg-kishin-red/10 text-kishin-redlight",
  warning: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  neutral: "border-white/15 bg-white/5 text-kishin-gray",
};

function inferVariant(status: string): keyof typeof variantStyles {
  const s = status.toUpperCase();
  if (["ACTIVE", "OPEN", "AVAILABLE", "OPEN FOR LEARNING"].some((k) => s.includes(k))) return "success";
  if (["SUSPENDED", "LOCKED", "RESTRICTED", "INACTIVE"].some((k) => s.includes(k))) return "danger";
  if (["MAINTENANCE", "PENDING"].some((k) => s.includes(k))) return "warning";
  return "neutral";
}

export default function StatusBadge({ status, variant }: StatusBadgeProps) {
  const v = variant ?? inferVariant(status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.15em] ${variantStyles[v]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
