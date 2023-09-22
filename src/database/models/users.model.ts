import mongoose, { Document, Schema } from 'mongoose';

interface User extends Document {
    first_name: string;
    last_name?: string;
    email: string;
    password: string;
    dob: Date;
    phone: string;
    about?: string;
}

const userSchema = new Schema<User>({
    first_name: { type: String, required: true},
    last_name: { type: String, required: false},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: Date, required: true },
    phone: { type: String, required: true , unique: true},
    about: { type: String, required: false }
});

const UserCollection = mongoose.model<User>('user_collections', userSchema);

export default UserCollection;
