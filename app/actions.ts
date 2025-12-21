'use server'

import dbConnect from '@/lib/mongodb'
import Content from '@/models/Content'
import { revalidatePath } from 'next/cache'

export async function addMilestone(formData: FormData) {
    await dbConnect()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const year = formData.get('year') as string

    if (!title || !description || !year) {
        throw new Error('Missing required fields')
    }

    await Content.create({
        type: 'milestone',
        title,
        description,
        year: parseInt(year, 10),
    })

    revalidatePath('/roadmap')
    revalidatePath('/admin')
}

export async function addRecentWork(formData: FormData) {
    await dbConnect()

    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string

    if (!title || !description || !category) {
        throw new Error('Missing required fields')
    }

    await Content.create({
        type: 'recent_work',
        title,
        description,
        category,
    })

    revalidatePath('/')
    revalidatePath('/admin')
}

export async function getMilestones() {
    await dbConnect()
    // Sort by year ascending (Oldest to Newest)
    const milestones = await Content.find({ type: 'milestone' }).sort({ year: 1 }).lean()

    // Serialize for passing to components
    return milestones.map((doc: any) => ({
        _id: doc._id.toString(),
        title: doc.title,
        description: doc.description,
        year: doc.year,
        type: doc.type,
        createdAt: doc.createdAt?.toISOString(),
        updatedAt: doc.updatedAt?.toISOString(),
    }))
}

export async function getRecentWorks() {
    await dbConnect()
    // Features '3 Most Recent' works. Sort by createdAt desc.
    const works = await Content.find({ type: 'recent_work' }).sort({ createdAt: -1 }).limit(3).lean()

    return works.map((doc: any) => ({
        _id: doc._id.toString(),
        title: doc.title,
        description: doc.description,
        category: doc.category,
        type: doc.type,
        createdAt: doc.createdAt?.toISOString(),
        updatedAt: doc.updatedAt?.toISOString(),
    }))
}
