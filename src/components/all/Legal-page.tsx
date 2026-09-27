import { ReactNode } from 'react';
import { useUserStore } from '../../store';

interface LegalPageProps {
  title: string;
  intro: string;
  children: ReactNode;
}

// Shared by public and private layouts, keep dark variants for the dashboard
function LegalPage({ title, intro, children }: LegalPageProps) {
  const { logged } = useUserStore();

  return (
    <div
      className={
        logged
          ? 'mx-auto max-w-3xl py-4'
          : 'mx-auto max-w-3xl px-4 py-14 sm:px-6 md:py-20'
      }
    >
      <div
        className={`rounded-[1.75rem] ${logged ? '' : 'border border-line bg-white2 p-6 sm:p-12'}`}
      >
        <h1 className="font-display text-4xl font-extrabold tracking-[-0.02em] text-ink dark:text-white sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-muted dark:text-white/70">{intro}</p>
        <div className="mt-6 h-1.5 w-14 rounded-full bg-pollen" />
        <div className="mt-10 flex flex-col gap-9 leading-relaxed text-ink/85 dark:text-white/85">
          {children}
        </div>
      </div>
    </div>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 font-display text-xl font-bold text-ink dark:text-white">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default LegalPage;
