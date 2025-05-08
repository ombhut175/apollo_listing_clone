"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUp, ArrowLeft, ArrowRight } from "lucide-react";
import DoctorCard from "./DoctorCard";
import HelpCard from "./HelpCard";
import { useDoctors, FilterParams } from "@/hooks/useDoctors";
import Filters from "./Filters";
import { PageFilteringConstants } from "@/helpers/string_const";

export default function DoctorList() {
  const [activeFilters, setActiveFilters] = useState<FilterParams>({
    [PageFilteringConstants.PAGE]: 1,
    [PageFilteringConstants.LIMIT]: 6
  });

  // Fetch doctors using the SWR hook
  const { doctors, pagination, isLoading, isError } = useDoctors(activeFilters);
  
  console.log("::: doctors ::: ", doctors);
  console.log("::: pagination ::: ", pagination);
  console.log("::: activeFilters ::: ", activeFilters);

  const handlePageChange = (newPage: number) => {
    setActiveFilters(prev => ({
      ...prev,
      [PageFilteringConstants.PAGE]: newPage
    }));
  };

  const handleSortChange = (sortBy: string) => {
    // In a real implementation, this would update sort params
    console.log(`Sorting by: ${sortBy}`);
  };

  // Helper function to clear all filters
  const handleClearAll = () => {
    setActiveFilters({
      [PageFilteringConstants.PAGE]: 1,
      [PageFilteringConstants.LIMIT]: 6
    });
  };

  return (
    <div className="container mx-auto px-2 md:px-4 py-8 flex flex-col lg:flex-row gap-8">
      <Filters activeFilters={activeFilters} setActiveFilters={setActiveFilters} />
      
      <section className="w-full lg:w-3/4">
        <div className="flex items-center text-xs md:text-sm text-gray-500 mb-4 flex-wrap gap-2 bg-white p-4 rounded-lg shadow-sm">
          <Link href="#" className="hover:text-teal-600 transition-colors">
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link href="#" className="hover:text-teal-600 transition-colors">
            Doctors
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700 font-medium">General Physicians</span>
        </div>

        <div className="mb-6 bg-white p-6 rounded-xl shadow-sm">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800">
            Consult General Physicians Online
          </h1>
          <p className="text-gray-600 text-lg">
            Internal Medicine Specialists ({pagination?.total || 0} doctors)
          </p>
        </div>

        <div className="flex justify-end mb-6">
          <div className="relative w-48 md:w-64">
            <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between bg-white shadow-sm cursor-pointer hover:border-teal-500 transition-colors"
                onClick={() => handleSortChange("relevance")}>
              <span className="font-medium">Relevance</span>
              <ArrowUp className="text-gray-500" size={18} />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="bg-red-50 p-6 rounded-xl text-center">
            <p className="text-red-600">Error loading doctors. Please try again later.</p>
          </div>
        )}

        {/* Doctor Cards */}
        {!isLoading && !isError && (
          <>
            {doctors.length === 0 ? (
              <div className="bg-gray-50 p-8 rounded-xl text-center">
                <p className="text-gray-600 text-lg">No doctors found matching your criteria.</p>
                <button 
                  onClick={handleClearAll}
                  className="mt-4 text-teal-600 font-medium hover:text-teal-700 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {doctors.map((doctor) => (
                  <DoctorCard 
                    key={doctor.id || doctor._id?.toString()} 
                    {...doctor} 
                    experience={typeof doctor.experience === 'string' ? parseInt(doctor.experience, 10) : doctor.experience}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                <button 
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className={`flex items-center p-2 rounded ${
                    pagination.page === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 text-gray-700 hover:bg-teal-100'
                  }`}
                >
                  <ArrowLeft size={16} />
                </button>
                
                {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                  .filter(page => {
                    // Show current page, first, last, and pages around current
                    return page === 1 || 
                           page === pagination.pages || 
                           Math.abs(page - pagination.page) <= 1;
                  })
                  .map((page, index, filteredPages) => (
                    <>
                      {index > 0 && filteredPages[index - 1] !== page - 1 && (
                        <span key={`ellipsis-${page}`} className="flex items-center px-3 py-1 bg-gray-100 rounded">
                          ...
                        </span>
                      )}
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`px-3 py-1 rounded ${
                          pagination.page === page
                            ? 'bg-teal-600 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-teal-100'
                        }`}
                      >
                        {page}
                      </button>
                    </>
                  ))
                }
                
                <button 
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                  className={`flex items-center p-2 rounded ${
                    pagination.page === pagination.pages 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-gray-200 text-gray-700 hover:bg-teal-100'
                  }`}
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        )}

        {/* Help Card */}
        <HelpCard />
      </section>
    </div>
  );
} 