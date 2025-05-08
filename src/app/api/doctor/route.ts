import DoctorModel from "@/model/Doctor";
import { DoctorConstants } from "@/helpers/string_const";
import {
  responseBadRequest,
  responseInternalServerError,
  responseSuccessful,
  responseSuccessfulWithData,
} from "@/helpers/responseHelpers";
import { dbConnect } from "@/lib/dbConnect";
import { PageFilteringConstants } from "@/helpers/string_const";


export async function GET(request: Request) {
  await dbConnect();

  console.log("::: GET request ::: ");
  try {
    const { searchParams } = new URL(request.url);
    
    // Get pagination parameters
    const page = searchParams.get(PageFilteringConstants.PAGE) ? 
      parseInt(searchParams.get(PageFilteringConstants.PAGE) as string, 10) : 1;
      
    const limit = searchParams.get(PageFilteringConstants.LIMIT) ? 
      parseInt(searchParams.get(PageFilteringConstants.LIMIT) as string, 10) : 6;
    
    // Calculate pagination values
    const skip = (page - 1) * limit;
    
    // Build filter object
    const filter: any = {};
    
    // Add filters if they exist in query params
    if (searchParams.has(PageFilteringConstants.EXPERIENCE)) {
      const experienceValue = searchParams.get(PageFilteringConstants.EXPERIENCE);
      console.log("Experience filter:", experienceValue);
      
      // Handle experience ranges like "0-5", "6-10", "11-16", "17+"
      if (experienceValue?.includes('-')) {
        const [min, max] = experienceValue.split('-').map(val => parseInt(val, 10));
        filter.experience = { $gte: min };
        if (!isNaN(max)) {
          filter.experience.$lte = max;
        }
      } else if (experienceValue?.includes('+')) {
        const min = parseInt(experienceValue.replace('+', ''), 10);
        filter.experience = { $gte: min };
      } else {
        filter.experience = parseInt(experienceValue as string, 10);
      }
    }
    
    if (searchParams.has(PageFilteringConstants.FEES)) {
      const feesValue = searchParams.get(PageFilteringConstants.FEES);
      console.log("Fees filter:", feesValue);
      
      // Handle fee ranges like "100-500", "500-1000", "1000+"
      if (feesValue?.includes('-')) {
        const [min, max] = feesValue.split('-').map(val => parseInt(val, 10));
        filter.fees = { $gte: min };
        if (!isNaN(max)) {
          filter.fees.$lte = max;
        }
      } else if (feesValue?.includes('+')) {
        const min = parseInt(feesValue.replace('+', ''), 10);
        filter.fees = { $gte: min };
      } else {
        filter.fees = parseInt(feesValue as string, 10);
      }
    }
    
    if (searchParams.has(PageFilteringConstants.LANGUAGE)) {
      // Use MongoDB $in operator to search within the language array
      const languageValue = searchParams.get(PageFilteringConstants.LANGUAGE);
      console.log("Language filter:", languageValue);
      filter.language = languageValue;
    }
    
    if (searchParams.has(PageFilteringConstants.FACILITY)) {
      // Use MongoDB $in operator to search within the facility array
      const facilityValue = searchParams.get(PageFilteringConstants.FACILITY);
      console.log("Facility filter:", facilityValue);
      filter.facility = facilityValue;
    }
    
    console.log("Applied filters:", filter);
    
    // Execute query with pagination and filters
    const doctors = await DoctorModel.find(filter)
      .skip(skip)
      .limit(limit);
    
    console.log("::: doctors ::: ");
    console.log(doctors);
      
    // Get total count for pagination metadata
    const total = await DoctorModel.countDocuments(filter);
    
    return responseSuccessfulWithData({
      message: "Doctors retrieved successfully",
      body: {
        doctors,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error: any) {
    return responseInternalServerError(error.message || "Internal server error");
  }
}


export async function POST(request: Request) {
  await dbConnect();

  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      DoctorConstants.NAME,
      DoctorConstants.SPECIALIZATION,
      DoctorConstants.DEGREE,
      DoctorConstants.CITY,
      DoctorConstants.CLINIC_NAME,
      DoctorConstants.STATE,
      DoctorConstants.CONSULTATION_FEE,
      DoctorConstants.IS_ONLINE_AVAILABLE,
      DoctorConstants.CLINIC_TYPE,
      DoctorConstants.EXPERIENCE,
      DoctorConstants.FEES,
      DoctorConstants.LANGUAGE,
      DoctorConstants.FACILITY,
    ];

    for (const field of requiredFields) {
      if (!body[field] && body[field] !== false && body[field] !== 0) {
        return responseBadRequest(`Missing required field: ${field}`);
      }
    }

    // Create doctor
    const doctor = await DoctorModel.create({
      name: body[DoctorConstants.NAME],
      specialization: body[DoctorConstants.SPECIALIZATION],
      degree: body[DoctorConstants.DEGREE],
      city: body[DoctorConstants.CITY],
      clinicName: body[DoctorConstants.CLINIC_NAME],
      state: body[DoctorConstants.STATE],
      consultationFee: body[DoctorConstants.CONSULTATION_FEE],
      cashbackAmount: body[DoctorConstants.CASHBACK_AMOUNT],
      cashbackTag: body[DoctorConstants.CASHBACK_TAG],
      isOnlineAvailable: body[DoctorConstants.IS_ONLINE_AVAILABLE],
      onlineWaitTimeMinutes: body[DoctorConstants.ONLINE_WAIT_TIME_MINUTES],
      clinicType: body[DoctorConstants.CLINIC_TYPE],
      availabilityStatus: body[DoctorConstants.AVAILABILITY_STATUS],
      experience: body[DoctorConstants.EXPERIENCE],
      fees: body[DoctorConstants.FEES],
      language: body[DoctorConstants.LANGUAGE],
      facility: body[DoctorConstants.FACILITY],
    });

    return responseSuccessful("Doctor added successfully!");
  } catch (error: any) {
    return responseInternalServerError(
      error.message || "Internal server error"
    );
  }
}
