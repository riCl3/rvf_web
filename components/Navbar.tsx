import Link from 'next/link'
import { getPageSection } from '@/app/actions'

export default async function Navbar() {
    const settings = await getPageSection('SiteSettings')
    const logoUrl = settings?.metadata?.logo
    return (
        <nav className="bg-white border-b border-gray-100/50 sticky top-0 z-50 backdrop-blur-xl bg-white/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-3 group">
                            {logoUrl ? (
                                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                                    <img src={logoUrl} alt="Logo" className="w-full h-full object-cover" />
                                </div>
                            ) : (
                                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:bg-blue-700 transition-colors shadow-sm">
                                    R
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider leading-tight">Ramkrishna Vivekananda Bayam Samity</span>
                                <span className="text-lg font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">
                                    Ramkrishna Vivekananda <span className="text-blue-600">Foundation</span>
                                </span>
                            </div>
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
