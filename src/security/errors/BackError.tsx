import { BackErrorType } from '../../types';

function BackError({ message }: BackErrorType) {
  return (
    message && (
      <p className="text-red-600 text-md my-4 p-4 border-2 border-red-300 rounded-full">
        {message}
      </p>
    )
  );
}

export default BackError;
