import { useRef } from "react";

function useDebounce() {
  const ref = useRef<NodeJS.Timeout | null>(null);
  function debounce(action: () => void, delay: number): void {
    if (ref.current) {
      clearTimeout(ref.current);
    }
    ref.current = setTimeout(() => {
      action();
    }, delay);
  }
  return debounce;
}

export default useDebounce;
