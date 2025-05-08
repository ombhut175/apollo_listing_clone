'use client';

import React from 'react';
import { toastSuccess, toastError, toastInfo, toastWarning } from '@/utils/toast';

export default function ToastDemo() {
  return (
    <div className="flex flex-col gap-4 p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Toast Notification Demo</h2>
      
      <button 
        onClick={() => toastSuccess('Success! Operation completed.')}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Show Success Toast
      </button>
      
      <button 
        onClick={() => toastError('Error! Something went wrong.')}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Show Error Toast
      </button>
      
      <button 
        onClick={() => toastInfo('Info: This is an informational message.')}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Show Info Toast
      </button>
      
      <button 
        onClick={() => toastWarning('Warning! This action may cause issues.')}
        className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
      >
        Show Warning Toast
      </button>
      
      <button 
        onClick={() => {
          toastInfo('You can customize toast options', { 
            autoClose: 10000,
            position: 'bottom-center'
          });
        }}
        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
      >
        Custom Toast Options
      </button>
    </div>
  );
} 