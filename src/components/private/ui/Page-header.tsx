import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  action: ReactNode;
}

function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl">
          {title}
        </h1>
        <p className="dv-muted mt-1">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

export default PageHeader;
