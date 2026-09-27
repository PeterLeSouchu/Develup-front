import { ReactNode } from 'react';
import ProjectStack from './Project-stack';

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="px-4 py-10 sm:px-6 md:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[1.75rem] border border-line bg-white2 shadow-[0_30px_80px_-40px_rgba(30,29,27,0.4)] lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-14">
          <h1 className="font-display text-4xl font-extrabold tracking-[-0.02em] text-ink">
            {title}
          </h1>
          <p className="mt-2 text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-8 text-sm text-muted">{footer}</p>
        </div>
        <aside className="hidden flex-col justify-between gap-10 bg-pollen p-12 lg:flex">
          <p className="max-w-xs font-display text-2xl font-bold leading-snug text-ink">
            Des projets web qui cherchent des développeurs, à votre rythme.
          </p>
          <ProjectStack compact />
        </aside>
      </div>
    </div>
  );
}

export default AuthShell;
