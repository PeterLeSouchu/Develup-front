import { FrontErrorType } from '../../types';

function FrontError({ error, message }: FrontErrorType) {
  return error && <p className="text-red-600 text-sm">{message}</p>;
}

export default FrontError;
