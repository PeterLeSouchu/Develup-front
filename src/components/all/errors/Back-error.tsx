import { MdErrorOutline } from 'react-icons/md';
import { BackErrorType } from '../../../types';

function BackError({ message }: BackErrorType) {
  return (
    message && (
      <div className="my-4 flex items-center rounded-xl border border-red-200 bg-red-50 p-3 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
        <MdErrorOutline className="mr-2 h-5 w-5 shrink-0" />
        <p className="text-sm font-medium">{message}</p>
      </div>
    )
  );
}

export default BackError;
