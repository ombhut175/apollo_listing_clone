import Image from "next/image";

export default function HelpCard() {
  return (
    <div className="mt-6 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 shadow">
      <div className="flex-1">
        <h3 className="text-xl font-medium mb-2">Need help consulting the right doctor?</h3>
        <p className="mb-4 text-blue-50">Call +91-8040245807 to book instantly.</p>
        <button className="bg-white text-blue-900 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-sm">
          Contact Us
        </button>
      </div>
      <div className="w-full md:w-1/3 flex justify-center">
        <Image src="/doctors-group.png" alt="Doctors" width={200} height={120} className="object-contain" />
      </div>
    </div>
  );
} 