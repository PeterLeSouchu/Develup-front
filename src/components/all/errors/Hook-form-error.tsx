import { HookFormErrorType } from '../../../types';

function HookFormError({ error, message }: HookFormErrorType) {
  return (
    error && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{message}</p>
    )
  );
}

export default HookFormError;
