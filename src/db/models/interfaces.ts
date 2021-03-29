import { Document } from 'mongoose';

export default interface IUser extends Document {
    googleId?: number;
    displayName?: string;
    firstName?: string;
    lastName?: string;
    image?: string;
}