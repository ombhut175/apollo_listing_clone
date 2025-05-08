import mongoose, { Document, Schema } from 'mongoose';

export interface DoctorInterface extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  specialization: string;
  degree: string;
  city: string;
  clinicName: string;
  state: string;
  consultationFee: number;
  cashbackAmount: number;
  cashbackTag: string;
  isOnlineAvailable: boolean;
  onlineWaitTimeMinutes: number;
  clinicType: string;
  availabilityStatus: string;
  experience: number;
  fees: number;
  language: string[];
  facility: string[];
  rating?: number;
  reviewCount?: number;
}

const DoctorSchema: Schema<DoctorInterface> = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  degree: { type: String, required: true },
  city: { type: String, required: true },
  clinicName: { type: String, required: true },
  state: { type: String, required: true },
  consultationFee: { type: Number, required: true },
  cashbackAmount: { type: Number, required: false },
  cashbackTag: { type: String, required: false },
  isOnlineAvailable: { type: Boolean, required: true },
  onlineWaitTimeMinutes: { type: Number, required: false },
  clinicType: { type: String, required: true },
  availabilityStatus: { type: String, required: false },
  experience: { type: Number, required: true },
  fees: { type: Number, required: true },
  language: { type: [String], required: true },
  facility: { type: [String], required: true },
  rating: { type: Number, required: false },
  reviewCount: { type: Number, required: false }
});

const DoctorModel =
  (mongoose.models.Doctor as mongoose.Model<DoctorInterface>) ||
  mongoose.model<DoctorInterface>('Doctor', DoctorSchema);

export default DoctorModel;