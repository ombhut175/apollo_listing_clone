import DoctorModel from "@/model/Doctor";
import { DoctorConstants } from "@/helpers/string_const";
import {
  responseBadRequest,
  responseInternalServerError,
  responseSuccessful,
  responseSuccessfulWithData,
} from "@/helpers/responseHelpers";
import { dbConnect } from "@/lib/dbConnect";


export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
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
