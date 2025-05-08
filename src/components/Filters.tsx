"use client";

import { useState } from "react";
import { PageFilteringConstants } from "@/helpers/string_const";
import { FilterParams } from "@/hooks/useDoctors";

// Define filter options for each filter type
const filterOptions = {
  [PageFilteringConstants.EXPERIENCE]: [
    { id: "0-5", label: "0-5 years" },
    { id: "6-10", label: "6-10 years" },
    { id: "11-16", label: "11-16 years" },
    { id: "17+", label: "17+ years" }
  ],
  [PageFilteringConstants.FEES]: [
    { id: "100-500", label: "₹100-500" },
    { id: "500-1000", label: "₹500-1000" },
    { id: "1000+", label: "₹1000+" }
  ],
  [PageFilteringConstants.LANGUAGE]: [
    { id: "English", label: "English" },
    { id: "Hindi", label: "Hindi" },
    { id: "Telugu", label: "Telugu" },
    { id: "Tamil", label: "Tamil" }
  ],
  [PageFilteringConstants.FACILITY]: [
    { id: "hospital", label: "Hospital Visit", defaultChecked: true },
    { id: "online", label: "Online Consult", defaultChecked: true }
  ]
};

interface FiltersProps {
  activeFilters: FilterParams;
  setActiveFilters: (filters: FilterParams) => void;
}

export default function Filters({ activeFilters, setActiveFilters }: FiltersProps) {
  const [showAllExperience, setShowAllExperience] = useState(false);
  const experienceOptions = showAllExperience 
    ? filterOptions[PageFilteringConstants.EXPERIENCE] 
    : filterOptions[PageFilteringConstants.EXPERIENCE].slice(0, 3);

  const handleFilterChange = (filterType: string, value: string, isChecked: boolean) => {
    if (isChecked) {
      // Add the filter while preserving page and limit
      setActiveFilters({
        ...activeFilters,
        [PageFilteringConstants.PAGE]: 1, // Reset to page 1 when filter changes
        [filterType]: value
      });
    } else {
      // Remove the filter while preserving page and limit
      const newFilters = { ...activeFilters };
      delete newFilters[filterType as keyof FilterParams];
      setActiveFilters({
        ...newFilters,
        [PageFilteringConstants.PAGE]: 1 // Reset to page 1 when filter changes
      });
    }
    
    console.log(`Filter ${filterType} changed to ${isChecked ? value : 'none'}`);
  };

  const handleClearAll = () => {
    // Reset all filters but keep pagination settings
    setActiveFilters({
      [PageFilteringConstants.PAGE]: 1,
      [PageFilteringConstants.LIMIT]: activeFilters[PageFilteringConstants.LIMIT] || 6
    });
  };

  const isFilterActive = (filterType: string, value: string) => {
    return activeFilters[filterType as keyof FilterParams] === value;
  };

  return (
    <aside className="w-full lg:w-1/4 mb-8 lg:mb-0 bg-white rounded-xl shadow-sm p-6 h-fit">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-800">Filters</h2>
        <button 
          onClick={handleClearAll}
          className="text-teal-600 text-sm font-medium hover:text-teal-700 transition-colors"
        >
          Clear All
        </button>
      </div>

      <div className="mb-6">
        <button className="w-full bg-teal-50 border border-teal-600 text-teal-600 py-3 rounded-lg hover:bg-teal-100 transition-colors font-medium">
          Show Doctors Near Me
        </button>
      </div>

      {/* Facility filter */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <h3 className="text-base font-medium text-gray-800 mb-3">Mode of Consult</h3>
        <div className="space-y-3">
          {filterOptions[PageFilteringConstants.FACILITY].map((option) => (
            <label key={option.id} className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox text-teal-600 rounded mr-3 h-5 w-5 transition duration-150 ease-in-out" 
                defaultChecked={option.defaultChecked} 
                checked={isFilterActive(PageFilteringConstants.FACILITY, option.id)}
                onChange={(e) => handleFilterChange(PageFilteringConstants.FACILITY, option.id, e.target.checked)}
              />
              <span className="text-gray-800">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience filter */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <h3 className="text-base font-medium text-gray-800 mb-3">Experience (In Years)</h3>
        <div className="space-y-3">
          {experienceOptions.map((option) => (
            <label key={option.id} className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox text-teal-600 rounded mr-3 h-5 w-5 transition duration-150 ease-in-out" 
                checked={isFilterActive(PageFilteringConstants.EXPERIENCE, option.id)}
                onChange={(e) => handleFilterChange(PageFilteringConstants.EXPERIENCE, option.id, e.target.checked)}
              />
              <span className="text-gray-800">{option.label}</span>
            </label>
          ))}
        </div>
        {filterOptions[PageFilteringConstants.EXPERIENCE].length > 3 && (
          <button 
            className="text-teal-600 text-sm font-medium mt-3 hover:text-teal-700 transition-colors"
            onClick={() => setShowAllExperience(!showAllExperience)}
          >
            {showAllExperience ? "Show Less" : "+1 More"}
          </button>
        )}
      </div>

      {/* Fees filter */}
      <div className="mb-6 border-b border-gray-200 pb-6">
        <h3 className="text-base font-medium text-gray-800 mb-3">Fees (In Rupees)</h3>
        <div className="space-y-3">
          {filterOptions[PageFilteringConstants.FEES].map((option) => (
            <label key={option.id} className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox text-teal-600 rounded mr-3 h-5 w-5 transition duration-150 ease-in-out" 
                checked={isFilterActive(PageFilteringConstants.FEES, option.id)}
                onChange={(e) => handleFilterChange(PageFilteringConstants.FEES, option.id, e.target.checked)}
              />
              <span className="text-gray-800">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Language filter */}
      <div className="mb-6">
        <h3 className="text-base font-medium text-gray-800 mb-3">Language</h3>
        <div className="space-y-3">
          {filterOptions[PageFilteringConstants.LANGUAGE].slice(0, 2).map((option) => (
            <label key={option.id} className="flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="form-checkbox text-teal-600 rounded mr-3 h-5 w-5 transition duration-150 ease-in-out" 
                checked={isFilterActive(PageFilteringConstants.LANGUAGE, option.id)}
                onChange={(e) => handleFilterChange(PageFilteringConstants.LANGUAGE, option.id, e.target.checked)}
              />
              <span className="text-gray-800">{option.label}</span>
            </label>
          ))}
        </div>
        {filterOptions[PageFilteringConstants.LANGUAGE].length > 2 && (
          <button className="text-teal-600 text-sm font-medium mt-3 hover:text-teal-700 transition-colors">
            +{filterOptions[PageFilteringConstants.LANGUAGE].length - 2} More
          </button>
        )}
      </div>
    </aside>
  );
} 