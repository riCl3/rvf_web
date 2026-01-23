'use server'

import dbConnect from '@/lib/mongodb'
import Content, { IContent } from '@/models/Content'
import Donation, { IDonation } from '@/models/Donation'
import { revalidatePath } from 'next/cache'
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// Helper to check authentication
async function checkAuth() {
    const session = await getServerSession(authOptions);
    if (!session) {
        throw new Error("Unauthorized access denied.");
    }
}

// --- milestones ---
export async function getMilestones() {
    await dbConnect()
    const milestones = await Content.find({ type: 'milestone' }).sort({ year: -1 }).lean()
    // Convert _id to string to pass to client components if needed, or return as is for server components
    return JSON.parse(JSON.stringify(milestones)) as IContent[]
}

export async function addMilestone(formData: FormData) {
    await checkAuth(); // New Security Layer
    await dbConnect()

    const year = formData.get('year')
    const title = formData.get('title')
    const description = formData.get('description')

    if (!year || !title || !description) {
        throw new Error('Missing required fields')
    }

    await Content.create({
        type: 'milestone',
        year: Number(year),
        title,
        description,
    })

    revalidatePath('/admin')
    revalidatePath('/roadmap')
    revalidatePath('/')
}

// --- recent works ---
export async function getRecentWorks() {
    await dbConnect()
    const works = await Content.find({ type: 'recent_work' }).sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(works)) as IContent[]
}

export async function getFeaturedWorks() {
    await dbConnect()
    const works = await Content.find({ type: 'recent_work', isFeatured: true }).sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(works)) as IContent[]
}

export async function addRecentWork(formData: FormData) {
    await checkAuth(); // New Security Layer
    await dbConnect()

    const title = formData.get('title')
    const category = formData.get('category')
    const description = formData.get('description')
    const image = formData.get('image') // Image URL
    const isFeatured = formData.get('isFeatured') === 'on'

    if (!title || !category || !description) {
        throw new Error('Missing required fields')
    }

    await Content.create({
        type: 'recent_work',
        title,
        category,
        description,
        image,
        isFeatured
    })

    revalidatePath('/admin')
    revalidatePath('/')
}

export async function toggleFeatured(id: string, currentStatus: boolean) {
    await checkAuth(); // New Security Layer
    await dbConnect()
    await Content.findByIdAndUpdate(id, { isFeatured: !currentStatus })
    revalidatePath('/admin')
    revalidatePath('/')
}

// --- generic delete ---
export async function deleteContent(id: string) {
    await checkAuth(); // New Security Layer
    await dbConnect()
    await Content.findByIdAndDelete(id)
    revalidatePath('/admin')
    revalidatePath('/roadmap')
    revalidatePath('/')
}

// --- page sections & contact info ---

// Fetch a specific page section by title (used as key, e.g., 'Hero', 'About')
export async function getPageSection(sectionTitle: string) {
    await dbConnect()
    const section = await Content.findOne({ type: 'page_section', title: sectionTitle }).lean()
    return JSON.parse(JSON.stringify(section))
}

// Update or Create a page section
// Expects generic metadata object
export async function updatePageSection(formData: FormData) {
    await checkAuth(); // New Security Layer
    await dbConnect()

    const sectionTitle = formData.get('sectionTitle') as string
    if (!sectionTitle) return;

    // We'll collect all other form fields into metadata
    const metadata: Record<string, any> = {}
    formData.forEach((value, key) => {
        if (key !== 'sectionTitle') {
            metadata[key] = value
        }
    })

    await Content.findOneAndUpdate(
        { type: 'page_section', title: sectionTitle },
        {
            type: 'page_section',
            title: sectionTitle,
            description: 'Dynamic Section',
            metadata
        },
        { upsert: true, new: true }
    )

    revalidatePath('/')
    revalidatePath('/admin')
}

// Contact Info - singleton pattern ideally, or by specific title 'ContactInfo'
export async function getContactInfo() {
    await dbConnect()
    const info = await Content.findOne({ type: 'contact_info', title: 'GlobalContact' }).lean()
    return JSON.parse(JSON.stringify(info))
}

export async function updateContactInfo(formData: FormData) {
    await checkAuth(); // New Security Layer
    await dbConnect()

    const email = formData.get('email')
    const phone = formData.get('phone')
    const address = formData.get('address')
    const facebook = formData.get('facebook')
    const twitter = formData.get('twitter')
    const instagram = formData.get('instagram')

    await Content.findOneAndUpdate(
        { type: 'contact_info', title: 'GlobalContact' },
        {
            type: 'contact_info',
            title: 'GlobalContact', // Consistent key
            description: 'Global Contact Information',
            metadata: {
                email,
                phone,
                address,
                facebook,
                twitter,
                instagram
            }
        },
        { upsert: true, new: true }
    )

    revalidatePath('/')
    revalidatePath('/admin')
}

// --- gallery ---
export async function getGalleryImages() {
    await dbConnect()
    const images = await Content.find({ type: 'gallery_image' }).sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(images)) as IContent[]
}

export async function addGalleryImage(formData: FormData) {
    await checkAuth(); // Security
    await dbConnect()

    const image = formData.get('image') as string
    if (!image) return;

    await Content.create({
        type: 'gallery_image',
        title: 'Gallery Image',
        description: 'Gallery Image',
        image
    })

    revalidatePath('/admin')
    revalidatePath('/')
}

// --- donations ---

export async function submitDonation(formData: FormData) {
    // No auth check - public access
    await dbConnect()

    const amount = formData.get('amount')
    const phoneNumber = formData.get('phoneNumber')
    const message = formData.get('message')

    if (!amount || !phoneNumber) {
        throw new Error('Missing required fields: amount and phoneNumber are required.')
    }

    await Donation.create({
        amount: Number(amount),
        phoneNumber: String(phoneNumber),
        message: message ? String(message) : undefined,
        status: 'pending' // Default, but explicit is fine
    })

    revalidatePath('/admin')
}

export async function getDonations() {
    await checkAuth() // Secured
    await dbConnect()
    const donations = await Donation.find({}).sort({ createdAt: -1 }).lean()
    return JSON.parse(JSON.stringify(donations)) as IDonation[]
}

