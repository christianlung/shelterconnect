'use client';

import React, { useEffect, useState, type PropsWithChildren } from 'react';

/*
 * Prevents hydration errors by only rendering children on the client side.
 * Useful for components that rely on browser APIs or have different initial states
 * between server and client rendering.
 */
export const ClientOnly: React.FC<PropsWithChildren> = (
  props: PropsWithChildren,
) => {
  const { children } = props;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return children;
};

export default ClientOnly;
