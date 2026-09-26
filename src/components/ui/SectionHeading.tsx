import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface Props {
  /** Bölüm sırası, ör. "01". Editoryal ritim kurar, içerik değeri taşımaz. */
  index: string;
  eyebrow: string;
  title: string;
  /** Başlığın id'si; section aria-labelledby ile buna bağlanır. */
  titleId: string;
  description?: string;
  /** Başlığın yanında duran aksiyon (filtre, bağlantı vb.). */
  aside?: ReactNode;
  className?: string;
}

/** Bütün bölümlerin ortak başlığı: numaralı mono etiket, saç teli çizgi ve büyük başlık. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  titleId,
  description,
  aside,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-14',
        className,
      )}
    >
      <div className="max-w-2xl">
        <p className="mono-label flex items-center gap-3 text-accent">
          <span className="text-accent-dim">{index}</span>
          <span aria-hidden className="h-px w-8 bg-line" />
          <span className="text-muted">{eyebrow}</span>
        </p>
        <h2 id={titleId} className="display-lg mt-5 text-balance text-ink">
          {title}
        </h2>
        {description && <p className="lead mt-5 text-muted">{description}</p>}
      </div>
      {aside && <div className="lg:shrink-0">{aside}</div>}
    </div>
  );
}
