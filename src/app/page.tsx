"use client";

import Header from "@/components/Header";
import DoctorList from "@/components/DoctorList";
import ToastTester from "@/components/ToastTester";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Header />
      <DoctorList />
      <div className="fixed bottom-4 right-4 z-50">
        <ToastTester 
          className="bg-white shadow-md rounded-lg p-3"
          buttonClassName="px-3 py-1.5 text-sm font-medium text-white rounded"
          showLabel={true}
        />
      </div>
    </div>
  );
}
