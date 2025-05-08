"use client";

type DoctorCardProps = {
  name: string;
  specialty: string;
  image?: string; // Made optional since we're not using it anymore
  experience: string;
  qualifications: string;
  location: string;
  rating: number;
  reviewCount: number;
  price: number;
  cashback?: number;
  isHourDoctor?: boolean;
  availableIn?: string;
};

// Function to generate a consistent color based on name
const getColorFromName = (name: string): string => {
  const colors = [
    "bg-teal-500",
    "bg-amber-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-green-500",
    "bg-red-500",
  ];
  
  // Generate a hash code from the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Use the hash to pick a color
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export default function DoctorCard({
  name,
  specialty,
  experience,
  qualifications,
  location,
  rating,
  reviewCount,
  price,
  cashback,
  isHourDoctor,
  availableIn,
}: DoctorCardProps) {
  // Get the first letter of the name
  const firstLetter = name.charAt(0);
  
  // Get a color based on the name
  const bgColor = getColorFromName(name);
  
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row p-6 gap-4">
        <div className="w-full sm:w-24 h-24 relative flex-shrink-0 mx-auto sm:mx-0">
          <div className={`w-full h-full rounded-lg flex items-center justify-center ${bgColor} text-white font-bold text-4xl uppercase shadow-md`}>
            {firstLetter}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-bold mr-2 text-gray-800">{name}</h3>
            {isHourDoctor && (
              <div className="ml-auto sm:hidden flex items-center bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded">
                DOCTOR OF THE HOUR
              </div>
            )}
          </div>
          <p className="text-gray-600 mb-2">{specialty}</p>
          
          <div className="flex items-center mb-2 text-amber-500">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-4 h-4 ${i < rating ? 'fill-current' : 'text-gray-300 fill-current'}`} 
                viewBox="0 0 24 24"
              >
                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
              </svg>
            ))}
            <span className="ml-1 text-xs text-gray-500">({reviewCount} reviews)</span>
          </div>
          
          <div className="flex items-center mb-2 flex-wrap gap-2">
            <span className="bg-gray-100 text-gray-700 font-medium text-xs px-2 py-1 rounded">{experience}</span>
            <span className="mx-1">•</span>
            <span className="bg-gray-100 text-gray-700 font-medium text-xs px-2 py-1 rounded">{qualifications}</span>
          </div>
          {location && <p className="text-gray-500 text-sm">{location}</p>}
        </div>
        <div className="hidden sm:flex flex-col items-end justify-between gap-3">
          {isHourDoctor && (
            <div className="bg-amber-500 text-white text-xs font-medium px-2 py-1 rounded">
              DOCTOR OF THE HOUR
            </div>
          )}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-gray-800 mr-2">₹{price}</div>
            {cashback && (
              <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded flex items-center">
                <span className="w-3 h-3 bg-amber-500 rounded-full mr-1"></span>
                ₹{cashback} Cashback
              </div>
            )}
          </div>
          <button className="bg-teal-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
            Consult Online
          </button>
          {availableIn && <p className="text-xs text-gray-500 text-center mt-1">Available in {availableIn}</p>}
        </div>
      </div>
      
      {/* Mobile-only bottom section */}
      <div className="sm:hidden flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <div className="text-2xl font-bold text-gray-800 mr-2">₹{price}</div>
          {cashback && (
            <div className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded flex items-center">
              <span className="w-3 h-3 bg-amber-500 rounded-full mr-1"></span>
              ₹{cashback} Cashback
            </div>
          )}
        </div>
        <button className="bg-teal-600 text-white font-medium px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors">
          Consult Online
        </button>
      </div>
      {availableIn && (
        <p className="text-xs text-gray-500 text-center p-2 bg-gray-50 sm:hidden">
          Available in {availableIn}
        </p>
      )}
    </div>
  );
} 