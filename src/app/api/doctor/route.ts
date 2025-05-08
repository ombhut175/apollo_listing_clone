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
      filter.experience = searchParams.get(PageFilteringConstants.EXPERIENCE);
    }
    
    if (searchParams.has(PageFilteringConstants.FEES)) {
      filter.fees = searchParams.get(PageFilteringConstants.FEES);
    }
    
    if (searchParams.has(PageFilteringConstants.LANGUAGE)) {
      // Partial match for language using regex
      filter.language = { $regex: searchParams.get(PageFilteringConstants.LANGUAGE), $options: 'i' };
    }
    
    if (searchParams.has(PageFilteringConstants.FACILITY)) {
      // Partial match for facility using regex
      filter.facility = { $regex: searchParams.get(PageFilteringConstants.FACILITY), $options: 'i' };
    }
    
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
