import Link from "next/link";
import { Search, MapPin, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
            <div className="font-bold text-2xl text-teal-600">Apollo 24/7</div>
            <div className="flex items-center ml-8 bg-gray-100 px-3 py-2 rounded-md cursor-pointer hover:bg-gray-200 transition-colors">
              <MapPin className="text-teal-600 mr-2" size={18} />
              <div>
                <p className="text-xs text-gray-600">Select Location</p>
                <div className="flex items-center">
                  <p className="font-medium text-sm">Select Address</p>
                  <ChevronDown className="ml-1" size={14} />
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full md:w-1/3">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={18} />
            </div>
            <input
              type="text"
              placeholder="Search Doctors, Specialities, Conditions etc."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-sm"
            />
          </div>

          <button className="bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors w-full md:w-auto font-medium shadow-sm">
            Login / Sign Up
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="sticky top-[73px] z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 overflow-x-auto">
          <ul className="flex space-x-6 md:space-x-8 whitespace-nowrap">
            {[
              "Buy Medicines",
              "Find Doctors",
              "Lab Tests",
              "Circle Membership",
              "Health Records",
              "Diabetes Reversal",
            ].map((item, index) => (
              <li key={item} className="py-4">
                <Link 
                  href="#" 
                  className={`text-${index === 1 ? 'teal-600 border-b-2 border-teal-600' : 'gray-700 hover:text-teal-600'} font-medium transition-colors text-sm md:text-base`}
                >
                  {item}
                </Link>
              </li>
            ))}
            <li className="py-4">
              <Link href="#" className="text-gray-700 hover:text-teal-600 font-medium flex items-center text-sm md:text-base">
                Buy Insurance <span className="ml-1 text-xs bg-teal-500 text-white px-1.5 py-0.5 rounded">New</span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
} 