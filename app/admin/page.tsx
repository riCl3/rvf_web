// app/admin/page.tsx
import mongoose from 'mongoose';

// 1. Tell the website what a "Work" looks like
const WorkSchema = new mongoose.Schema({
    title: String,
    description: String,
});

const Work = mongoose.models.Work || mongoose.model('Work', WorkSchema);

export default function AdminPage() {
    async function createWork(formData: FormData) {
        'use server'
        // 2. Connect to the database
        if (mongoose.connection.readyState === 0) {
            await mongoose.connect(process.env.MONGODB_URI!);
        }

        // 3. Extract the data from your form
        const title = formData.get('title');
        const description = formData.get('description');

        // 4. Save it!
        await Work.create({ title, description });

        console.log("Saved successfully to MongoDB!");
    }

    return (
        <div className="p-10 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-5">Add Recent Work</h1>
            <form action={createWork} className="flex flex-col gap-4 bg-white p-6 shadow-md rounded">
                <input name="title" placeholder="Project Title" className="border p-2 rounded text-black" required />
                <textarea name="description" placeholder="Description" className="border p-2 rounded text-black" />
                <button type="submit" className="bg-green-600 text-white p-2 rounded hover:bg-green-700">
                    Save to Database
                </button>
            </form>
        </div>
    );
}