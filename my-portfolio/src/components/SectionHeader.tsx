import Link from "next/link";

export function SectionHeader({
  title,
  description,
  href,
  linkLabel,
}: {
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
      <div>
        <h2 className="heading-2">{title}</h2>
        {description && <p className="mt-2 max-w-[60ch] text-dim">{description}</p>}
      </div>
      {href && linkLabel && (
        <Link href={href} className="text-link text-dim">
          {linkLabel}
        </Link>
      )}
    </div>
  );
}
