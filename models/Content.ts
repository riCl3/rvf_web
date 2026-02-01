import mongoose, { Schema, model, models } from 'mongoose';

export type ContentType = 'milestone' | 'recent_work' | 'project' | 'contact_info' | 'page_section' | 'gallery_image';
export const CONTENT_TITLES = {
    DONATION_PAGE: 'DonationPage'
};


export interface IContent {
    _id: string;
    type: ContentType;
    title: string;
    description: string;
    // Milestone specific
    year?: number;
    // Recent Work specific
    category?: string;
    image?: string;
    isFeatured?: boolean;
    // Generic metadata for sections/contact (store JSON/Map like structure)
    metadata?: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
    {
        type: {
            type: String,
            required: true,
            enum: ['milestone', 'recent_work', 'project', 'contact_info', 'page_section', 'gallery_image']
        },
        title: { type: String, required: true },
        description: { type: String }, // Made optional in logic, but keeping schema simple. Ideally required for most.
        // Milestone specific
        year: { type: Number },
        // Recent Work specific
        category: { type: String },
        image: { type: String },
        isFeatured: { type: Boolean, default: false },
        // Generic metadata
        metadata: { type: Schema.Types.Mixed },
    },
    { timestamps: true }
);

// Prevent overwriting the model if it's already compiled
const Content = models.Content || model<IContent>('Content', ContentSchema);

export default Content;
