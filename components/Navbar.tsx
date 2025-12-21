import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-gray-100/50 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg group-hover:bg-blue-700 transition-colors shadow-sm">
                                N
                            </div>
                            <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
                                NGO<span className="text-blue-600">Foundation</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">
                            Home
                        </Link>
                        <Link href="/roadmap" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">
                            Our History
                        </Link>
                        <Link href="/#projects" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">
                            Projects
                        </Link>
                        <Link href="/#volunteer" className="text-gray-600 hover:text-blue-600 font-medium transition-colors text-sm">
                            Volunteer
                        </Link>
                    </div>

                    {/* CTAs */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/admin" className="text-gray-500 hover:text-gray-900 font-medium text-sm transition-colors">
                            Admin
                        </Link>
                        <Link
                            href="/#donate"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all duration-200"
                        >
                            Donate Now
                        </Link>
                    </div>

                    {/* Mobile Menu Button (Placeholder for simplicity) */}
                    <div className="md:hidden">
                        <Link
                            href="/#donate"
                            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
                        >
                            Donate
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}
