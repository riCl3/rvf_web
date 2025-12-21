// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            {/* Hero Section */}
            <header className="py-20 bg-blue-50 text-center">
                <h1 className="text-5xl font-bold mb-4">Our 100-Year Journey</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    From a local club to a global NGO. Join us in making a difference for the next century.
                </p>
                <div className="mt-8">
                    <Link href="/admin" className="text-blue-600 underline">
                        Go to Admin Dashboard
                    </Link>
                </div>
            </header>

            {/* Placeholder for Content */}
            <main className="p-10 text-center">
                <h2 className="text-3xl font-semibold">Our Impact</h2>
                <p className="mt-4">Loading our latest works and roadmap...</p>
            </main>
        </div>
    );
}