import { useEffect } from 'react';
import { useSettingsStore } from '../../store';
import { ErrorComponent } from '../../types';

function Error({ frontError, errorMessage }: ErrorComponent) {
  const { backError, setError } = useSettingsStore();

  useEffect(() => {
    function reinitializeBackError() {
      setError('');
    }
    reinitializeBackError();
  }, [setError]);

  return (
    <>
      {frontError && <p className="text-red-600 text-sm">{errorMessage}</p>}
      {backError && <p className="text-red-600 text-sm">{backError}</p>}
    </>
  );
}

export default Error;
