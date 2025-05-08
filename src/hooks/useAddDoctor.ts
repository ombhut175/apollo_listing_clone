import { useState } from 'react';
import useSWRMutation from 'swr/mutation';
import { Doctor } from './useDoctors';
import { DoctorConstants } from '@/helpers/string_const';
import { toastSuccess, toastError } from '@/utils/toast';

// Create a type for the doctor submission data
export type DoctorSubmission = Omit<Doctor, 'id' | '_id'> & {
  clinicName?: string;
  cashbackTag?: string;
  isOnlineAvailable?: boolean;
  onlineWaitTimeMinutes?: number;
  clinicType?: string;
  availabilityStatus?: string;
  fees?: number;
};

/**
 * Helper function to format the doctor data for API submission
 */
const formatDoctorForSubmission = (doctor: DoctorSubmission) => ({
  [DoctorConstants.NAME]: doctor.name,
  [DoctorConstants.SPECIALIZATION]: doctor.specialization,
  [DoctorConstants.DEGREE]: doctor.degree,
  [DoctorConstants.CITY]: doctor.city,
  [DoctorConstants.CLINIC_NAME]: doctor.clinicName,
  [DoctorConstants.STATE]: doctor.state,
  [DoctorConstants.CONSULTATION_FEE]: doctor.consultationFee,
  [DoctorConstants.CASHBACK_AMOUNT]: doctor.cashbackAmount,
  [DoctorConstants.CASHBACK_TAG]: doctor.cashbackTag,
  [DoctorConstants.IS_ONLINE_AVAILABLE]: doctor.isOnlineAvailable,
  [DoctorConstants.ONLINE_WAIT_TIME_MINUTES]: doctor.onlineWaitTimeMinutes,
  [DoctorConstants.CLINIC_TYPE]: doctor.clinicType,
  [DoctorConstants.AVAILABILITY_STATUS]: doctor.availabilityStatus,
  [DoctorConstants.EXPERIENCE]: doctor.experience,
  [DoctorConstants.FEES]: doctor.fees,
  [DoctorConstants.LANGUAGE]: doctor.language,
  [DoctorConstants.FACILITY]: doctor.facility,
});

/**
 * The actual fetcher function that will be used by SWR Mutation
 */
const addDoctorFetcher = async (url: string, { arg }: { arg: DoctorSubmission }) => {
  const formattedData = formatDoctorForSubmission(arg);
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formattedData),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add doctor');
  }
  
  return response.json();
};

/**
 * Hook for adding a new doctor with SWR Mutation
 */
export const useAddDoctor = () => {
  // This state tracks the visibility of the add form modal
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Initialize the SWR mutation
  const { 
    trigger, 
    isMutating, 
    error, 
    data, 
    reset 
  } = useSWRMutation('/api/doctor', addDoctorFetcher);
  
  /**
   * Function to add a new doctor
   */
  const addDoctor = async (doctorData: DoctorSubmission) => {
    try {
      // Execute the mutation
      const result = await trigger(doctorData);
      
      // Show success message
      toastSuccess('Doctor added successfully!');
      
      // Close the form
      setShowAddForm(false);
      
      return result;
    } catch (error) {
      // Show error message
      if (error instanceof Error) {
        toastError(`Error: ${error.message}`);
      } else {
        toastError('Failed to add doctor. Please try again.');
      }
      
      throw error;
    }
  };
  
  return {
    addDoctor,
    isLoading: isMutating,
    error,
    data,
    reset,
    showAddForm,
    setShowAddForm
  };
};

export default useAddDoctor; 