import mongoose, { Document, Schema } from 'mongoose';

interface Taxi extends Document {
    number: string;
    model: string;
    capacity: number;
    category: string;
    available: boolean;
}

const taxiSchema = new Schema<Taxi>({
    number: { type: String, required: true,unique: true},
    model: { type: String, required: true},
    capacity: { type: Number, required: true},
    category: { type: String, required: true },
    available: {type: Boolean, required: true},
});

const TaxiCollection = mongoose.model<Taxi>('taxi_collections', taxiSchema);

export default TaxiCollection;
