import { getPageSection } from '../actions'
import DonationForm from '@/components/DonationForm'
import { CONTENT_TITLES } from '@/models/Content'

export const metadata = {
    title: 'Donate - Ramkrishna Vivekananda Foundation',
    description: 'Support our cause and make a difference.',
}

export default async function DonatePage() {
    const donationSection = await getPageSection(CONTENT_TITLES.DONATION_PAGE)
    const sectionData = donationSection?.metadata || {}

    const title = donationSection?.title || 'Donate'
    // Actually getPageSection uses 'title' as the key to find the section. 
    // The content structure has a 'title' field which is usually the key (e.g., 'DonationPage').
    // But we might want a display title stored in metadata or just use a default.
    // Let's assume we use metadata for customizable display text.

    const displayTitle = sectionData.headline || "Help Us Chang Lives"
    const description = sectionData.description || "Your contribution, no matter how small, creates a ripple of positive change in our community. Join us in our mission to provide education, healthcare, and support to those who need it most."

    // Advantages list from metadata or defaults
    const advantages = [
        sectionData.advantage1 || "Tax Deductible Receipt",
        sectionData.advantage2 || "Transparency in Utilization",
        sectionData.advantage3 || "Direct Impact on Communities",
        sectionData.advantage4 || "Regular Updates on Projects"
    ]

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Header / Hero */}
            <section className="bg-blue-600 py-20 px-6 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-700 opacity-20 pattern-grid-lg"></div>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">{displayTitle}</h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
                        {sectionData.subheadline || "Together we can build a better future."}
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

                    {/* Left Side: Content */}
                    <div className="lg:w-1/2 space-y-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Donate?</h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-8">
                                {description}
                            </p>

                            <ul className="space-y-4">
                                {advantages.map((adv: string, index: number) => (
                                    <li key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                                        <div className="bg-blue-100 p-2 rounded-full text-blue-600 shrink-0 mt-1">
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-lg">{adv}</h4>
                                            <p className="text-sm text-gray-500 mt-1">We ensure every penny is accounted for.</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Impact Stat or Testimonial */}
                        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    "
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900">Community Impact</div>
                                    <div className="text-sm text-gray-500">Since 1924</div>
                                </div>
                            </div>
                            <p className="text-gray-700 italic text-lg">
                                "{sectionData.quote || "The best way to find yourself is to lose yourself in the service of others."}"
                            </p>
                        </div>
                    </div>

                    {/* Right Side: Donation Form */}
                    <div className="lg:w-1/2 w-full sticky top-24">
                        <DonationForm />
                    </div>

                </div>
            </div>
        </div>
    )
}
