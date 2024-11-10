import { HookFormErrorType } from '../../../types';

function HookFormError({ error, message }: HookFormErrorType) {
  return error && <p className="text-red-600 text-sm">{message}</p>;
}

export default HookFormError;
