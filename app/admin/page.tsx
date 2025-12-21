// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-24 bg-slate-50">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">
                Welcome to Our 100-Year NGO
            </h1>
            <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
                We are transitioning from a historic club to a modern NGO.
                Our roadmap and mission will appear here soon.
            </p>
            <Link
                href="/admin"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Go to Admin Dashboard
            </Link>
        </main>
    );
}