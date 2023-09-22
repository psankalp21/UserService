import mongoose, { Document, Schema } from 'mongoose';

interface Driver extends Document {
    name: string;
    email: string;
    password?: string;
    dob: Date;
    phone: string;
    available?: boolean
}

const driverSchema = new Schema<Driver>({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    phone: { type: String, required: true , unique: true},
    available: { type: Boolean , default:false , required:false}
});

const DriverCollection = mongoose.model<Driver>('driver_collections', driverSchema);

export default DriverCollection;
