import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // quando digitamos, usamos o useDebounde para ter os resultados apenas
  // 500 milisegundos depois de pararmos de digitar

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    }; // resetar o timeout para evitar o overflow
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
