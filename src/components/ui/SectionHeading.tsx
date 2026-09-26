import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface Props {
  eyebrow: string;
  title: string;
  /** Başlığın id'si; section aria-labelledby ile buna bağlanır. */
  titleId: string;
  description?: string;
  /** Başlığın yanında duran aksiyon (filtre, bağlantı vb.). */
  aside?: ReactNode;
  className?: string;
}

/**
 * Bölüm başlığı: küçük bir üst etiket ve serif başlık.
 *
 * Bölüm numarası (01/02/…) yok — sayfadaki bölümler sıralı bir akış değil,
 * numaralamak bilgi taşımıyordu ve sayfaya makine hissi veriyordu.
 */
export function SectionHeading({ eyebrow, title, titleId, description, aside, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between lg:gap-16',
        className,
      )}
    >
      <div className="max-w-[44rem]">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={titleId} className="display-lg mt-4 text-balance text-ink">
          {title}
        </h2>
        {description && <p className="lead mt-5 max-w-[46ch]">{description}</p>}
      </div>
      {aside && <div className="lg:shrink-0">{aside}</div>}
    </div>
  );
}
