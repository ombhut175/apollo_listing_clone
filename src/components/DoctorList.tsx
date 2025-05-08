"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, ArrowLeft, ArrowRight, X } from "lucide-react";
import DoctorCard from "./DoctorCard";
import HelpCard from "./HelpCard";
import { useDoctors, FilterParams } from "@/hooks/useDoctors";
import { useAddDoctor, DoctorSubmission } from "@/hooks/useAddDoctor";
import Filters from "./Filters";
import { PageFilteringConstants } from "@/helpers/string_const";
import FloatingAddButton from "./FloatingAddButton";
import { toast } from "react-toastify";
import Loading from "./Loading";
import RichDoctorListing from "./RichDoctorListing";
import React from "react";

function DoctorList() {
  const [activeFilters, setActiveFilters] = useState<FilterParams>({
    [PageFilteringConstants.PAGE]: 1,
    [PageFilteringConstants.LIMIT]: 6
  });
  
  // Fetch doctors using the SWR hook
  const { doctors, pagination, isLoading, isError, mutate } = useDoctors(activeFilters);
  
  // Use the new SWR mutation hook for adding doctors
  const { 
    addDoctor, 
    isLoading: isAddingDoctor, 
    showAddForm, 
    setShowAddForm 
  } = useAddDoctor();
  
  console.log("::: doctors ::: ", doctors);
  console.log("::: pagination ::: ", pagination);
  console.log("::: activeFilters ::: ", activeFilters);

  const handlePageChange = (newPage: number) => {
    setActiveFilters(prev => ({
      ...prev,
      [PageFilteringConstants.PAGE]: newPage
    }));
    // Add toast notification
    toast.info(`Loading page ${newPage}`);
  };

  const handleSortChange = (sortBy: string) => {
    // In a real implementation, this would update sort params
    console.log(`Sorting by: ${sortBy}`);
    toast.info(`Sorting by: ${sortBy}`);
  };

  // Helper function to clear all filters
  const handleClearAll = () => {
    setActiveFilters({
      [PageFilteringConstants.PAGE]: 1,
      [PageFilteringConstants.LIMIT]: 6
    });
    // Add toast notification
    toast.success('All filters have been cleared');
  };
  
  // Make sure newDoctor state is initialized with dummyDoctor
  const dummyDoctor: DoctorSubmission = {
    name: "Dr. Sample Doctor",
    specialization: "General Physician",
    degree: "MBBS, MD",
    city: "Mumbai",
    clinicName: "Sample Clinic",
    state: "Maharashtra",
    consultationFee: 1000,
    cashbackAmount: 100,
    cashbackTag: "10% Cashback",
    isOnlineAvailable: true,
    onlineWaitTimeMinutes: 15,
    clinicType: "Private",
    availabilityStatus: "Available",
    experience: 8,
    fees: 1000,
    language: ["English", "Hindi"],
    facility: ["hospital", "online"],
    rating: 4.7,
    reviewCount: 150
  };
  
  const [newDoctor, setNewDoctor] = useState<DoctorSubmission>(dummyDoctor);
  
  // Reset form when opened to ensure it's fresh
  const openAddForm = () => {
    setNewDoctor(dummyDoctor);
    setShowAddForm(true);
    toast.info('Add new doctor form opened');
  };
  
  // For direct input change handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    
    // Handle number inputs
    if (type === 'number') {
      setNewDoctor({
        ...newDoctor,
        [id]: value === '' ? 0 : parseInt(value, 10)
      });
    } else {
      setNewDoctor({
        ...newDoctor,
        [id]: value
      });
    }
  };
  
  // Handle form submission using SWR mutation
  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Use the addDoctor function from the useAddDoctor hook
      await addDoctor(newDoctor);
      
      // Reset the form data
      setNewDoctor(dummyDoctor);
      
      // Refresh the doctor list after successful addition
      mutate();
    } catch (error) {
      console.error('Error adding doctor:', error);
      // Error is already handled by the hook with toast
    }
  };

  return (
    <div className="container mx-auto px-2 md:px-4 py-8 flex flex-col lg:flex-row gap-8 relative">
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
                    <React.Fragment key={`page-${page}`}>
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
                    </React.Fragment>
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
      
      {/* Use the standalone floating button component */}
      <FloatingAddButton onClick={openAddForm} />
      
      {/* Add Doctor Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
              <h2 className="text-xl font-bold">Add New Doctor</h2>
              <button 
                onClick={() => setShowAddForm(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleAddDoctor} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-bold text-gray-800">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={newDoctor.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="specialization" className="block text-sm font-bold text-gray-800">Specialization</label>
                  <input
                    id="specialization"
                    type="text"
                    value={newDoctor.specialization}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="degree" className="block text-sm font-bold text-gray-800">Degree</label>
                  <input
                    id="degree"
                    type="text"
                    value={newDoctor.degree}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-bold text-gray-800">City</label>
                  <input
                    id="city"
                    type="text"
                    value={newDoctor.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="clinicName" className="block text-sm font-bold text-gray-800">Clinic Name</label>
                  <input
                    id="clinicName"
                    type="text"
                    value={newDoctor.clinicName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="state" className="block text-sm font-bold text-gray-800">State</label>
                  <input
                    id="state"
                    type="text"
                    value={newDoctor.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="consultationFee" className="block text-sm font-bold text-gray-800">Consultation Fee</label>
                  <input
                    id="consultationFee"
                    type="number"
                    value={newDoctor.consultationFee}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="cashbackAmount" className="block text-sm font-bold text-gray-800">Cashback Amount</label>
                  <input
                    id="cashbackAmount"
                    type="number"
                    value={newDoctor.cashbackAmount}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="cashbackTag" className="block text-sm font-bold text-gray-800">Cashback Tag</label>
                  <input
                    id="cashbackTag"
                    type="text"
                    value={newDoctor.cashbackTag}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="isOnlineAvailable" className="block text-sm font-bold text-gray-800">Online Available</label>
                  <select
                    id="isOnlineAvailable"
                    value={newDoctor.isOnlineAvailable ? "true" : "false"}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="onlineWaitTimeMinutes" className="block text-sm font-bold text-gray-800">Online Wait Time (minutes)</label>
                  <input
                    id="onlineWaitTimeMinutes"
                    type="number"
                    value={newDoctor.onlineWaitTimeMinutes}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="clinicType" className="block text-sm font-bold text-gray-800">Clinic Type</label>
                  <select
                    id="clinicType"
                    value={newDoctor.clinicType}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  >
                    <option value="Private">Private</option>
                    <option value="Hospital">Hospital</option>
                    <option value="Government">Government</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="availabilityStatus" className="block text-sm font-bold text-gray-800">Availability Status</label>
                  <select
                    id="availabilityStatus"
                    value={newDoctor.availabilityStatus}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  >
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                    <option value="Away">Away</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="experience" className="block text-sm font-bold text-gray-800">Experience (years)</label>
                  <input
                    id="experience"
                    type="number"
                    value={newDoctor.experience}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="fees" className="block text-sm font-bold text-gray-800">Fees</label>
                  <input
                    id="fees"
                    type="number"
                    value={newDoctor.fees}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md text-gray-800"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2 mt-4">
                <label className="block text-sm font-bold text-gray-800">Language</label>
                <div className="flex flex-wrap gap-3">
                  <label className="flex items-center space-x-2 border p-2 rounded bg-white">
                    <input 
                      type="checkbox" 
                      checked={newDoctor.language?.includes("English")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewDoctor({...newDoctor, language: [...(newDoctor.language || []), "English"]});
                        } else {
                          setNewDoctor({...newDoctor, language: newDoctor.language?.filter(l => l !== "English")});
                        }
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-gray-800">English</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 border p-2 rounded bg-white">
                    <input 
                      type="checkbox" 
                      checked={newDoctor.language?.includes("Hindi")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewDoctor({...newDoctor, language: [...(newDoctor.language || []), "Hindi"]});
                        } else {
                          setNewDoctor({...newDoctor, language: newDoctor.language?.filter(l => l !== "Hindi")});
                        }
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-gray-800">Hindi</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 border p-2 rounded bg-white">
                    <input 
                      type="checkbox" 
                      checked={newDoctor.language?.includes("Tamil")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewDoctor({...newDoctor, language: [...(newDoctor.language || []), "Tamil"]});
                        } else {
                          setNewDoctor({...newDoctor, language: newDoctor.language?.filter(l => l !== "Tamil")});
                        }
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-gray-800">Tamil</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 border p-2 rounded bg-white">
                    <input 
                      type="checkbox" 
                      checked={newDoctor.language?.includes("Telugu")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewDoctor({...newDoctor, language: [...(newDoctor.language || []), "Telugu"]});
                        } else {
                          setNewDoctor({...newDoctor, language: newDoctor.language?.filter(l => l !== "Telugu")});
                        }
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-gray-800">Telugu</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 border p-2 rounded bg-white">
                    <input 
                      type="checkbox" 
                      checked={newDoctor.language?.includes("Marathi")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewDoctor({...newDoctor, language: [...(newDoctor.language || []), "Marathi"]});
                        } else {
                          setNewDoctor({...newDoctor, language: newDoctor.language?.filter(l => l !== "Marathi")});
                        }
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-gray-800">Marathi</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-2 mt-4">
                <label className="block text-sm font-bold text-gray-800">Facility</label>
                <div className="flex gap-3">
                  <label className="flex items-center space-x-2 border p-2 rounded bg-white">
                    <input 
                      type="checkbox" 
                      checked={newDoctor.facility?.includes("hospital")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewDoctor({...newDoctor, facility: [...(newDoctor.facility || []), "hospital"]});
                        } else {
                          setNewDoctor({...newDoctor, facility: newDoctor.facility?.filter(f => f !== "hospital")});
                        }
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-gray-800">Hospital</span>
                  </label>
                  
                  <label className="flex items-center space-x-2 border p-2 rounded bg-white">
                    <input 
                      type="checkbox" 
                      checked={newDoctor.facility?.includes("online")}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setNewDoctor({...newDoctor, facility: [...(newDoctor.facility || []), "online"]});
                        } else {
                          setNewDoctor({...newDoctor, facility: newDoctor.facility?.filter(f => f !== "online")});
                        }
                      }}
                      className="h-4 w-4"
                    />
                    <span className="text-gray-800">Online</span>
                  </label>
                </div>
              </div>
              
              <div className="flex justify-end gap-4 pt-4 mt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAddingDoctor}
                  className={`px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-teal-500 flex items-center justify-center min-w-[120px]`}
                >
                  {isAddingDoctor ? (
                    <>
                      <span className="mr-2">Adding...</span>
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    </>
                  ) : 'Add Doctor'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorList; 