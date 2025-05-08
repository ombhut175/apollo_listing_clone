'use client';

import React, { useState } from 'react';
import { toastSuccess, toastError, toastInfo, toastWarning } from '@/utils/toast';

interface ToastTesterProps {
  className?: string;
  buttonClassName?: string;
  showLabel?: boolean;
}

/**
 * A component to test if React Toastify is working correctly.
 * Can be integrated with any component by importing and rendering it.
 */
export const ToastTester: React.FC<ToastTesterProps> = ({
  className = '',
  buttonClassName = 'px-3 py-1 text-sm font-medium text-white rounded',
  showLabel = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const testAllToasts = () => {
    toastSuccess('✅ Success: React Toastify is working properly!');
    
    setTimeout(() => {
      toastInfo('ℹ️ Info: You can use different toast types');
    }, 1000);
    
    setTimeout(() => {
      toastWarning('⚠️ Warning: This is a warning toast');
    }, 2000);
    
    setTimeout(() => {
      toastError('❌ Error: This is an error toast');
    }, 3000);
  };

  if (!isVisible) return null;

  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      {showLabel && (
        <p className="text-xs text-gray-500 mb-1">Toast Tester</p>
      )}
      <div className="flex gap-2">
        <button
          onClick={testAllToasts}
          className={`${buttonClassName} bg-blue-500 hover:bg-blue-600`}
        >
          Test Toasts
        </button>
        <button
          onClick={() => setIsVisible(false)}
          className={`${buttonClassName} bg-gray-500 hover:bg-gray-600`}
        >
          Hide
        </button>
      </div>
    </div>
  );
};

/**
 * HOC (Higher-Order Component) to add toast testing capability to any component
 * @param Component The component to enhance with toast testing
 */
export function withToastTester<P>(
  Component: React.ComponentType<P>,
  testerProps?: ToastTesterProps
) {
  return function WithToastTester(props: P) {
    return (
      <div className="relative">
        <Component {...props} />
        <div className="absolute top-2 right-2 z-10">
          <ToastTester 
            showLabel={false} 
            buttonClassName="px-2 py-1 text-xs font-medium text-white rounded"
            {...testerProps} 
          />
        </div>
      </div>
    );
  };
}

export default ToastTester; 