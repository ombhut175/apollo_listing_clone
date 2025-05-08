"use client";

import { Plus } from "lucide-react";

interface FloatingAddButtonProps {
  onClick: () => void;
}

export default function FloatingAddButton({ onClick }: FloatingAddButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed right-6 bottom-6 bg-teal-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-teal-700 transition-colors"
      style={{ zIndex: 9999 }}
      aria-label="Add Doctor"
    >
      <Plus size={24} />
    </button>
  );
} 