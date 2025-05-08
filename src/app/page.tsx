"use client";

import Header from "@/components/Header";
import DoctorList from "@/components/DoctorList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <DoctorList />
    </div>
  );
}
