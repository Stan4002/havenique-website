import { useState, useEffect } from 'react';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>(
apiFunction: () => Promise<T>,
dependencies: any[] = [])
: UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    apiFunction().
    then((result) => {
      if (isMounted) {
        setData(result);
        setLoading(false);
      }
    }).
    catch((err) => {
      if (isMounted) {
        setError(err instanceof Error ? err : new Error('An error occurred'));
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, loading, error };
}