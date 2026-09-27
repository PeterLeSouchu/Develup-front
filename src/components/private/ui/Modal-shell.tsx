/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { ReactNode } from 'react';
import { LuX } from 'react-icons/lu';

interface ModalShellProps {
  title: string;
  onClose: () => void;
  size: 'sm' | 'lg';
  children: ReactNode;
}

// Backdrop closes the modal, clicks inside the panel are stopped (same behaviour as before)
function ModalShell({ title, onClose, size, children }: ModalShellProps) {
  return (
    <div
      aria-label="close modal"
      onKeyDown={onClose}
      role="button"
      tabIndex={0}
      className="fixed inset-0 z-40 flex cursor-default items-center justify-center bg-ink/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`z-50 flex max-h-[90dvh] w-full flex-col overflow-hidden rounded-3xl bg-white2 text-ink shadow-2xl dark:bg-night-surface dark:text-paper ${
          size === 'lg' ? 'max-w-3xl' : 'max-w-md'
        }`}
        onClick={(event) => event.stopPropagation()}
        onKeyDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4 dark:border-night-line">
          <h2 className="font-display text-xl font-bold">{title}</h2>
          <button
            type="button"
            className="dv-icon-btn -mr-2"
            aria-label="Fermer"
            onClick={onClose}
          >
            <LuX />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  );
}

export default ModalShell;
