import mongoose, { Schema, model, models } from 'mongoose';

export type ContentType = 'milestone' | 'recent_work';

export interface IContent {
    _id: string;
    type: ContentType;
    title: string;
    description: string;
    // Milestone specific
    year?: number;
    // Recent Work specific
    category?: string;
    createdAt: Date;
    updatedAt: Date;
}

const ContentSchema = new Schema<IContent>(
    {
        type: {
            type: String,
            required: true,
            enum: ['milestone', 'recent_work']
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        // Milestone specific
        year: { type: Number },
        // Recent Work specific
        category: { type: String },
    },
    { timestamps: true }
);

// Prevent overwriting the model if it's already compiled
const Content = models.Content || model<IContent>('Content', ContentSchema);

export default Content;
