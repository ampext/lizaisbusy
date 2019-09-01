import { useEffect, useState } from 'react';

function useFetch<T>(url, deps): [T, boolean, Error] {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    setLoading(true);

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      }).catch(err => {
        setError(err);
        setLoading(false);
      });
  }, deps);

  return [data, loading, error];
}

export default useFetch;