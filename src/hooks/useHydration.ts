import { useState, useEffect } from 'react';

/**
 * Hook to safely handle hydration in components with client-side only features
 * Returns true when the component is in browser and hydration is complete
 */
export default function useHydration() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
} 