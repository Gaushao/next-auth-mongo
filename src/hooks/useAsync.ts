import { useState, useEffect, useCallback } from "react";

const useAsync = <D = any, P = any>(
  callback: (p?: P) => Promise<any>,
  immediate = false
) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<D>();
  const [error, setError] = useState<string>();
  const execute = useCallback(
    (params?: P) => {
      setLoading(true);
      setData(undefined);
      setError(undefined);
      return callback(params)
        .then((response) => {
          setData(response);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setError(typeof error === "string" ? error : `${error}`);
          setLoading(false);
        });
    },
    [callback]
  );
  useEffect(() => {
    if (immediate) execute();
  }, [execute, immediate]);
  return { execute, loading, data, error };
};

export default useAsync;
