import React from 'react';
import Loading from './Loading';
import useHydration from '../hooks/useHydration';

type HydrationExampleProps = {
  clientData?: any;
  // Add other props as needed
};

/**
 * Example component demonstrating hydration error prevention
 * Any component that might cause hydration errors should follow this pattern
 */
export default function HydrationExample({ clientData }: HydrationExampleProps) {
  // Use the hydration hook to detect if we're hydrating
  const isHydrating = useHydration();
  
  // During hydration phase, show the loading component
  if (isHydrating) {
    return <Loading />;
  }
  
  // After hydration, show the actual component content
  // Now it's safe to use client-specific data or browser APIs
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Hydrated Component</h2>
      <p>This component is now hydrated and safe to use client-side features.</p>
      
      {/* Example of client-specific data that would cause hydration errors */}
      {clientData && (
        <div className="mt-4">
          <p>Client data loaded successfully!</p>
        </div>
      )}
    </div>
  );
} 