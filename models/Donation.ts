import mongoose, { Schema, model, models } from 'mongoose';

export interface IDonation {
    _id: string;
    amount: number;
    phoneNumber: string;
    message?: string;
    status: string;
    createdAt: Date;
}

const DonationSchema = new Schema<IDonation>(
    {
        amount: { type: Number, required: true },
        phoneNumber: { type: String, required: true },
        message: { type: String },
        status: { type: String, default: 'pending' },
        createdAt: { type: Date, default: Date.now },
    },
    { timestamps: false } // Custom createdAt is used, so we can disable or keep timestamps. User asked for specific default.
);

// Prevent overwriting
const Donation = models.Donation || model<IDonation>('Donation', DonationSchema);

export default Donation;
