import React from 'react';

/**
 * A reusable loading component that displays a spinning animation
 */
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <p className="mt-4 text-gray-600 font-medium">Loading...</p>
    </div>
  );
} 