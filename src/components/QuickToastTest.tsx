'use client';

import React from 'react';
import { toastSuccess, toastError, toastInfo, toastWarning } from '@/utils/toast';

interface QuickToastTestProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * A minimal toast testing component that can be quickly added to any component
 * Just drop this component anywhere in your JSX to add a testing button
 */
const QuickToastTest: React.FC<QuickToastTestProps> = ({
  position = 'bottom-right',
  size = 'md',
  className = '',
}) => {
  const positionClasses = {
    'top-right': 'top-2 right-2',
    'top-left': 'top-2 left-2',
    'bottom-right': 'bottom-2 right-2',
    'bottom-left': 'bottom-2 left-2',
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-2.5 text-base',
  };

  const runTest = () => {
    toastSuccess('Toast test successful!');
  };

  return (
    <button
      onClick={runTest}
      title="Test Toast Notifications"
      className={`fixed ${positionClasses[position]} ${sizeClasses[size]} bg-blue-500 hover:bg-blue-600 text-white rounded-full z-50 shadow-md ${className}`}
      aria-label="Test Toast Notifications"
    >
      🔔
    </button>
  );
};

export default QuickToastTest; 