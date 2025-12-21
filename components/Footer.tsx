import Link from 'next/link'
import { getContactInfo } from '../app/actions'

export const dynamic = 'force-dynamic'

export default async function Footer() {
    const contactInfo = await getContactInfo()
    const metadata = contactInfo?.metadata || {}

    return (
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                                R
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider leading-tight">Ramkrishna Vivekananda Bayam Samity</span>
                                <span className="text-lg font-bold tracking-tight text-white">
                                    Ramkrishna Vivekananda <span className="text-blue-500">Foundation</span>
                                </span>
                            </div>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Dedicated to building a better future through community initiatives, education, and sustainable development since 1924.
                        </p>

                        {/* Social Icons based on Metadata */}
                        <div className="flex gap-4 mt-6">
                            {metadata.facebook && <a href={metadata.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Facebook</a>}
                            {metadata.twitter && <a href={metadata.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Twitter</a>}
                            {metadata.instagram && <a href={metadata.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Instagram</a>}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                            <li><Link href="/roadmap" className="hover:text-blue-400 transition-colors">Our History</Link></li>
                            <li><Link href="/#projects" className="hover:text-blue-400 transition-colors">Projects</Link></li>
                            <li><Link href="/admin" className="hover:text-blue-400 transition-colors">Admin Portal</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h3>
                        <ul className="space-y-3 text-sm">
                            {metadata.address ? (
                                <li>{metadata.address}</li>
                            ) : (
                                <>
                                    <li>123 Charity Lane</li>
                                    <li>New York, NY 10012</li>
                                </>
                            )}

                            {metadata.email && <li><a href={`mailto:${metadata.email}`} className="hover:text-blue-400">{metadata.email}</a></li>}
                            {metadata.phone && <li><a href={`tel:${metadata.phone}`} className="hover:text-blue-400">{metadata.phone}</a></li>}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; {new Date().getFullYear()} NGO Foundation. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
