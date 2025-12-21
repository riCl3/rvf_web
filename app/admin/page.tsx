// app/admin/page.tsx
export default function AdminPage() {
    async function createWork(formData: FormData) {
        'use server'
        // This is where the magic happens. 
        // Data from the form will arrive here.
        const title = formData.get('title');
        const description = formData.get('description');

        console.log("New Work Received:", { title, description });
        // Later, we will add one line here to save this to your database.
    }

    return (
        <div className="p-10 max-w-lg mx-auto">
            <h1 className="text-2xl font-bold mb-5">Admin: Add Recent Work</h1>
            <form action={createWork} className="flex flex-col gap-4">
                <input
                    name="title"
                    placeholder="Project Title (e.g. 100th Year Gala)"
                    className="border p-2 rounded text-black"
                    required
                />
                <textarea
                    name="description"
                    placeholder="What did the NGO achieve?"
                    className="border p-2 rounded text-black"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Upload to Website
                </button>
            </form>
        </div>
    );
}