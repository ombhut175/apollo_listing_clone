import { useState, useEffect } from 'react';

/**
 * Hook to handle hydration state for components 
 * Prevents hydration errors by indicating when client-side hydration is complete
 * @returns {boolean} - Returns false when component is hydrated (client-side)
 */
export default function useHydration() {
  const [isHydrating, setIsHydrating] = useState(true);
  
  useEffect(() => {
    // This effect runs only on client-side after hydration
    setIsHydrating(false);
  }, []);
  
  return isHydrating;
} 