import useSWR from 'swr';
import { getRequest, handleError } from '@/helpers/ui/handlers';
import { ApiRoutesConstants, PageFilteringConstants } from '@/helpers/string_const';

export type FilterParams = {
  [PageFilteringConstants.PAGE]?: number;
  [PageFilteringConstants.LIMIT]?: number;
  [PageFilteringConstants.EXPERIENCE]?: string;
  [PageFilteringConstants.FEES]?: string;
  [PageFilteringConstants.LANGUAGE]?: string;
  [PageFilteringConstants.FACILITY]?: string;
};

export interface Doctor {
  id?: string;
  _id?: string;
  name: string;
  specialty?: string;
  specialization?: string;
  experience: number | string;
  qualifications?: string;
  degree?: string;
  location?: string;
  city?: string;
  state?: string;
  rating: number;
  reviewCount: number;
  price?: number;
  consultationFee?: number;
  cashback?: number;
  cashbackAmount?: number;
  isHourDoctor?: boolean;
  availableIn?: string;
  language?: string[];
  facility?: string[];
}

export interface ApiResponse {
  success: boolean;
  message: string;
  body: {
    doctors: Doctor[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
}

const fetcher = async (url: string) => {
  try {
    console.log("::: fetcher ::: ");
    console.log(url);
    
    if (!url.startsWith('/')) {
      url = '/' + url;
    }
    
    const response = await getRequest(url);
    console.log("API Response:", response);
    
    // The response from getRequest already has the structure { success, message, body }
    return response;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    handleError(error);
  }
};

export const useDoctors = (filters: FilterParams = {}) => {
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });

  const queryString = queryParams.toString();

  console.log("::: URL ::: ");
  const apiUrl = `${ApiRoutesConstants.DOCTOR}${queryString ? `?${queryString}` : ''}`;
  console.log(apiUrl);
  
  const { data, error, isLoading, mutate } = useSWR<ApiResponse>(apiUrl, fetcher);

  console.log("::: SWR data ::: ", data);
  console.log("::: SWR error ::: ", error);

  return {
    doctors: data?.body?.doctors || [],
    pagination: data?.body?.pagination,
    isLoading,
    isError: error,
    mutate
  };
}; 