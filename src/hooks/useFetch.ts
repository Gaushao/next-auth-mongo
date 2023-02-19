import { useCallback } from "react";
import useAsync from "./useAsync";

const OPTIONS = {
  headers: {
    "Content-Tyoe": "application/json",
  },
};

const useFetch = <D = any, P = any>(
  url: string,
  data?: Record<string, any>,
  options?: RequestInit
) => {
  return useAsync<D, P>(
    useCallback(
      async (p) => {
        try {
          const body =
            p || data
              ? JSON.stringify({ ...(p || {}), ...(data || {}) })
              : undefined;
          const res = await fetch(url, {
            ...OPTIONS,
            ...options,
            body,
          });
          const json = res.json();
          if (!json) throw res.statusText;
          return json;
        } catch (e) {
          throw e;
        }
      },
      [url, options]
    )
  );
};

export default useFetch;
