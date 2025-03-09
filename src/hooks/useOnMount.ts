import { useEffect, useRef } from 'react';

const useOnMount = (callback: () => void | (() => void)) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return callback();
    }
  }, [callback]);
};

export default useOnMount;
