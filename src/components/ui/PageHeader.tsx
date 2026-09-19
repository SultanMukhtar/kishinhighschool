import { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}

export default function PageHeader({ eyebrow, title, description, icon }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="mb-2 text-[11px] font-bold tracking-[0.35em] text-kishin-red">{eyebrow}</p>
      )}
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-kishin-red/40 bg-kishin-red/10 text-kishin-red">
            {icon}
          </div>
        )}
        <h1 className="font-display text-3xl tracking-[0.06em] text-kishin-white sm:text-4xl">
          {title}
        </h1>
      </div>
      {description && (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-kishin-gray">{description}</p>
      )}
      <div className="mt-5 h-px w-full divider-line" />
    </div>
  );
}
