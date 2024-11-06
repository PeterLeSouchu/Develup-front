import { MdErrorOutline } from 'react-icons/md';
import { BackErrorType } from '../../types';

function BackError({ message }: BackErrorType) {
  return (
    message && (
      <div className="flex items-center text-red-700 bg-red-50 border border-red-300 rounded-lg p-4 shadow-sm my-4">
        <MdErrorOutline className="text-red-600 h-5 w-5 mr-2" />
        <p className="text-sm font-medium">{message}</p>
      </div>
    )
  );
}

export default BackError;
